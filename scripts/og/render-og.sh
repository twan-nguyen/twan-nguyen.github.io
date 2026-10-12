#!/usr/bin/env bash
# Renders the Open Graph cards (public/og-en.png, public/og-vi.png) from og-template.html
# with headless Chrome. Needs network access for Google Fonts. Run from anywhere:
#   bash scripts/og/render-og.sh
set -euo pipefail

here="$(cd "$(dirname "$0")" && pwd)"
root="$(cd "$here/../.." && pwd)"
chrome="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
profile="$(mktemp -d)"
trap 'rm -rf "$profile"' EXIT

for locale in en vi; do
  "$chrome" --headless=new --disable-gpu --hide-scrollbars --no-first-run \
    --user-data-dir="$profile" --force-device-scale-factor=1 \
    --window-size=1200,630 --virtual-time-budget=8000 \
    --screenshot="$root/public/og-$locale.png" \
    "file://$here/og-template.html?locale=$locale" >/dev/null 2>&1
  echo "wrote public/og-$locale.png"
done
