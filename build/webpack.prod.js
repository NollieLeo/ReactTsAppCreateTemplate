/* eslint-disable import/no-extraneous-dependencies */
const { merge: mergeWebpackConfig } = require('webpack-merge');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TeserWebpackPlugin = require('terser-webpack-plugin');
const PurgeCSSPlugin = require('purgecss-webpack-plugin');
const glob = require('glob');
const baseConfig = require('./webpack.base');
const getStyleLoader = require('./utils/getStylesLoader');

module.exports = mergeWebpackConfig(baseConfig, {
  mode: 'production',
  output: {
    filename: '[name].[contenthash:8].bundle.js', // 仅在生产环境添加hash，增加缓存，dev不需要
  },
  module: {
    rules: [
      ...getStyleLoader('production'),
    ],
  },
  plugins: [
    // CSS Tree Shaking
    new MiniCssExtractPlugin({
      filename: 'style/[name]_[contenthash:8].css',
      // chunkFilename: "[id].css",
    }),
    new PurgeCSSPlugin({
      paths: glob.sync('src/**/*', { nodir: true }),
    }),
  ],
  optimization: {
    // 通过 splitChunks 把 react 等公共库抽离出来，不重复引入占用体积。
    splitChunks: {
      chunks: 'all',
      // 重复打包问题
      cacheGroups: {
        vendors: { // node_modules里的代码
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          // name: 'vendors', 一定不要定义固定的name
          priority: 10, // 优先级
          enforce: true,
        },
      },
    },
    sideEffects: true, // 开启tree shaking，package里头要配置成false或者不配置，或者数组，具体查一下
    runtimeChunk: true,
    usedExports: true,
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({ // 加入css的代码压缩
        parallel: 4,
      }),
      new TeserWebpackPlugin({
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
  devtool: undefined, // 'hidden-source-map'
});
