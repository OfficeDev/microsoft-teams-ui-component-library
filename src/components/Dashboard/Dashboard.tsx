import React from "react";
import {
  ProviderConsumer as FluentUIThemeConsumer,
  Box,
} from "@fluentui/react-northstar";
import {
  IWidget,
  Widget,
  WidgetTitle,
  WidgetBody,
  WidgetFooter,
} from "./DashboardWidget";
import { DashboardTheme } from "./DashboardTheme";
import { Toolbar } from "../..";

/**
 * The Dashboard component summarizes disparate types of information into a series of widgets.
 * Designs for this component are available in the [Dashboard page of the Microsoft Teams UI Kit](https://www.figma.com/file/EOsbapNvZgEwcA1mShswfh/Microsoft-Teams-UI-Kit-Community?node-id=3789%3A3890).
 */
interface IDashboard {
  widgets: IWidget[];
}

const toolbarConfig = {
  actionGroups: {
    h1: {
      edit: { title: "Edit dashboard", icon: "Edit" },
    },
  },
  filters: [],
  find: false,
};

export function Dashboard({ widgets }: IDashboard) {
  return (
    <FluentUIThemeConsumer
      render={(globalTheme) => (
        <DashboardTheme globalTheme={globalTheme}>
          <Toolbar {...toolbarConfig} />
          <Box
            styles={{
              display: "grid",
              gridGap: ".5rem",
              gridTemplate:
                "repeat(auto-fill, 26rem) / repeat(auto-fill, minmax(18.75rem, 1fr))",
              gridAutoFlow: "dense",
              gridAutoRows: "26rem",
              padding: "0 1rem 1.25rem",
              minWidth: "20rem",
              "@media (max-width: 986px)": {
                gridTemplate:
                  "repeat(auto-fill, 25rem) / repeat(auto-fill, minmax(15.75rem, 1fr))",
              },
            }}
          >
            {widgets &&
              widgets.map(
                (
                  { title, desc, widgetActionGroup, size, body, link }: IWidget,
                  key: number
                ) => (
                  <Widget key={key} size={size}>
                    <WidgetTitle
                      title={title}
                      desc={desc}
                      globalTheme={globalTheme}
                      widgetActionGroup={widgetActionGroup}
                    />
                    <WidgetBody
                      body={body}
                      siteVariables={globalTheme.siteVariables}
                    />
                    {link && <WidgetFooter link={link} />}
                  </Widget>
                )
              )}
          </Box>
        </DashboardTheme>
      )}
    />
  );
}
