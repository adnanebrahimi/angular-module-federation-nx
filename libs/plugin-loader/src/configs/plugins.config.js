const PluginsConfig = [
  {
    uniqueName: 'pluginOne',
    name: 'Plugin One',
    remoteName: 'pluginOne',
    remotePort: 4201,
    modulePath: './apps/plugin-one/src/app/features/home-one/home-one.module.ts',
  },
  {
    uniqueName: 'pluginTwo',
    name: 'Weather Changer Plugin',
    remoteName: 'pluginTwo',
    remotePort: 4202,
    modulePath: './apps/plugin-two/src/app/features/home-two/home-two.module.ts',
  },
  {
    uniqueName: 'three',
    name: 'Plugin Three',
    remoteName: 'three',
    remotePort: 4203,
    modulePath: './apps/three/src/app/features/home-three/home-three.module.ts',
  },
];
module.exports = PluginsConfig
