import { LoadRemoteModuleOptions } from '@angular-architects/module-federation';
import PluginsInterface from '../interfaces/plugins.interface';

export default class PluginsUtility {
  static convertToRemoteModuleOptions(plugin: PluginsInterface, production): LoadRemoteModuleOptions {
    return {
      exposedModule: './' + plugin.remoteName,
      remoteEntry: production ? `./plugins/${plugin.remoteName}/${plugin.remoteName}.js` :
        `http://${window.location.hostname}:${plugin.remotePort}/${plugin.remoteName}.js`,
      remoteName: plugin.remoteName,
    };
  }
}
