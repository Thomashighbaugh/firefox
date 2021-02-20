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

### Development

If you want to install this theme after modifying the source code, I have provided a section at the bottom of the `install.sh` script you can use to do exactly that. To utilize this section, you have to comment out everything above this bottom section, then uncomment the section itself before running the script otherwise you'll just install my variant.

## Post Installation

After completing the installation, restart firefox _if open_ or open it.

If you want to use a different color scheme, change the `Theme` in the customization tab which is accessed by right clicking in the `findbar` and selecting `Customize`.
