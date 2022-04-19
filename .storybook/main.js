const path = require("path");
const tsconfig = path.resolve(__dirname, "../tsconfig.json");

module.exports = {
  stories: ["../stories/**/*.stories.+(ts|tsx)"],
  addons: [
    "@storybook/addon-actions",
    "@storybook/addon-links",
    // Disabled because we don't have any documentation in Storybook yet,
    // so the Docs tab is just a blank page.
    // Keeping the plugin here because we probably should have docs...
    // "@storybook/addon-docs",
    "@storybook/addon-viewport",
    "@storybook/addon-a11y",
    "@storybook/addon-knobs",
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
