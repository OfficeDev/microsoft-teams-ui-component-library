import React from "react";
import { withKnobs, object } from "@storybook/addon-knobs";
import { withA11y } from "@storybook/addon-a11y";

import EmptyStates from "../components/EmptyStates";
import { StorybookThemeProvider } from "../lib/withTheme";

export default {
  title: "Regular value components/Empty States",
  component: EmptyStates,
  decorators: [withKnobs, withA11y],
};

const emptyStatesKnobGroupID = "EmptyStates";
const dafaultConfig = { hello: "Hello" };

export const Default = () => {
  return (
    <StorybookThemeProvider>
      <EmptyStates
        {...object("Configuration", dafaultConfig, emptyStatesKnobGroupID)}
      />
    </StorybookThemeProvider>
  );
};
