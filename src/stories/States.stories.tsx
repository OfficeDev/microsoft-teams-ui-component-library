import React from "react";
import { withKnobs, object } from "@storybook/addon-knobs";
import { withA11y } from "@storybook/addon-a11y";

import States, { StatesOptions } from "../components/States";
import { StorybookThemeProvider } from "../lib/withTheme";

export default {
  title: "Components/States",
  component: States,
  decorators: [withKnobs, withA11y],
};

const statesKnobGroupID = "States";

/*
  Default
*/
const defaultConfig = { option: StatesOptions.Default };
export const Default = () => {
  return (
    <StorybookThemeProvider>
      <States {...object("Configuration", defaultConfig, statesKnobGroupID)} />
    </StorybookThemeProvider>
  );
};

/*
  Welcome
*/
const welcomeConfig = { option: StatesOptions.Welcome };
export const Welcome = () => {
  return (
    <StorybookThemeProvider>
      <States {...object("Configuration", welcomeConfig, statesKnobGroupID)} />
    </StorybookThemeProvider>
  );
};

/*
  Empty
*/
const emptyConfig = { option: StatesOptions.Empty };
export const Empty = () => {
  return (
    <StorybookThemeProvider>
      <States {...object("Configuration", emptyConfig, statesKnobGroupID)} />
    </StorybookThemeProvider>
  );
};

/*
  Error
*/
const errorConfig = { option: StatesOptions.Error };
export const Error = () => {
  return (
    <StorybookThemeProvider>
      <States {...object("Configuration", errorConfig, statesKnobGroupID)} />
    </StorybookThemeProvider>
  );
};

/*
  Thanks
*/
const thanksConfig = { option: StatesOptions.Thanks };
export const Thanks = () => {
  return (
    <StorybookThemeProvider>
      <States {...object("Configuration", thanksConfig, statesKnobGroupID)} />
    </StorybookThemeProvider>
  );
};
