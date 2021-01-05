import PluginsInterface from '../app/core/interfaces/plugins.interface';

export const PluginsConfig: PluginsInterface[] = [
  {
    uniqueName: 'pluginOne',
    name: 'Plugin One',
    remoteName: 'pluginOne',
    remotePort: 4201,
  },
  {
    uniqueName: 'pluginTwo',
    name: 'Weather Changer Plugin',
    remoteName: 'pluginTwo',
    remotePort: 4202,
  },
  {
    uniqueName: 'three',
    name: 'Plugin Three',
    remoteName: 'three',
    remotePort: 4203,
  },
];
