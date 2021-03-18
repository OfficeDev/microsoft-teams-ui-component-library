import React from "react";
import { object } from "@storybook/addon-knobs";
import { Chart, EChartTypes } from "../src";
import { random } from "../src/components/Chart/ChartUtils";
import { Card, Flex } from "@fluentui/react-northstar";
import fakerEN from "faker/locale/en_US";
import fakerFA from "faker/locale/fa";
import range from "lodash/range";

const fake = (template: string) => {
  return { "en-US": fakerEN.fake(template), fa: fakerFA.fake(template) };
};

const months = [
  { "en-US": "Jan", fa: "ژانویه" },
  { "en-US": "Feb", fa: "فوریه" },
  { "en-US": "Mar", fa: "مارس" },
  { "en-US": "Apr", fa: "آوریل" },
  { "en-US": "May", fa: "ماه مه" },
];

export default {
  title: "Components/Charts",
  component: Chart,
};

const dataVizKnobGroupID = "Line chart";

export const LineChart = () => {
  const dataVizProps = {
    title: { "en-US": "Line chart sample", fa: "نمونه نمودار خطی" },
    type: EChartTypes.Line,
    data: {
      labels: months,
      datasets: [
        {
          label: fake("{{commerce.product}}"),
          data: [860, 6700, 3100, 2012, 1930],
        },
        {
          label: fake("{{commerce.product}}"),
          data: [100, 1600, 180, 3049, 3596],
        },
        {
          label: fake("{{commerce.product}}"),
          data: [1860, 7700, 4100, 3012, 2930],
        },
        {
          label: fake("{{commerce.product}}"),
          data: [200, 3600, 480, 5049, 4596],
        },
        {
          label: fake("{{commerce.product}}"),
          data: [960, 8700, 5100, 5012, 3930],
        },
        {
          label: fake("{{commerce.product}}"),
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
    title: {
      "en-US": "Stacked line chart sample",
      fa: "نمونه نمودار خطی انباشته شده",
    },
    type: EChartTypes.LineStacked,
    data: {
      labels: months,
      datasets: [
        {
          label: fake("{{commerce.product}}"),
          data: [1860, 4700, 3100, 2012, 1930],
        },
        {
          label: fake("{{commerce.product}}"),
          data: [1860, 1600, 180, 3049, 3596],
        },
        {
          label: fake("{{commerce.product}}"),
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
    title: { "en-US": "Area chart sample", fa: "نمونه نمودار منطقه" },
    type: EChartTypes.LineArea,
    data: {
      labels: months,
      datasets: [
        {
          label: fake("{{commerce.product}}"),
          data: [1860, 7700, 4100, 3012, 2930],
        },
        {
          label: fake("{{commerce.product}}"),
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
    title: { "en-US": "Bar chart sample", fa: "نمونه نمودار میله ای" },
    type: EChartTypes.Bar,
    data: {
      labels: months,
      datasets: [
        {
          label: fake("{{commerce.product}}"),
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
    title: {
      "en-US": "Stacked bar chart sample",
      fa: "نمونه نمودار میله ای انباشته شده",
    },
    type: EChartTypes.BarStacked,
    data: {
      labels: months,
      datasets: [
        {
          label: fake("{{commerce.product}}"),
          data: [1860, 7700, 4100, 3012, 2930],
        },
        {
          label: fake("{{commerce.product}}"),
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
    title: {
      "en-US": "Grouped bar chart sample",
      fa: "نمونه نمودار میله ای گروه بندی شده",
    },
    type: EChartTypes.Bar,
    data: {
      labels: months,
      datasets: [
        {
          label: fake("{{commerce.product}}"),
          data: [4860, 6700, 3100, 2012, 1930],
        },
        {
          label: fake("{{commerce.product}}"),
          data: [4100, 1600, 3180, 3049, 3596],
        },
        {
          label: fake("{{commerce.product}}"),
          data: [1860, 7700, 4100, 3012, 2930],
        },
        {
          label: fake("{{commerce.product}}"),
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
    title: {
      "en-US": "Horizontal bar chart sample",
      fa: "نمونه نمودار میله ای افقی",
    },
    type: EChartTypes.BarHorizontal,
    data: {
      labels: months,
      datasets: [
        {
          label: fake("{{commerce.product}}"),
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
    title: {
      "en-US": "Horizontal stacked bar chart sample",
      fa: "نمونه نمودار میله ای انباشته شده افقی",
    },
    type: EChartTypes.BarHorizontalStacked,
    data: {
      labels: months,
      datasets: [
        {
          label: fake("{{commerce.product}}"),
          data: [1860, 7700, 4100, 3012, 2930],
        },
        {
          label: fake("{{commerce.product}}"),
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
    title: { "en-US": "Pie chart sample", fa: "نمونه نمودار پای" },
    type: EChartTypes.Pie,
    data: {
      labels: months,
      datasets: [
        {
          label: fake("{{commerce.product}}"),
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
    title: { "en-US": "Doughnut chart sample", fa: "نمونه نمودار دونات" },
    type: EChartTypes.Doughnut,
    data: {
      labels: months,
      datasets: [
        {
          label: fake("{{commerce.product}}"),
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
    title: {
      "en-US": "Grouped bubble chart sample",
      fa: "نمونه نمودار حباب گروهی",
    },
    type: EChartTypes.Bubble,
    data: {
      labels: fake("{{address.country}}"),
      datasets: [
        {
          label: fake("{{address.country}}"),
          data: [
            {
              x: 21269017,
              y: 5.245,
              r: 25,
            },
          ],
        },
        {
          label: fake("{{address.country}}"),
          data: [
            {
              x: 258702,
              y: 7.526,
              r: 10,
            },
          ],
        },
        {
          label: fake("{{address.country}}"),
          data: [
            {
              x: 3979083,
              y: 6.994,
              r: 15,
            },
          ],
        },
        {
          label: fake("{{address.country}}"),
          data: [
            {
              x: 4931877,
              y: 5.921,
              r: 40,
            },
          ],
        },
        {
          label: fake("{{address.country}}"),
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
    title: { "en-US": "Bubble chart sample", fa: "نمونه نمودار حباب" },
    type: EChartTypes.Bubble,
    data: {
      labels: fake("{{address.country}}"),
      datasets: [
        {
          label: fake("{{address.country}}"),
          data: Array.from({ length: 99 }, () => ({
            x: random(200000, 600000),
            y: random(50, 150),
            r: random(5, 7),
          })),
        },
        {
          label: fake("{{address.country}}"),
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
    title: { "en-US": "No data sample", fa: "نمونه داده ای وجود ندارد" },
    type: EChartTypes.LineStacked,
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
    title: { "en-US": "Error sample", fa: "نمونه خطا" },
    type: EChartTypes.LineStacked,
  };
  return (
    <Container>
      <Chart {...object("Configuration", dataVizProps, errorKnobGroupID)} />
    </Container>
  );
};

const Container = (props: any) => (
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
