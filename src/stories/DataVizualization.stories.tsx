import React from "react";
import { object } from "@storybook/addon-knobs";

import { DataVizualization } from "..";
import { ChartType } from "../components/DataVizualization/DataVisualizationTypes";

export default {
  title: "Components/DataVizualization",
  component: DataVizualization,
};

const dataVizKnobGroupID = "Line Chart";

export const LineChart = () => {
  const dataVizProps = {
    chartType: ChartType.Line,
    data: {
      labels: ["Jan", "Feb", "March", "April", "May"],
      datasets: [
        {
          label: "Tablets",
          data: [860, 6700, 3100, 2012, 1930],
        },
        {
          label: "Phones",
          data: [100, 1600, 180, 3049, 3596],
        },
        {
          label: "Laptops",
          data: [1860, 7700, 4100, 3012, 2930],
        },
        {
          label: "Watches",
          data: [200, 3600, 480, 5049, 4596],
        },
        {
          label: "TV",
          data: [960, 8700, 5100, 5012, 3930],
        },
        {
          label: "Displayes",
          data: [1000, 4600, 480, 4049, 3596],
        },
      ],
    },
  };
  return (
    <DataVizualization
      {...object("Configuration", dataVizProps, dataVizKnobGroupID)}
    />
  );
};

const stackedKnobGroupID = "Stacked";

export const StackedChart = () => {
  const dataVizProps = {
    chartType: ChartType.Stacked,
    data: {
      labels: ["Jan", "Feb", "March", "April", "May"],
      datasets: [
        {
          label: "Tablets",
          data: [860, 6700, 3100, 2012, 1930],
        },
        {
          label: "Phones",
          data: [100, 1600, 180, 3049, 3596],
        },
        {
          label: "Laptops",
          data: [1860, 7700, 4100, 3012, 2930],
        },
      ],
    },
  };
  return (
    <DataVizualization
      {...object("Configuration", dataVizProps, stackedKnobGroupID)}
    />
  );
};
