const path = require('path');
const SassPlugin = require('sass-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
    form: [
      './node_modules/jquery/dist/jquery.min.js',
      './node_modules/underscore/underscore-min.js',
      './node_modules/jsonform/lib/jsonform.js',
      './index.js'
    ]
  },
  module: {
    rules: [{
      test: require.resolve('jquery'),
      loader: 'expose-loader?$!expose-loader?jQuery!expose-loader?window.$!expose-loader?window.jQuery'
    }, ]
  },
  plugins: [
    new SassPlugin('./styles.scss', {
      sass: {
        outputStyle: 'compressed'
      },
      sourceMap: false
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ],
  output: {
    filename: 'form.js',
    path: path.resolve(__dirname, 'built')
  }
};