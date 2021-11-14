# Firefox Customizations

[placeholder for screenshots]

## Introduction

I only use Firefox because it lets me customize the interface (for now) with user stylesheets. In order to make this a consistent experience across systems and after reinstallations, I have this repository set up to house those configurations.

## Prerequisites

This is intended for use on Linux, it is untested on both Mac and Windows. I don't have a mac and while I can test it on Windows, I don't use Windows outside of repairing them, so I welcome contributors who use those systems to make pull requests but am unlikely to adjust these files for either.

## Install

To install the exact theme I use, run the following command:

```bash
curl -fsSL https://raw.githubusercontent.com/Thomashighbaugh/firefox/script/install.sh | bash -s -- stable
```

### Editions

If you use another edition of Firefox, just add the flag to the command above. Here's an example

```
$ curl -fsSL https://raw.githubusercontent.com/Thomashighbaugh/firefox/script/install.sh | bash -s -- nightly
```

and then it will install to Nightly instead of the default Firefox profile.

### Patching

This Firefox customization makes extensive use of Javascript, contained in the JS directory that require firefox be patched both in the profile's directory and the system directory. I have baked this into the script that installs the programs, but if you use another OS or have alternative means of loading these, I would advise commenting this lines of the install script out before proceeding.

### Development

In order to install a variant of this theme which you have crafted locally, you can either manually copy the files to a chrome directory within your browser's profile or you may set up your own repository, then modify the `install.sh` script to download from that repository's url instead of this one's url. Really, steal the thing I actually don't mind at all. All I ask is for a star!

## Post Installation

After completing the installation, restart firefox _if open_ or open it.

There is a light style that exists and the "System"s style is ok, but this customization was made with dark mode in mind, so it will look and work better if you make sure to set this on the customize page (right click toolbar, click customize)
