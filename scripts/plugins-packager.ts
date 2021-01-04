import * as path from 'path';
import * as fs from 'fs';

const DIST_PATH = path.join(__dirname, '../dist/apps/');
const APP_NAME = 'shell';
const PLUGINS_PATH = path.join(DIST_PATH, APP_NAME, './plugins');

let VERBOSE = true;
process.argv.forEach(value => {
  if (value === '-v') {
    VERBOSE = true;
  }
});

try {
  if (fs.existsSync(PLUGINS_PATH)) {
    deleteFolderRecursive(PLUGINS_PATH);
  }
  fs.mkdirSync(PLUGINS_PATH);

  for (let name of fs.readdirSync(DIST_PATH)) {
    try {
      if (name !== APP_NAME) {
        const pluginPath = path.join(DIST_PATH, name);
        const newPluginPath = path.join(PLUGINS_PATH, name);
        fs.mkdirSync(newPluginPath);
        for (let file of fs.readdirSync(pluginPath)) {
          if (file !== 'index.html' && file !== 'favicon.ico') {
            const filePath = path.join(pluginPath, file);
            const newFilePath = path.join(newPluginPath, file);
            fs.copyFileSync(filePath, newFilePath);
          }
        }
        console.log(`${name} packaged.`);
      }
    }catch (e) {
      console.error(`${name} failed `);
      if (VERBOSE) {
        console.error(e);
      }
    }
  }
}catch (e) {
  console.error('Plugin packaging operation failed ');
  if (VERBOSE) {
    console.error(e);
  }
}

function deleteFolderRecursive(filePath: string) {
  if (fs.existsSync(filePath)) {
    fs.readdirSync(filePath).forEach((file) => {
      const curPath = path.join(filePath, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        deleteFolderRecursive(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(filePath);
  }
}
