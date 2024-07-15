const webpack = require('webpack')

module.exports = function overide(config){
    const fallback = config.resolve.fallback||{};

    Object.assign(fallback,{

        "path": require.resolve("path-browserify"),
        "os": require.resolve("os-browserify/browser"),
        "crypto": require.resolve("crypto-browserify"),
        "buffer": require.resolve("buffer/"),
        "stream": require.resolve("stream-browserify"),
        "vm": require.resolve("vm-browserify"),


    });

    config.resolve.fallback = fallback;
    config.plugins = (config.plugins || [ ]).concat([
        new webpack.ProvidePlugin({
            process: "process/browser",
        }),
    ])
    return config;
}