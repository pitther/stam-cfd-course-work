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
              '@layout-body-background': 'red',
              '@layout-header-background': 'red',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
