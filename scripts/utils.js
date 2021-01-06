const pluginsConfig = require('../apps/shell/src/configs/plugins.config');

function getConfig() {
  return pluginsConfig
}
function getConfigByName(uniqueName) {
  for(let i of pluginsConfig) {
    if (i.uniqueName === uniqueName) {
      return i;
    }
  }
  return undefined;
}
function kebabize(str) {
  return str.split('').map((letter, idx) => {
    return letter.toUpperCase() === letter
      ? `${idx !== 0 ? '-' : ''}${letter.toLowerCase()}`
      : letter;
  }).join('');
}
module.exports = {
  getConfig,
  getConfigByName,
  kebabize,
}
