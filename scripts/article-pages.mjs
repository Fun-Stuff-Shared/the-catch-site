// Explicit registrations keep new article routes independent of the event URL shape.
// Fixture registrations live with their data, never in the discovery data glob.
import { existsSync, readdirSync, readFileSync, statSync, realpathSync } from 'node:fs';
import { join, relative, resolve, sep } from 'node:path';

export function filesUnder(root) {
  if (!existsSync(root)) return [];
  if (statSync(root).isFile()) return [root];
  return readdirSync(root).sort().flatMap(name => filesUnder(join(root, name)));
}

export function projectFile(root, path, prefix) {
  if (typeof path !== 'string' || !path.startsWith(prefix) || path.includes('\\') || path.split('/').includes('..')) throw new Error(`article_path_invalid:${path}`);
  const file = resolve(root, path);
  const inside = relative(realpathSync(root), realpathSync(file));
  if (inside.startsWith(`..${sep}`) || inside === '..' || inside.startsWith(sep)) throw new Error(`article_path_outside_project:${path}`);
  return file;
}

export function articleRegistrations(root = process.cwd()) {
  const live = filesUnder(join(root, 'checks/article-pages')).filter(file => file.endsWith('.json'));
  const fixtures = filesUnder(join(root, 'src/fixtures')).filter(file => file.endsWith('/article.json'));
  const routes = new Set();
  return [...live.map(file => [file, false]), ...fixtures.map(file => [file, true])].map(([file, fixture]) => {
    const value = JSON.parse(readFileSync(file, 'utf8'));
    const { route } = value;
    if (typeof route !== 'string' || !/^\/(?:[a-z0-9]+(?:-[a-z0-9]+)*\/)+$/.test(route) || route.startsWith('/events/')) throw new Error(`article_route_invalid:${route}`);
    if (fixture !== route.startsWith('/design/')) throw new Error(`article_fixture_route_invalid:${route}`);
    if (routes.has(route)) throw new Error(`article_route_duplicate:${route}`);
    routes.add(route);
    const prefix = fixture ? relative(root, file).replace(/article\.json$/, '') : 'checks/manifests/';
    const manifestFile = projectFile(root, value.manifest, prefix);
    const manifest = JSON.parse(readFileSync(manifestFile, 'utf8'));
    if (manifest.story !== route) throw new Error(`article_manifest_route_mismatch:${route}`);
    if (!Array.isArray(manifest.records) || !Array.isArray(manifest.sub_events) || manifest.records.some(r => !r || typeof r !== 'object')) throw new Error(`article_manifest_invalid:${route}`);
    const sourceFile = projectFile(root, value.source, 'src/');
    if (!sourceFile.endsWith('.astro')) throw new Error(`article_source_invalid:${route}`);
    const claimsFile = value.claims ? projectFile(root, value.claims, fixture ? prefix : 'checks/claims/') : null;
    const claims = claimsFile ? JSON.parse(readFileSync(claimsFile, 'utf8')).claims : null;
    if (claims !== null && !Array.isArray(claims)) throw new Error(`article_claims_invalid:${route}`);
    if (value.sentinels && (!Array.isArray(value.sentinels) || value.sentinels.some(s => typeof s !== 'string' || s.length < 12))) throw new Error(`article_sentinels_invalid:${route}`);
    return { ...value, route, fixture, manifest, manifestFile, sourceFile, claims, fixtureRoot: fixture ? prefix : null };
  });
}

export function articleOutput(dist, route) { return join(dist, route, 'index.html'); }

// Preserve the legacy scripts' event traversal (including index pages). Only registered
// non-event articles join it; unrelated official/record HTML is not transformed.
export function readingPages({ root = process.cwd(), dist = join(root, 'dist'), preview = process.env.CATCH_DESIGN_PREVIEW === '1', input } = {}) {
  if (input && !existsSync(input)) throw new Error(`article_input_missing:${input}`);
  if (input) return filesUnder(input).filter(file => file.endsWith('/index.html')).map(file => {
    const parts = relative(input, file).split(sep);
    const path = parts.length > 2 ? join(root, 'checks/claims', `${parts[0]}--${parts[1]}.json`) : null;
    return { file, claims: path && existsSync(path) ? JSON.parse(readFileSync(path, 'utf8')).claims : null };
  });
  const pages = readingPages({ root, input: join(dist, 'events') });
  for (const page of articleRegistrations(root).filter(page => !page.fixture || preview)) {
    const file = articleOutput(dist, page.route);
    if (!existsSync(file)) throw new Error(`article_output_missing:${page.route}`);
    pages.push({ ...page, file });
  }
  return pages;
}

export function claimText(claims, route) {
  if (!claims) return null;
  return id => {
    const found = claims.find(claim => claim.id === id);
    if (!found) throw new Error(`claim_unknown:${route}:${id}`);
    return found.says;
  };
}
