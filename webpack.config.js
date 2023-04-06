// webpack.config.js

module.exports = {
    // other config options
    resolve: {
      fallback: {
        "crypto": require.resolve("crypto-browserify"),
        "stream": require.resolve("stream-browserify"),
        "util": require.resolve("util/")
      }
    }
  };
  
  