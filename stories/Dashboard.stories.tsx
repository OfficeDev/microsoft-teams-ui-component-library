import React from "react";
import { object } from "@storybook/addon-knobs";

import { Dashboard } from "../src/components/Dashboard";
import {
  IWidget,
  WidgetSize,
} from "../src/components/Dashboard/DashboardWidget";
import {
  ExclamationCircleIcon,
  Flex,
  ScreenshareIcon,
  ShareGenericIcon,
  Text,
} from "@fluentui/react-northstar";
import { Chart, ChartOptions } from "../src/components/Chart";

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
    size: WidgetSize.Triple,
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
    size: WidgetSize.Single,
    link: linkExample,
  },
  {
    title: "Card 3",
    size: WidgetSize.Double,
    link: linkExample,
  },
  {
    title: "Card 4",
    size: WidgetSize.Single,
    link: linkExample,
  },
  {
    title: "Card 5",
    size: WidgetSize.Single,
    link: linkExample,
  },
  {
    title: "Card 6",
    size: WidgetSize.Single,
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
    size: WidgetSize.Double,
    body: [
      {
        id: "t1",
        title: "Tab 1",
        content: (
          <Chart
            title="Line chart sample"
            type={ChartOptions.Line}
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
            type={ChartOptions.LineStacked}
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
    title: "Stacked chart sample",
    size: WidgetSize.Double,
    body: [
      {
        id: "1",
        title: "",
        content: (
          <Chart
            title="Stacked chart sample"
            type={ChartOptions.LineStacked}
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
    title: "Area chart sample",
    size: WidgetSize.Double,
    link: linkExample,
    body: [
      {
        id: "1",
        title: "",
        content: (
          <Chart
            title="Area chart"
            type={ChartOptions.LineArea}
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
    title: "Error chart state",
    size: WidgetSize.Single,
    body: [
      {
        id: "1",
        title: "",
        content: (
          <Chart title="Chart error state" type={ChartOptions.LineStacked} />
        ),
      },
    ],
    link: linkExample,
  },
  {
    title: "No data chart state",
    size: WidgetSize.Single,
    body: [
      {
        id: "1",
        title: "",
        content: (
          <Chart
            title="Chart no data state"
            type={ChartOptions.LineStacked}
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
    size: WidgetSize.Single,
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
