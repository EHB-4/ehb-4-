module.exports = {
  apps: [
    {
      name: 'gosellr',
      script: 'npm',
      args: 'start',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      // Logging
      log_file: './logs/combined.log',
      out_file: './logs/out.log',
      error_file: './logs/error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',

      // Monitoring
      watch: false,
      max_memory_restart: '1G',

      // Restart policy
      min_uptime: '10s',
      max_restarts: 10,

      // Health check
      health_check_grace_period: 3000,
      health_check_fatal_exceptions: true,

      // Performance
      node_args: '--max-old-space-size=2048',

      // Environment variables
      env_file: '.env.production',
    },
  ],

  deploy: {
    production: {
      user: 'deploy',
      host: 'your-server-ip',
      ref: 'origin/main',
      repo: 'git@github.com:your-username/gosellr.git',
      path: '/var/www/gosellr',
      'pre-deploy-local': '',
      'post-deploy':
        'npm install && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
    },
  },
};
