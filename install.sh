#!/bin/bash
#-----------------------------------------------------------------#
# Title:       Higgs-Boson Installation Script
#
# Description: Installs the custom userChrome.css and
#              userChrome.js files I use to heavily mod
#              my Firefox-based browsers locally. Idea &
#              structure lifted from blurredfox.
#
# Author:     Thomas Leon Highbaugh<admin@thomasleonhighbaugh.me>
#-----------------------------------------------------------------#

FF_USER_DIRECTORY=""
CHROME_DIRECTORY=""
RELEASE_NAME=""

message() {
	printf "%s\n" "$*" >&2
}

download_ff() {

	message "[>>] Downloading theme..."
	if [[ ! -d "/tmp/firefox" ]]; then
	  sudo git clone https://github.com/Thomashighbaugh/firefox /tmp/firefox
    else 
       sudo rm -rf  /tmp/firefox  >/dev/null
       sudo git clone https://github.com/Thomashighbaugh/firefox /tmp/firefox
    fi
	#---------------------------------------------------------#
	# Download success!
	if [[ $? -eq 0 ]]; then
		message "[>>] Copying..."
		FF_THEME="/tmp/firefox/"
		#---------------------------------------------------------#
		# Copy the Chrome Files to the User Directory in the Profile Determined by the `check_profile` function
		cp -r "${FF_THEME}"* "${CHROME_DIRECTORY}"
		#---------------------------------------------------------#
		# Copy the relevant patches to the program itself from the patches subdirectory using sudo permissions
		sudo cp -rvf /tmp/firefox/patches/root/* $PROGRAM_DIRECTORY
		#---------------------------------------------------------#
		# Backup user.js instead of overwriting it
		if [ -e "${CHROME_DIRECTORY}/../user.js" ]; then
			message "[>>] Existing user.js detected! Creating backup to user-prefs-backup/..."
			user_pref_backup_dir="${CHROME_DIRECTORY}/../user-prefs-backup"
			#---------------------------------------------------------#
			if [[ ! -d "${user_pref_backup_dir}" ]]; then
				message "[>>] user-prefs-backup/ folder does not exist! Creating..."
				mkdir "${user_pref_backup_dir}"
			fi

			mv --backup=t "${CHROME_DIRECTORY}/../user.js" "${user_pref_backup_dir}"
		fi
		#---------------------------------------------------------#
		# Move user.js to the main profile directory
		mv "${CHROME_DIRECTORY}/user.js" "${CHROME_DIRECTORY}/../"

		if [[ $? -eq 0 ]]; then
		sudo rm -rf "/tmp/firefox/"  >/dev/null
		else
			message " [!!] There was a problem while copying the files. Terminating..."
			exit
		fi
	else
		#---------------------------------------------------------#
		# Download failed
		message " [!!] There was a problem while downloading the theme. Terminating..."
		exit
	fi
    clear
	echo "##################################"
	echo " _______ __                      "
	echo "|   |   |__|.-----.-----.-----.  "
	echo "|       |  ||  _  |  _  |__ --|  "
	echo "|___|___|__||___  |___  |_____|  "
	echo "            |_____|_____|        "
	echo " ______                          "
	echo "|   __ \.-----.-----.-----.-----."
	echo "|   __ <|  _  |__ --|  _  |     |"
	echo "|______/|_____|_____|_____|__|__|"
	echo "##################################"
	echo
	message "Higgs-Boson successfully installed! Enjoy!"
}

function check_profile() {
	FF_USER_DIRECTORY="$(find "${HOME}/.mozilla/firefox/" -maxdepth 1 -type d -regextype egrep -regex '.*[a-zA-Z0-9]+.'${1})"
}

function print_help() {

	echo "------------------------------------------------"
	echo "Parameters:"
	echo "------------------------------------------------"
	echo "help         - Show this message"
	echo "stable       - Firefox Stable Build"
	echo "dev          - Firefox Developer Edition"
	echo "beta         - Firefox Beta"
	echo "nightly      - Firefox Nightly"
	echo "librewolf    - Librewolf "
	echo "esr          - Firefox Extended Support Release"
	echo "------------------------------------------------"
	echo "Usage Examples:"
	echo "------------------------------------------------"
	echo "$ ./install stable"
	echo "$ ./install dev"
	echo ""
	echo "Defaults to 'stable' if empty."
	echo "------------------------------------------------"
}
#-------------------------------------------------------#
#-----------------Check Arguments-----------------------#
#-------------------------------------------------------#
if [[ ! -z "${@}" ]] && [[ ! -z "${1}" ]]; then

	if [[ "${1}" == "dev" ]]; then
		RELEASE_NAME="Firefox Developer Edition"
		check_profile "dev-edition-default"
		PROGRAM_DIRECTORY="/usr/lib/firefox-developer-edition/"
	elif [[ "${1}" == "beta" ]]; then
		RELEASE_NAME="Firefox Beta"
		check_profile "default-beta"
		PROGRAM_DIRECTORY="/opt/firefox-beta/"
	elif [[ "${1}" == "nightly" ]]; then
		RELEASE_NAME="Firefox Nightly"
		PROGRAM_DIRECTORY="/opt/firefox-nightly/"
		check_profile "default-nightly"
	elif [[ "${1}" == "stable" ]]; then
		RELEASE_NAME="Firefox Stable"
		check_profile "default-release"
		PROGRAM_DIRECTORY="/usr/lib/firefox/"
	elif [[ "${1}" == "esr" ]]; then
		RELEASE_NAME="Firefox ESR"
		check_profile "default-esr"
		PROGRAM_DIRECTORY="/usr/lib/firefox-esr/"
	elif [[ "${1}" == "help" ]]; then
		print_help
		exit
	elif [[ "${1}" == "wolf" ]]; then
		RELEASE_NAME="Librewolf"
		FF_USER_DIRECTORY="$(find "${HOME}/.librewolf" -maxdepth 1 -type d -regextype egrep -regex '.*[a-zA-Z0-9]+.'default-release)"
		PROGRAM_DIRECTORY="/usr/lib/librewolf/"
	else
		echo -ne "Invalid parameter!\n"
		print_help "default-release"
		exit
	fi
else
	# check_profile "(dev-edition|default)-(release|beta|nightly|default|esr)"
	RELEASE_NAME="Stable"
	PROGRAM_DIRECTORY="/usr/lib/firefox*"
	check_profile "default-release"
fi
#----------------------------------------------------#
if [[ -n "$FF_USER_DIRECTORY" ]]; then
	message "[>>] Firefox user profile directory located..."
	CHROME_DIRECTORY="$(find "$FF_USER_DIRECTORY/" -maxdepth 1 -type d -name 'chrome')"
	if [[ -n "$CHROME_DIRECTORY" ]]; then
		# Check if the chrome folder is not empty
		shopt -s nullglob dotglob
		content="${CHROME_DIRECTORY}/"
		#---------------------------------------------------------#
		# If there's a current theme, make a backup
		if [ ${#content[@]} -gt 0 ]; then
			message "[>>] Existing chrome folder detected! Creating a backup to chrome-backup/..."
			backup_dir="${CHROME_DIRECTORY}-backup"
			#---------------------------------------------------------#
			# Create backup folder
			if [[ ! -d "${backup_dir}" ]]; then
				message "[>>] chrome-backup/ folder does not exist! Creating..."
				mkdir "${backup_dir}"
			fi

			mv --backup=t "${CHROME_DIRECTORY}" "${backup_dir}"
			mkdir "${CHROME_DIRECTORY}"
		fi
		# Download theme
		download_ff
	else
		message "[>>] Chrome folder does not exist! Creating one..."
		mkdir "${FF_USER_DIRECTORY}/chrome"
		#---------------------------------------------------------#
		# Check if backup folder exist
		if [[ $? -eq 0 ]]; then
			CHROME_DIRECTORY="${FF_USER_DIRECTORY}/chrome"
			#-----------------------------------------------------------#
			#----------------------Download Theme-----------------------#
			#-----------------------------------------------------------#
			download_ff
		else
			message "[!!] There was a problem while creating the directory. Terminating..."
			exit 1
		fi
	fi
#-----------------------------------------------#
#---------Extreme Error Handling Case-----------#
#-----------------------------------------------#
else
	message "[!!] No ${RELEASE_NAME} user profile detected! Make sure to run Firefox ${RELEASE_NAME} atleast once! Terminating..."
	exit 1
fi
