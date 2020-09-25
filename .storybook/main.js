const path = require("path");

module.exports = {
  stories: ["../src/stories/**/*.stories.+(ts|tsx)"],
  addons: [
    {
      name: "@storybook/preset-typescript",
      options: {
        tsLoaderOptions: {
          transpileOnly: true,
          configFile: path.resolve(__dirname, "../tsconfig.json"),
        },
        forkTsCheckerWebpackPluginOptions: {
          colors: false, // disables built-in colors in logger messages
        },
        include: [path.resolve(__dirname, "../src")],
        transpileManager: true,
      },
    },
    "@storybook/addon-docs",
    "@storybook/addon-links",
    "@storybook/addon-viewport/register",
    "@storybook/addon-a11y/register",
    "@storybook/addon-knobs/register",
    "@storybook/addon-actions",
  ],
  typescript: {
    reactDocgen: "react-docgen-typescript",
  }
};
