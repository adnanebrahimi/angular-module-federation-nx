import { LoadRemoteModuleOptions } from '@angular-architects/module-federation';
import PluginsInterface from '../interfaces/plugins.interface';

export default class PluginsUtility {
  static convertToRemoteModuleOptions(plugin: PluginsInterface, production, module?: string): LoadRemoteModuleOptions {
    return {
      exposedModule: './' + (module ?? plugin.uniqueName),
      remoteEntry: production ? `./plugins/${plugin.uniqueName}/${plugin.uniqueName}.js` :
        `http://${window.location.hostname}:${plugin.remotePort}/${plugin.uniqueName}.js`,
      remoteName: plugin.uniqueName,
    };
  }
}
