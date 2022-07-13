# Patches

If you want to get the program patched on Linux, simply run the installation script that is included in the top-level directory of this repository. The patches are copied to the `/usr/lib/firefox` directory (or the variant appropiate to the variant you are using that are supported by the script). While these are tested on Arch linux, as far as I know that should work for all Linux variants, but if not open an issue and I am happy to fix the script (or a PR if you feel like fixing it anyway)

On mac and windows, you are on your own as I don't use those. If you want to submit a pull request to add these in that doesn't break its present functionality, be my guest but I am not devoting dev time to systems I don't use (nor would I pay for broken garbage when I can get less broken OSes for free...), no offense.

## If You Insist

The `patches/root` subdirectory's content are mapped such that copying the content of this subdirectory into the program folder, on whichever platform as luckily this is universal, will suffice to have the intended effect that places all of the files in their expected locations. On Linux (or mac I believe), this is achieved via `sudo cp -rvf patches/root/* /usr/lib/firefox` from the root directory of the repository or `sudo cp -rvf root/* /usr/lib/firefox` within the patches subdirectory the file you are presently reading is located.
