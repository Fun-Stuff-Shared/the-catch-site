# Sourced by the checks that read a built page (record_check.sh, entailment_check.sh, referent_check.sh).
# built_page <root> <subject>/<story>: prints the built page's path; exit 2 when it is missing
# or older than the page source or a data module the page imports.
# earlier_page <root> <subject>/<story> <commit> <out.html> <log>: builds the site as it stood
# at <commit> in a throwaway worktree beside <root> (same volume, about 600 MB) and copies the story's page to <out.html> (an empty file
# when that commit had no such page). What a build generates from the state comes from <root>
# (finish.sh names the same three paths), so the two builds differ only by source.

built_page() {
  local root="$1" story="$2" html src module
  html="$root/dist/events/$story/index.html"; src="$root/src/pages/events/$story.astro"
  [ -f "$html" ] || { echo "build first: $html is missing" >&2; return 2; }
  for module in "$src" $(sed -n 's/.*from[[:space:]]*["'"'"']\([^"'"'"']*\/data\/[^"'"'"']*\)["'"'"'].*/\1/p' "$src" 2>/dev/null); do
    case "$module" in /*) ;; *) module="$(dirname "$src")/$module" ;; esac
    [ ! "$module" -nt "$html" ] || { echo "build first: $html is older than $module" >&2; return 2; }
  done
  echo "$html"
}

earlier_page() {
  local root="$1" story="$2" since="$3" out="$4" log="$5" tree made status=0
  tree="$(mktemp -d "$(dirname "$(cd "$root" && pwd -P)")/.catch-earlier.XXXXXX")"
  : > "$out"
  git -C "$root" worktree add -q --detach "$tree/site" "$since" 2> "$log" || { rm -rf "$tree"; echo "cannot check out $since; read $log" >&2; return 2; }
  if [ -f "$tree/site/src/pages/events/$story.astro" ]; then
    ln -s "$root/node_modules" "$tree/site/node_modules"
    mkdir -p "$tree/site/data/sources" "$tree/site/src/data"
    for made in data/state data/sources/news-state; do
      rm -rf "$tree/site/$made"; [ ! -e "$root/$made" ] || ln -s "$root/$made" "$tree/site/$made"
    done
    [ ! -f "$root/src/data/news-records.json" ] || cp "$root/src/data/news-records.json" "$tree/site/src/data/news-records.json"
    if (cd "$tree/site" && node_modules/.bin/astro build && node scripts/merge-cites.mjs) > "$log" 2>&1 && [ -f "$tree/site/dist/events/$story/index.html" ]; then
      cp "$tree/site/dist/events/$story/index.html" "$out"; rm -f "$log"
    else
      echo "the page at $since did not build; read $log" >&2; status=2
    fi
  fi
  git -C "$root" worktree remove --force "$tree/site" 2>/dev/null; rm -rf "$tree"
  return $status
}
