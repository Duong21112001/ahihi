module.exports = {
  apps: [
    {
      name: 'core-api-lms',
      script: 'npm start',
      ignore_watch: ['node_modules'],
      instances: 1,
      autorestart: true,
      env: {
        NODE_ENV: 'prod',
      },
    },
  ],
};
