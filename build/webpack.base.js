/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const EslintPlugin = require('eslint-webpack-plugin');
const SvgToMiniDataURI = require('mini-svg-data-uri');

const rootDir = process.cwd();

module.exports = {
  entry: path.resolve(rootDir, 'src/index.tsx'),
  output: {
    filename: '[name].[contenthash:8].js',
    path: path.resolve(rootDir, 'dist'),
    clean: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@': path.resolve(rootDir, 'src'),
    },
    modules: [
      path.resolve(rootDir, 'node_modules'),
    ],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/i,
        use: ['babel-loader?cacheDirectory'],
        exclude: /node_modules/,
        include: /src/,
      },
      {
        test: /\.css$/,
        include: /src/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          // {
          //   loader: "style-loader",
          // },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
          },
        ],
      },
      {
        test: /\.less$/,
        include: /src/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
          },
          'postcss-loader',
          'less-loader',
        ],
      },
      {
        test: /\.(jpg|png|gif)$/i,
        type: 'asset', // 这里不确定使用inline还是用source方式去转换所以需按下面得配置
        parser: {
          dataUrlCondition: {
            maxSize: 100 * 1024, // 100kb 以下用inline形式转base64，否者直接source
          },
        },
      },
      {
        test: /\.svg$/i,
        type: 'asset',
        generator: {
          // 默认是呈现为使用 Base64 算法编码的文件内容
          dataUrl: (content) => SvgToMiniDataURI(content.toString()), // 自定义URL的转换规则，对于匹配到
        },
        parser: {
          dataUrlCondition: {
            maxSize: 100 * 1024, // 100kb 以下用inline形式转base64，否者直接source
          },
        },
      },
    ],
    noParse: (content) => /jquery|lodash/.test(content), // 忽略
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css',
      // chunkFilename: "[id].css",
    }),
    new HtmlWebpackPlugin({
      template: path.join(rootDir, 'public/index.html'),
    }),
    new EslintPlugin(),
    // new BundleAnalyzer(),
  ],
};
