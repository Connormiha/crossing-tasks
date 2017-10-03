# /usr/bin/env bash

npm run build:gh
git checkout gh-names
rm -fr static index.html 404.html
name="${PWD##*/}"
cp build/"${name}"/index.html ./
cp index.html 404.html
cp -R build/"${name}"/* ./
git add .
git commit -m "Update build :arrow_up:"
git push origin gh-pages
