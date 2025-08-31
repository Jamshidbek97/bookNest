#!/bin/bash

#production
# git reset --hard
# git checkout production
# git pull origin production
npm i
npm run build
pm2 start process.config.js --env production

#development
# git reset --hard
# git checkout develops
# git pull origin develop

# npm i
# pm2 start "npm run dev" --name=BookNest
