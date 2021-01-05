const config = require('../../webpack.base.config');
module.exports = config(
  'pluginTwo',
  false,
  './apps/plugin-two/src/app/features/home-two/home-two.module.ts'
);
