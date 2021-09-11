// @ts-nocheck
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const EslintPlugin = require('eslint-webpack-plugin');
const SvgToMiniDataURI = require('mini-svg-data-uri');
const Webpackbar = require('webpackbar');

const getWebpackConfig = (env, args) => {
  const { mode } = args;
  const isDev = mode === 'development';
  const isProduction = mode === 'production';
  return {
    // js的执行入口文件
    mode: mode || 'production',
    entry: './src/index.tsx',
    output: {
      filename: '[name].[contenthash:8].js',
      path: path.resolve(__dirname, './dist'),
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/i,
          use: ['babel-loader'],
          exclude: /node_modules/,
          include: /src/,
        },
        {
          test: /\.css$/i,
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
          test: /\.less$/i,
          include: /src/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
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
    },
    plugins: [
      new Webpackbar(),
      new MiniCssExtractPlugin({
        filename: '[name]_[contenthash:8].css',
        // chunkFilename: "[id].css",
      }),
      new HtmlWebpackPlugin({
        template: './public/index.html',
      }),
      new EslintPlugin(),
      // new BundleAnalyzer(),
    ],
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true, // 开启Gzip压缩
      port: 9000,
      hot: true,
      open: true,
      // noInfo: true,
      // overlay: false,
      overlay: {
        error: true,
      },
      // host: '0.0.0.0',
      // contentBase: path.join(__dirname, 'public'),
    },
    devtool: 'source-map',
  };
};
module.exports = getWebpackConfig;
