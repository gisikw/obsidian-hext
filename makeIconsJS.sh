#!/bin/bash

cd $(mktemp -d)
curl -s https://game-icons.net/archives/000000/transparent/game-icons.net.svg.zip > game-icons.net.svg.zip && unzip game-icons.net.svg.zip
echo "export const icons: any = {" > "$OLDPWD/src/icons.ts"
find icons -name "*.svg" | while read filename; do
	icon=$(basename $filename)
	echo "'${icon%.*}': \`" >> "$OLDPWD/src/icons.ts"
	cat < $filename >> "$OLDPWD/src/icons.ts"
	echo "\`," >> "$OLDPWD/src/icons.ts"
done
echo "}" >> "$OLDPWD/src/icons.ts"

cd "$OLDPWD"
