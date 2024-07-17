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

# Define global variables
FF_USER_DIRECTORY=""
CHROME_DIRECTORY=""
RELEASE_NAME=""
PROGRAM_DIRECTORY=""
THEME_DIRECTORY="/tmp/firefox"

# Function to print messages
message() {
	printf "%s\n" "$*" >&2
}

# Function to download the theme
download_ff() {
	message "[>>] Downloading theme..."

	# Clean up previous download if it exists
	if [[ -d "${THEME_DIRECTORY}" ]]; then
		sudo rm -rf "${THEME_DIRECTORY}" >/dev/null 2>&1
	fi

	# Download the theme from GitHub
	sudo git clone https://github.com/Thomashighbaugh/firefox "${THEME_DIRECTORY}" >/dev/null 2>&1

	# Check if download was successful
	if [[ $? -eq 0 ]]; then
		message "[>>] Copying..."
		FF_THEME="${THEME_DIRECTORY}/"

		# Copy theme files to the user's chrome directory
		cp -r "${FF_THEME}"* "${CHROME_DIRECTORY}"

		# Copy patches to the program directory
		sudo cp -rvf "${THEME_DIRECTORY}/patches/root"/* "${PROGRAM_DIRECTORY}"

		# Backup existing user.js
		if [ -e "${CHROME_DIRECTORY}/../user.js" ]; then
			message "[>>] Existing user.js detected! Creating backup to user-prefs-backup/..."

			user_pref_backup_dir="${CHROME_DIRECTORY}/../user-prefs-backup"

			# Create backup directory if it doesn't exist
			if [[ ! -d "${user_pref_backup_dir}" ]]; then
				message "[>>] user-prefs-backup/ folder does not exist! Creating..."
				mkdir "${user_pref_backup_dir}"
			fi

			# Move user.js to the backup directory
			mv --backup=t "${CHROME_DIRECTORY}/../user.js" "${user_pref_backup_dir}"
		fi

		# Move new user.js to the main profile directory
		mv "${CHROME_DIRECTORY}/user.js" "${CHROME_DIRECTORY}/../"

		# Clean up temporary theme directory
		if [[ $? -eq 0 ]]; then
			sudo rm -rf "${THEME_DIRECTORY}" >/dev/null 2>&1
		else
			message " [!!] There was a problem while copying the files. Terminating..."
			exit
		fi
	else
		# Download failed
		message " [!!] There was a problem while downloading the theme. Terminating..."
		exit
	fi

	# Print success message
    clear
	echo "#########################################"
	echo "##   _______ __                        ##"
	echo "##  |   |   |__|.-----.-----.-----.    ##"
	echo "##  |       |  ||  _  |  _  |__ --|    ##"
	echo "##  |___|___|__||___  |___  |_____|    ##"
	echo "##              |_____|_____|          ##"
	echo "##   ______                            ##"
	echo "##  |   __ \.-----.-----.-----.-----.  ##"
	echo "##  |   __ <|  _  |__ --|  _  |     |  ##"
	echo "##  |______/|_____|_____|_____|__|__|  ##"
  echo "##                                     ##"
	echo "#########################################"
	echo
    message "#########################################"
    message "##                                     ##"
    message "## Please restart your browser!        ##"
    message "##                                     ##"
    message "#########################################"
    echo
    echo
}

# Function to check the Firefox profile directory
function check_profile() {
  
  FF_USER_DIRECTORY="$(find "${HOME}/.mozilla/firefox/" -maxdepth 1 -type d -regextype egrep -regex '.*[a-zA-Z0-9]+.'${1})" 
}

# Function to print help message
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

	# Check which Firefox version is selected and set the corresponding variables
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
		print_help
		exit
	fi
else
	# Default to stable Firefox if no argument is provided
	RELEASE_NAME="Stable"
	PROGRAM_DIRECTORY="/usr/lib/firefox*"
	check_profile "default-release"
fi

#----------------------------------------------------#
# Check if the Firefox user profile directory is found
if [[ -n "$FF_USER_DIRECTORY" ]]; then
	message "[>>] Firefox user profile directory located..."

	# Find the chrome directory within the user profile
	CHROME_DIRECTORY="$(find "$FF_USER_DIRECTORY/" -maxdepth 1 -type d -name 'chrome')"

	# Check if the chrome directory exists
	if [[ -n "$CHROME_DIRECTORY" ]]; then
		# Enable nullglob and dotglob to make sure that we handle cases where the chrome directory is empty
		shopt -s nullglob dotglob

		# Check if the chrome directory has contents
		content="${CHROME_DIRECTORY}/"
		if [ ${#content[@]} -gt 0 ]; then
			message "[>>] Existing chrome folder detected! Creating a backup to chrome-backup/..."

			backup_dir="${CHROME_DIRECTORY}-backup"

			# Create backup directory if it doesn't exist
			if [[ ! -d "${backup_dir}" ]]; then
				message "[>>] chrome-backup/ folder does not exist! Creating..."
				mkdir "${backup_dir}"
			fi

			# Backup the existing chrome directory
			mv --backup=t "${CHROME_DIRECTORY}" "${backup_dir}"
			mkdir "${CHROME_DIRECTORY}"
		fi

		# Download the theme
		download_ff
	else
		message "[>>] Chrome folder does not exist! Creating one..."

		# Create the chrome directory
		mkdir "${FF_USER_DIRECTORY}/chrome"

		# Check if directory creation was successful
		if [[ $? -eq 0 ]]; then
			CHROME_DIRECTORY="${FF_USER_DIRECTORY}/chrome"
			download_ff
		else
			message "[!!] There was a problem while creating the directory. Terminating..."
			exit 1
		fi
	fi
else
	# No user profile found, exit with error message
	message "[!!] No ${RELEASE_NAME} user profile detected! Make sure to run Firefox ${RELEASE_NAME} at least once! Terminating..."
	exit 1
fi
