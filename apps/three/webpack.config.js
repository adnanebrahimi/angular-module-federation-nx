const config = require('../../webpack.base.config');
module.exports = config(
  'three',
  false,
  './apps/three/src/app/features/home-three/home-three.module.ts'
);
