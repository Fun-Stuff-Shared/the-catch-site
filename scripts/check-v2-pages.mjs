import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { parse } from "parse5";
import { readV2, storySubjects, v2Manifests } from "../src/lib/v2.mjs";
import { BRIEF_CLAIMS, V2_SECTION_BUDGET, bestStatements, claimStatements, rankClaims, sourceLabel, storyPaths } from "../src/lib/v2-brief.mjs";

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

function checkQuotes(failures, where, rendered, statements) {
  const nodesById = new Map(rendered.map((node) => [attr(node, "data-v2-statement"), node]));
  for (const statement of statements) {
    const node = nodesById.get(statement.id);
    if (!node) failures.push(`${where}: statement ${statement.id} not rendered`);
    else if (!normalize(text(node)).includes(normalize(statement.quote))) failures.push(`${where}: statement ${statement.id} quote differs`);
  }
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
    const listed = new Set(claimsPage?.marked("data-v2-claim").map((node) => attr(node, "data-v2-claim")) ?? []);
    const shownClaims = brief.marked("data-v2-claim").map((node) => attr(node, "data-v2-claim"));
    const sourceNodes = new Map(brief.marked("data-v2-source").map((node) => [attr(node, "data-v2-source"), node]));
    let claimPages = 0, claimPageBytes = 0, fallbacks = 0, sourceCount = 0;
    const expected = [];
    for (const subject of subjects) {
      const view = snapshot.views.get(subject);
      const top = rankClaims(view).slice(0, BRIEF_CLAIMS);
      expected.push(...top.map((claim) => claim.id));
      checkQuotes(failures, route, brief.marked("data-v2-statement"), top.flatMap((claim) => bestStatements(view, claim)));
      for (const source of view.sources) {
        const label = sourceLabel(source);
        sourceCount += 1;
        if (label.fallback) fallbacks += 1;
        const node = sourceNodes.get(source.artifact);
        if (!node) failures.push(`${route}: source ${source.artifact} not listed`);
        else if (!normalize(text(node)).includes(normalize(label.text))) failures.push(`${route}: source ${source.artifact} is not named ${label.text}`);
      }
      for (const claim of view.claims) {
        if (claimsPage && !listed.has(claim.id)) failures.push(`${paths.claims}: claim ${claim.id} not listed`);
        const claimPage = page(dist, paths.claim(claim));
        if (!claimPage) { failures.push(`${route}: claim page missing for ${claim.id}`); continue; }
        claimPages += 1;
        claimPageBytes += claimPage.bytes;
        const shown = claimPage.marked("data-v2-claim-page");
        if (shown.length !== 1 || attr(shown[0], "data-v2-claim-page") !== snapshot.id || attr(shown[0], "data-v2-claim") !== claim.id) failures.push(`${paths.claim(claim)}: does not render claim ${claim.id} from snapshot ${snapshot.id}`);
        checkQuotes(failures, paths.claim(claim), claimPage.marked("data-v2-statement"), claimStatements(view, claim));
      }
    }
    if (JSON.stringify(shownClaims) !== JSON.stringify(expected)) failures.push(`${route}: brief shows claims ${shownClaims.join(",")}, ranking gives ${expected.join(",")}`);
    report.push({ route, pageBytes: brief.bytes, sectionBytes, claimsPageBytes: claimsPage?.bytes ?? 0, claimPages, claimPageBytes, sources: sourceCount, sourceFallbacks: fallbacks });
    checked.push(route);
  }
  return { failures, checked, report };
}

export function formatV2Report(report) {
  return report.map((row) => `v2 ${row.route}: page ${row.pageBytes} B, brief ${row.sectionBytes} B (budget ${V2_SECTION_BUDGET}), claims page ${row.claimsPageBytes} B, ${row.claimPages} claim pages ${row.claimPageBytes} B, sources named by artifact id ${row.sourceFallbacks}/${row.sources}`).join("\n");
}
