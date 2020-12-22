import React from "react";
import { object } from "@storybook/addon-knobs";

import { DataVizualization, Toolbar } from "..";

export default {
  title: "Components/DataVizualization",
  component: DataVizualization,
};

const dataVizKnobGroupID = "DataVizualization";

export const Default = () => {
  const toolbarConfig = "WORLD";
  return (
    <DataVizualization
      {...object("Configuration", toolbarConfig, dataVizKnobGroupID)}
    />
  );
};
