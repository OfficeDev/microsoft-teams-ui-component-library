import { withKnobs } from "@storybook/addon-knobs";
import { withA11y } from "@storybook/addon-a11y";
import { withStorybookTheme } from "../src/lib/withStorybookTheme";

export const parameters = {
  options: {
    storySort: {
      order: [
        "UI Templates",
        [
          "Dashboards",
          "Lists",
          "Forms",
          "Task boards",
          // "Wizards"
        ],
        "Components",
        "Welcome",
      ],
    },
  },
  // Remove an additional padding in canvas body (Added in v.6)
  layout: "fullscreen",
};

export const decorators = [withKnobs, withA11y, withStorybookTheme];
