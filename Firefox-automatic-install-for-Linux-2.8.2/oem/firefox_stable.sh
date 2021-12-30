#!/bin/bash
#
# Firefox (current stable edition) - oem - silent install
#
# This installs BZIP2 on SUSE Linux distros and suppresses the error that ZYPPER is not found on non-SUSE distros.
# In SUSE Linux, BZIP2 is required to extract the BZ2 archive downloaded from Mozilla.
# While every major mainstream distribution includes a method to extract a BZ2 file, SUSE appears to be an exception.
zypper refresh --force 2> /dev/null
zypper install bzip2 2> /dev/null
# Download.
wget -O FirefoxStable.tar.bz2 "https://download.mozilla.org/?product=firefox-latest-ssl&os=linux64";
# Checks if distro has default opt path and if not found adds opt with default permissions.
mkdir -p -m 755 /opt ;
# Extracts to install path
tar xjf FirefoxStable.tar.bz2 -C /opt/ ;
# Required permissions needed for Mozilla Firefox automatic update feature to work.
chmod -R 757 /opt/firefox/ ;
# Start create icon script
chmod +x ./fs64-icon.sh ; bash ./fs64-icon.sh ;
# Give time for icon script to complete
sleep 2;
# Makes icon executable allowing it to run Firefox (which is also executable).
chmod +x Mozilla-Firefox.desktop ;
# Adds icon to application menu (xfce, gnome, cinnamon, mate, deepin, etc...).
cp Mozilla-Firefox.desktop /usr/share/applications ;
# Copies desktop icon to all user desktops and grants them ownership (it is their desktop after all).
for destdir in /home/*/Desktop/; do
    cp Mozilla-Firefox.desktop "$destdir" &&
    chown --reference="$destdir" "$destdir/Mozilla-Firefox.desktop"
done
echo -n;
# Adds a desktop icon to all FUTURE new login users (assuming you make any).
mkdir -p /etc/skel/Desktop ; cp Mozilla-Firefox.desktop /etc/skel/Desktop ;
# Removes the temporary files no longer needed.
rm FirefoxStable.tar.bz2 ; rm Mozilla-Firefox.desktop ;
# Exit
exit 0
