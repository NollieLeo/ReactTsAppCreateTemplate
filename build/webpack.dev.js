/* eslint-disable import/no-extraneous-dependencies */
const { merge: mergeWebpackConfig } = require('webpack-merge');
const Webpackbar = require('webpackbar');
const path = require('path');
const baseConfig = require('./webpack.base');

const rootDir = process.cwd();

module.exports = mergeWebpackConfig(baseConfig, {
  mode: 'development',
  plugins: [
    new Webpackbar(), // 本地开发才有
  ],
  cache: {
    type: 'memory', // dev环境开启memory类型缓存
  },
  devServer: {
    contentBase: path.join(rootDir, 'dist'),
    compress: true, // 开启Gzip压缩
    port: 9000,
    hot: true,
    open: true,
    stats: 'errors-only', // 终端仅仅打印error
    // noInfo: true,
    // overlay: false,
    overlay: {
      error: true,
    },
    // host: '0.0.0.0',
    // contentBase: path.join(rootDir, 'public'),
  },
  devtool: 'eval-cheap-module-source-map', // 本地开发用这个cheap
});
