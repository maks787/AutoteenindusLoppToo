// config-overrides.js
module.exports = {
    webpack: (config) => {
        config.resolve.fallback = {
            timers: require.resolve('timers-browserify'),
            stream: require.resolve('stream-browserify'),
            fs: false, // Для исключения использования fs
        };
        return config;
    },
};
