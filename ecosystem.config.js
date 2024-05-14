module.exports = {
  apps: [
    {
      name: 'Kosei web',
      script: 'npm start',
      ignore_watch: ['node_modules'],
      instances: 1,
      autorestart: true,
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
