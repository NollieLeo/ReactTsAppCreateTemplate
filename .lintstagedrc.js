// .lintstagedrc.js 文件中的代码如下
module.exports = {
  "src/**/\*{js,jsx,ts,tsx}": ["npm run jslint"],
  "src/**/*.{less,css,sass}": ["npm run csslint"],
}
