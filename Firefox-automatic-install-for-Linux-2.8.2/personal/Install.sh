#!/bin/bash
#
# Firefox automatic install for Linux - personal - silent install
#
# This Install file (Install.sh) is redundant. You do not absolutely need to use this file. 
# The enclosed setup files (for example, nightly.sh which installs Firefox Nightly) 
# within the "personal" folder (directory) can work independently.  
# However, to use this file anyways, uncomment what you need and save.
# By default this file is set to install the latest stable edition of Mozilla Firefox.
#
############ Mozilla Firefox
chmod +x ./firefox.sh ; bash ./firefox.sh ;
#
############ Firefox Beta
# chmod +x ./beta.sh ; bash ./beta.sh ;
#
############ Firefox Developer Edition
# chmod +x ./developer.sh ; bash ./developer.sh ;
#
############ Firefox Nightly
# chmod +x ./nightly.sh ; bash ./nightly.sh ;
#
############ Firefox Extended Support Release
# chmod +x ./extended.sh ; bash ./extended.sh ;
#
#
#
# Exit
exit 0
