#!/usr/bin/env zsh
# Lists story candidates from the pinned snapshot, fetching the full snapshot when only the site artifact is here.
# usage: zsh skills/catch-orchestrate/scripts/candidates.sh [--days 7] [--limit 40] [words...]
set -euo pipefail
source ${0:A:h}/store-env.sh
node scripts/v2-candidates.mjs "$@"
