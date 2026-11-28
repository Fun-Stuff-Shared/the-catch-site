/* Render production tables, including div-based decision timelines, at 390px.
   Check citation touch targets in those views too.
   Run after npm run build; install the browser with npx playwright install chromium.
   Kept separate from the Workers build, whose runner has no browser runtime. */
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile, readdir, stat } from 'node:fs/promises';
import { extname, join, relative, resolve, sep } from 'node:path';
import { chromium } from 'playwright';

const root = resolve('dist');
async function tablePages(directory) {
  const pages = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) pages.push(...await tablePages(path));
    else if (entry.name.endsWith('.html')) {
      const html = await readFile(path, 'utf8');
      if (/<table\b|class="decision-timeline"/.test(html)) pages.push(path);
    }
  }
  return pages;
}

// Runs in the page. Check the cell, not just the page: a table can fit while
// text leaks into its neighbour. DecisionTimeline uses grid cells, not <td>.
function overflowingCells() {
  return [...document.querySelectorAll('th, td, .dt-date, .dt-body')]
    .filter(cell => cell.getClientRects().length && cell.scrollWidth > cell.clientWidth + 1)
    .map(cell => ({
      cell: cell.className || cell.tagName,
      text: cell.textContent.trim().slice(0, 100),
      width: cell.clientWidth,
      content: cell.scrollWidth,
    }));
}

function undersizedCitations() {
  return [...document.querySelectorAll('.src-ref a')]
    .filter(anchor => anchor.getClientRects().length)
    .map(anchor => {
      const { width, height } = anchor.getBoundingClientRect();
      return { text: anchor.textContent.trim(), width, height };
    })
    .filter(({ width, height }) => width < 24 || height < 24);
}

const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.json': 'application/json' };
const server = createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    let path = resolve(root, `.${pathname}`);
    if (!path.startsWith(root + sep)) throw new Error('Outside build');
    if ((await stat(path)).isDirectory()) path = join(path, 'index.html');
    response.setHeader('Content-Type', types[extname(path)] ?? 'application/octet-stream');
    response.end(await readFile(path));
  } catch { response.writeHead(404).end(); }
});

let browser;
try {
  const paths = await tablePages(root);
  assert.ok(paths.length, 'No built table pages found; run npm run build first');
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const origin = `http://127.0.0.1:${server.address().port}`;
  browser = await chromium.launch({ headless: true, ...(process.env.CHROMIUM_EXECUTABLE_PATH ? { executablePath: process.env.CHROMIUM_EXECUTABLE_PATH } : {}) });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, hasTouch: true });
  assert.ok(await page.evaluate(() => matchMedia('(pointer: coarse)').matches), 'Touch-target checks need a coarse pointer');

  // Negative control: prove this catches a leaking cell even if the table fits.
  await page.setContent('<table style="width:100px;table-layout:fixed"><tr><td style="white-space:nowrap">UnbreakableContentThatLeaksFarBeyondItsCell</td></tr></table>');
  assert.equal((await page.evaluate(overflowingCells)).length, 1, 'Overflow detector missed its negative control');
  // Include a subpixel miss: 23.84px is not a 24px target, even if taps work.
  await page.setContent('<sup class="src-ref"><a style="display:inline-block;width:23.84px;height:28.5px">1</a><a style="display:inline-block;width:28px;height:23.84px">2</a><a style="display:inline-block;width:24px;height:24px">3</a></sup>');
  assert.deepEqual((await page.evaluate(undersizedCitations)).map(target => target.text), ['1', '2'], 'Touch-target detector missed its negative controls or rejected a 24px target');
  // The framed Catch exposed inline-block breakpoints between adjacent refs.
  // Both reported groups must stay on one line with their preceding word.
  for (const hasTouch of [false, true]) {
    const readingPage = await browser.newPage({ viewport: { width: 390, height: 844 }, hasTouch });
    try {
      for (const width of [390, 1440]) {
        await readingPage.setViewportSize({ width, height: 844 });
        for (const colorScheme of ['light', 'dark']) {
          await readingPage.emulateMedia({ colorScheme });
          for (const [route, numbers] of [
            ['/events/iowa-army-detonation/2026-11-20-army-detonates-lead-azide-in-iowa/', '7,17'],
            ['/events/midterms-2026/2026-11-07-trump-election-3-trillion-market-loss/', '5,1'],
          ]) {
            await readingPage.goto(origin + route);
            await readingPage.evaluate(() => document.fonts.ready);
            const attachment = await readingPage.evaluate(numbers => {
              const runs = [];
              for (const ref of document.querySelectorAll('.the-catch .src-ref')) {
                if (ref.classList.contains('src-ref-more') && runs.length) runs.at(-1).push(ref);
                else runs.push([ref]);
              }
              const run = runs.find(run => run.map(ref => ref.querySelector('a').textContent).join(',') === numbers);
              if (!run) return null;
              const before = run[0].previousSibling;
              const word = before?.nodeType === Node.TEXT_NODE && before.textContent.match(/\S+\s*$/);
              if (!word) return null;
              const range = document.createRange();
              range.setStart(before, word.index);
              range.setEnd(before, before.textContent.trimEnd().length);
              const wordBox = [...range.getClientRects()].at(-1);
              const refs = run.map(ref => ref.querySelector('a').getBoundingClientRect());
              return {
                together: refs.every(ref => Math.abs(ref.top - refs[0].top) < 1),
                withWord: Math.abs((refs[0].top + refs[0].bottom - wordBox.top - wordBox.bottom) / 2) < wordBox.height * .75,
              };
            }, numbers);
            assert.deepEqual(attachment, { together: true, withWord: true }, `${route} citations ${numbers}: ${width}px ${colorScheme}, ${hasTouch ? 'coarse' : 'fine'} pointer`);
          }
        }
      }
    } finally { await readingPage.close(); }
  }
  console.log('citation attachment gate passed: reported groups stay with their word at 390/1440px in both themes and pointer modes');
  const failures = [];
  let views = 0;
  for (const colorScheme of ['light', 'dark']) {
    await page.emulateMedia({ colorScheme });
    for (const file of paths) {
      const route = '/' + relative(root, file).split(sep).join('/').replace(/index\.html$/, '');
      for (const mode of ['', '?mode=facts', '?mode=work']) {
        const response = await page.goto(origin + route + mode);
        assert.equal(response.status(), 200, `${route}${mode} must load`);
        await page.evaluate(async () => {
          document.querySelectorAll('details').forEach(details => { details.open = true; });
          await document.fonts.ready;
        });
        const cells = await page.evaluate(overflowingCells);
        const targets = await page.evaluate(undersizedCitations);
        if (cells.length || targets.length) failures.push({ route: route + mode, colorScheme, cells, targets });
        views++;
      }
    }
  }
  assert.deepEqual(failures, [], `390px table overflow or citation targets below 24px:\n${JSON.stringify(failures, null, 2)}`);
  // Preview-only historical options must not inherit the final story treatment.
  // Check rendered styles: source-only checks miss cascade/bundle-order regressions.
  if (await stat(join(root, 'design/story-treatments/index.html')).catch(() => null)) {
    for (const colorScheme of ['light', 'dark']) {
      await page.emulateMedia({ colorScheme });
      await page.goto(origin + '/design/story-treatments/');
      const options = await page.evaluate(() => [...document.querySelectorAll('#catch-options .the-catch')].map(panel => {
        const style = getComputedStyle(panel);
        return {
          borders: ['Top', 'Right', 'Bottom', 'Left'].map(side => style[`border${side}Width`]),
          label: getComputedStyle(panel.querySelector('.tt-label')).backgroundColor,
        };
      }));
      assert.deepEqual(options.map(option => option.borders), [
        ['0px', '0px', '0px', '0px'], ['1px', '0px', '1px', '0px'],
        ['1px', '1px', '1px', '1px'], ['0px', '0px', '0px', '0px'],
      ], `${colorScheme} comparison frames must stay distinct from production`);
      assert.equal(options[0].label, 'rgba(0, 0, 0, 0)', `${colorScheme} tinted option has no label band`);
      assert.ok(options.every(option => option.label !== 'rgb(242, 216, 59)'), `${colorScheme} historical labels must not inherit the selected yellow band`);
    }
    console.log('comparison isolation gate passed: four distinct historical Catch options in both themes');
  }
  console.log(`design layout gate passed: ${views} table views and their citation touch targets at 390px, both system themes and all reading modes; negative controls detected`);
} finally {
  await browser?.close();
  server.closeAllConnections();
  await new Promise(resolve => server.close(resolve));
}
