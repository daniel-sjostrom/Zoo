/** @type {import('next').NextConfig} */
const nextConfig = {
    webpackDevMiddleware: (config) => {
        // Use polling instead of filesystem events for hot reload
        config.watchOptions = {
            poll: 1000, // Check for changes every second
            aggregateTimeout: 300, // Delay before rebuilding
        };
        return config;
    },
};

module.exports = nextConfig;
