const path = require("path");
const tsconfig = path.resolve(__dirname, "../tsconfig.json");

module.exports = {
  stories: ["../src/stories/**/*.stories.+(ts|tsx)"],
  addons: [
    "@storybook/addon-actions",
    "@storybook/addon-links",
    "@storybook/addon-docs",
    "@storybook/addon-viewport/register",
    "@storybook/addon-a11y/register",
    "@storybook/addon-knobs/register",
    "@storybook/theming",
    "storybook-addon-designs",
  ],
  typescript: {
    check: true,
    checkOptions: { tsconfig },
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },
};
