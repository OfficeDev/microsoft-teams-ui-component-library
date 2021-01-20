import React from "react";
import { object } from "@storybook/addon-knobs";
import { Chart, ChartOptions } from "../components/Chart/index";

export default {
  title: "Components/Charts",
  component: Chart,
};

const dataVizKnobGroupID = "Line Chart";

export const LineChart = () => {
  const dataVizProps = {
    type: ChartOptions.Line,
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
    <Chart {...object("Configuration", dataVizProps, dataVizKnobGroupID)} />
  );
};

const stackedKnobGroupID = "Stacked";

export const StackedChart = () => {
  const dataVizProps = {
    type: ChartOptions.LineStacked,
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
    <Chart {...object("Configuration", dataVizProps, stackedKnobGroupID)} />
  );
};
