const config = require('../../webpack.base.config');
module.exports = config(
  'pluginOne',
  false,
  './apps/plugin-one/src/app/features/home-one/home-one.module.ts'
);
