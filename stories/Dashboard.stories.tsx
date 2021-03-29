import React from "react";
import { object } from "@storybook/addon-knobs";

import { Dashboard } from "../src/components/Dashboard";
import {
  IWidget,
  EWidgetSize,
} from "../src/components/Dashboard/DashboardWidget";
import {
  ExclamationCircleIcon,
  Flex,
  ScreenshareIcon,
  ShareGenericIcon,
  Text,
} from "@fluentui/react-northstar";
import { Chart, EChartTypes } from "../src/components/Chart";
import { random } from "../src/components/Chart/ChartUtils";

export default {
  title: "UI Templates/Dashboards",
  component: Dashboard,
};

const figmaSource = {
  design: {
    type: "figma",
    url: "https://www.figma.com/file/EOsbapNvZgEwcA1mShswfh/?node-id=1%3A32",
  },
};

const calloutItemsExample = [
  {
    id: "action_1",
    title: "Info",
    icon: <ExclamationCircleIcon />,
  },
  { id: "action_2", title: "Popup", icon: <ScreenshareIcon /> },
  {
    id: "action_3",
    title: "Share",
    icon: <ShareGenericIcon />,
  },
];

const linkExample = { href: "#" };

const defaultWidgets: IWidget[] = [
  {
    title: "Card 1",
    desc: "Last updated Monday, April 4 at 11:15 AM (PT)",
    widgetActionGroup: calloutItemsExample,
    size: EWidgetSize.Triple,
    body: [
      {
        id: "t1",
        title: "Tab 1",
        content: (
          <Flex
            vAlign="center"
            hAlign="center"
            styles={{ height: "100%", border: "1px dashed rgb(179, 176, 173)" }}
          >
            <Text size="large" weight="semibold">
              Content #1
            </Text>
          </Flex>
        ),
      },
      {
        id: "t2",
        title: "Tab 2",
        content: (
          <Flex
            vAlign="center"
            hAlign="center"
            styles={{ height: "100%", border: "1px dashed rgb(179, 176, 173)" }}
          >
            <Text size="large" weight="semibold">
              Content #2
            </Text>
          </Flex>
        ),
      },
      {
        id: "t3",
        title: "Tab 3",
        content: (
          <Flex
            vAlign="center"
            hAlign="center"
            styles={{ height: "100%", border: "1px dashed rgb(179, 176, 173)" }}
          >
            <Text size="large" weight="semibold">
              Content #3
            </Text>
          </Flex>
        ),
      },
    ],
    link: linkExample,
  },
  {
    title: "Card 2",
    size: EWidgetSize.Single,
    link: linkExample,
  },
  {
    title: "Card 3",
    size: EWidgetSize.Double,
    link: linkExample,
  },
  {
    title: "Card 4",
    size: EWidgetSize.Single,
    link: linkExample,
  },
  {
    title: "Card 5",
    size: EWidgetSize.Single,
    link: linkExample,
  },
  {
    title: "Card 6",
    size: EWidgetSize.Single,
    link: linkExample,
  },
];

const dashboardKnobGroupID = "Dashboards";
const dafaultConfig = { widgets: defaultWidgets };

export const Default = () => {
  return (
    <Dashboard
      {...object("Configuration", dafaultConfig, dashboardKnobGroupID)}
    />
  );
};

Default.parameters = figmaSource;

const dataVizWidgets: IWidget[] = [
  {
    title: "Line Chart",
    desc: "Last updated Monday, April 4 at 11:15 AM (PT)",
    widgetActionGroup: calloutItemsExample,
    size: EWidgetSize.Double,
    body: [
      {
        id: "t1",
        title: "Tab 1",
        content: (
          <Chart
            title="Line chart sample"
            type={EChartTypes.Line}
            data={{
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
            }}
          />
        ),
      },
      {
        id: "t2",
        title: "Tab 2",
        content: (
          <Chart
            title="Area chart sample"
            type={EChartTypes.LineStacked}
            data={{
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
                {
                  label: "TVs",
                  data: [960, 8700, 5100, 5012, 3930],
                },
              ],
            }}
          />
        ),
      },
      {
        id: "t3",
        title: "Tab 3",
        content: (
          <Flex
            vAlign="center"
            hAlign="center"
            styles={{ height: "100%", border: "1px dashed rgb(179, 176, 173)" }}
          >
            <Text size="large" weight="semibold">
              Content #3
            </Text>
          </Flex>
        ),
      },
    ],
    link: linkExample,
  },
  {
    title: "Doughnut chart sample",
    size: EWidgetSize.Single,
    link: linkExample,
    body: [
      {
        id: "1",
        title: "",
        content: (
          <Chart
            title="Doughnut chart sample"
            type={EChartTypes.Doughnut}
            data={{
              labels: ["Jan", "Feb", "March", "April", "May"],
              datasets: [
                {
                  label: "Watches",
                  data: [2004, 1600, 480, 504, 1000],
                },
              ],
            }}
          />
        ),
      },
    ],
  },
  {
    title: "Bubble chart sample",
    size: EWidgetSize.Double,
    link: linkExample,
    body: [
      {
        id: "1",
        title: "",
        content: (
          <Chart
            title="Bubble chart sample"
            type={EChartTypes.Bubble}
            data={{
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
                      x: 11931877,
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
            }}
          />
        ),
      },
    ],
  },
  {
    title: "Bubble chart sample",
    size: EWidgetSize.Double,
    link: linkExample,
    body: [
      {
        id: "1",
        title: "",
        content: (
          <Chart
            title="Bubble chart sample"
            type={EChartTypes.Bubble}
            data={{
              labels: "Africa",
              datasets: [
                {
                  label: "China",
                  data: Array.from({ length: 99 }, () => ({
                    x: random(200000, 600000),
                    y: random(50, 150),
                    r: 4,
                  })),
                },
              ],
            }}
          />
        ),
      },
    ],
  },
  {
    title: "Pie chart",
    size: EWidgetSize.Single,
    link: linkExample,
    body: [
      {
        id: "1",
        title: "",
        content: (
          <Chart
            title="Pie chart sample"
            type={EChartTypes.Pie}
            data={{
              labels: ["Jan", "Feb", "March", "April", "May"],
              datasets: [
                {
                  label: "Laptops",
                  data: [1860, 7700, 4100, 3012, 2930],
                },
              ],
            }}
          />
        ),
      },
    ],
  },
  {
    title: "Stacked area chart sample",
    size: EWidgetSize.Double,
    body: [
      {
        id: "1",
        title: "",
        content: (
          <Chart
            title="Stacked area chart sample"
            type={EChartTypes.LineStacked}
            data={{
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
            }}
          />
        ),
      },
    ],
    link: linkExample,
  },
  {
    title: "Gradient area chart sample",
    size: EWidgetSize.Double,
    link: linkExample,
    body: [
      {
        id: "1",
        title: "",
        content: (
          <Chart
            title="Gradient area chart"
            type={EChartTypes.LineArea}
            data={{
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
            }}
          />
        ),
      },
    ],
  },
  {
    title: "Bar chart sample",
    size: EWidgetSize.Single,
    body: [
      {
        id: "Bar chart sample",
        title: "",
        content: (
          <Chart
            title="Bar chart sample"
            type={EChartTypes.Bar}
            data={{
              labels: ["Jan", "Feb", "March", "April", "May"],
              datasets: [
                {
                  label: "Watches",
                  data: [2300, 3600, 4800, 5049, 4596],
                },
              ],
            }}
          />
        ),
      },
    ],
    link: linkExample,
  },
  {
    title: "Stacked bar chart sample",
    size: EWidgetSize.Single,
    body: [
      {
        id: "Stacked bar chart sample",
        title: "",
        content: (
          <Chart
            title="Stacked bar chart sample"
            type={EChartTypes.BarStacked}
            data={{
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
            }}
          />
        ),
      },
    ],
    link: linkExample,
  },
  {
    title: "Horizontal bar chart sample",
    size: EWidgetSize.Single,
    body: [
      {
        id: "Horizontal bar chart sample",
        title: "",
        content: (
          <Chart
            title="Horizontal bar chart sample"
            type={EChartTypes.BarHorizontal}
            data={{
              labels: ["Jan", "Feb", "March", "April", "May"],
              datasets: [
                {
                  label: "Watches",
                  data: [200, 3600, 480, 5049, 4596],
                },
              ],
            }}
          />
        ),
      },
    ],
    link: linkExample,
  },
  {
    title: "Grouped bar chart sample",
    size: EWidgetSize.Double,
    body: [
      {
        id: "1",
        title: "",
        content: (
          <Chart
            title="Grouped bar chart sample"
            type={EChartTypes.Bar}
            data={{
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
            }}
          />
        ),
      },
    ],
    link: linkExample,
  },
  ,
  {
    title: "Horizontal stacked bar chart sample",
    size: EWidgetSize.Double,
    body: [
      {
        id: "Horizontal stacked bar chart sample",
        title: "",
        content: (
          <Chart
            title="Horizontal stacked bar chart sample"
            type={EChartTypes.BarHorizontalStacked}
            data={{
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
            }}
          />
        ),
      },
    ],
    link: linkExample,
  },
  {
    title: "Error chart state",
    size: EWidgetSize.Single,
    body: [
      {
        id: "1",
        title: "",
        content: (
          <Chart title="Chart error state" type={EChartTypes.LineStacked} />
        ),
      },
    ],
    link: linkExample,
  },
  {
    title: "No data chart state",
    size: EWidgetSize.Single,
    body: [
      {
        id: "1",
        title: "",
        content: (
          <Chart
            title="Chart no data state"
            type={EChartTypes.LineStacked}
            data={{
              labels: [],
              datasets: [],
            }}
          />
        ),
      },
    ],
    link: linkExample,
  },
  {
    title: "Card 6",
    size: EWidgetSize.Single,
    link: linkExample,
  },
];

const dataVizConfig = { widgets: dataVizWidgets };

export const WithDataVizualization = () => {
  return (
    <Dashboard
      {...object("Configuration", dataVizConfig, dashboardKnobGroupID)}
    />
  );
};

WithDataVizualization.parameters = figmaSource;
