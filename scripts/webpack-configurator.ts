exports.default = {
  pre() {
  },
  config(cfg) {
    cfg.optimization.minimizer.filter(plugin => plugin.constructor.name === 'TerserPlugin').forEach(terser => {
      terser.options.terserOptions.compress.global_defs.ngJitMode = true;
      return terser;
    });
    cfg.plugins.filter(plugin => plugin.constructor.name === 'AngularCompilerPlugin').forEach(angular => {
      angular._transformers = angular._transformers[1];
      return angular;
    });
    return cfg;
  },
  post() {
  }
};

