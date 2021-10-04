/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const EslintPlugin = require('eslint-webpack-plugin');
const SvgToMiniDataURI = require('mini-svg-data-uri');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const Webpackbar = require('webpackbar');

const rootDir = process.cwd();

module.exports = {
  entry: path.resolve(rootDir, 'src/index.tsx'),
  output: {
    path: path.resolve(rootDir, 'dist'),
    clean: true,
    pathinfo: false, // 不再生成的bundle中生成路径信息，加快速度
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@': path.resolve(rootDir, 'src'),
    },
    modules: [
      path.resolve(rootDir, 'node_modules'),
      path.resolve(rootDir, 'src'),
    ],
  },
  cache: { // 缓存filesystem模式
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],
    },
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
        test: /\.(jpg|png|gif)$/i,
        type: 'asset', // 这里不确定使用inline还是用source方式去转换所以需按下面得配置
        include: /src/,
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 10kb 以下用inline形式转base64，否者直接resource
          },
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        include: /src/,
      },
      {
        test: /\.svg$/i,
        include: /src/,
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
    noParse: (content) => /jquery/.test(content), // 忽略
  },

  plugins: [
    // new BundleAnalyzerPlugin({
    //   analyzerMode: 'disabled',
    //   generateStatsFile: true,
    //   statsOptions: {
    //     source: false,
    //   },
    // }),
    new HtmlWebpackPlugin({
      template: path.join(rootDir, 'public/index.html'),
      title: 'weng的webpack模板',
      hash: true,
      minify: {
        removeAttributeQuotes: true, // 去除多余引号
        collapseWhitespace: true, // 移除空格
        removeComments: true, // 移除注释
      },
    }),
    new EslintPlugin(),
    new Webpackbar(),
  ],
};
