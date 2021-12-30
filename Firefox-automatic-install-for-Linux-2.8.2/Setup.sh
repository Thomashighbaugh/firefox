#!/bin/bash
#
# Firefox automatic install for Linux
#  Legacy Edition
#   v2.8.2
#
clear;
echo;
 PS3='Please enter your choice:'
 options=("Install 64-bit Firefox -- Recommended" "Install 32-bit Firefox -- legacy" "Uninstall 64-bit" "Uninstall 32-bit" "Quit")
 while :
 do
 select opt in "${options[@]}"
 do
  case $opt in
  "Install 64-bit Firefox -- Recommended") clear; echo "You selected to install Firefox 64-bit"; echo; echo; chmod +x ./64bit/sub64.sh; ./64bit/sub64.sh; exit 0 ;;
  "Install 32-bit Firefox -- legacy") clear; echo "You selected to install Firefox 32-bit"; echo; echo; chmod +x ./32bit/sub32.sh; ./32bit/sub32.sh; exit 0 ;;
  "Uninstall 64-bit") clear; echo "You selected to uninstall 64-bit"; echo; echo; chmod +x ./64bit/uninstallers/unsub64.sh; ./64bit/uninstallers/unsub64.sh; exit 0 ;;
  "Uninstall 32-bit") clear; echo "You selected to uninstall 32-bit"; echo; echo; chmod +x ./32bit/32bit-uninstallers/unsub32.sh; ./32bit/32bit-uninstallers/unsub32.sh; exit 0 ;;
  "Quit") exit 0 ;;
   *) echo "invalid option $REPLY"; break ;;
   esac
  done
  done
# Other than removing all my little developer notes. - Know a better way to improve this? Dare to speak up! One of the cool things about Linux and code, in general, is YOU (we all) make it possible, 
# and we all start somewhere. An important thing to remember is no matter how good, or bad you are at coding, there will always be people who will discourage you. Only you can carry yourself forward. 
# Take that first step and then another and another. Never give up. Never surrender. - As always, Happy Browsing!
