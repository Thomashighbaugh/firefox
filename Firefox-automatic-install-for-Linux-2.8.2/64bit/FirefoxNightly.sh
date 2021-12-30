#!/bin/bash
#
# Installs Mozilla Firefox (nightly release). To be used with Setup.sh
#
# Wait for download notice.
echo "Please wait. I am downloading the latest version of Firefox Nightly"; echo;
# 4-second wait before beginning download. Gives user time to read the above sentence and understand what is happening.
sleep 4;
# This installs BZIP2 on SUSE Linux distros and suppresses the error that ZYPPER is not found on non-SUSE distros.
# In SUSE Linux, BZIP2 is required to extract the BZ2 archive downloaded from Mozilla.
# While every major mainstream distribution includes a method to extract a BZ2 file, SUSE appears to be an exception.
sudo zypper refresh --force 2> /dev/null
sudo zypper install bzip2 2> /dev/null
# Download.
wget -O FirefoxNightly.tar.bz2 "https://download.mozilla.org/?product=firefox-nightly-latest-ssl&os=linux64"; echo; echo;
# Begin install notice.
echo "Installing Firefox Nightly";
# Checks if distro has default opt path and if not found adds opt with default permissions.
sudo mkdir -p -m 755 /opt ;
# Path where to be installed.
sudo mkdir /opt/firefox-nightly ;
# Extracts to install path.
sudo tar xjf FirefoxNightly.tar.bz2 -C /opt/firefox-nightly/ ;
# Required permissions needed for Mozilla Firefox automatic update feature to work.
sudo chmod -R 757 /opt/firefox-nightly/firefox/ ;
# Start create icon script.
chmod +x ./64bit/fn64-icon.sh ; bash ./64bit/fn64-icon.sh ;
# Give time for icon script to complete.
sleep 2;
# Makes icon executable allowing it to run Firefox (which is also executable).
chmod +x Firefox-Nightly.desktop ;
# Adds icon to application menu (xfce, gnome, cinnamon, mate, deepin, etc...).
sudo cp Firefox-Nightly.desktop /usr/share/applications ;
# Copies desktop icon to all user desktops and grants them ownership (it is their desktop after all).
for destdir in /home/*/Desktop/; do
    cp Firefox-Nightly.desktop "$destdir" &&
    chown --reference="$destdir" "$destdir/Firefox-Nightly.desktop"
done
echo -n;
# Adds a desktop icon to all FUTURE new login users (assuming you make any).
sudo mkdir -p /etc/skel/Desktop ; sudo cp Firefox-Nightly.desktop /etc/skel/Desktop ;
# Removes the temporary files no longer needed.
rm FirefoxNightly.tar.bz2 ; rm Firefox-Nightly.desktop ;
# Exit notice.
echo; echo; echo "Congratulations!";
echo "Firefox Nightly is now installed onto your computer.";
echo "Firefox Nightly Edition will update itself.";
echo "Happy browsing."; echo; echo;
exit 0
