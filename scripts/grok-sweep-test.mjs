import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { delimiter, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const script = fileURLToPath(new URL('../skills/catch-record/scripts/grok_sweep.sh', import.meta.url));
const prefix = 'A research lead with a source URL.\n'.repeat(1_500) + 'The last';
const continuation = ' lead links to https://example.com/source and quotes “the full record.”';

function sweep(t, exhausted = false) {
    const cwd = mkdtempSync(join(tmpdir(), 'catch-grok-sweep-'));
    t.after(() => rmSync(cwd, { recursive: true, force: true }));
    writeFileSync(join(cwd, 'grok'), `#!/usr/bin/env node
const chunks = [${JSON.stringify(prefix)}];
const completed = process.env.GROK_LENGTH_SALVAGE === '1' && ${!exhausted};
if (completed) chunks.push(${JSON.stringify(continuation)});
console.error('Grok diagnostic');
if (process.argv.at(-1) === 'plain') {
    console.log(chunks.join(''));
} else if (process.argv.at(-1) === 'streaming-json') {
    const emit = (event) => console.log(JSON.stringify(event));
    emit({ type: 'text', data: chunks[0] });
    emit({ type: 'usage', stopReason: 'max_tokens' });
    if (completed) emit({ type: 'text', data: chunks[1] });
    emit({ type: 'end', stopReason: completed ? 'end_turn' : 'max_tokens' });
} else {
    process.exitCode = 2;
}
`, { mode: 0o755 });
    const result = spawnSync('zsh', [script, 'subject--story', 'A public hearing took place.'], {
        cwd,
        encoding: 'utf8',
        env: { ...process.env, PATH: [cwd, process.env.PATH].join(delimiter), GROK_LENGTH_SALVAGE: '' },
    });
    assert.ifError(result.error);
    const outputPath = join(cwd, 'checks/records/subject--story-grok.md');
    return { ...result, output: readFileSync(outputPath, 'utf8'), log: readFileSync(outputPath + '.err', 'utf8') };
}

test('a sweep that hits the Grok length limit writes its continuation to the same Markdown file', (t) => {
    const result = sweep(t);
    assert.equal(result.status, 0, result.stderr);
    assert.ok(result.output.endsWith(continuation + '\n'), 'the final lead is missing from the sweep file');
    assert.equal(result.output, prefix + continuation + '\n');
    assert.match(result.stdout, /grok sweep -> checks\/records\/subject--story-grok\.md/);
    assert.equal(result.log, 'Grok diagnostic\n');
});

test('a sweep still capped after continuation keeps the partial file but reports failure', (t) => {
    const result = sweep(t, true);
    assert.notEqual(result.status, 0);
    assert.doesNotMatch(result.stdout, /grok sweep ->/);
    assert.equal(result.output, prefix);
    assert.match(result.log, /max_tokens/);
});
