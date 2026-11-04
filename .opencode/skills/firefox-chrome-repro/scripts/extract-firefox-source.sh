#!/usr/bin/env bash
# Unpack the CSS/DOM/JS that the installed Firefox actually ships.
# Works for Nix-installed Firefox (store path resolved from the `firefox` binary).
# Usage: extract-firefox-source.sh [outdir]   (default /tmp/opencode/ff-src)
set -euo pipefail

OUTDIR="${1:-/tmp/opencode/ff-src}"

BIN="$(readlink -f "$(command -v firefox)")"
PREFIX="$(dirname "$(dirname "$BIN")")"

# Nix layout: <store>/bin/firefox + <store>/lib/firefox/{omni.ja,browser/omni.ja}.
# Also accept a dist-style layout where omni.ja sits next to the binary.
ROOT=""
for cand in "$PREFIX/lib/firefox" "$(dirname "$BIN")" "$PREFIX"; do
	if [ -f "$cand/omni.ja" ] && [ -f "$cand/browser/omni.ja" ]; then
		ROOT="$cand"
		break
	fi
done
[ -n "$ROOT" ] || {
	echo "could not locate omni.ja near $BIN" >&2
	exit 1
}

VERSION="$("$BIN" --version 2>/dev/null | sed 's/.* //' || echo unknown)"
echo "[extract] firefox $VERSION at $ROOT"

mkdir -p "$OUTDIR/toolkit" "$OUTDIR/browser"

# toolkit chrome: global/, mozapps/extensions/ (about:addons lives here), elements/
unzip -o -q "$ROOT/omni.ja" \
	'chrome/toolkit/content/global/*' \
	'chrome/toolkit/content/mozapps/*' \
	'chrome/toolkit/skin/*' \
	-d "$OUTDIR/toolkit" 2>/dev/null || true

# browser chrome: content (JS/DOM) + skin (CSS)
unzip -o -q "$ROOT/browser/omni.ja" \
	'chrome/browser/content/browser/*' \
	'chrome/browser/skin/*' \
	-d "$OUTDIR/browser" 2>/dev/null || true

echo "[extract] toolkit: $(find "$OUTDIR/toolkit" -type f | wc -l) files"
echo "[extract] browser: $(find "$OUTDIR/browser" -type f | wc -l) files"
echo
echo "Start here:"
echo "  about:addons layout  $OUTDIR/toolkit/chrome/toolkit/content/mozapps/extensions/aboutaddons.css"
echo "  page-nav component   $OUTDIR/toolkit/chrome/toolkit/content/global/elements/moz-page-nav.css"
echo "  downloads panel/JS   $OUTDIR/browser/chrome/browser/content/browser/downloads/"
echo "  browser.xhtml        $OUTDIR/browser/chrome/browser/content/browser/browser.xhtml"
