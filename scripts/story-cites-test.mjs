import test from "node:test";
import assert from "node:assert/strict";
import { writeFile, mkdtemp, mkdir, copyFile, symlink, rm, access } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "node:net";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { execFileSync } from "node:child_process";

test("story components render and validate citations without restructuring blocks", async (t) => {
  const root = fileURLToPath(new URL("..", import.meta.url));
  const project = await mkdtemp(join(tmpdir(), "story-cites-"));
  t.after(async () => {
    await rm(project, {recursive: true, force: true});
    await assert.rejects(access(project), {code: "ENOENT"});
  });
  const fixture = join(project, "src/pages/cites-test.ts");
  const claim = {id: "reported-count", says: "Reported count.", evidence: [{record: "test-record", passage: "Exact passage"}]};
  const ledger = {story: "test--story", claims: [claim]};
  const record = {id: "test-record", date: "2026-01-07"};
  const expectedDate = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(`${record.date}T12:00:00Z`));
  const event = ledger.story.replace("--", "/");
  for (const dir of ["src/pages", "src/components/story", "src/lib", "src/data", "checks/claims", "checks/manifests"]) await mkdir(join(project, dir), {recursive: true});
  for (const file of ["src/components/story/OutletCheck.astro", "src/components/story/KpiStrip.astro", "src/components/Cite.astro", "src/lib/claims.mjs", "src/lib/record-manifests.mjs"]) await copyFile(join(root, file), join(project, file));
  await symlink(join(root, "node_modules"), join(project, "node_modules"), "dir");
  await writeFile(join(project, "package.json"), JSON.stringify({type: "module"}));
  await writeFile(join(project, "src/data/news-records.json"), JSON.stringify({records: []}));
  await writeFile(join(project, "checks/claims/test--story.json"), JSON.stringify(ledger));
  await writeFile(join(project, "checks/manifests/test--story.json"), JSON.stringify({event, records: [record, {id: "undated-record", date: "undated"}], story_sources: [{id: record.id, group: "primary"}, {id: "undated-record", group: "primary"}]}));
  const socket = createServer();
  socket.listen(0, "127.0.0.1");
  await once(socket, "listening");
  const port = socket.address().port;
  await new Promise((resolve, reject) => socket.close((error) => error ? reject(error) : resolve()));
  const endpoint = `http://localhost:${port}/cites-test`;
  await writeFile(fixture, `
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import OutletCheck from '../components/story/OutletCheck.astro';
import KpiStrip from '../components/story/KpiStrip.astro';
export const prerender = false;
export async function GET({ request }) {
  const q = new URL(request.url).searchParams;
  const cites = q.has('empty') ? [] : q.has('omit') ? undefined : q.has('source') ? [{s: q.has('undated') ? 'undated-record' : ${JSON.stringify(claim.evidence[0].record)}, passage: 'Exact passage'}] : [{c: q.has('invalid') ? 'missing-test-claim' : ${JSON.stringify(claim.id)}}];
  const container = await AstroContainer.create();
  const props = q.has('kpi') ? { kpis: [{value: '0', label: 'Count', cites}] } : {outlet: 'Test outlet', claim: 'Reported claim.', verdict: 'The record.', folded: q.has('folded'), cites};
  try {
    const html = await container.renderToString(q.has('kpi') ? KpiStrip : OutletCheck, {props, request: new Request('http://localhost/' + (q.has('source') ? 'fixture' : ${JSON.stringify(`events/${event}/`)}))});
    return new Response(html);
  } catch (error) {
    return new Response(error.message, {status: 500});
  }
}
`);
  const server = spawn(process.execPath, [join(root, "node_modules/astro/bin/astro.mjs"), "dev", "--port", String(port)], { cwd: project, stdio: "pipe" });
  let logs = "";
  server.stdout.on("data", (data) => { logs += data; });
  server.stderr.on("data", (data) => { logs += data; });
  try {
    for (let i = 0; !logs.includes(`localhost:${port}`) && server.exitCode === null && i < 200; i++) await new Promise((resolve) => setTimeout(resolve, 100));
    assert.ok(logs.includes(`localhost:${port}`), logs);
    for (const variant of ["", "folded&", "kpi&"]) {
      await t.test(variant || "card", async () => {
        const response = await fetch(`${endpoint}?${variant}`);
        const html = await response.text();
        assert.equal(response.status, 200, html);
        assert.ok(html.includes(`data-claim="${claim.id}"`), html);
        assert.ok(html.includes(`data-record-href="/records/${claim.evidence[0].record}/"`), html);
        if (variant !== "kpi&") assert.ok(html.includes(expectedDate), html);
        const blocks = JSON.parse(execFileSync("python3", ["-c", `import runpy,json,sys; m=runpy.run_path('skills/catch-record/scripts/claims.py'); p=m['Blocks'](); p.feed('<main>'+sys.stdin.read()+'</main>'); print(json.dumps(p.blocks))`], {input: html, encoding: "utf8"}));
        for (const [text, ids] of blocks.filter(([text]) => /Reported claim|The record|Count/.test(text))) {
          assert.ok(ids.includes(claim.id), text);
        }
        for (const empty of ['empty', 'omit']) {
          const plain = await fetch(`${endpoint}?${variant}${empty}`).then((r) => r.text());
          assert.doesNotMatch(plain, /src-ref/);
        }
        const source = await fetch(`${endpoint}?${variant}source`).then((r) => r.text());
        assert.match(source, /data-passage="Exact passage"/);
        if (variant !== "kpi&") assert.ok(source.includes(expectedDate), source);
        if (variant !== "kpi&") {
          const undated = await fetch(`${endpoint}?${variant}source&undated`);
          const undatedHtml = await undated.text();
          assert.equal(undated.status, 200, undatedHtml);
          assert.doesNotMatch(undatedHtml, /Invalid Date|January/);
        }
        const invalid = await fetch(`${endpoint}?${variant}invalid`);
        assert.equal(invalid.status, 500);
        assert.match(await invalid.text(), /claim_unknown/);
      });
    }
  } finally {
    if (server.exitCode === null) {
      server.kill();
      await once(server, "exit");
    }
  }
});
