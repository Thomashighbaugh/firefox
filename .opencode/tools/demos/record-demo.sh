#!/usr/bin/env bash
# Record one feature demo to a raw .mp4, for later conversion to GIF.
# Usage: record-demo.sh <name> <duration-sec> [geometry WxH+X+Y]
# The recorder runs `duration` seconds of x11grab, then stops. A window name is
# optional; when omitted we record the full primary display.
set -euo pipefail

NAME="${1:?feature name (used for output filename)}"
DUR="${2:-8}"
GEOM="${3:-}"

OUT_DIR="$(cd "$(dirname "$0")/.." && pwd)/../../.documentation/demos"
RAW_DIR="$OUT_DIR/raw"
mkdir -p "$RAW_DIR"
RAW="$RAW_DIR/${NAME}.mp4"

# DISPLAY + geometry
DISP="${DISPLAY:-:1}"
read -r SW SH < <(xdotool getdisplaygeometry)

VF=()
if [[ -n "$GEOM" ]]; then
	# WxH+X+Y  ->  crop + offset via -video_size and -draw_mouse
	if [[ "$GEOM" =~ ^([0-9]+)x([0-9]+)\+([0-9]+)\+([0-9]+)$ ]]; then
		W="${BASH_REMATCH[1]}"
		H="${BASH_REMATCH[2]}"
		X="${BASH_REMATCH[3]}"
		Y="${BASH_REMATCH[4]}"
	else
		W="$SW"
		H="$SH"
		X=0
		Y=0
	fi
else
	W="$SW"
	H="$SH"
	X=0
	Y=0
fi

echo "[record] $NAME  ${DUR}s  ${W}x${H}+${X}+${Y}  on $DISP -> $RAW"
ffmpeg -hide_banner -loglevel error -y \
	-f x11grab -video_size "${W}x${H}" -framerate 30 \
	-i "${DISP}+${X},${Y}" \
	-t "$DUR" \
	-c:v libx264 -pix_fmt yuv420p -preset veryfast -crf 20 \
	"$RAW"
echo "[record] done -> $RAW"
