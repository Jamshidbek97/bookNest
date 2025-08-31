@echo off
@REM ========================
@REM BookNest Backend Deploy
@REM ========================

echo --- Installing dependencies ---
npm install

echo --- Building project ---
npm run build

echo --- Starting PM2 app in production ---
pm2 start process.config.js --env production

@REM ========================
@REM For development (uncomment if needed)
@REM ========================
@REM git reset --hard
@REM git checkout develop
@REM git pull origin develop
@REM npm install
@REM pm2 start "npm run dev" --name=BookNest

echo --- Deployment complete ---
pause
