import React, { useState } from "react";
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
import { Sidebar } from "./Sidebar";
import { Toolbar } from "../Toolbar/Toolbar";

/**
 * The Dashboard component summarizes disparate types of information into a series of widgets.
 * Designs for this component are available in the [Dashboard page of the Microsoft Teams UI Kit](https://www.figma.com/file/EOsbapNvZgEwcA1mShswfh/Microsoft-Teams-UI-Kit-Community?node-id=3789%3A3890).
 * @public
 */
export interface IDashboard {
  widgets: IWidget[];
}

/**
 * @public
 */
export function Dashboard({ widgets }: IDashboard) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <FluentUIThemeConsumer
      render={(globalTheme) => {
        const { t } = globalTheme.siteVariables;
        return (
          <DashboardTheme globalTheme={globalTheme}>
            <Toolbar
              {...{
                actionGroups: {
                  h1: {
                    edit: { title: "Edit dashboard", icon: "Edit" },
                  },
                },
                filters: [],
                find: false,
              }}
              onInteraction={({ action }) => {
                switch (action) {
                  case "edit":
                    setSidebarOpen(true);
                    break;
                }
              }}
            />
            <Sidebar
              open={sidebarOpen}
              onClose={closeSidebar}
              {...{ t, widgets }}
            />
            <Box
              styles={{
                display: "grid",
                gridGap: ".5rem",
                gridTemplate:
                  "repeat(auto-fill, 25rem) / repeat(auto-fill, minmax(18.75rem, 1fr))",
                gridAutoFlow: "dense",
                gridAutoRows: "25rem",
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
                    {
                      title,
                      desc,
                      widgetActionGroup,
                      size,
                      body,
                      link,
                    }: IWidget,
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
                      {link && (
                        <WidgetFooter
                          siteVariables={globalTheme.siteVariables}
                          link={link}
                        />
                      )}
                    </Widget>
                  )
                )}
            </Box>
          </DashboardTheme>
        );
      }}
    />
  );
}
