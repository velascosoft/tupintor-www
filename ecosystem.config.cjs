module.exports = {
    apps: [
        {
            name: "tupintor",
            script: "./server.js",
            env: { 
                PORT: 3000,
                HOSTNAME: "0.0.0.0"
            },
            watch: false,
            autorestart: true,
            max_restarts: 3,
            restart_delay: 10000,
        }
    ]
}