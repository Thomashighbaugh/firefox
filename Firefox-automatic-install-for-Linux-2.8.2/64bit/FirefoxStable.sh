#!/bin/bash
#
# Installs Mozilla Firefox (stable release). To be used with Setup.sh
#
# Wait for download notice.
echo; echo "Please wait. I am downloading the latest stable version of Mozilla Firefox"; echo;
# 4-second wait before beginning download. Gives user time to read the above sentence and understand what is happening.
sleep 4;
# This installs BZIP2 on SUSE Linux distros and suppresses the error that ZYPPER is not found on non-SUSE distros.
# In SUSE Linux, BZIP2 is required to extract the BZ2 archive downloaded from Mozilla.
# While every major mainstream distribution includes a method to extract a BZ2 file, SUSE appears to be an exception.
sudo zypper refresh --force 2> /dev/null
sudo zypper install bzip2 2> /dev/null
# Download.
wget -O FirefoxStable.tar.bz2 "https://download.mozilla.org/?product=firefox-latest-ssl&os=linux64"; echo; echo;
# Begin install notice.
echo "Installing Mozilla Firefox";
# Checks if distro has default opt path and if not found adds opt with default permissions.
sudo mkdir -p -m 755 /opt ;
# Extracts to install path
sudo tar xjf FirefoxStable.tar.bz2 -C /opt/ ;
# Required permissions needed for Mozilla Firefox automatic update feature to work.
sudo chmod -R 757 /opt/firefox/ ;
# Start create icon script
chmod +x ./64bit/fs64-icon.sh ; bash ./64bit/fs64-icon.sh ;
# Give time for icon script to complete
sleep 2;
# Makes icon executable allowing it to run Firefox (which is also executable).
chmod +x Mozilla-Firefox.desktop ;
# Adds icon to application menu (xfce, gnome, cinnamon, mate, deepin, etc...).
sudo cp Mozilla-Firefox.desktop /usr/share/applications ;
# Copies desktop icon to all user desktops and grants them ownership (it is their desktop after all).
for destdir in /home/*/Desktop/; do
    cp Mozilla-Firefox.desktop "$destdir" &&
    chown --reference="$destdir" "$destdir/Mozilla-Firefox.desktop"
done
echo -n;
# Adds a desktop icon to all FUTURE new login users (assuming you make any).
sudo mkdir -p /etc/skel/Desktop ; sudo cp Mozilla-Firefox.desktop /etc/skel/Desktop ;
# Removes the temporary files no longer needed.
rm FirefoxStable.tar.bz2 ; rm Mozilla-Firefox.desktop ;
# Exit notice.
echo; echo; echo "Congratulations!";
echo "Mozilla Firefox is now installed onto your computer.";
echo "Mozilla Firefox will update itself.";
echo "Happy browsing."; echo ; echo ;
exit 0
