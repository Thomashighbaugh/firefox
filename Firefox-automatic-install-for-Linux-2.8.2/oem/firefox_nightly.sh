#!/bin/bash
#
# Firefox Nightly - oem - silent install
#
#
# This installs BZIP2 on SUSE Linux distros and suppresses the error that ZYPPER is not found on non-SUSE distros.
# In SUSE Linux, BZIP2 is required to extract the BZ2 archive downloaded from Mozilla.
# While every major mainstream distribution includes a method to extract a BZ2 file, SUSE appears to be an exception.
zypper refresh --force 2> /dev/null
zypper install bzip2 2> /dev/null
# Download.
wget -O FirefoxNightly.tar.bz2 "https://download.mozilla.org/?product=firefox-nightly-latest-ssl&os=linux64";
# Checks if distro has default opt path and if not found adds opt with default permissions.
mkdir -p -m 755 /opt ;
# Path where to be installed.
mkdir /opt/firefox-nightly ;
# Extracts to install path.
tar xjf FirefoxNightly.tar.bz2 -C /opt/firefox-nightly/ ;
# Required permissions needed for Mozilla Firefox automatic update feature to work.
chmod -R 757 /opt/firefox-nightly/firefox/ ;
# Start create icon script.
chmod +x ./fn64-icon.sh ; bash ./fn64-icon.sh ;
# Give time for icon script to complete.
sleep 2;
# Makes icon executable allowing it to run Firefox (which is also executable).
chmod +x Firefox-Nightly.desktop ;
# Adds icon to application menu (xfce, gnome, cinnamon, mate, deepin, etc...).
cp Firefox-Nightly.desktop /usr/share/applications ;
# Copies desktop icon to all user desktops and grants them ownership (it is their desktop after all).
for destdir in /home/*/Desktop/; do
    cp Firefox-Nightly.desktop "$destdir" &&
    chown --reference="$destdir" "$destdir/Firefox-Nightly.desktop"
done
echo -n;
# Adds a desktop icon to all FUTURE new login users (assuming you make any).
mkdir -p /etc/skel/Desktop ; cp Firefox-Nightly.desktop /etc/skel/Desktop ;
# Removes the temporary files no longer needed.
rm FirefoxNightly.tar.bz2 ; rm Firefox-Nightly.desktop ;
# Exit
exit 0
