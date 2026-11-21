import test from "node:test";
import assert from "node:assert/strict";
import { writeFile, unlink, readdir, readFile } from "node:fs/promises";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { execFileSync } from "node:child_process";

test("story components render and validate citations without restructuring blocks", async (t) => {
  const fixture = new URL(`../src/pages/cites-test-${process.pid}.ts`, import.meta.url);
  const ledgers = await readdir("checks/claims");
  const ledger = JSON.parse(await readFile(`checks/claims/${ledgers.find((name) => name.endsWith('.json'))}`, "utf8"));
  const claim = ledger.claims.find((entry) => entry.evidence.length);
  const manifests = await Promise.all((await readdir("checks/manifests")).filter((name) => name.endsWith(".json")).map(async (name) => JSON.parse(await readFile(`checks/manifests/${name}`, "utf8"))));
  const record = manifests.flatMap((manifest) => manifest.records ?? []).find((record) => record.id === claim.evidence[0].record);
  assert.ok(record?.date);
  const expectedDate = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(`${record.date}T12:00:00Z`));
  const event = ledger.story.replace("--", "/");
  const endpoint = `http://localhost:4397/cites-test-${process.pid}`;
  await writeFile(fixture, `
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import OutletCheck from '../components/story/OutletCheck.astro';
import KpiStrip from '../components/story/KpiStrip.astro';
export const prerender = false;
export async function GET({ request }) {
  const q = new URL(request.url).searchParams;
  const cites = q.has('empty') ? [] : q.has('omit') ? undefined : q.has('source') ? [{s: ${JSON.stringify(claim.evidence[0].record)}, passage: 'Exact passage'}] : [{c: q.has('invalid') ? 'missing-test-claim' : ${JSON.stringify(claim.id)}}];
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
  const server = spawn(process.execPath, ["node_modules/astro/bin/astro.mjs", "dev", "--port", "4397"], { stdio: "pipe" });
  let logs = "";
  server.stdout.on("data", (data) => { logs += data; });
  server.stderr.on("data", (data) => { logs += data; });
  try {
    for (let i = 0; !logs.includes('localhost:4397') && i < 200; i++) await new Promise((resolve) => setTimeout(resolve, 100));
    assert.ok(logs.includes('localhost:4397'), logs);
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
    await unlink(fixture);
  }
});
