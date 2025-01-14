#!/bin/sh
if [ $# -eq 0 ];
then
  DAY=$(date '+%d')
else
  DAY=$1
fi

YEAR=$(date '+%Y')
FOLDER="day$DAY"
CURRENT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
NEW_FOLDER="$CURRENT_DIR/day$DAY"
SESSION=""

if [ ! -d "$NEW_FOLDER" ]; then
  mkdir "$NEW_FOLDER"
fi

if [ ! -f "$NEW_FOLDER/app.js" ]; then
  cp "$CURRENT_DIR/template/app.js" "$NEW_FOLDER/app.js"
fi

touch "$NEW_FOLDER/input.txt"
# if [ ! -s "$NEW_FOLDER/input.txt" ]; then
#   curl https://adventofcode.com/$YEAR/day/$DAY/input --cookie "session=$SESSION" -o "$NEW_FOLDER/input.txt"
# fi

touch "$NEW_FOLDER/example.txt"

