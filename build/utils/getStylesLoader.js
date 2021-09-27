// eslint-disable-next-line import/no-extraneous-dependencies
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const getStyleLoader = (type) => {
  const isDev = type === 'development';
  const isExtractOrInnerJsStyle = isDev ? {
    loader: 'style-loader',
  } : {
    loader: MiniCssExtractPlugin.loader,
  };
  return [
    {
      test: /\.css$/,
      include: /src/,
      use: [
        isExtractOrInnerJsStyle,
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
        isExtractOrInnerJsStyle,
        {
          loader: 'css-loader',
        },
        'postcss-loader',
        'less-loader',
      ],
    },
  ];
};
module.exports = getStyleLoader;
