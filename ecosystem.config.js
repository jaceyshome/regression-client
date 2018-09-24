//pm2 deployment ecosystem.config file
module.exports = {
    apps: [{
      name: "regression-test-client",
      script: "index.js"
    }],
    deploy: {
      // "production" is the environment name
      production: {
        // SSH key path, default to $HOME/.ssh
        key: "~/.ssh/wdd-test.pem",
        // SSH user
        user: "ubuntu",
        // SSH host
        host: ["54.79.0.252"],
        // SSH options with no command-line flag, see 'man ssh'
        // can be either a single string or an array of strings
        ssh_options: "StrictHostKeyChecking=no",
        // GIT remote/branch
        ref: "origin/master",
        // GIT remote
        repo: "git@bitbucket.org:jaceyshome/regression-test-client.git",
        // path in the server
        path: "/var/www/apps/regression-test-server",
        // Pre-setup command or path to a script on your local machine
        //'pre-setup': "nvm use 9.3.0; ls -la",
        // Post-setup commands or path to a script on the host machine
        // eg: placing configurations in the shared dir etc
        //'post-setup': "nvm use 9.3.0; ls -la",
        // pre-deploy action
        'pre-deploy-local': "echo 'Deploying regression-test-client'",
        // post-deploy action
        //'post-deploy': "./run-server.sh",
      },
    }
  };
