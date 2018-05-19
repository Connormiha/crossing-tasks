// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.

const mainWebpackConfig = require('../webpack.config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Export a function. Accept the base config as the only param.
module.exports = (storybookBaseConfig, configType) => {
  // configType has a value of 'DEVELOPMENT' or 'PRODUCTION'
  // You can change the configuration based on that.
  // 'PRODUCTION' is used when building the static version of storybook.

  // Make whatever fine-grained changes you need
  storybookBaseConfig.module.rules = [...storybookBaseConfig.module.rules, ...mainWebpackConfig.module.rules]
  storybookBaseConfig.resolve.extensions = mainWebpackConfig.resolve.extensions;
  storybookBaseConfig.resolve.modules = mainWebpackConfig.resolve.modules;
  storybookBaseConfig.plugins.push(
    new MiniCssExtractPlugin(
      {
        filename: `/static/[hash].css`.replace(/^\//, ''),
        chunkFilename: `/static/[id][hash].css`.replace(/^\//, ''),
      }
    )
  );

  // Return the altered config
  return storybookBaseConfig;
};
