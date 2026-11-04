#!/usr/bin/env bash
# Repro harness: run the theme in a real Firefox window under Xvfb + a WM.
# Usage: repro.sh {start [url]|stop|shot <png>|sync|probe|status}
set -euo pipefail

REPO="${REPO:-/etc/nixos/external/firefox}"
PROFILE="${PROFILE:-/tmp/opencode/ff-repro}"
SRC_PROFILE="${SRC_PROFILE:-$HOME/.mozilla/firefox/tlh}"
DISP="${DISP:-:99}"
GEOM="${GEOM:-1920x1080}"
OUT="${OUT:-/tmp/opencode}"
PROBE_OUT="$OUT/probe.txt"

log() { printf '[repro] %s\n' "$*"; }

ensure_x() {
	pgrep -f "Xvfb $DISP" >/dev/null 2>&1 || {
		log "starting Xvfb $DISP ($GEOM)"
		setsid Xvfb "$DISP" -screen 0 "${GEOM}x24" -nolisten tcp >/dev/null 2>&1 &
		sleep 1
	}
	pgrep -x awesome >/dev/null 2>&1 || {
		log "starting awesome"
		DISPLAY="$DISP" setsid awesome >/dev/null 2>&1 &
		sleep 1
	}
}

ensure_userjs() {
	local uj="$PROFILE/user.js"
	if [ -L "$uj" ] || { [ -f "$uj" ] && [ ! -w "$uj" ]; }; then
		local tmp
		tmp=$(mktemp)
		cat "$uj" >"$tmp" 2>/dev/null || true
		rm -f "$uj"
		cp "$tmp" "$uj"
		rm -f "$tmp"
	fi
	touch "$uj"
	grep -q 'devtools.console.stdout.chrome' "$uj" 2>/dev/null ||
		printf '%s\n' 'user_pref("devtools.console.stdout.chrome", true);' >>"$uj"
}

prepare() {
	mkdir -p "$OUT"
	if [ ! -d "$PROFILE" ]; then
		log "cloning $SRC_PROFILE -> $PROFILE"
		cp -a "$SRC_PROFILE" "$PROFILE"
		chmod -R u+w "$PROFILE"
	fi
	# A primary-password modal blocks chrome timers until dismissed; drop the encrypted store.
	rm -f "$PROFILE/key4.db" "$PROFILE/logins.json"
	# Otherwise a copied profile restores the previous session instead of the URL we asked for.
	rm -rf "$PROFILE/sessionstore-backups" "$PROFILE/sessionstore.jsonlz4"
	# chrome/ must be a real directory so probes never land in the repo.
	if [ -L "$PROFILE/chrome" ] || [ ! -d "$PROFILE/chrome" ]; then
		rm -rf "$PROFILE/chrome"
		cp -r "$REPO" "$PROFILE/chrome"
	fi
	ensure_userjs
}

do_start() {
	ensure_x
	prepare
	local url="${1:-about:blank}"
	log "launching firefox ($url); log: $OUT/ff.log"
	DISPLAY="$DISP" setsid firefox --no-remote -profile "$PROFILE" "$url" >"$OUT/ff.log" 2>&1 &
	sleep 10
	log "running: $(pgrep -c -f "firefox.*${PROFILE}" || true) process(es)"
}

do_stop() {
	pkill -f "firefox.*${PROFILE}" 2>/dev/null || true
	sleep 1
	log "stopped"
}

do_shot() {
	local out="${1:?usage: repro.sh shot <png>}"
	DISPLAY="$DISP" import -window root "$out"
	log "wrote $out"
}

do_sync() {
	prepare
	rsync -a --delete \
		--exclude '.git' --exclude '.opencode' --exclude 'node_modules' \
		"$REPO/" "$PROFILE/chrome/"
	log "synced repo -> $PROFILE/chrome"
}

do_probe() {
	prepare
	cp "$(dirname "$0")/probe-chrome.uc.js" "$PROFILE/chrome/JS/zzz_probe.uc.js"
	rm -f "$PROBE_OUT"
	do_start "${1:-about:blank}"
	for _ in $(seq 1 20); do
		[ -s "$PROBE_OUT" ] && break
		sleep 1
	done
	if [ -s "$PROBE_OUT" ]; then cat "$PROBE_OUT"; else log "no probe output (modal prompt? check $OUT/ff.log)"; fi
}

case "${1:-start}" in
start)
	shift || true
	do_start "${1:-about:blank}"
	;;
stop) do_stop ;;
shot)
	shift || true
	do_shot "${1:-}"
	;;
sync) do_sync ;;
probe)
	shift || true
	do_probe "${1:-about:blank}"
	;;
status) pgrep -af "firefox.*${PROFILE}" || echo "not running" ;;
*)
	sed -n '2,3p' "$0"
	exit 1
	;;
esac
