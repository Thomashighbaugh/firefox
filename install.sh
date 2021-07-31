#!/usr/bin/env bash

FF_USER_DIRECTORY=""
CHROME_DIRECTORY=""
RELEASE_NAME=""

message() {
    printf "%s\n" "$*" >&2
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

    if [[ $? -eq 0 ]]; then
        message "[>>] Copying..."

        FF_THEME="/tmp/firefox-master/"
        cp -r "${FF_THEME}"* "${CHROME_DIRECTORY}"
        mv "${CHROME_DIRECTORY}"/userChromeJS/* "${CHROME_DIRECTORY}" && rm -rvf "${CHROME_DIRECTORY}"/userChrome
        JS 
      message "[>>] Backup user.js instead of overwriting it"

        if [ -e "${CHROME_DIRECTORY}/../user.js" ]; then

            message "[>>] Prior Configuration Detected, Creating Backup..."

            user_pref_backup_dir="${CHROME_DIRECTORY}/../user-prefs-backup"

            if [[ ! -d "${user_pref_backup_dir}" ]]; then

                message "[>>] No Prior Installation Detected, Proceeding As Usual..."

                mkdir "${user_pref_backup_dir}"
            fi

            mv --backup=t "${CHROME_DIRECTORY}/../user.js" "${user_pref_backup_dir}"
        fi

        # Move user.js to the main profile directory
        mv "${CHROME_DIRECTORY}/user.js" "${CHROME_DIRECTORY}/../"

        if [[ $? -eq 0 ]]; then
            rm -rf "/tmp/firefox-master"
        else
            message " [!!] There was a problem while copying the files. Terminating..."
            exit
        fi
    else
        # Download failed
        message " [!!] There was a problem while downloading the theme. Terminating..."
        exit
    fi
    message ""
    message "[!!] Firefox customization has been successfully installed, please restart your browser to view your new interface."
}

function check_profile() {
    FF_USER_DIRECTORY="$(find "${HOME}/.mozilla/firefox/" -maxdepth 1 -type d -regextype egrep -regex '.*[a-zA-Z0-9]+.'${1})"
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
if [[ ! -z "${@}" ]] && [[ ! -z "${1}" ]]; then

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
    elif [[ "${1}" == "help" ]]; then
        print_help
        exit
    else
        message -ne "[!!] Invalid parameter provided, please try using one of the valid parameters as specified in the help message.\n"
        print_help
        exit
    fi
else
    # check_profile "(dev-edition|default)-(release|beta|nightly|default|esr)"
    RELEASE_NAME="Stable"
    check_profile "default-release"
fi

if [[ -n "$FF_USER_DIRECTORY" ]]; then
    message "[>>] Firefox user profile directory located..."
    CHROME_DIRECTORY="$(find "$FF_USER_DIRECTORY/" -maxdepth 1 -type d -name 'chrome')"
    if [[ -n "$CHROME_DIRECTORY" ]]; then
        # Check if the chrome folder is not empty
        shopt -s nullglob dotglob
        content="${CHROME_DIRECTORY}/"

        # If there's a current theme, make a backup
        if [ ${#content[@]} -gt 0 ]; then
            message "[>>] Chrome Directory Exists, Backing Up..."
            backup_dir="${CHROME_DIRECTORY}-backup"

            # Create backup folder
            if [[ ! -d "${backup_dir}" ]]; then
                message "[>>] Chrome Backup Directory Not Detected, Creating One..."
                mkdir "${backup_dir}"
            fi

            mv --backup=t "${CHROME_DIRECTORY}" "${backup_dir}"
            mkdir "${CHROME_DIRECTORY}"
        fi
        # Download theme
        download_ff
    else
        message "[>>] No Chrome Directory Exists, Creating One..."
        mkdir "${FF_USER_DIRECTORY}/chrome"

        # Check if backup folder exist
        if [[ $? -eq 0 ]]; then
            CHROME_DIRECTORY="${FF_USER_DIRECTORY}/chrome"

            # Download theme
            download_ff
        else
            message "[!!] An Error Has Prevented the Directory From Being Created \n Terminating..."
            exit 1
        fi
    fi

else
    message "[!!] No Firefox ${RELEASE_NAME} user profile detected! Make sure to run Firefox ${RELEASE_NAME} atleast once! \n Terminating..."
    exit 1
fi
