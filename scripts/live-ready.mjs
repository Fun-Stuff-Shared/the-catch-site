import { pathToFileURL } from "node:url";

const attribute = (html, pattern) => [...html.matchAll(pattern)].map((match) => match[1]);

// A live page is the published one when it carries the pushed commit's build id. A matching headline proves
// nothing: a story can keep its headline across builds.
export function readiness(html, { build }) {
  const builds = attribute(html, /<meta name="catch-build" content="([^"]*)"/g);
  if (builds.length !== 1) return `page carries ${builds.length} build ids`;
  if (builds[0] !== build) return `build still ${builds[0]}`;
  return null;
}

export async function waitLive(url, expected, { tries = 60, pause = 10_000, fetchPage = (target) => fetch(target, { headers: { "User-Agent": "catch-publish", "Cache-Control": "no-cache" } }) } = {}) {
  let seen = "no response";
  for (let attempt = 0; attempt < tries; attempt++) {
    try {
      const response = await fetchPage(url);
      const body = await response.text();
      seen = response.ok ? readiness(body, expected) : `status ${response.status}`;
      if (seen === null) return body;
    } catch (error) {
      seen = String(error);
    }
    if (attempt + 1 < tries) await new Promise((resolve) => setTimeout(resolve, pause));
  }
  throw new Error(`NOT LIVE after ${tries} tries: ${url}; last seen: ${seen}`);
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  const [url, build, snapshot = null] = process.argv.slice(2);
  try {
    const body = await waitLive(url, { build, snapshot });
    console.log(`live: ${url} at ${build.slice(0, 9)}${snapshot ? ` with v2 snapshot ${snapshot}` : ""} (em dashes: ${body.split("—").length - 1})`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}
