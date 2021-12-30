#!/bin/bash
#
# Uninstalling Firefox notice
echo
 while true; do
    read -p "This will REMOVE ALL releases of Mozilla Firefox on your computer.
    
Mozilla Firefox
Firefox Beta
Firefox Developer Edition
Firefox Nightly
Firefox Extended Support Release

That which is done cannot be undone —reinstalled, of course! But not undone.

Are you sure wish to REMOVE ALL releases of 
Mozilla Firefox on your computer?" yn
    case $yn in
        [Yy]* ) clear; echo "Uninstalling ALL editons of Mozilla Firefox (64 bit)"; echo; echo;
# Small delay to give user time to read the above notice.
sleep 3;
# Installation
sudo rm -r -f /opt/firefox/ ;
sudo rm -r -f /opt/firefox-beta/ ;
sudo rm -r -f /opt/firefox-developer-edition ;
sudo rm -r -f /opt/firefox-nightly/ ;
sudo rm -r -f /opt/firefox-esr/ ;
# Menu shortcuts
sudo rm -r -f /usr/share/applications/Mozilla-Firefox.desktop ;
sudo rm -r -f /usr/share/applications/Firefox-Beta.desktop ;
sudo rm -r -f /usr/share/applications/Firefox-Developer-Edition.desktop ;
sudo rm -r -f /usr/share/applications/Firefox-Nightly.desktop ;
sudo rm -r -f /usr/share/applications/Firefox-ESR.desktop ;
# Destkop shortcuts
sudo rm -r -f /etc/skel/Desktop/Mozilla-Firefox.desktop ;
sudo rm -r -f /etc/skel/Desktop/Firefox-Beta.desktop ;
sudo rm -r -f /etc/skel/Desktop/Firefox-Developer-Edition.desktop ;
sudo rm -r -f /etc/skel/Desktop/Firefox-Nightly.desktop ;
sudo rm -r -f /etc/skel/Desktop/Firefox-ESR.desktop ;
# Current desktop shotcuts
sudo rm -r -f /home/*/Desktop/Mozilla-Firefox.desktop ;
sudo rm -r -f /home/*/Desktop/Firefox-Beta.desktop ;
sudo rm -r -f /home/*/Desktop/Firefox-Developer-Edition.desktop ;
sudo rm -r -f /home/*/Desktop/Firefox-Nightly.desktop ;
sudo rm -r -f /home/*/Desktop/Firefox-ESR.desktop ;
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
