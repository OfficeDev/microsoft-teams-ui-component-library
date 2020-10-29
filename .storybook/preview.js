import {withKnobs} from "@storybook/addon-knobs";
import {withA11y} from "@storybook/addon-a11y";
import {withTheme} from '../src/lib/withTheme'

export const parameters = {
  options: {
    storySort: {
      order: ["Composites", "Components"],
    },
  },
  // Remove an additional padding in canvas body (Added in v.6)
  layout: "fullscreen",
};

export const decorators = [
  withKnobs,
  withA11y,
  withTheme,
]
