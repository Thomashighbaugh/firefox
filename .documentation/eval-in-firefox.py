#!/usr/bin/env python3
"""
eval-in-firefox.py — Evaluate JS scripts in Firefox chrome context via Marionette
==================================================================================

Usage:
  python3 eval-in-firefox.py path/to/script.js [script2.js ...]

Connects to Firefox's Marionette debugging protocol on port 2828, switches
to chrome context, and evaluates each JS file in the browser window scope.

If Marionette is not available, starts Firefox with --marionette using the
default profile (or a temporary copy of it).

Requires: Firefox running (or will auto-start it)
Protocol: Marionette (TCP port 2828, null-terminated JSON)
"""

import json
import os
import socket
import subprocess
import sys
import tempfile
import time
import shutil
import configparser

MARIONETTE_PORT = 2828
MARIONETTE_HOST = "127.0.0.1"
CONNECT_TIMEOUT = 30
FIREFOX_BIN = "firefox"


# ── Marionette protocol (raw TCP, null-terminated JSON) ──────────────


def _connect():
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.settimeout(CONNECT_TIMEOUT)
    sock.connect((MARIONETTE_HOST, MARIONETTE_PORT))
    return sock


def _send(sock, cmd):
    data = json.dumps(cmd) + "\0"
    sock.sendall(data.encode("utf-8"))
    buf = b""
    while True:
        chunk = sock.recv(4096)
        if not chunk:
            break
        buf += chunk
        if b"\0" in chunk:
            break
    return json.loads(buf.decode("utf-8").rstrip("\0"))


def _new_session(sock):
    resp = _send(sock, {
        "cmd": "Marionette:NewSession",
        "args": {"acceptInsecureCerts": True},
    })
    return resp.get("sessionId")


def _set_context(sock, ctx="chrome"):
    _send(sock, {
        "cmd": "Marionette:SetContext",
        "args": {"value": ctx},
    })


def _execute(sock, js_code, timeout_ms=60000):
    resp = _send(sock, {
        "cmd": "Marionette:Execute",
        "script": js_code,
        "args": [],
        "newSandbox": True,
        "scriptTimeout": timeout_ms,
    })
    return resp


def _delete_session(sock):
    _send(sock, {"cmd": "Marionette:DeleteSession", "args": []})


# ── Profile helpers ──────────────────────────────────────────────


def find_default_profile():
    """Return the absolute path to the default Firefox profile directory."""
    profiles_ini = os.path.expanduser("~/.mozilla/firefox/profiles.ini")
    if not os.path.isfile(profiles_ini):
        # Try resolving symlink (NixOS)
        try:
            profiles_ini = os.path.realpath(profiles_ini)
        except Exception:
            pass
    if not os.path.isfile(profiles_ini):
        return None

    cfg = configparser.ConfigParser()
    cfg.read(profiles_ini)

    profiles_dir = os.path.dirname(os.path.realpath(profiles_ini))

    # Find the default profile
    for section in cfg.sections():
        if section.startswith("Profile"):
            is_default = cfg.get(section, "Default", fallback="0")
            if is_default == "1":
                rel = cfg.get(section, "Path")
                if os.path.isabs(rel):
                    return rel
                return os.path.join(profiles_dir, rel)

    # Fallback: first profile
    for section in cfg.sections():
        if section.startswith("Profile"):
            rel = cfg.get(section, "Path")
            if os.path.isabs(rel):
                return rel
            return os.path.join(profiles_dir, rel)

    return None


def ensure_firefox():
    """Connect to an existing Marionette session, or start one."""
    # Try connecting first
    try:
        sock = _connect()
        # Send a simple command to check if it's really Marionette
        try:
            session_id = _new_session(sock)
            if session_id:
                _delete_session(sock)
                sock.close()
                return True
        except Exception:
            pass
        sock.close()
    except (ConnectionRefusedError, OSError, socket.timeout):
        pass

    # Not available — try starting Firefox with --marionette
    profile = find_default_profile()
    if not profile:
        print("Could not find Firefox profile.")
        print("Make sure ~/.mozilla/firefox/profiles.ini exists.")
        return False

    firefox_bin = shutil.which(FIREFOX_BIN)
    if not firefox_bin:
        print(f"Could not find '{FIREFOX_BIN}' in PATH.")
        return False

    print(f"Starting Firefox with --marionette (profile: {profile})")
    print("NOTE: If Firefox is already running, this may create a second instance.")
    print("      Close Firefox and re-run for best results.", flush=True)

    proc = subprocess.Popen(
        [firefox_bin, "--marionette", "--profile", profile, "--new-instance"],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )

    # Wait for Marionette to be ready
    for attempt in range(30):
        time.sleep(1)
        try:
            sock = _connect()
            sock.close()
            print("Firefox is ready.")
            return True
        except (ConnectionRefusedError, OSError, socket.timeout):
            continue

    print("Timed out waiting for Firefox to start.")
    return False


# ── Main ─────────────────────────────────────────────────────────


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)

    script_paths = sys.argv[1:]
    for sp in script_paths:
        if not os.path.isfile(sp):
            print(f"File not found: {sp}")
            sys.exit(1)

    print("Connecting to Firefox via Marionette...")
    if not ensure_firefox():
        print("\n✗ Could not connect to Firefox Marionette.")
        print("  To use this script, either:")
        print("    1. Close Firefox and run this script again (it will start")
        print("       Firefox with --marionette automatically), or")
        print("    2. Start Firefox manually: firefox --marionette")
        sys.exit(1)

    sock = _connect()

    try:
        session_id = _new_session(sock)
        print(f"Session: {session_id}")

        _set_context(sock, "chrome")
        print("Context: chrome")

        for script_path in script_paths:
            with open(script_path, "r") as f:
                js_code = f.read()

            print(f"\nExecuting: {script_path} ({len(js_code)} bytes)")
            result = _execute(sock, js_code)

            # Print the result
            value = result.get("value", "")
            error = result.get("error")

            if error:
                print(f"  Error: {json.dumps(error, indent=4)}")
            elif value:
                print(f"  Result: {json.dumps(value, indent=2)}")
            else:
                print("  Script executed (no return value)")

            # Check for console messages
            logs = result.get("logs", [])
            if logs:
                print(f"  Console ({len(logs)} messages):")
                for log_entry in logs[-5:]:
                    print(f"    {log_entry.get('level', 'log')}: {log_entry.get('msg', '')}")

    finally:
        try:
            _delete_session(sock)
            sock.close()
        except Exception:
            pass

    print("\n✓ Done.")


if __name__ == "__main__":
    main()
