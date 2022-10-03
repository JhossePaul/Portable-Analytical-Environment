const webpack = require('webpack');
const helpers = require('./helpers');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');

const HMR = helpers.hasProcessFlag('hot');
const METADATA = {
  title: 'Portable Analytical Environment',
  baseUrl: '/',
  isDevServer: helpers.isWebpackDevServer()
};

module.exports = function (options) {
  isProd = options.env === 'production';
  return {
    metadata: METADATA,
    entry: {
      'polyfills': './src/polyfills.browser.js',
      'vendor': './src/vendor.browser.js',
      'main': './src/main.browser.js'
    },
    resolve: {
      extensions: ['', '.js', '.json'],
      root: helpers.root('src'),
      modulesDirectories: ['node_modules']
    },
    module: {
      preLoaders: [
        {
          test: /\.js$/,
          loader: 'eslint',
          exclude: /node_modules/
        }
      ],

      loaders: [
        {
          test: /\.js$/,
          loaders: ['ng-annotate', 'babel'],
          exclude: [/app\/lib/, /node_modules/]
        },
        {
          test: /\.json$/,
          loader: 'json',
        },
        {
          test: /\.csv$/,
          loader: 'dsv',
        },
        {
          test: /\.css$/,
          loaders: ['style', 'css']
        },
        {
          test: /\.html$/,
          loader: 'raw',
          exclude: [helpers.root('src/index.html')]
        },
        {
          test: /\.(jpg|png|gif)$/,
          loader: 'file'
        },
        {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'url-loader?limit=10000&mimetype=application/font-woff'
        },
        {
          test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'file-loader'
        }
      ]
    },
    plugins: [
      new AssetsPlugin({
        path: helpers.root('public'),
        filename: 'webpack-assets.json',
        prettyPrint: true
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: ['polyfills', 'vendor'].reverse()
      }),
      new CopyWebpackPlugin([{
        from: 'src/assets',
        to: 'assets'
      }]),
      new HtmlWebpackPlugin({
        template: 'src/index.html',
        chunksSortMode: 'dependency'
      }),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        'window.jquery': 'jquery',
        'd3': 'd3',
        '_': 'lodash'
      })
    ],
    /*
    node: {
      global: 'window',
      crypto: 'empty',
      process: true,
      module: false,
      clearImmediate: false,
      setImmediate: false
    }
    */
  };
};
