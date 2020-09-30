import React from "react";
import { withKnobs, object } from "@storybook/addon-knobs";
import { withA11y } from "@storybook/addon-a11y";

import Dashboard from "../components/Dashboard";
import { StorybookThemeProvider } from "../lib/withTheme";
import { IWidget, WidgetSize } from "../components/Dashboard/DashboardWidget";
import {
  ExclamationCircleIcon,
  Flex,
  ScreenshareIcon,
  ShareGenericIcon,
  Text,
} from "@fluentui/react-northstar";

export default {
  title: "Dashboard",
  component: Dashboard,
  decorators: [withKnobs, withA11y],
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
            styles={{ height: "100%", border: "1px dashed #ccc" }}
          >
            <Text size="large" weight="semibold" timestamp>
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
            styles={{ height: "100%", border: "1px dashed #ccc" }}
          >
            <Text size="large" weight="semibold" timestamp>
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
            styles={{ height: "100%", border: "1px dashed #ccc" }}
          >
            <Text size="large" weight="semibold" timestamp>
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

const dashboardKnobGroupID = "Dashboard";
const dafaultConfig = { widgets: defaultWidgets };

export const Default = () => {
  return (
    <StorybookThemeProvider>
      <Dashboard
        {...object("Configuration", dafaultConfig, dashboardKnobGroupID)}
      />
    </StorybookThemeProvider>
  );
};
