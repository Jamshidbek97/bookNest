const { watch } = require("fs-extra");

module.exports = {
  apps: [
    {
      name: "bookNest",
      cwd: "./",
      script: "./dist/server.js",
      watch: false,
      env_production: {
        NODE_ENV: "production",
      },
      env_development: {
        NODE_ENV: "development",
      },
      instance: 1,
      exec_mode: "cluster",
    },
  ],
};

// Run this command `pm2 start process.config.js --env production`
