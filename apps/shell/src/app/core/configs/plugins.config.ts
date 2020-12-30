import PluginsInterface from '../interfaces/plugins.interface';

export const PluginsConfig: PluginsInterface[] = [
  {
    name: 'Plugin One',
    remoteName: 'one',
    remoteFileName: 'one.js',
    remotePort: 4201,
    exposedModule: './Module',
    componentName: '',
  },
  {
    name: 'Plugin Two',
    remoteName: 'two',
    remoteFileName: 'two.js',
    remotePort: 4202,
    exposedModule: './Module',
    componentName: '',
  },
  {
    name: 'Plugin Three',
    remoteName: 'three',
    remoteFileName: 'three.js',
    remotePort: 4203,
    exposedModule: './Module',
    componentName: '',
  },
];
