# Firefox-automatic-install-for-Linux
Automated installation for Mozilla Firefox for The Linux Operating System. 

The objective is to provide a method to easily install Mozilla Firefox directly from Mozilla's website and enable Firefox's automatic update feature for the latest releases. Additionally, providing a pure stock Mozilla Firefox experience for everyone using your Linux computer at home. 

First, download the latest archived release: https://github.com/Linux-Is-Best/Firefox-automatic-install-for-Linux/releases

Next, extract the archive file.

To properly install or uninstall Mozilla Firefox, go to your extracted folder and run the following command:

chmod +x Setup.sh

This will make the script executable (allowing it to run).  Next, execute the script by typing one of the following.

   ./Setup.sh

-- OR --

   bash Setup.sh

You will be prompt to select which edition of Firefox you wish to set up. You will also be prompted to enter your password (SUDO) to continue. You can install or uninstall any edition you wish, including multiple editions side by side. Please follow the easy menu prompts and complete the setup, then enjoy. -- Done (Happy Browsing).

Extra:

Alternatively, there are two additional (silent) install methods. First, the personal folder (directory) assumes you are NOT a SUDO (administrative user) and do not wish to install Firefox for everyone, but do wish to install your own personal copy exclusively for yourself within your user account, localized for only your use. While the OEM directory (folder) assumes you are already an advanced user with root or chroot privileges, installing Firefox system-wide for all users. Please see the enclosed documentation in their respected folders (directories).
