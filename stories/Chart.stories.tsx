import React from "react";
import { object } from "@storybook/addon-knobs";
import { Chart, ChartOptions } from "../src/components/Chart";

export default {
  title: "Components/Charts",
  component: Chart,
};

const dataVizKnobGroupID = "Line chart";

export const LineChart = () => {
  const dataVizProps = {
    title: "Line chart sample",
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
          label: "TVs",
          data: [960, 8700, 5100, 5012, 3930],
        },
        {
          label: "Displays",
          data: [1000, 4600, 480, 4049, 3596],
        },
      ],
    },
  };
  return (
    <Chart {...object("Configuration", dataVizProps, dataVizKnobGroupID)} />
  );
};

const stackedKnobGroupID = "Stacked chart";

export const StackedLineChart = () => {
  const dataVizProps = {
    title: "Stacked line chart sample",
    type: ChartOptions.LineStacked,
    data: {
      labels: ["Jan", "Feb", "March", "April", "May"],
      datasets: [
        {
          label: "Tablets",
          data: [1860, 4700, 3100, 2012, 1930],
        },
        {
          label: "Phones",
          data: [1860, 1600, 180, 3049, 3596],
        },
        {
          label: "Laptops",
          data: [1860, 5700, 4100, 3012, 2930],
        },
      ],
    },
  };
  return (
    <Chart {...object("Configuration", dataVizProps, stackedKnobGroupID)} />
  );
};

const areaKnobGroupID = "Area chart";

export const AreaChart = () => {
  const dataVizProps = {
    title: "Area chart sample",
    type: ChartOptions.LineArea,
    data: {
      labels: ["Jan", "Feb", "March", "April", "May"],
      datasets: [
        {
          label: "Laptops",
          data: [1860, 7700, 4100, 3012, 2930],
        },
        {
          label: "Watches",
          data: [200, 3600, 480, 5049, 4596],
        },
      ],
    },
  };
  return <Chart {...object("Configuration", dataVizProps, areaKnobGroupID)} />;
};

const barKnobGroupID = "Bar chart";

export const BarChart = () => {
  const dataVizProps = {
    title: "Bar chart sample",
    type: ChartOptions.Bar,
    data: {
      labels: ["Jan", "Feb", "March", "April", "May"],
      datasets: [
        {
          label: "Watches",
          data: [200, 3600, 480, 5049, 4596],
        },
      ],
    },
  };
  return <Chart {...object("Configuration", dataVizProps, barKnobGroupID)} />;
};

const stackedBarKnobGroupID = "Stacked bar chart";

export const StackedBarChart = () => {
  const dataVizProps = {
    title: "Stacked bar chart sample",
    type: ChartOptions.BarStacked,
    data: {
      labels: ["Jan", "Feb", "March", "April", "May"],
      datasets: [
        {
          label: "Laptops",
          data: [1860, 7700, 4100, 3012, 2930],
        },
        {
          label: "Watches",
          data: [1200, 3600, 2480, 5049, 4596],
        },
      ],
    },
  };
  return (
    <Chart {...object("Configuration", dataVizProps, stackedBarKnobGroupID)} />
  );
};

const groupedBarKnobGroupID = "Grouped bar chart";

export const GroupedBarChart = () => {
  const dataVizProps = {
    title: "Grouped bar chart sample",
    type: ChartOptions.Bar,
    data: {
      labels: ["Jan", "Feb", "March", "April", "May"],
      datasets: [
        {
          label: "Tablets",
          data: [4860, 6700, 3100, 2012, 1930],
        },
        {
          label: "Phones",
          data: [4100, 1600, 3180, 3049, 3596],
        },
        {
          label: "Laptops",
          data: [1860, 7700, 4100, 3012, 2930],
        },
        {
          label: "Watches",
          data: [1200, 3600, 2480, 5049, 4596],
        },
      ],
    },
  };
  return (
    <Chart {...object("Configuration", dataVizProps, groupedBarKnobGroupID)} />
  );
};

const horizontalBarKnobGroupID = "Horizontal bar chart";

export const HorizontalBarChart = () => {
  const dataVizProps = {
    title: "Horizontal bar chart sample",
    type: ChartOptions.BarHorizontal,
    data: {
      labels: ["Jan", "Feb", "March", "April", "May"],
      datasets: [
        {
          label: "Watches",
          data: [200, 3600, 480, 5049, 4596],
        },
      ],
    },
  };
  return (
    <Chart
      {...object("Configuration", dataVizProps, horizontalBarKnobGroupID)}
    />
  );
};

const noDataKnobGroupID = "Chart empty state";

export const NoDataState = () => {
  const dataVizProps = {
    title: "Chart no data",
    type: ChartOptions.LineStacked,
    data: {
      labels: [],
      datasets: [],
    },
  };
  return (
    <Chart {...object("Configuration", dataVizProps, noDataKnobGroupID)} />
  );
};

const errorKnobGroupID = "Chart error state";
export const ErrorState = () => {
  const dataVizProps = {
    title: "Error",
    type: ChartOptions.LineStacked,
  };
  return <Chart {...object("Configuration", dataVizProps, errorKnobGroupID)} />;
};
