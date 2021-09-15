/* eslint-disable import/no-extraneous-dependencies */
const { merge: mergeWebpackConfig } = require('webpack-merge');
const Webpackbar = require('webpackbar');
const baseConfig = require('./webpack.base');

module.exports = mergeWebpackConfig(baseConfig, {
  mode: 'production',
  devtool: 'hidden-source-map',
  plugins: [
    new Webpackbar(), // 开发才有
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  cache: { // 生成环境使用filesystem模式
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],
    },
  },
});
