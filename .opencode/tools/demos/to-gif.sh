#!/usr/bin/env bash
# Convert a raw recording (.mp4) into an optimized, looping GIF.
# Two-stage: ffmpeg palettegen+paletteuse for colour fidelity, then gifsicle
# to squeeze the size. Usage: to-gif.sh <name> [fps] [max-width]
set -euo pipefail

NAME="${1:?feature name}"
FPS="${2:-15}"
WIDTH="${3:-960}"

OUT_DIR="$(cd "$(dirname "$0")/.." && pwd)/../../.documentation/demos"
RAW="$OUT_DIR/raw/${NAME}.mp4"
GIF="$OUT_DIR/${NAME}.gif"
PALETTE="$OUT_DIR/raw/${NAME}-palette.png"

[[ -f "$RAW" ]] || {
	echo "[gif] missing raw recording: $RAW" >&2
	exit 1
}

# 1) palette
ffmpeg -hide_banner -loglevel error -y \
	-i "$RAW" -vf "fps=${FPS},scale=${WIDTH}:-1:flags=lanczos,palettegen=stats_mode=diff" \
	"$PALETTE"

# 2) apply palette
ffmpeg -hide_banner -loglevel error -y \
	-i "$RAW" -i "$PALETTE" \
	-lavfi "fps=${FPS},scale=${WIDTH}:-1:flags=lanczos [x]; [x][1:v] paletteuse=dither=bayer:bayer_scale=4" \
	"$GIF"

# 3) optimize (lossy, loop forever)
if command -v gifsicle >/dev/null 2>&1; then
	gifsicle -O3 --lossy=80 --loopcount=forever -o "$GIF" "$GIF"
fi

# 4) report
SIZE=$(du -h "$GIF" | cut -f1)
echo "[gif] $GIF  (${SIZE}, ${FPS}fps, ${WIDTH}px, loop)"
