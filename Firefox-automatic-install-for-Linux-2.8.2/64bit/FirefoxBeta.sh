#!/bin/bash
#
# Installs Mozilla Firefox (beta release). To be used with Setup.sh
#
# Wait for download notice.
echo "Please wait. I am downloading the latest version of Firefox Beta"; echo;
# 4-second wait before beginning download. Gives user time to read the above sentence and understand what is happening.
sleep 4;
# This installs BZIP2 on SUSE Linux distros and suppresses the error that ZYPPER is not found on non-SUSE distros.
# In SUSE Linux, BZIP2 is required to extract the BZ2 archive downloaded from Mozilla.
# While every major mainstream distribution includes a method to extract a BZ2 file, SUSE appears to be an exception.
sudo zypper refresh --force 2> /dev/null
sudo zypper install bzip2 2> /dev/null
# Download.
wget -O FirefoxBeta.tar.bz2 "https://download.mozilla.org/?product=firefox-beta-latest-ssl&os=linux64"; echo; echo;
# Begin install notice.
echo "Installing Firefox Beta";
# Checks if distro has default opt path and if not found adds opt with default permissions.
sudo mkdir -p -m 755 /opt ;
# Path where to be installed.
sudo mkdir /opt/firefox-beta ;
# Extracts to install path.
sudo tar xjf FirefoxBeta.tar.bz2 -C /opt/firefox-beta/ ;
# Required permissions needed for Mozilla Firefox automatic update feature to work.
sudo chmod -R 757 /opt/firefox-beta/firefox/ ;
# Start create icon script.
chmod +x ./64bit/fb64-icon.sh ; bash ./64bit/fb64-icon.sh ;
# Give time for icon script to complete.
sleep 2;
# Makes icon executable allowing it to run Firefox (which is also executable).
chmod +x Firefox-Beta.desktop ;
# Adds icon to application menu (xfce, gnome, cinnamon, mate, deepin, etc...).
sudo cp Firefox-Beta.desktop /usr/share/applications ;
# Copies desktop icon to all user desktops and grants them ownership (it is their desktop after all).
for destdir in /home/*/Desktop/; do
    cp Firefox-Beta.desktop "$destdir" &&
    chown --reference="$destdir" "$destdir/Firefox-Beta.desktop"
done
echo -n;
# Adds a desktop icon to all FUTURE new login users (assuming you make any).
sudo mkdir -p /etc/skel/Desktop ; sudo cp Firefox-Beta.desktop /etc/skel/Desktop ;
# Removes the temporary files no longer needed.
rm FirefoxBeta.tar.bz2 ; rm Firefox-Beta.desktop ;
# Exit notice.
echo; echo; echo "Congratulations!";
echo "Firefox Beta is now installed onto your computer.";
echo "Firefox Beta will update itself.";
echo "Happy browsing."; echo; echo;
exit 0
