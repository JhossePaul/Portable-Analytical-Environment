const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.dev.js');

const host = process.env.APP_HOST || 'localhost';

module.exports = function () {
  const compiler = webpack(webpackConfig);
  var bundleStart = null;

  compiler.plugin('compile', function () {
    console.log('Bundling');
    bundleStart = Date.now();
  });

  compiler.plugin('done', function () {
    console.log('Bundled in ' + (Date.now() - bundleStart) + ' ms!');
  });

  const bundler = new webpackDevServer(compiler, {
    publicPath: '/',
    hot: true,
    quite: false,
    noInfo: true,
    stats: {
      colors: true
    }
  });

  bundler.listen(3001, host, function () {
    console.log('Bundling project, please wait...');
  });
}
