/**
 * @param {string|Buffer} content 源文件的内容
 * @param {object} [map] 可以被 https://github.com/mozilla/source-map 使用的 SourceMap 数据
 * @param {any} [meta] meta 数据，可以是任何内容
 */
function aloader(content, map, meta) {
  console.log('begin to excuting loader');
  let tempContent = content;
  tempContent += 'aLoader]';
  return `module.exports = '${tempContent}'`;
}

aloader.pitch = function (remainingRequest, precedingRequest, data) {
  console.log('开始执行aLoader Pitching Loader');
  console.log(remainingRequest, precedingRequest, data);
};

module.exports = aloader;
