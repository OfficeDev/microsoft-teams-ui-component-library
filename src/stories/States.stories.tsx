import React from "react";
import { withKnobs, object } from "@storybook/addon-knobs";
import { withA11y } from "@storybook/addon-a11y";

import EmptyStates from "../components/EmptyStates";
import { StorybookThemeProvider } from "../lib/withTheme";
import { states } from "../components/EmptyStates/EmptyStates";

export default {
  title: "Components/Empty States",
  component: EmptyStates,
  decorators: [withKnobs, withA11y],
};

const emptyStatesKnobGroupID = "EmptyStates";
const defaultConfig = { option: states.default };

export const Default = () => {
  return (
    <StorybookThemeProvider>
      <EmptyStates
        {...object("Configuration", defaultConfig, emptyStatesKnobGroupID)}
      />
    </StorybookThemeProvider>
  );
};
