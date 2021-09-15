/* eslint-disable import/no-extraneous-dependencies */
const { merge: mergeWebpackConfig } = require('webpack-merge');
const BundleAnalyzer = require('webpack-bundle-analyzer');
// const path = require('path');
const baseConfig = require('./webpack.base');

module.exports = mergeWebpackConfig(baseConfig, {
  mode: 'development',
  plugins: [
    new BundleAnalyzer(),
  ],
});
