// postcss.config.js
module.exports = {
    plugins: [
      require('autoprefixer'),
      require('postcss-safe-parser')  // Add this if you're using postcss-safe-parser
    ]
  };
  