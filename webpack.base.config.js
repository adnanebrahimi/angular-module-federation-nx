const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const fs = require('fs');
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

let componentFileList = [];

module.exports = function extractConfig(uniqueName, isShell=false) {
  let exposes = { }
  const config = utils.getConfigByName(uniqueName);
  // if (!isShell) {
  //   angularConfigurator.updateSingle(config);
  // }
  const kebabName = utils.kebabize(uniqueName);
  exposes["./"+uniqueName] = config ? `./apps/${kebabName}/src/app/app.module.ts` : ''
  if (!isShell) {
    if (config.components) {
      componentFileList = loadComponentsFileList(`./apps/${kebabName}/src/app/`)
      for (const i of config.components) {
        exposes['./' + i] = getComponentPath(i);
      }
    }
  }
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
function getComponentPath(selector) {
  for(let i of componentFileList) {
    const data = fs.readFileSync(i)
    if (data.includes(`selector: '${selector}'`)) {
      componentFileList = componentFileList.filter(v => v !== i);
      return './' + i;
    }
  }
  throw new Error('Wrong selector: '+selector+', please verify it.');
}
function loadComponentsFileList(filePath) {
  let paths = [];
  fs.readdirSync(filePath).forEach(file => {
    let newPath = path.join(filePath, file);
    if (fs.lstatSync(newPath).isDirectory()){
      paths.push(...loadComponentsFileList(newPath))
    } else {
      if (newPath.substr(newPath.indexOf('.')) === '.component.ts') {
        paths.push(newPath)
      }
    }
  });
  return paths;
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
