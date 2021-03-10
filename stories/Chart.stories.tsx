import React from "react";
import { object } from "@storybook/addon-knobs";
import { Chart, ChartOptions } from "../src/components/Chart";
import { random } from "../src/components/Chart/ChartUtils";
import { Card, Flex } from "@fluentui/react-northstar";

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
    <Container>
      <Chart {...object("Configuration", dataVizProps, dataVizKnobGroupID)} />
    </Container>
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
    <Container>
      <Chart {...object("Configuration", dataVizProps, stackedKnobGroupID)} />
    </Container>
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
  return (
    <Container>
      <Chart {...object("Configuration", dataVizProps, areaKnobGroupID)} />
    </Container>
  );
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
  return (
    <Container>
      <Chart {...object("Configuration", dataVizProps, barKnobGroupID)} />
    </Container>
  );
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
    <Container>
      <Chart
        {...object("Configuration", dataVizProps, stackedBarKnobGroupID)}
      />
    </Container>
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
    <Container>
      <Chart
        {...object("Configuration", dataVizProps, groupedBarKnobGroupID)}
      />
    </Container>
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
    <Container>
      <Chart
        {...object("Configuration", dataVizProps, horizontalBarKnobGroupID)}
      />
    </Container>
  );
};

const horizontalStackedBarKnobGroupID = "Horizontal bar chart";

export const HorizontalStackedBarChart = () => {
  const dataVizProps = {
    title: "Horizontal bar chart sample",
    type: ChartOptions.BarHorizontalStacked,
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
    <Container>
      <Chart
        {...object(
          "Configuration",
          dataVizProps,
          horizontalStackedBarKnobGroupID
        )}
      />
    </Container>
  );
};

const pieKnobGroupID = "Pie chart";

export const PieChart = () => {
  const dataVizProps = {
    title: "Pie chart sample",
    type: ChartOptions.Pie,
    data: {
      labels: ["Jan", "Feb", "March", "April", "May"],
      datasets: [
        {
          label: "Watches",
          data: [2004, 1600, 480, 504, 1000],
        },
      ],
    },
  };
  return (
    <Container>
      <Chart {...object("Configuration", dataVizProps, pieKnobGroupID)} />
    </Container>
  );
};

const doughnutKnobGroupID = "Doughnut chart";

export const DoughnutChart = () => {
  const dataVizProps = {
    title: "Doughnut chart sample",
    type: ChartOptions.Doughnut,
    data: {
      labels: ["Jan", "Feb", "March", "April", "May"],
      datasets: [
        {
          label: "Watches",
          data: [2004, 1600, 480, 504, 1000],
        },
      ],
    },
  };
  return (
    <Container>
      <Chart {...object("Configuration", dataVizProps, doughnutKnobGroupID)} />
    </Container>
  );
};

const bubbleKnobGroupID = "Bubble chart";

export const GroupedBubbleChart = () => {
  const dataVizProps = {
    title: "Bubble chart sample",
    type: ChartOptions.Bubble,
    data: {
      labels: "Africa",
      datasets: [
        {
          label: "China",
          data: [
            {
              x: 21269017,
              y: 5.245,
              r: 25,
            },
          ],
        },
        {
          label: "Denmark",
          data: [
            {
              x: 258702,
              y: 7.526,
              r: 10,
            },
          ],
        },
        {
          label: "Germany",
          data: [
            {
              x: 3979083,
              y: 6.994,
              r: 15,
            },
          ],
        },
        {
          label: "Japan",
          data: [
            {
              x: 4931877,
              y: 5.921,
              r: 40,
            },
          ],
        },
        {
          label: "France",
          data: [
            {
              x: 17269017,
              y: 6.921,
              r: 20,
            },
          ],
        },
      ],
    },
  };
  return (
    <Container>
      <Chart {...object("Configuration", dataVizProps, bubbleKnobGroupID)} />
    </Container>
  );
};

export const BubbleChart = () => {
  const dataVizProps = {
    title: "Bubble chart sample",
    type: ChartOptions.Bubble,
    data: {
      labels: "Africa",
      datasets: [
        {
          label: "China",
          data: Array.from({ length: 99 }, () => ({
            x: random(200000, 600000),
            y: random(50, 150),
            r: random(5, 7),
          })),
        },
        {
          label: "USA",
          data: Array.from({ length: 99 }, () => ({
            x: random(200000, 600000),
            y: random(50, 150),
            r: random(5, 7),
          })),
        },
      ],
    },
  };
  return (
    <Container>
      <Chart {...object("Configuration", dataVizProps, bubbleKnobGroupID)} />
    </Container>
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
    <Container>
      <Chart {...object("Configuration", dataVizProps, noDataKnobGroupID)} />
    </Container>
  );
};

const errorKnobGroupID = "Chart error state";
export const ErrorState = () => {
  const dataVizProps = {
    title: "Error",
    type: ChartOptions.LineStacked,
  };
  return (
    <Container>
      <Chart {...object("Configuration", dataVizProps, errorKnobGroupID)} />
    </Container>
  );
};

const Container = (props) => (
  <Flex
    styles={{
      width: "100%",
      height: "100vh",
    }}
    vAlign="center"
    hAlign="center"
  >
    <Card styles={{ width: "100%", maxWidth: "960px", height: "400px" }}>
      {props.children}
    </Card>
  </Flex>
);
