const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(
  path.join(__dirname, '../../tsconfig.base.json'),
  [/* mapped paths to share */]);

module.exports = {
  output: {
    uniqueName: "one"
  },
  optimization: {
    // Only needed to bypass a temporary bug
    runtimeChunk: false
  },
  plugins: [
    new ModuleFederationPlugin({

        // For remotes (please adjust)
        name: "one",
        filename: "remoteEntry.js",
        exposes: {
            './Module': './apps/plugin-one/src/app/features/home-one/home-one.module.ts',
        },

        // For hosts (please adjust)
        // remotes: {
        //     "shell": "shell@http://localhost:4200/remoteEntry.js",
        //     "plugin-two": "plugin-two@http://localhost:4200/remoteEntry.js",

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
