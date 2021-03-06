'use strict';

var webpack = require('webpack');
var rupture = require('rupture');
var autoprefixer = require('autoprefixer');
var mixins = require('stylus-mixins');
var TextPlugin = require('extract-text-webpack-plugin');
var HtmlPlugin = require('html-webpack-plugin');
var Svg = require('webpack-svgstore-plugin');

module.exports = function (rootDir) {
  // assets source dir
  var srcInnerDir = '/app';
  var srcAbsoluteDir = rootDir + srcInnerDir;

  // assets destination dir
  var destInnerDir = '/web/assets';
  var destAbsoluteDir = rootDir + destInnerDir;

  // import package config
  var packageConfig = require(rootDir + '/package');

  return {
    // application entry points list
    entry: {
      application: srcAbsoluteDir + '/index.js',
      vendors: Object.keys(packageConfig.dependencies)
    },

    // modules output configurations
    output: {
      path: destAbsoluteDir,
      filename: '[name].[chunkhash].js',
      chunkFilename: '[id].[chunkhash].js',
      publicPath: '/assets/'
    },

    // application configuration
    resolve: {
      modulesDirectories: ['node_modules'],
      alias: {
        '@core': srcAbsoluteDir,
        '@views': srcAbsoluteDir + '/views'
      }
    },

    // modules configuration
    module: {
      loaders: [
        {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
        {test: /\.jade$/, loader: 'jade-loader'},
        {test: /\.css$/, loader: 'style-loader!css-loader'},
        {test: /\.styl$/, loader: TextPlugin.extract('style-loader', 'css-loader!postcss-loader!stylus-loader')},
        {test: /\.(eot|woff|woff2|ttf|svg|png|ico|jpg|jpeg|gif|mp3|wav)$/,
          loader: 'file-loader?context=./app/assets/&name=[path][name].[hash].[ext]'}
      ]
    },

    // postprocessor configuration
    postcss: [autoprefixer({browsers: ['last 5 versions']})],

    // stylus configuration
    stylus: {
      use: [rupture(), mixins()]
    },

    // plugins configurations
    plugins: [
      // vendors entry point
      new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.[chunkhash].js'),

      // move require('style.css') into a separate ccs files
      new TextPlugin('[name].[chunkhash].css'),

      // generate svg sprite
      new Svg(srcAbsoluteDir + '/vector/**/*.svg', '', {
        name: 'sprite.[hash].svg',
        chunk: 'application',
        prefix: '',
        svgoOptions: {
          convertStyleToAttrs: true
        }
      }),

      // generate index.html
      new HtmlPlugin({
        title: 'Веб Студия Webulla',
        description: 'Мы делаем сайты. И делаем это на высшем уровне.',
        chunks: ['application', 'vendors'],
        filename: '../index.html',
        template: './app/templates/index.jade',
        inject: false
      })
    ]
  };
};
