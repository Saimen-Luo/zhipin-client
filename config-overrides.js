const { override, fixBabelImports, addLessLoader } = require('customize-cra')
module.exports = function override(config, env) {
  // do stuff with the webpack config...
  return config;
};
module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd-mobile',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      "@brand-primary": "#1cae82", // 正常
      "@brand-primary-tap": "#1DA57A", // 按下
    },
  }),
);