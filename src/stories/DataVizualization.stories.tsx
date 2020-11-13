import React from "react";
import { withKnobs, object } from "@storybook/addon-knobs";
import { withA11y } from "@storybook/addon-a11y";

import DataVizaulization from "../components/DataVizualization";
import { StorybookThemeProvider } from "../lib/withTheme";

export default {
  title: "Components/DataVizaulization",
  component: DataVizaulization,
  decorators: [withKnobs, withA11y],
};

const dashboardKnobGroupID = "DataVizaulization";
const dafaultConfig = { Hello: "HelloWorld" };

export const Default = () => {
  return (
    <StorybookThemeProvider>
      <DataVizaulization
        {...object("Configuration", dafaultConfig, dashboardKnobGroupID)}
      />
    </StorybookThemeProvider>
  );
};
