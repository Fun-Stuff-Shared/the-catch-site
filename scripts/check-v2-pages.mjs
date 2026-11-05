import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { parse } from "parse5";
import { readV2, storySubjects, subjectHomes, v2Manifests } from "../src/lib/v2.mjs";
import { DEVELOPMENTS_PER_PAGE, attributeGroups, claimStatements, publishedDevelopments, rankClaims, subjectPaths } from "../src/lib/v2-brief.mjs";

// Workers Paid carries 100,000 static asset files per version; the gate stops short of it so a growing selection fails here and not in the deploy.
const ASSET_FILES = 90_000;

const attr = (node, name) => node.attrs?.find((item) => item.name === name)?.value;
const text = (node) => node.nodeName === "#text" ? node.value : (node.childNodes ?? []).map(text).join("");
const normalize = (value) => String(value ?? "").replace(/\s+/g, " ").trim();
function* nodes(node) { yield node; for (const child of node.childNodes ?? []) yield* nodes(child); }

function page(dist, route) {
  const path = join(dist, route, "index.html");
  if (!existsSync(path)) return null;
  const html = readFileSync(path, "utf8");
  const all = [...nodes(parse(html, { sourceCodeLocationInfo: true }))];
  const marked = (name) => all.filter((node) => attr(node, name) !== undefined);
  return { html, bytes: Buffer.byteLength(html), marked };
}

const ids = (rendered, name) => rendered.filter((node) => attr(node, name) !== undefined).map((node) => attr(node, name));
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);

// The statements rendered under a node are exactly the expected ones, in order, each with its exact quote.
function checkStatements(failures, where, within, statements) {
  const rendered = [...nodes(within)].filter((node) => attr(node, "data-v2-statement") !== undefined);
  const shown = rendered.map((node) => attr(node, "data-v2-statement"));
  const expected = statements.map((statement) => statement.id);
  if (!same(shown, expected)) {
    const missing = expected.filter((id) => !shown.includes(id));
    failures.push(missing.length ? `${where}: statement ${missing[0]} not rendered` : `${where}: renders statements ${shown.join(",")}, expected ${expected.join(",")}`);
    return;
  }
  rendered.forEach((node, i) => { if (!normalize(text(node)).includes(normalize(statements[i].quote))) failures.push(`${where}: statement ${statements[i].id} quote differs`); });
}

// Every built page that renders a v2 claim or a subject's claim list, by the attribute that marks it.
function claimPagesIn(dist) {
  const found = [];
  for (const entry of readdirSync(dist, { recursive: true, withFileTypes: true })) {
    if (!entry.isFile() || entry.name !== "index.html") continue;
    const path = join(entry.parentPath, entry.name);
    const html = readFileSync(path, "utf8");
    if (!html.includes("data-v2-claim-page") && !html.includes("data-v2-claims-page")) continue;
    const route = `/${path.slice(dist.length).replace(/^\/+/, "").replace(/index\.html$/, "")}`;
    for (const node of nodes(parse(html))) {
      if (attr(node, "data-v2-claim-page") !== undefined) found.push({ route, subject: attr(node, "data-v2-subject"), claim: attr(node, "data-v2-claim") });
      if (attr(node, "data-v2-claims-page") !== undefined) found.push({ route, subject: attr(node, "data-v2-subject"), claim: null });
    }
  }
  return found;
}

// A v2 story names subjects the snapshot holds, and its page shows no machine brief. A published development has its
// home, a list of every claim, and a page for each claim with every statement about it and its exact quote.
export function checkV2Pages(dist, directory, manifests) {
  const failures = [], checked = [], report = [];
  const snapshot = readV2(directory);
  for (const row of v2Manifests(manifests)) {
    try { storySubjects(snapshot, row); } catch (error) { failures.push(`${row.route}: ${error.message}`); continue; }
    const story = page(dist, row.route);
    if (!story) { failures.push(`v2 story page missing: ${row.route}`); continue; }
    if (story.html.includes("data-v2-snapshot")) failures.push(`${row.route}: an authored page shows a machine brief`);
    checked.push(row.route);
  }
  const { homes } = subjectHomes(directory);
  const expected = new Map();
  for (const { subject, view } of homes) {
    const paths = subjectPaths(subject);
    expected.set(JSON.stringify([subject, null]), paths.claims);
    const homePage = page(dist, paths.home);
    if (!homePage) failures.push(`${subject}: development page missing at ${paths.home}`);
    else if (homePage.marked("data-v2-development").length !== 1 || attr(homePage.marked("data-v2-development")[0], "data-v2-development") !== subject) failures.push(`${paths.home}: does not render ${subject}`);
    const claimsPage = page(dist, paths.claims);
    if (!claimsPage) failures.push(`${subject}: claims page missing at ${paths.claims}`);
    else {
      const listed = claimsPage.marked("data-v2-claims-page");
      if (listed.length !== 1 || attr(listed[0], "data-v2-claims-page") !== snapshot.id || attr(listed[0], "data-v2-subject") !== subject) failures.push(`${paths.claims}: does not render the claims of ${subject} from snapshot ${snapshot.id}`);
      else {
        const all = [...nodes(listed[0])];
        const allClaims = attributeGroups(view).flatMap(([, claims]) => claims.map((claim) => claim.id));
        const allAttributes = attributeGroups(view).map(([attribute]) => attribute);
        if (!same(ids(all, "data-v2-claim"), allClaims)) failures.push(`${paths.claims}: lists claims ${ids(all, "data-v2-claim").length}, expected ${allClaims.length} in ranked attribute order`);
        if (!same(ids(all, "data-v2-attribute"), allAttributes)) failures.push(`${paths.claims}: groups differ from the claims' attributes`);
      }
    }
    let claimPages = 0, claimPageBytes = 0;
    for (const claim of rankClaims(view)) {
      expected.set(JSON.stringify([subject, claim.id]), paths.claim(claim));
      const claimPage = page(dist, paths.claim(claim));
      if (!claimPage) { failures.push(`${subject}: claim page missing for ${claim.id} at ${paths.claim(claim)}`); continue; }
      claimPages += 1;
      claimPageBytes += claimPage.bytes;
      const shown = claimPage.marked("data-v2-claim-page");
      if (shown.length !== 1 || attr(shown[0], "data-v2-claim-page") !== snapshot.id || attr(shown[0], "data-v2-subject") !== subject || attr(shown[0], "data-v2-claim") !== claim.id) { failures.push(`${paths.claim(claim)}: does not render claim ${claim.id} of ${subject} from snapshot ${snapshot.id}`); continue; }
      checkStatements(failures, paths.claim(claim), shown[0], claimStatements(view, claim));
    }
    report.push({ subject, claimsPageBytes: claimsPage?.bytes ?? 0, claimPages, claimPageBytes });
  }
  for (const { route, subject, claim } of claimPagesIn(dist)) {
    const home = expected.get(JSON.stringify([subject, claim]));
    if (home !== route) failures.push(`${route}: renders ${claim === null ? "the claims" : `claim ${claim}`} of ${subject}${home ? `, whose one home is ${home}` : ", which no v2 story shows"}`);
  }
  const listed = publishedDevelopments(snapshot).map((view) => subjectPaths(view.id).home);
  for (let start = 0; start < listed.length; start += DEVELOPMENTS_PER_PAGE) {
    const route = start ? `/developments/${start / DEVELOPMENTS_PER_PAGE + 1}/` : "/developments/";
    const list = page(dist, route);
    if (!list) { failures.push(`developments list page missing: ${route}`); continue; }
    const links = list.marked("data-v2-development-link").map((node) => attr(node, "href"));
    if (!same(links, listed.slice(start, start + DEVELOPMENTS_PER_PAGE))) failures.push(`${route}: lists ${links.length} developments, not the selection's page in order`);
  }
  if (!listed.length) {
    if (existsSync(join(dist, "developments/index.html"))) failures.push("/developments/: a list page exists with development pages off");
    if (page(dist, "/")?.html.includes("data-latest-developments")) failures.push("/: the home page lists developments with development pages off");
    const search = join(dist, "search-index.json");
    if (existsSync(search) && readFileSync(search, "utf8").includes('"/developments/')) failures.push("search-index.json: lists developments with development pages off");
  }
  const files = readdirSync(dist, { recursive: true, withFileTypes: true }).filter((entry) => entry.isFile()).length;
  if (files > ASSET_FILES) failures.push(`dist holds ${files} files, over the ${ASSET_FILES} a Worker version can carry with room to grow`);
  report.push({ developments: listed.length, files });
  return { failures, checked, report };
}

export function formatV2Report(report) {
  return report.map((row) => row.developments !== undefined
    ? `v2 selection: ${row.developments} developments, ${row.files} files in dist`
    : `v2 ${row.subject}: claims page ${row.claimsPageBytes} B, ${row.claimPages} claim pages ${row.claimPageBytes} B`).join("\n");
}
