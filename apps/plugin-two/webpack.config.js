const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(
  path.join(__dirname, '../../tsconfig.base.json'),
  ['@cac-pos/weather']);

module.exports = {
  output: {
    chunkFilename: '[name]-[contenthash].js',
    uniqueName: "two"
  },
  optimization: {
    // Only needed to bypass a temporary bug
    runtimeChunk: false
  },
  plugins: [
    new ModuleFederationPlugin({

        // For remotes (please adjust)
        name: "two",
        filename: "remoteEntry.js",
        exposes: {
          './Module': './apps/plugin-two/src/app/features/home-two/home-two.module.ts',
        },

        // For hosts (please adjust)
        // remotes: {
        //     "shell": "shell@http://localhost:4200/remoteEntry.js",
        //     "plugin-one": "plugin-one@http://localhost:3000/remoteEntry.js",

        // },

        shared: {
          "@angular/core": { singleton: true, strictVersion: true },
          "@angular/common": { singleton: true, strictVersion: true },
          "@angular/router": { singleton: true, strictVersion: true },

          ...sharedMappings.getDescriptors()
        }

    }),
    sharedMappings.getPlugin(),
  ],
};
