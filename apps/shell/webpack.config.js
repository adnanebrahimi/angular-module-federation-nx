const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(
  path.join(__dirname, '../../tsconfig.base.json'),
  ['@cac-pos/weather']);

module.exports = {
  output: {
    uniqueName: "shell"
  },
  optimization: {
    // Only needed to bypass a temporary bug
    runtimeChunk: false
  },
  plugins: [
    new ModuleFederationPlugin({

        // For remotes (please adjust)
        // name: "shell",
        // filename: "remoteEntry.js",
        // exposes: {
        //     './Component': './apps/shell/src/app/app.component.ts',
        // },

        // For hosts (please adjust)
        remotes: {
            "one": "one@http://localhost:3000/remoteEntry.js",
            "two": "two@http://localhost:3500/remoteEntry.js",
            "three": "three@http://localhost:5500/remoteEntry.js",

        },

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
