import React from "react";
import { object } from "@storybook/addon-knobs";

import { Dashboard, IWidget, WidgetSize } from "..";
import {
  ExclamationCircleIcon,
  Flex,
  ScreenshareIcon,
  ShareGenericIcon,
  Text,
} from "@fluentui/react-northstar";
import { DataVizualization, ChartType } from "../components/DataVizualization";

export default {
  title: "UI Templates/Dashboards",
  component: Dashboard,
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

const dashboardKnobGroupID = "Dashboard Properties";
const dafaultConfig = { widgets: defaultWidgets };

export const Default = () => {
  return (
    <Dashboard
      {...object("Configuration", dafaultConfig, dashboardKnobGroupID)}
    />
  );
};

Default.parameters = {
  design: {
    type: "figma",
    url: "https://www.figma.com/file/EOsbapNvZgEwcA1mShswfh/?node-id=1%3A32",
  },
};

const dataVizWidgets: IWidget[] = [
  {
    title: "Line Chart",
    desc: "Last updated Monday, April 4 at 11:15 AM (PT)",
    widgetActionGroup: calloutItemsExample,
    size: WidgetSize.Triple,
    body: [
      {
        id: "t1",
        title: "Tab 1",
        content: (
          <DataVizualization
            chartType={ChartType.Line}
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
                  label: "TV",
                  data: [960, 8700, 5100, 5012, 3930],
                },
                {
                  label: "Displayes",
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
    title: "Area Chart",
    size: WidgetSize.Double,
    link: linkExample,
    body: [
      {
        id: "1",
        title: "",
        content: (
          <DataVizualization
            chartType={ChartType.LineArea}
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

const dataVizConfig = { widgets: dataVizWidgets };

export const WithDataVizualization = () => {
  return (
    <Dashboard
      {...object("Configuration", dataVizConfig, dashboardKnobGroupID)}
    />
  );
};

WithDataVizualization.parameters = {
  design: {
    type: "figma",
    url: "https://www.figma.com/file/EOsbapNvZgEwcA1mShswfh/?node-id=1%3A32",
  },
};
