import assert from "node:assert/strict";
import { execFileSync, spawn } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { hostname, tmpdir, userInfo } from "node:os";
import { join } from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import { test } from "node:test";

const source = new URL("../skills/catch-record/", import.meta.url);
const story = "fixture--claim";

function fixture(t) {
  const root = mkdtempSync(join(tmpdir(), "catch-lock-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  for (const dir of ["scripts", "assets", "tmp", "GitHub/codex-chatgpt-web", "checks/claims", "checks/manifests", "checks/records", ".bun/bin"])
    mkdirSync(join(root, dir), { recursive: true });
  for (const name of ["claims.sh", "ask.sh"])
    writeFileSync(join(root, "scripts", name), readFileSync(new URL(`scripts/${name}`, source), "utf8").replaceAll("/Volumes/4", root));
  copyFileSync(new URL("scripts/claims.py", source), join(root, "scripts/claims.py"));
  copyFileSync(new URL("scripts/arith.py", source), join(root, "scripts/arith.py"));
  copyFileSync(new URL("assets/claims-prompt.txt", source), join(root, "assets/claims-prompt.txt"));
  writeFileSync(join(root, `checks/claims/${story}.json`), JSON.stringify({ story, claims: [{
    id: "vote", says: "1 and 2, a total of 4.", status: "fact", evidence: [{ record: "minutes", passage: "1 and 2, a total of 4." }],
  }] }));
  writeFileSync(join(root, `checks/manifests/${story}.json`), JSON.stringify({ records: [{ id: "minutes", text_path: "checks/records/minutes.txt" }] }));
  writeFileSync(join(root, "checks/records/minutes.txt"), "1 and 2, a total of 4.");
  execFileSync("git", ["init", "-q", "-b", "feat/ask", join(root, "GitHub/codex-chatgpt-web")], {
    cwd: root, env: { ...process.env, HOME: root, GIT_CONFIG_GLOBAL: join(root, ".gitconfig") },
  });
  writeFileSync(join(root, ".bun/bin/bun"), String.raw`#!/bin/sh
if [ "$4" = --wait ]; then
  touch "$HOME/started"
  while [ ! -f "$HOME/release" ]; do sleep 0.05; done
  printf '%s\n' '{"ok":true,"text":"CHECKED: 1 claims\nCLAIMS DO NOT HOLD"}'
else
  printf '%s\n' '{"ok":true,"run":"fixture"}'
fi
`, { mode: 0o755 });
  return root;
}

function claims(root, round, seconds) {
  let stdout = "", stderr = "";
  const child = spawn("zsh", ["-f", "scripts/claims.sh", story, round], {
    cwd: root, env: { ...process.env, HOME: root, GIT_CONFIG_GLOBAL: join(root, ".gitconfig"), CATCH_ASK_LOCK_TIMEOUT: seconds }, detached: true,
  });
  const timer = setTimeout(() => { if (child.pid) process.kill(-child.pid, "SIGKILL"); }, 6000);
  const done = new Promise((resolve, reject) => {
    child.on("error", reject);
    child.on("close", (code, signal) => {
      clearTimeout(timer);
      resolve({ code, signal, stderr, stdout });
    });
  });
  child.stdout.setEncoding("utf8").on("data", (chunk) => { stdout += chunk; });
  child.stderr.setEncoding("utf8").on("data", (chunk) => { stderr += chunk; });
  return { done, stderr: () => stderr };
}

async function until(ready) {
  const deadline = performance.now() + 3000;
  while (!ready()) {
    assert.ok(performance.now() < deadline, "fixture did not reach its synchronization point");
    await delay(25);
  }
}

test("claims reports an arithmetic exception and still calls the model", async (t) => {
  const root = fixture(t);
  const path = join(root, `checks/claims/${story}.json`);
  const ledger = JSON.parse(readFileSync(path, "utf8"));
  ledger.claims[0].says = `1 of 3, or 33.${"0".repeat(40)}%.`;
  writeFileSync(path, JSON.stringify(ledger));
  writeFileSync(join(root, "release"), "");
  const result = await claims(root, "1", "5").done;
  assert.equal(result.code, 0, JSON.stringify(result));
  assert.match(result.stderr, /^arith pre-check failed: InvalidOperation: .+$/m);
  assert.equal(result.stderr.includes("Traceback"), false);
  assert.match(result.stdout, /CLAIMS DO NOT HOLD/);
  assert.ok(existsSync(join(root, "started")));
  assert.ok(existsSync(join(root, `checks/records/${story}-claims-r1.md`)));
});

test("claims guards an uncaught nonzero arithmetic exit and still calls the model", async (t) => {
  const root = fixture(t);
  writeFileSync(join(root, "scripts/arith.py"), "raise SystemExit(7)\n");
  writeFileSync(join(root, "release"), "");
  const result = await claims(root, "1", "5").done;
  assert.equal(result.code, 0, JSON.stringify(result));
  assert.match(result.stderr, /^arith pre-check failed: command exited with status 7$/m);
  assert.match(result.stdout, /CLAIMS DO NOT HOLD/);
  assert.ok(existsSync(join(root, "started")));
});

test("claims waits for the shared ask lock, names its holder on timeout, and retries when released", async (t) => {
  const root = fixture(t);
  const holder = claims(root, "1", "5");
  let waiter;
  try {
    await until(() => existsSync(join(root, "started")));
    const started = performance.now();
    const timedOut = await claims(root, "2", "1").done;
    assert.equal(timedOut.code, 1, JSON.stringify(timedOut));
    assert.ok(performance.now() - started >= 900, "claims did not wait before timing out");
    assert.match(timedOut.stderr, /timed out after 1s waiting for .*chatgpt-web-ask\.lock/);
    assert.match(timedOut.stderr, /pid=\d+/);
    assert.ok(timedOut.stderr.includes(`host=${hostname()} user=${userInfo().username} command=ask.sh`));
    assert.ok(existsSync(join(root, "tmp/chatgpt-web-ask.lock")));
    assert.ok(!existsSync(join(root, `checks/records/${story}-claims-r2.md`)));

    waiter = claims(root, "3", "5");
    await until(() => waiter.stderr().includes("waiting for lock"));
    assert.ok(!existsSync(join(root, `checks/records/${story}-claims-r3.md`)));
    writeFileSync(join(root, "release"), "");
    for (const job of [holder, waiter]) {
      const result = await job.done;
      assert.equal(result.code, 0, JSON.stringify(result));
      assert.match(result.stdout, /MISMATCH claim vote:/);
      assert.match(result.stdout, /CLAIMS DO NOT HOLD/);
    }
    assert.ok(!existsSync(join(root, "tmp/chatgpt-web-ask.lock")));
  } finally {
    writeFileSync(join(root, "release"), "");
    await Promise.all([holder.done, waiter?.done]);
  }
});
