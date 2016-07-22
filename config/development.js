'use strict';

module.exports = function(rootDir) {
  return {
    context: rootDir,
    debug: true,
    devtool: 'eval',
    output: {
      publicPath: '/'
    },
    devServer: {
      contentBase: rootDir + '/app',
      proxy: {
        "*": 'http://localhost:3000'
      }
    }
  }
};
