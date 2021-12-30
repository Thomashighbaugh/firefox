#!/bin/bash
#
# This will install ALL 32-bit releases. To be used with Setup.sh
#
# Firefox automatic install for Linux - Legacy Edition
# v2.5
#
echo
 while true; do
    read -p "This will install ALL releases of Mozilla Firefox 32-bit onto your computer.
    
Mozilla Firefox
Firefox Beta
Firefox Developer Edition
Firefox Nightly
Firefox Extended Support Release

Are you sure wish to install ALL editions of Mozilla Firefox 32-bit 
onto your computer?" yn
    case $yn in
        [Yy]* ) chmod +x ./32bit/FirefoxStable32.sh; chmod +x ./32bit/FirefoxBeta32.sh; chmod +x ./32bit/Firefox-Developer-Edition32.sh; chmod +x ./32bit/FirefoxNightly32.sh; chmod +x ./32bit/FirefoxESR32.sh; 
                ./32bit/FirefoxStable32.sh; ./32bit/FirefoxBeta32.sh; ./32bit/Firefox-Developer-Edition32.sh; ./32bit/FirefoxNightly32.sh; ./32bit/FirefoxESR32.sh; 
                echo; echo; echo "ALL editions of Mozilla Firfox 32-bit have been installed."; echo  "They ALL will update themselves. No additional action is required."; echo; echo "Happy Browsing!"; echo; break;;
        [Nn]* ) echo; echo "You said, no. Nothing was installed at this time."; echo; echo;  exit;;
        * ) echo "Please answer yes or no.";;
    esac
done
exit 0
