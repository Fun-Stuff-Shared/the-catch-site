import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { parse } from "parse5";
import { readV2, storySubjects, v2Manifests } from "../src/lib/v2.mjs";
import { V2_SECTION_BUDGET, attributeGroups, bestStatements, briefGroups, claimStatements, sourceLabel, storyPaths } from "../src/lib/v2-brief.mjs";

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

// A v2 story page carries a brief: the top-ranked claims of each subject with their best statements, within a byte budget.
// Its claims page lists every claim, and each claim's page shows every statement about it with its exact quote.
export function checkV2Pages(dist, directory, manifests) {
  const failures = [], checked = [], report = [];
  const rows = v2Manifests(manifests);
  if (!rows.length) return { failures, checked, report };
  const snapshot = readV2(directory);
  for (const { route, story } of rows) {
    let subjects;
    try { subjects = storySubjects(snapshot, story); } catch (error) { failures.push(`${route}: ${error.message}`); continue; }
    const brief = page(dist, route);
    if (!brief) { failures.push(`v2 story page missing: ${route}`); continue; }
    const paths = storyPaths(route);
    const sections = brief.marked("data-v2-snapshot");
    if (sections.length !== 1 || attr(sections[0], "data-v2-snapshot") !== snapshot.id) { failures.push(`${route}: renders v2 snapshot ${sections.map((node) => attr(node, "data-v2-snapshot")).join(",") || "none"}, current is ${snapshot.id}`); continue; }
    const location = sections[0].sourceCodeLocation;
    const sectionBytes = Buffer.byteLength(brief.html.slice(location.startOffset, location.endOffset));
    if (sectionBytes > V2_SECTION_BUDGET) failures.push(`${route}: v2 section is ${sectionBytes} bytes, budget ${V2_SECTION_BUDGET}`);
    const pageSubjects = brief.marked("data-v2-subject").map((node) => attr(node, "data-v2-subject"));
    if (JSON.stringify(pageSubjects) !== JSON.stringify(subjects)) failures.push(`${route}: renders subjects ${pageSubjects.join(",")}, snapshot names ${subjects.join(",")}`);
    const claimsPage = page(dist, paths.claims);
    if (!claimsPage) failures.push(`${route}: claims page missing at ${paths.claims}`);
    const section = [...nodes(sections[0])];
    const sourceNodes = new Map(brief.marked("data-v2-source").map((node) => [attr(node, "data-v2-source"), node]));
    let claimPages = 0, claimPageBytes = 0, fallbacks = 0, sourceCount = 0;
    const briefClaims = [], briefAttributes = [], allClaims = [], allAttributes = [], briefStatements = [];
    for (const subject of subjects) {
      const view = snapshot.views.get(subject);
      for (const [attribute, claims] of briefGroups(view)) {
        briefAttributes.push(attribute);
        for (const claim of claims) {
          briefClaims.push(claim.id);
          briefStatements.push(...bestStatements(view, claim).map((statement) => statement.id));
          const article = section.find((node) => attr(node, "data-v2-claim") === claim.id);
          if (article) checkStatements(failures, `${route} claim ${claim.id}`, article, bestStatements(view, claim));
        }
      }
      for (const [attribute, claims] of attributeGroups(view)) {
        allAttributes.push(attribute);
        allClaims.push(...claims.map((claim) => claim.id));
      }
      for (const source of view.sources) {
        const label = sourceLabel(source);
        sourceCount += 1;
        if (label.fallback) fallbacks += 1;
        const node = sourceNodes.get(source.artifact);
        if (!node) failures.push(`${route}: source ${source.artifact} not listed`);
        else if (!normalize(text(node)).includes(normalize(label.text))) failures.push(`${route}: source ${source.artifact} is not named ${label.text}`);
      }
      for (const claim of view.claims) {
        const claimPage = page(dist, paths.claim(claim));
        if (!claimPage) { failures.push(`${route}: claim page missing for ${claim.id}`); continue; }
        claimPages += 1;
        claimPageBytes += claimPage.bytes;
        const shown = claimPage.marked("data-v2-claim-page");
        if (shown.length !== 1 || attr(shown[0], "data-v2-claim-page") !== snapshot.id || attr(shown[0], "data-v2-claim") !== claim.id) { failures.push(`${paths.claim(claim)}: does not render claim ${claim.id} from snapshot ${snapshot.id}`); continue; }
        checkStatements(failures, paths.claim(claim), shown[0], claimStatements(view, claim));
      }
    }
    if (!same(ids(section, "data-v2-claim"), briefClaims)) failures.push(`${route}: brief shows claims ${ids(section, "data-v2-claim").join(",")}, ranking gives ${briefClaims.join(",")}`);
    if (!same(ids(section, "data-v2-attribute"), briefAttributes)) failures.push(`${route}: brief groups ${ids(section, "data-v2-attribute").join(",")}, expected ${briefAttributes.join(",")}`);
    if (!same(ids(section, "data-v2-statement"), briefStatements)) failures.push(`${route}: brief shows statements ${ids(section, "data-v2-statement").join(",")}, expected ${briefStatements.join(",")}`);
    if (claimsPage) {
      const listed = claimsPage.marked("data-v2-claims-page");
      if (listed.length !== 1 || attr(listed[0], "data-v2-claims-page") !== snapshot.id) failures.push(`${paths.claims}: does not render snapshot ${snapshot.id}`);
      else {
        const all = [...nodes(listed[0])];
        if (!same(ids(all, "data-v2-claim"), allClaims)) failures.push(`${paths.claims}: lists claims ${ids(all, "data-v2-claim").length}, expected ${allClaims.length} in ranked attribute order`);
        if (!same(ids(all, "data-v2-attribute"), allAttributes)) failures.push(`${paths.claims}: groups differ from the claims' attributes`);
      }
    }
    report.push({ route, pageBytes: brief.bytes, sectionBytes, claimsPageBytes: claimsPage?.bytes ?? 0, claimPages, claimPageBytes, sources: sourceCount, sourceFallbacks: fallbacks });
    checked.push(route);
  }
  return { failures, checked, report };
}

export function formatV2Report(report) {
  return report.map((row) => `v2 ${row.route}: page ${row.pageBytes} B, brief ${row.sectionBytes} B (budget ${V2_SECTION_BUDGET}), claims page ${row.claimsPageBytes} B, ${row.claimPages} claim pages ${row.claimPageBytes} B, sources named by artifact id ${row.sourceFallbacks}/${row.sources}`).join("\n");
}
