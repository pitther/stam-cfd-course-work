const CracoLessPlugin = require('craco-less');
const { themeColors } = require('./src/styles/theme');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': themeColors.accent,
              '@layout-body-background': themeColors.light,
              '@layout-header-background': themeColors.default,
              '@body-background': themeColors.light,
              '@component-background': themeColors.default,
              '@background-color-light': themeColors.defaultLight,
              '@menu-item-active-bg': themeColors.defaultLight,
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
