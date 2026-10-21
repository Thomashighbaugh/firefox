#!/usr/bin/env bash
# demo-record.sh — one command records + converts every feature GIF.
#
#   ./demo-record.sh            # record ALL features
#   ./demo-record.sh <name>…    # record only the named features
#   ./demo-record.sh --list     # list feature names
#
# For each feature it focuses Firefox, runs a scripted xdotool interaction,
# records a windowed region with ffmpeg (x11grab), and converts to an
# optimized looping GIF in .documentation/demos/.
#
# Requirements (all present on this machine): ffmpeg, xdotool, gifsicle.
# Firefox must be running and visible on the active X11 display.

set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
DEMO_OUT="$(cd "$HERE/../.." && pwd)/.documentation/demos"
mkdir -p "$DEMO_OUT/raw"

DISP="${DISPLAY:-:1}"
FPS="${FPS:-15}"
WIDTH="${WIDTH:-960}"

# ---- catalog -------------------------------------------------------------
# name | duration_s | interaction function (defined below)
FEATURES=(
	vertical_tabs
	second_sidebar
	home_page
	library_page
	logins_page
	quicktabs
	quicktabs_search
	tab_groups
	restart_button
	animations
)

# ---- helpers --------------------------------------------------------------

# Focus the Firefox window; echo its geometry as "WxH+X+Y".
focus_firefox() {
	local wid
	wid="$(xdotool search --onlyvisible --class '[Ff]irefox' | head -1)"
	[[ -n "$wid" ]] || {
		echo "[demo] no Firefox window found on $DISP" >&2
		return 1
	}
	xdotool windowactivate --sync "$wid"
	xdotool windowraise "$wid" 2>/dev/null || true
	sleep 0.4
	# geometry
	eval "$(xdotool getwindowgeometry --shell "$wid")" # sets X Y WIDTH HEIGHT
	echo "${WIDTH}x${HEIGHT}+${X}+${Y}"
}

# record a region for N seconds while $1 runs in the foreground.
# usage: record_while <name> <dur> <geom> <fn>
record_while() {
	local name="$1" dur="$2" geom="$3" fn="$4"
	local raw="$DEMO_OUT/raw/${name}.mp4"
	local W H X Y
	if [[ "$geom" =~ ^([0-9]+)x([0-9]+)\+([0-9]+)\+([0-9]+)$ ]]; then
		W="${BASH_REMATCH[1]}"
		H="${BASH_REMATCH[2]}"
		X="${BASH_REMATCH[3]}"
		Y="${BASH_REMATCH[4]}"
	else
		W=1920
		H=1080
		X=0
		Y=0
	fi

	echo "[demo] ▶ $name  (${dur}s, ${W}x${H})"
	ffmpeg -hide_banner -loglevel error -y \
		-f x11grab -video_size "${W}x${H}" -framerate 30 \
		-i "${DISP}+${X},${Y}" -t "$dur" \
		-c:v libx264 -pix_fmt yuv420p -preset veryfast -crf 20 "$raw" &
	local pid=$!
	sleep 0.6     # let ffmpeg start before interacting
	"$fn" || true # perform the interaction
	wait "$pid" || true
	"$HERE/to-gif.sh" "$name" "$FPS" "$WIDTH"
}

key() {
	xdotool key --delay 60 "$@"
	sleep "${KSLEEP:-0.5}"
}
type_text() { xdotool type --delay 40 "$*"; }

# Click the second-sidebar toggle widget. The sidebar/web-panel shortcut is
# user-configured (often unset), so we trigger the built-in sidebar toggle key.
click_sidebar_widget() {
	key ctrl+b 2>/dev/null || true
}

# ---- per-feature interactions (hands-off xdotool) -------------------------
# Bindings verified against the live scripts. Open-then-close gives a clean loop.

act_vertical_tabs() {
	key ctrl+b
	sleep 1
	key ctrl+b
}
act_second_sidebar() {
	click_sidebar_widget
	sleep 1.2
	click_sidebar_widget
}
act_home_page() {
	key ctrl+t
	sleep 1.6
	key ctrl+w
}
act_library_page() {
	key ctrl+shift+h
	sleep 1.6
	key ctrl+w
}
act_logins_page() {
	key ctrl+t
	type_text "about:logins"
	key Return
	sleep 1.8
	key ctrl+w
}
act_quicktabs() {
	key ctrl+shift+9
	sleep 1.4
	key F4
}
act_quicktabs_search() {
	key Escape
	sleep 0.3
	key ctrl+alt+s
	sleep 1.4
	key F4
}
act_tab_groups() {
	key ctrl+shift+g
	sleep 1.2
	key ctrl+shift+g
}
act_restart_button() { sleep 0.8; }
act_animations() {
	key ctrl+t
	sleep 0.6
	key ctrl+w
	sleep 0.4
}

# ---- driver ---------------------------------------------------------------

if [[ "${1:-}" == "--list" ]]; then
	printf '%s\n' "${FEATURES[@]}"
	exit 0
fi

TARGETS=("$@")
[[ ${#TARGETS[@]} -gt 0 ]] || TARGETS=("${FEATURES[@]}")

command -v ffmpeg >/dev/null || {
	echo "ffmpeg required" >&2
	exit 1
}
command -v xdotool >/dev/null || {
	echo "xdotool required" >&2
	exit 1
}

GEOM="$(focus_firefox)" || exit 1
echo "[demo] recording region: $GEOM on $DISP"

DUR_DEFAULT=6
for name in "${TARGETS[@]}"; do
	fn="act_${name}"
	declare -F "$fn" >/dev/null || {
		echo "[demo] ⚠ no interaction for '$name', skipping"
		continue
	}
	record_while "$name" "${DUR[$name]:-$DUR_DEFAULT}" "$GEOM" "$fn"
done

echo "[demo] done. GIFs in $DEMO_OUT"
