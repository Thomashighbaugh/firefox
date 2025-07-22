#!/usr/bin/env bash

## Mac
## arg1 - required:
##     add: add UUIDs found in internal_UUID.txt to corresponding .css files
##     remove: remove UUIDs found in internal_UUID.txt from corresponding .css files
## arg2 - optional:
##     nogen: don't generate internal_UUIDs.txt before adding/removing
## designed for users using userContent_imports.css
## entries in internal_UUIDs.txt should take on the following format:  webextension_id=internal_UUID
## author: @overdodactyl
## version: 1.0



method="${1:-}"
uuid_finder="${2:-gen}"



# Determine whether UUIDs will be inserted or removed
if [ "$method" = "add" ]; then
  var1=0
  var2=1
  var3="inserted"
elif [ "$method" = "remove" ]; then
  var1=1
  var2=0
  var3="removed"
else
  echo "must pass argument add or remove"
  exit 1
fi

currdir=$(pwd)
sfp=$(readlink -f "${BASH_SOURCE[0]}" 2>/dev/null || realpath "${BASH_SOURCE[0]}" 2>/dev/null)
if [ -z "$sfp" ]; then sfp="${BASH_SOURCE[0]}"; fi
cd "$(dirname "$sfp")" && cd ..

if [ "$uuid_finder" != "nogen" ]; then
  ## Generate internal_UUIDs.txt
  touch "scripts/internal_UUIDs.txt"

  ## Get installed extensions from prefs.js
  line=$(sed -n -e 's/^user_pref("extensions.webextensions.uuids", "{\(.*\)}");/\1/p' ./prefs.js)

  ## Clear internal_UUIDs.txt
  > scripts/internal_UUIDs.txt

  ## Write to internal_UUIDs.txt
  IFS=',' read -ra EXTS <<< "$line"
  for i in "${EXTS[@]}"; do
    # Extract extension ID and UUID
    id=$(echo "$i" | sed -n 's/"\([^"]*\)":".*/\1/p')
    uuid=$(echo "$i" | sed -n 's/.*:"\([^"]*\)"/\1/p')
    if [ -n "$id" ] && [ -n "$uuid" ]; then
      echo "$id=$uuid" >> scripts/internal_UUIDs.txt
    fi
  done
  echo "scripts/internal_UUIDs.txt was created"
fi

## Insert/remove any UUIDs defined in internal_UUIDs.txt into userContent.css
while IFS='' read -r line || [[ -n "$line" ]]; do
    IFS='=' read -r id uuid <<< "$line"
    if [ -z "$id" ] || [ -z "$uuid" ]; then
      continue
    fi
    for filename in css/userContent-files/webextension-tweaks/*.css; do
      if [ -f "$filename" ]; then
        if [ "$method" = "add" ]; then
          sed -i "s/$id/$uuid/g" "$filename"
        else
          sed -i "s/$uuid/$id/g" "$filename"
        fi
      fi
    done
    if [ -f "userContent.css" ]; then
      if [ "$method" = "add" ]; then
        sed -i "s/$id/$uuid/g" "userContent.css"
      else
        sed -i "s/$uuid/$id/g" "userContent.css"
      fi
    fi
done < scripts/internal_UUIDs.txt
echo "UUIDs were $var3"

