let angularConfig = require('../angular.json');
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
  let newAngularConfig = JSON.parse(JSON.stringify(angularConfig));
  configProject(newAngularConfig.projects[utils.kebabize(config.uniqueName)], config);
  if (JSON.stringify(angularConfig) !== JSON.stringify(newAngularConfig)) {
    console.log(`${config.uniqueName} configurations updated.`);
    fs.writeFileSync('./angular.json', JSON.stringify(newAngularConfig, null, 2));
    angularConfig = newAngularConfig;
  }
}
function configProject(angular ,config) {
  angular.architect.build.builder = 'ngx-build-plus:browser'
  angular.architect.build.options.plugin = "~scripts/webpack-configurator.ts"
  angular.architect.build.configurations.production.plugin = "~scripts/webpack-configurator.ts"
  angular.architect.serve.options.port = config.remotePort;
}
module.exports = {
  updateSingle,
  updateAll,
}
