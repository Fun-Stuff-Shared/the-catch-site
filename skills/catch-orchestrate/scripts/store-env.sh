# Sourced: points the v2 fetch at the snapshot store, reading its read token from setec.
export SETEC_SERVER=https://secrets.tailb77c8a.ts.net PATH=$HOME/.local/bin:$PATH
export SAI_SNAPSHOTS_URL=https://212dd811a7eecb00d4e98febf085486e.r2.cloudflarestorage.com/catch-site-snapshots
export SAI_SNAPSHOTS_ACCESS_KEY=$(setec get agents/catch-site/R2_READ_ACCESS_KEY)
export SAI_SNAPSHOTS_SECRET_KEY=$(setec get agents/catch-site/R2_READ_SECRET_KEY)
