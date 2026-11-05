import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { parse } from "parse5";
import { readV2, storySubjects, subjectHomes, v2Manifests } from "../src/lib/v2.mjs";
import { DEVELOPMENTS_PER_PAGE, V2_SECTION_BUDGET, attributeGroups, bestStatements, briefGroups, claimStatements, publishedDevelopments, rankClaims, sourceLabel, subjectPaths } from "../src/lib/v2-brief.mjs";

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

// A v2 story page carries a brief: the top-ranked claims of each subject with their best statements, within a byte budget,
// linking each claim to its one home. A subject's claims page lists every claim, and each claim's page shows every statement
// about it with its exact quote; a subject listed under several stories still has one set of claim pages, at its home.
export function checkV2Pages(dist, directory, manifests) {
  const failures = [], checked = [], report = [];
  const rows = v2Manifests(manifests);
  const snapshot = readV2(directory);
  for (const row of rows) {
    const { route } = row;
    let subjects;
    try { subjects = storySubjects(snapshot, row); } catch (error) { failures.push(`${route}: ${error.message}`); continue; }
    const brief = page(dist, route);
    if (!brief) { failures.push(`v2 story page missing: ${route}`); continue; }
    const sections = brief.marked("data-v2-snapshot");
    if (sections.length !== 1 || attr(sections[0], "data-v2-snapshot") !== snapshot.id) { failures.push(`${route}: renders v2 snapshot ${sections.map((node) => attr(node, "data-v2-snapshot")).join(",") || "none"}, current is ${snapshot.id}`); continue; }
    const location = sections[0].sourceCodeLocation;
    const sectionBytes = Buffer.byteLength(brief.html.slice(location.startOffset, location.endOffset));
    if (sectionBytes > V2_SECTION_BUDGET) failures.push(`${route}: v2 section is ${sectionBytes} bytes, budget ${V2_SECTION_BUDGET}`);
    const pageSubjects = brief.marked("data-v2-subject").map((node) => attr(node, "data-v2-subject"));
    if (JSON.stringify(pageSubjects) !== JSON.stringify(subjects)) failures.push(`${route}: renders subjects ${pageSubjects.join(",")}, snapshot names ${subjects.join(",")}`);
    const section = [...nodes(sections[0])];
    const sourceNodes = new Map(brief.marked("data-v2-source").map((node) => [attr(node, "data-v2-source"), node]));
    let fallbacks = 0, sourceCount = 0;
    const briefClaims = [], briefAttributes = [], briefStatements = [], briefLinks = [], claimsLinks = [];
    for (const subject of subjects) {
      const view = snapshot.views.get(subject);
      const paths = subjectPaths(subject);
      claimsLinks.push(paths.claims);
      for (const [attribute, claims] of briefGroups(view)) {
        briefAttributes.push(attribute);
        for (const claim of claims) {
          briefClaims.push(claim.id);
          briefLinks.push(paths.claim(claim));
          briefStatements.push(...bestStatements(view, claim).map((statement) => statement.id));
          const article = section.find((node) => attr(node, "data-v2-claim") === claim.id);
          if (article) checkStatements(failures, `${route} claim ${claim.id}`, article, bestStatements(view, claim));
        }
      }
      for (const source of view.sources) {
        const label = sourceLabel(source);
        sourceCount += 1;
        if (label.fallback) fallbacks += 1;
        const node = sourceNodes.get(source.artifact);
        if (!node) failures.push(`${route}: source ${source.artifact} not listed`);
        else if (!normalize(text(node)).includes(normalize(label.text))) failures.push(`${route}: source ${source.artifact} is not named ${label.text}`);
      }
    }
    if (!same(ids(section, "data-v2-claim"), briefClaims)) failures.push(`${route}: brief shows claims ${ids(section, "data-v2-claim").join(",")}, ranking gives ${briefClaims.join(",")}`);
    if (!same(ids(section, "data-v2-attribute"), briefAttributes)) failures.push(`${route}: brief groups ${ids(section, "data-v2-attribute").join(",")}, expected ${briefAttributes.join(",")}`);
    if (!same(ids(section, "data-v2-statement"), briefStatements)) failures.push(`${route}: brief shows statements ${ids(section, "data-v2-statement").join(",")}, expected ${briefStatements.join(",")}`);
    const links = section.filter((node) => attr(node, "data-v2-claim-link") !== undefined).map((node) => attr(node, "href"));
    if (!same(links, briefLinks)) failures.push(`${route}: brief links claims to ${links.join(",")}, their homes are ${briefLinks.join(",")}`);
    const listLinks = section.filter((node) => attr(node, "data-v2-claims-link") !== undefined).map((node) => attr(node, "href"));
    if (!same(listLinks, claimsLinks)) failures.push(`${route}: brief links claim lists to ${listLinks.join(",")}, their homes are ${claimsLinks.join(",")}`);
    report.push({ route, pageBytes: brief.bytes, sectionBytes, sources: sourceCount, sourceFallbacks: fallbacks });
    checked.push(route);
  }
  const { homes } = subjectHomes(directory, manifests);
  const expected = new Map();
  for (const { subject, view, stories, selected } of homes) {
    const paths = subjectPaths(subject);
    expected.set(JSON.stringify([subject, null]), paths.claims);
    const homePage = selected ? page(dist, paths.home) : null;
    if (!selected) {
      if (existsSync(join(dist, paths.home, "index.html"))) failures.push(`${paths.home}: a development page exists with development pages off`);
    } else if (!homePage) failures.push(`${subject}: development page missing at ${paths.home}`);
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
    report.push({ subject, stories: stories.length, claimsPageBytes: claimsPage?.bytes ?? 0, claimPages, claimPageBytes });
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
  if (!listed.length && existsSync(join(dist, "developments/index.html"))) failures.push("/developments/: a list page exists with development pages off");
  const files = readdirSync(dist, { recursive: true, withFileTypes: true }).filter((entry) => entry.isFile()).length;
  if (files > ASSET_FILES) failures.push(`dist holds ${files} files, over the ${ASSET_FILES} a Worker version can carry with room to grow`);
  report.push({ developments: listed.length, files });
  return { failures, checked, report };
}

export function formatV2Report(report) {
  return report.map((row) => row.developments !== undefined ? `v2 selection: ${row.developments} developments, ${row.files} files in dist` : row.route
    ? `v2 ${row.route}: page ${row.pageBytes} B, brief ${row.sectionBytes} B (budget ${V2_SECTION_BUDGET}), sources named by artifact id ${row.sourceFallbacks}/${row.sources}`
    : `v2 ${row.subject}: on ${row.stories} ${row.stories === 1 ? "story" : "stories"}, claims page ${row.claimsPageBytes} B, ${row.claimPages} claim pages ${row.claimPageBytes} B`).join("\n");
}
