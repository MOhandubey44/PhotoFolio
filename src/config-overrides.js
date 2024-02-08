const path = require("path");

module.exports = function override(config, env) {
  // Add a fallback for 'https' using 'https-browserify'
  config.resolve.fallback = {
    ...config.resolve.fallback,
    https: require.resolve("https-browserify"),
  };

  return config;
};
