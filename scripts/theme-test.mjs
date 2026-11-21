import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

const script = readFileSync(new URL('../public/assets/theme.js', import.meta.url), 'utf8');
function page({ saved = null, dark = false, blocked = false } = {}) {
  const events = {}, deviceEvents = {}, controlEvents = {};
  const storage = new Map(saved === null ? [] : [['catch-theme', saved]]);
  const system = { matches: dark, addEventListener: (type, fn) => { deviceEvents[type] = fn; } };
  const wrapper = { hidden: true };
  const label = { textContent: '' }, attributes = {};
  const control = { value: '', closest: () => wrapper, querySelector: () => label, setAttribute: (name, value) => { attributes[name] = value; }, addEventListener: (type, fn) => { controlEvents[type] = fn; } };
  const document = { documentElement: { dataset: {} }, getElementById: () => control, addEventListener: (type, fn) => { events[type] = fn; } };
  const localStorage = {
    getItem: key => { if (blocked) throw new Error('Storage blocked'); return storage.get(key) ?? null; },
    setItem: (key, value) => { if (blocked) throw new Error('Storage blocked'); storage.set(key, value); },
    removeItem: key => { if (blocked) throw new Error('Storage blocked'); storage.delete(key); },
  };
  runInNewContext(script, { document, localStorage, window: { matchMedia: () => system, addEventListener: (type, fn) => { events[type] = fn; } } });
  const theme = () => document.documentElement.dataset.theme;
  const bootTheme = theme();
  events.DOMContentLoaded();
  return { theme, bootTheme, control, wrapper, storage, label, attributes,
    click() { controlEvents.click(); },
    choose(value) {
      for (let i = 0; i < 3 && control.value !== value; i++) controlEvents.click();
      assert.equal(control.value, value);
    },
    device(value) { system.matches = value; deviceEvents.change(); },
    remote(key, newValue) { events.storage({ key, newValue }); },
  };
}

test('first paint follows the device; Auto keeps following later device changes', () => {
  const p = page({ dark: true });
  assert.equal(p.bootTheme, 'dark');
  assert.equal(p.control.value, 'system');
  assert.equal(p.wrapper.hidden, false);
  p.device(false);
  assert.equal(p.theme(), 'light');
});
test('the theme button cycles Auto, Light and Dark with a current-state label and next-choice name', () => {
  const p = page({ dark: true });
  for (const [label, next] of [['Auto', 'Light'], ['Light', 'Dark'], ['Dark', 'Auto']]) {
    assert.equal(p.label.textContent, label);
    assert.match(p.attributes['aria-label'], new RegExp(`Color theme: ${label}.*Switch to ${next}`));
    p.click();
  }
  assert.equal(p.control.value, 'system');
  assert.equal(p.theme(), 'dark');
  assert.equal(p.storage.has('catch-theme'), false);
});
test('a saved choice wins before paint, persists, and ignores device changes', () => {
  const p = page({ saved: 'light', dark: true });
  assert.equal(p.bootTheme, 'light');
  p.choose('dark');
  assert.equal(p.storage.get('catch-theme'), 'dark');
  p.device(false);
  assert.equal(p.theme(), 'dark');
  p.choose('system');
  assert.equal(p.storage.has('catch-theme'), false);
  assert.equal(p.theme(), 'light');
  p.device(true);
  assert.equal(p.theme(), 'dark');
});
test('blocked storage still permits selection; invalid saved values follow the device', () => {
  const p = page({ blocked: true, dark: true });
  p.choose('light');
  assert.equal(p.theme(), 'light');
  p.device(true);
  assert.equal(p.theme(), 'light');
  assert.equal(page({ saved: 'invalid', dark: true }).theme(), 'dark');
});
test('another tab updates the control and theme; unrelated storage does not', () => {
  const p = page();
  p.remote('unrelated', 'dark');
  assert.equal(p.theme(), 'light');
  p.remote('catch-theme', 'dark');
  assert.equal(p.theme(), 'dark');
  assert.equal(p.control.value, 'dark');
  p.remote(null, null);
  assert.equal(p.theme(), 'light');
  assert.equal(p.control.value, 'system');
});

const css = readFileSync(new URL('../public/assets/tokens.css', import.meta.url), 'utf8');
const declarations = block => Object.fromEntries([...block.matchAll(/(--[\w-]+):\s*([^;]+);/g)].map(([, name, value]) => [name, value]));
const light = declarations(css.match(/:root \{([^}]+)\}/)[1]);
const darkOverrides = declarations(css.match(/:root\[data-theme="dark"\] \{([^}]+)\}/)[1]);
const dark = { ...light, ...darkOverrides };
function color(tokens, name) {
  const value = tokens[name];
  assert.ok(value, `Missing token ${name}`);
  return value.startsWith('var(') ? color(tokens, value.slice(4, -1)) : value;
}
function luminance(hex) {
  assert.match(hex, /^#[\da-f]{6}$/i);
  const rgb = [1, 3, 5].map(index => parseInt(hex.slice(index, index + 2), 16) / 255).map(value => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4);
  return rgb[0] * .2126 + rgb[1] * .7152 + rgb[2] * .0722;
}
function contrast(a, b) { const [low, high] = [luminance(a), luminance(b)].sort((x, y) => x - y); return (high + .05) / (low + .05); }
for (const [theme, tokens] of [['light', light], ['dark', dark]]) {
  test(`${theme} text, links, status labels, markers and controls meet AA token contrast`, () => {
    for (const background of ['--paper', '--surface', '--blue-tint', '--alert-tint']) {
      for (const foreground of ['--ink', '--slate', '--blue', '--red', '--amber', '--success']) {
        const ratio = contrast(color(tokens, foreground), color(tokens, background));
        assert.ok(ratio >= 4.5, `${foreground} on ${background}: ${ratio.toFixed(2)}:1`);
      }
    }
    for (const [foreground, background] of [['--on-highlight', '--highlight'], ['--band-ink', '--ink-band'], ['--band-muted', '--ink-band'], ['--on-blue', '--blue'], ['--on-red', '--red'], ['--on-amber', '--amber'], ['--on-alert', '--alert-fill'], ['--on-ink', '--ink']]) {
      assert.ok(contrast(color(tokens, foreground), color(tokens, background)) >= 4.5, `${foreground} on ${background}`);
    }
    for (const foreground of ['--control-border', '--chart-main', '--chart-accent', '--chart-secondary', '--chart-neutral']) {
      assert.ok(contrast(color(tokens, foreground), color(tokens, '--paper')) >= 3, `${foreground} boundary`);
    }
  });
}
test('the no-JavaScript dark palette stays in sync with explicit dark mode', () => {
  assert.deepEqual(declarations(css.match(/:root:not\(\[data-theme\]\) \{([^}]+)\}/)[1]), darkOverrides);
});

for (const [theme, tokens] of [['light', light], ['dark', dark]]) {
  test(`${theme} charts keep readable labels and visible marks on a black panel`, () => {
    const panel = { ...tokens, ...declarations(css.match(/\.ink-panel \{([^}]+)\}/)[1]) };
    for (const name of ['--ink', '--slate', '--blue', '--red', '--amber']) {
      assert.ok(contrast(color(panel, name), color(panel, '--paper')) >= 4.5, name);
    }
    for (const name of ['--chart-main', '--chart-accent', '--chart-secondary', '--chart-neutral']) {
      assert.ok(contrast(color(panel, name), color(panel, '--paper')) >= 3, name);
    }
    for (const [foreground, background] of [['--on-blue', '--blue'], ['--on-red', '--red'], ['--on-amber', '--amber']]) {
      assert.ok(contrast(color(panel, foreground), color(panel, background)) >= 4.5, `${foreground} on ${background}`);
    }
    assert.equal(color(tokens, '--canvas'), '#0d0d0d');
  });
}
