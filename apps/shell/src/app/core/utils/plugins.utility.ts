import { LoadRemoteModuleOptions } from '@angular-architects/module-federation';
import PluginsInterface from '../interfaces/plugins.interface';
import { environment } from '../../../environments/environment';

export default class PluginsUtility {
  static convertToRemoteModuleOptions(plugin: PluginsInterface): LoadRemoteModuleOptions {
    return {
      exposedModule: './' + plugin.remoteName,
      remoteEntry: environment.production ? `./plugins/${plugin.remoteName}/${plugin.remoteName}.js` :
        `http://${window.location.hostname}:${plugin.remotePort}/${plugin.remoteFileName ?? 'remoteEntry.js'}`,
      remoteName: plugin.remoteName,
    };
  }
}
