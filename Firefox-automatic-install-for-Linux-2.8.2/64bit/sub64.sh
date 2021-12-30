#!/bin/bash
#
# Firefox automatic install for Linux - This file to be used with Setup.sh
#
 PS3='Please enter your choice:' 
 options=("Mozilla Firefox" "Firefox Beta" "Firefox Developer Edition" "Firefox Nightly" "Firefox Extended Support Release" "Install ALL 64-bit editions" "Quit")
 while :
 do
 select opt in "${options[@]}"
 do
  case $opt in
  "Mozilla Firefox") clear; echo "You selected Mozilla Firefox"; echo; echo; chmod +x ./64bit/FirefoxStable.sh; ./64bit/FirefoxStable.sh; break ;;
  "Firefox Beta") clear; echo "You selected Firefox Beta"; echo; echo; chmod +x ./64bit/FirefoxBeta.sh; ./64bit/FirefoxBeta.sh; break ;;
  "Firefox Developer Edition") clear; echo "You selected Firefox Developer Edition"; echo; echo; chmod +x ./64bit/Firefox-Developer-Edition.sh; ./64bit/Firefox-Developer-Edition.sh; break ;;
  "Firefox Nightly") clear; echo "You selected Firefox Nightly"; echo; echo; chmod +x ./64bit/FirefoxNightly.sh; ./64bit/FirefoxNightly.sh; break ;;
  "Firefox Extended Support Release") clear; echo "You selected Firefox Extended Support Release"; echo; echo; chmod +x ./64bit/FirefoxESR.sh; ./64bit/FirefoxESR.sh; break ;;
  "Install ALL 64-bit editions") clear; echo "Notice:"; chmod +x ./64bit/firefox-all.sh; ./64bit/firefox-all.sh; break ;;
  "Quit") exit 0 ;;
   *) echo "invalid option $REPLY"; break ;;
   esac
  done
  done
