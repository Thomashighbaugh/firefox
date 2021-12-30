#!/bin/bash
#
# Uninstalling Firefox notice
echo
 while true; do
    read -p "This will REMOVE ALL releases of Mozilla Firefox 32-bit on your computer.
    
Mozilla Firefox
Firefox Beta
Firefox Developer Edition
Firefox Nightly
Firefox Extended Support Release

That which is done, cannot be undone. Reinstalled, of course! But not undone.

Are you sure wish to REMOVE ALL releases of 
Mozilla Firefox 32-bit on your computer?" yn
    case $yn in
        [Yy]* ) clear; echo "Uninstalling ALL releases of Mozilla Firefox 32-bit"; echo; echo;
# Small delay to give user time to read the above notice.
sleep 3;
# Installation
sudo rm -r -f /opt/firefox-32bit/ ;
sudo rm -r -f /opt/firefox-beta-32bit/ ;
sudo rm -r -f /opt/firefox-developer-edition-32bit/ ;
sudo rm -r -f /opt/firefox-nightly-32bit/ ;
sudo rm -r -f /opt/firefox-esr-32bit/ ;
# Menu shotcuts
sudo rm -r -f /usr/share/applications/Firefox-32bit.desktop ;
sudo rm -r -f /usr/share/applications/Firefox-Beta-32bit.desktop ;
sudo rm -r -f /usr/share/applications/Firefox-Developer-Edition-32bit.desktop ;
sudo rm -r -f /usr/share/applications/Firefox-Nightly-32bit.desktop ;
sudo rm -r -f /usr/share/applications/Firefox-ESR-32bit.desktop ;
# Desktop shortcuts
sudo rm -r -f /etc/skel/Desktop/Firefox-32bit.desktop ;
sudo rm -r -f /etc/skel/Desktop/Firefox-Beta-32bit.desktop ;
sudo rm -r -f /etc/skel/Desktop/Firefox-Developer-Edition-32bit.desktop ;
sudo rm -r -f /etc/skel/Desktop/Firefox-Nightly-32bit.desktop ;
sudo rm -r -f /etc/skel/Desktop/Firefox-ESR-32bit.desktop ;
# Current deskop shortcuts
sudo rm -r -f /home/*/Desktop/Firefox-32bit.desktop ;
sudo rm -r -f /home/*/Desktop/Firefox-Beta-32bit.desktop ;
sudo rm -r -f /home/*/Desktop/Firefox-Developer-Edition-32bit.desktop ;
sudo rm -r -f /home/*/Desktop/Firefox-Nightly-32bit.desktop ;
sudo rm -r -f /home/*/Desktop/Firefox-ESR-32bit.desktop ;
# Cache files
sudo rm -r -f /home/*/.cache/mozilla/firefox/ ;
# Configuration and profile files.
sudo rm -r -f /home/*/.mozilla/firefox/ ;
echo; echo; echo "Thank you for using Mozilla Firefox.";
echo "Firefox has been deleted and uninstalled. Per your request.";
echo "Really sorry to see you go. Hope to see you again real soon."; echo; echo; break ;;
        [Nn]* ) echo; echo "You said, NO. Nothing has changed at this time."; echo; echo; exit;;
        * ) echo "Please answer yes or no.";;
    esac
done
exit 0
