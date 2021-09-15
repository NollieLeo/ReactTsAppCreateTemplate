// @ts-nocheck
module.exports = {
  plugins: [
    [
      require('autoprefixer')({
        overrideBrowserslist: [
          'last 2 versions',
          'Firefox ESR',
          '> 1%',
          'ie >= 8',
          'iOS >= 8',
          'Android >= 4',
        ],
      }),
    ],
  ],
};
