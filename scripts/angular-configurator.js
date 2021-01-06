const angularConfig = require('../angular.json');
const fs = require('fs')
const utils = require("./utils");

updateAll();

function updateAll() {
  const config = utils.getConfig();
  for (let i of config) {
    updateSingle(i);
  }
}
function updateSingle(config) {
  let edited = false;
  const angConfig = angularConfig.projects[utils.kebabize(config.uniqueName)];
  if (angConfig.architect.serve.options.port !== config.remotePort) {
    edited = true;
    angConfig.architect.serve.options.port = config.remotePort;
    fs.writeFileSync('./angular.json', JSON.stringify(angularConfig, null, 2));
  }
  if (edited) {
    console.log(`${config.uniqueName} configurations updated.`);
  }
}
module.exports = {
  updateSingle,
  updateAll,
}
