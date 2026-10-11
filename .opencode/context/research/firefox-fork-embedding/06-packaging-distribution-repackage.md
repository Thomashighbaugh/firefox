---
title: "06 — Packaging, distribution & repackage"
type: research
tags: [firefox-fork, distribution, packaging, repackage, l10n, nixos]
created: 2026-10-11
updated: 2026-10-11
---

# 06 — Packaging, distribution & repackage

## 6.1 The `distribution/` directory

A plain directory next to the binary that carries distro/partner customisation. Contents are read
from the install dir; the Windows installer even has `/RemoveDistributionDir={true,false}` (default
true on pave-over). Partner builds (e.g. Mozilla China) use it for bundled extensions.

Typical contents:

```
distribution/
├── distribution.ini            # partner/distributor metadata
├── searchplugins/              # bundled search engines (…/common/*.xml)
├── extensions/                 # bundled (signed) extensions / langpacks
├── defaults/pref/              # default prefs applied from the install dir
└── policies.json               # enterprise policies (see §05)
```

Because `distribution/defaults/pref/*.js` is loaded as default prefs from the install dir, it is
the **sanctioned place to ship AutoConfig loader prefs** (`general.config.filename`,
`general.config.obscure_value`) without editing `defaults/pref` next to `channel-prefs.js`.

## 6.2 Install-dir layout

Linux (a real distro package):

```
/usr/lib/firefox/
├── firefox, firefox-bin, libxul.so, …
├── omni.ja                     # toolkit chrome
├── browser/omni.ja             # browser chrome
├── browser/defaults/preferences/{firefox.js,firefox-branding.js,vendor.js,debugger.js}
├── defaults/pref/channel-prefs.js
└── distribution/…
```

Debian additionally ships `/etc/firefox-esr/firefox-esr.js` (a system AutoConfig) and
`/usr/share/firefox-esr/browser/defaults/preferences/*`.

Windows (FF136+): **versioned install directories** — the base dir contains a launcher plus one or
more version-named subdirs each holding a complete install (`installation_dir_layout.dll` reports
`Single` vs `Versioned` to the updater). Any tool that writes into the install dir (AutoConfig!) must
resolve which layout is in use.

macOS: install root is `Firefox.app/Contents/Resources/`.

## 6.3 mach repackage

`mach repackage` turns a built (or downloaded) package into a distributable format. Known
sub-commands: **`deb`, `rpm`, `snap`, `flatpak`, `msix`, `msi`, `dmg`, `mar`, `installer`**, plus
signing helpers (`sign-msix`).

```bash
# flatpak
./mach repackage flatpak --input target.tar.xz --name org.mozilla.firefox \
  --arch aarch64 --version 137.0a1 --product firefox --release-type nightly \
  --flatpak-branch nightly --template-dir browser/installer/linux/app/flatpak \
  --langpack-pattern $PWD/langpacks/*.xpi --output test.flatpak.tar.xz

# msix
./mach repackage msix --input firefox-88.0.1.zip --channel=official --arch=x86_64 --verbose
./mach repackage msix --unsigned        # local build; unsigned needs an admin install

# msi
./mach repackage msi                    # invokes WiX
```

Automation repackages **ZIP/tar** products; `snap`/`flatpak`/`msix` incorporate signed langpacks as
distribution extensions.

## 6.4 Packaging & localisation

| Command | Output |
| ------- | ------ |
| `./mach package` | distributable under `obj-*/dist/` (`.tar.xz`, `.zip`, …) |
| `./mach build installers-$AB_CD` | single-locale repack installer; clones l10n from `mozilla-l10n/firefox-l10n` into `~/.mozbuild/l10n-central` |
| `./mach package-multi-locale --locales de it zh-TW` | multi-locale package |
| `./mach repackage <fmt>` | see above |

l10n is driven by `jar.mn` `[localization]` sections; `l10n-%` for repacks vs `chrome-%` for
multi-locale; `toolkit/mozapps/installer/l10n-repack.py` does the repack. Artifact trick for l10n:
`ac_add_options --disable-compile-environment` + `export BUILD_BACKENDS = FasterMake,RecursiveMake`,
then `mach configure` / `mach artifact install` / `mach build` / `package-multi-locale`.

Format note: Linux binaries moved from `.tar.bz2` to `.tar.xz` (2024); `MOZ_PKG_FORMAT=DMG` for a
macOS disk image.

## 6.5 Branding

`browser/branding/<name>/` (with `configure.sh`, icons, `branding.nsi`, pref overrides). Select with
`ac_add_options --with-branding=browser/branding/<name>`. The build falls back to
`browser/branding/unofficial` when a partner branding is missing (Amelia relies on this).

## 6.6 NixOS (this machine's actual environment)

The current install is **not** a source fork; it is a Nix override of the packaged Firefox:

```nix
firefox-with-autoconfig = (cfg.package.override {
  extraPrefsFiles = [ (builtins.fetchurl { url = "…/fx-autoconfig/master/program/config.js"; … }) ];
}).overrideAttrs (old: { buildCommand = old.buildCommand + ''…''; });
```

- `extraPrefsFiles` → a `defaultPrefsFile` merged into the packaged build's defaults.
- the profile `chrome/` is symlinked to this repo (`home.activation.linkFirefoxChrome`).
- `programs.firefox` supports `autoConfig`, `extraPolicies`, `extraNativeMessagingHosts`,
  `profiles.<p>.extensions` — see NixOS `pkgs/applications/networking/browsers/firefox`.

To move to path B on NixOS you would instead build the fork via `buildFirefoxX86_64`-style
derivations from a patched source, which is a much larger change than the current overlay.

## 6.7 Repackaging without source (fast path)

You can repackage an existing binary without rebuilding Gecko: extract the package, replace/edit
files (e.g. `omni.ja`, `distribution/`), repackage. Documented example: recompile one unified object
set, relink `libxul.so`, `strip`, `dpkg-deb -R` → replace → `dpkg-deb -b`. ~2 min vs ~3.5 h. Reliable
only for small, well-understood changes; `moz.build`/Rust changes force full rebuilds.

## Sources

firefox-source-docs `installation_dir_layout`, `build/buildsystem/flatpak`, `build/buildsystem/locales`,
`browser/installer/windows/installer/{MSIX,MSI,FullConfig}`, `browser/branding/docs`; rpm/deb file lists;
Sky1-Linux incremental-repackage notes; NixOS firefox module.
