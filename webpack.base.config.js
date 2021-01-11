const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");
const utils = require('./scripts/utils');
// const angularConfigurator = require('./scripts/angular-configurator');

const singletonLibraries = ['@cac-pos/weather', '@cac-pos/plugin-loader'];
const nonSingletonLibraries = [];
const tsConfigPath = path.join(__dirname, './tsconfig.base.json')

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(
  tsConfigPath,
  [...singletonLibraries, ...nonSingletonLibraries]);

module.exports = function extractConfig(uniqueName, isShell=false) {
  let exposes = { }
  const config = utils.getConfigByName(uniqueName);
  // if (!isShell) {
  //   angularConfigurator.updateSingle(config);
  // }
  const kebabName = utils.kebabize(uniqueName);
  exposes["./"+uniqueName] = config ? `./apps/${kebabName}/src/app/app.module.ts` : ''
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
// function getLibraryPaths() {
//   let libs = {};
//   const tsConfig = require(tsConfigPath);
//   const rootPath = path.normalize(path.dirname(tsConfigPath));
//   for(let i of [...singletonLibraries, ...nonSingletonLibraries]) {
//     try {
//       const mappings = tsConfig.compilerOptions.paths[i];
//       //const importPath = path.normalize(path.join(rootPath,mappings[0])).replace('.ts', '');
//       const importPath = mappings[0].replace('.ts', '');
//       libs[i] = {
//         singleton: singletonLibraries.includes(i),
//         import: importPath,
//         requiredVersion: false
//       }
//     } catch (e) {
//       console.error(i + ' is not loaded', e);
//     }
//   }
//   return libs;
// }
