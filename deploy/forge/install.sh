#!/bin/sh
# Run as root inside the sai container from a checkout of this repo. Installs the refresh script and units and
# leaves the timer off: the service pushes to main, and a push to main deploys.
set -eu
here=$(dirname "$0")
install -d -o sai -g sai /srv/sai/catch-site
install -o sai -g sai -m 0755 "$here/../../scripts/refresh-v2-pin.py" /srv/sai/catch-site/refresh-v2-pin.py
install -m 0644 "$here/catch-site-refresh.service" "$here/catch-site-refresh.timer" /etc/systemd/system/
systemctl daemon-reload
for need in /etc/sai/catch-site-refresh.env /srv/sai/catch-site/.ssh/id_ed25519; do
  [ -e "$need" ] || echo "still needed: $need" >&2
done
echo "installed; to start deploying three times a day: systemctl enable --now catch-site-refresh.timer" >&2
