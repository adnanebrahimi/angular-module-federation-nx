import PluginsInterface from '../app/core/interfaces/plugins.interface';

export const PluginsConfig: PluginsInterface[] = [
  {
    name: 'Plugin One',
    remoteName: 'pluginOne',
    remotePort: 4201,
  },
  {
    name: 'Weather Changer Plugin',
    remoteName: 'pluginTwo',
    remotePort: 4202,
  },
  {
    name: 'Plugin Three',
    remoteName: 'three',
    remotePort: 4203,
  },
];
