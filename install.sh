#!/usr/bin/bash
shopt -s nullglob dotglob
FF_USER_DIRECTORY=""

RELEASE_NAME=""

message() {
    printf "%s" "$*" >&2
}

download_ff() {

    message "[>>] Begin: Downloading Theme"

    curl -LJ0 https://github.com/Thomashighbaugh/firefox/archive/master.tar.gz | tar -xz -C /tmp

    message "[>>] Download success!"
    message "[>>]"
    message "[>>]"
    message "[>>]"
    message "[>>]"
    message "[>>] Begin: Installation Phase"

    message "[>>] Copying..."

    FF_THEME="/tmp/firefox-master/"
    cp -rvf "${FF_THEME}"* "${CHROME_DIRECTORY}"
    sudo cp -rvf "${FF_THEME}patches/root/defaults" /usr/lib/firefox*
    sudo cp -rvf "${FF_THEME}patches/root/config.js" /usr/lib/firefox*
    cp -rvf "${FF_THEME}patches/chrome/resources/*" "${CHROME_DIRECTORY}"
    cp -rvf "${FF_THEME}patches/chrome/*" "${CHROME_DIRECTORY}"

    message "[>>] Backup user.js instead of overwriting it"

    # Move user.js to the main profile directory
    mv "${FF_THEME}/user.js" "${FF_USER_DIRECTORY}"

    message ""
    message "[!!] Firefox customization has been successfully installed, please restart your browser to view your new interface."
}

function check_profile() {
    FF_USER_DIRECTORY="$(find "${HOME}/.mozilla/firefox/" -maxdepth 1 -type d -regextype egrep -regex '.*[a-zA-Z0-9]+.'"${1}")"
}

function check_librewolf_profile() {
    FF_USER_DIRECTORY="$(find "${HOME}/.librewolf/" -maxdepth 1 -type d -regextype egrep -regex '.*[a-zA-Z0-9]+.'"${1}")"
}

function print_help() {
    message "Usage: run this script followed by the variant of firefox you are installing to"
    message "/path/to/this/script/install.sh "
    message "[++] help  - Print this help"
    message "[++] stable    - Firefox Stable Build"
    message "[++] dev   - Firefox Developer Edition"
    message "[++] beta  - Firefox Beta"
    message "[++] nightly - Firefox Nightly"
    message "[++] esr   - Firefox Extended Support Release"
    message "[++]"
    message "[!!] Example:"

    message "[$$] $ curl -fsSL https://raw.githubusercontent.com/Thomashighbaugh/firefox/script/install.sh | bash -s -- stable"
    message ""
    message "[!!] The script will default to 'stable' if no option is provided to it, for sake of simplicity and the most common use case."
}

# Check args
if [[ -n "${*}" ]] && [[ -n "${1}" ]]; then

    if [[ "${1}" == "dev" ]]; then
        RELEASE_NAME="Developer Edition"
        check_profile "dev-edition-default"
    elif [[ "${1}" == "beta" ]]; then
        RELEASE_NAME="Beta"
        check_profile "default-beta"
    elif [[ "${1}" == "nightly" ]]; then
        RELEASE_NAME="Nightly"
        check_profile "default-nightly"
    elif [[ "${1}" == "stable" ]]; then
        RELEASE_NAME="Stable"
        check_profile "default-release"
    elif [[ "${1}" == "esr" ]]; then
        RELEASE_NAME="ESR"
        check_profile "default-esr"
    elif [[ "${1}" == "librewolf" ]]; then
        RELEASE_NAME="librewolf"
        check_librewolf_profile "default-release"
    elif [[ "${1}" == "help" ]]; then
        print_help
        exit
    else
        message -ne "[!!] Invalid parameter provided, please try using one of the valid parameters as specified in the help message."
        print_help
        exit
    fi
else
    check_profile "(dev-edition|default)-(release|beta|nightly|default|esr)"
    RELEASE_NAME="Stable"
    #  check_profile "default-release"
fi

if [[ -n "$FF_USER_DIRECTORY" ]]; then
    message "[>>] Firefox user profile directory located..."

    mkdir -p "${FF_USER_DIRECTORY}/chrome"
    CHROME_DIRECTORY="$FF_USER_DIRECTORY/chrome"

    # Download theme
    download_ff
    message "[!!] An Error Has Prevented the Directory From Being Created  Terminating..."
    exit 1

else

    message "[!!] No Firefox ${RELEASE_NAME} user profile detected! Make sure to run Firefox ${RELEASE_NAME} atleast once!  Terminating..."
    exit 1
fi
