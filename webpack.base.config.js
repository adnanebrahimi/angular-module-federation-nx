const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");
const utils = require('./scripts/utils');
// const angularConfigurator = require('./scripts/angular-configurator');

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(
  path.join(__dirname, './tsconfig.base.json'),
  ['@cac-pos/weather']);

module.exports = function extractConfig(uniqueName, isShell=false) {
  let exposes = { }
  const config = utils.getConfigByName(uniqueName);
  // if (!isShell) {
  //   angularConfigurator.updateSingle(config);
  // }
  exposes["./"+uniqueName] = config ? config.modulePath : ''
  return {
    output: {
      uniqueName: uniqueName
    },
    optimization: {
      // Only needed to bypass a temporary bug
      runtimeChunk: false
    },
    plugins: [
      new ModuleFederationPlugin({
        name: !isShell ? uniqueName : undefined,
        filename: !isShell ? `${uniqueName}.js` : undefined,
        exposes: !isShell ? exposes : undefined,
        shared: {
          "@angular/core": { singleton: true, strictVersion: true },
          "@angular/common": { singleton: true, strictVersion: true },
          "@angular/router": { singleton: true, strictVersion: true },

          ...sharedMappings.getDescriptors()
        }

      }),
      sharedMappings.getPlugin(),
    ],
  }
}
