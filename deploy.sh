#!/usr/bin/env sh

npm run build
# cp dist/index.html dist/404.html
# git add dist -f
# git commit -m "Adding dist"
# git subtree push --prefix dist origin gh-pages

cp -r ../META-INF dist/
cp -r ../WEB-INF dist/