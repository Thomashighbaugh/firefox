#!/bin/bash
#
# This will install ALL 64-bit releases. To be used with Setup.sh
#
# Firefox automatic install for Linux - Legacy Edition
# v2.7
#
echo
 while true; do
    read -p "This will install ALL releases of Mozilla Firefox onto your computer.

Mozilla Firefox
Firefox Beta
Firefox Developer Edition
Firefox Nightly
Firefox Extended Support Release

Are you sure wish to install ALL editions of Mozilla Firefox 
onto your computer?" yn
    case $yn in
        [Yy]* ) chmod +x ./64bit/FirefoxStable.sh; chmod +x ./64bit/FirefoxBeta.sh; chmod +x ./64bit/Firefox-Developer-Edition.sh; chmod +x ./64bit/FirefoxNightly.sh; chmod +x ./64bit/FirefoxESR.sh;
                ./64bit/FirefoxStable.sh; ./64bit/FirefoxBeta.sh; ./64bit/Firefox-Developer-Edition.sh; ./64bit/FirefoxNightly.sh; ./64bit/FirefoxESR.sh; 
                echo; echo; echo "ALL editions of Mozilla Firfox have been installed."; echo  "They ALL will update themselves. No additional action is required."; echo; echo "Happy Browsing!"; echo; break;;
        [Nn]* ) echo; echo "You said, no. Nothing was installed at this time."; echo; echo;  exit;;
        * ) echo "Please answer yes or no.";;
    esac
done
exit 0
