# build
npm run build

# save the latest commit hash as a string
LOGSTRING=$(git log)
COMMIT=$(echo $LOGSTRING | awk '{print $2}')

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m "deploy (commit: $COMMIT)"


# if you are using HTTPS/2FA authentication
# git push -f https://github.com/<USER-NAME>/<REPO>.git master:gh-pages
git push -f https://github.com/DouglasGuacaran/vue-pokeapi-no-evolution master:gh-pages

cd -