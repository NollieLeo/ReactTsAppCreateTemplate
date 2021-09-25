/* eslint-disable import/no-extraneous-dependencies */
const { merge: mergeWebpackConfig } = require('webpack-merge');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const Webpackbar = require('webpackbar');
const baseConfig = require('./webpack.base');

module.exports = mergeWebpackConfig(baseConfig, {
  mode: 'production',
  plugins: [
    new Webpackbar(),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    minimizer: [
      new CssMinimizerPlugin({ // 加入css的代码压缩
        parallel: 4,
      }),
    ],
  },
  cache: { // 生成环境使用filesystem模式
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],
    },
  },
  devtool: 'hidden-source-map',
});
