// @ts-nocheck
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const EslintPlugin = require('eslint-webpack-plugin');

const getWebpackConfig = (env, args) => {
  const mode = args.mode;
  const isDev = mode === "development";
  const isProduction = mode === "production";
  return {
    // js的执行入口文件
    mode: mode || 'production',
    entry: "./src/index.tsx",
    output: {
      filename: "[name].[contenthash:8].js",
      path: path.resolve(__dirname, "./dist"),
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"],
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          use: ["babel-loader"],
          exclude: /node_modules/,
          // include: /src/,
        },
        {
          test: /\.(ts|tsx)$/,
          use: ["ts-loader"],
          exclude: /node_modules/,
          // include: /src/,
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
              loader: "css-loader",
            },
            {
              loader: "postcss-loader",
            },
          ],
        },
        {
          test: /\.less$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
            'less-loader',
          ]
        }
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "[name]_[contenthash:8].css",
        // chunkFilename: "[id].css",
      }),
      new HtmlWebpackPlugin({
        template: "./public/index.html",
      }),
      new EslintPlugin(),
      // new BundleAnalyzer(),
    ],
    devServer: {
      // contentBase: path.join(__dirname, 'dist'),
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
    devtool: "source-map",
  };
};
module.exports = getWebpackConfig;
