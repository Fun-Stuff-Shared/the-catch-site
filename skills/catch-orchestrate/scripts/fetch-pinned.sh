#!/usr/bin/env zsh
# Fetches the snapshot data/v2/CURRENT pins into this worktree.
set -euo pipefail
source ${0:A:h}/store-env.sh
export CATCH_FULL_SNAPSHOT=1
node scripts/pull-v2.mjs
