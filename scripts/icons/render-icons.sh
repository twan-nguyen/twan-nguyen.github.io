#!/usr/bin/env bash
# Renders the raster icons from their SVG sources. Needs rsvg-convert and ImageMagick
# (brew install librsvg imagemagick). Run from anywhere:
#   bash scripts/icons/render-icons.sh
set -euo pipefail

here="$(cd "$(dirname "$0")" && pwd)"
app="$(cd "$here/../../src/app" && pwd)"
tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT

for size in 16 32 48; do
  rsvg-convert -w "$size" -h "$size" "$app/icon.svg" -o "$tmp/icon-$size.png"
done
magick "$tmp/icon-16.png" "$tmp/icon-32.png" "$tmp/icon-48.png" "$app/favicon.ico"
echo "wrote src/app/favicon.ico"

rsvg-convert -w 180 -h 180 "$here/apple-icon.svg" -o "$app/apple-icon.png"
echo "wrote src/app/apple-icon.png"
