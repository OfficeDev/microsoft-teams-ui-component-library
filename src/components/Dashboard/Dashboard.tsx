import React, { useState } from "react";
import get from "lodash/get";
import set from "lodash/set";
import cloneDeep from "lodash/cloneDeep";
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
  preferences?: IDashboardPreferences;
}

/**
 * A user’s preferences for the particular Dashboard component. For a given Dashboard instance,
 * a user may set certain widgets to be shown or hidden.
 * @public
 */
export interface IDashboardPreferences {
  // widgetOrder: string[];
  widgetSettings: {
    [widgetKey: string]: {
      display: boolean;
    };
  };
}

/**
 * @public
 */
export function Dashboard({ widgets, preferences }: IDashboard) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const closeSidebar = () => setSidebarOpen(false);

  const [preferencesState, setPreferencesState] = useState<
    IDashboardPreferences
  >(
    (() => {
      const prefs = cloneDeep(
        preferences || ({ widgetSettings: {} } as IDashboardPreferences)
      );
      return widgets.reduce((prefs, { id }) => {
        return set(
          prefs,
          `widgetSettings.${id}.display`,
          get(prefs, `widgetSettings.${id}.display`, true)
        );
      }, prefs);
    })()
  );

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
              {...{ t, widgets, preferencesState, setPreferencesState }}
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
                      id,
                      title,
                      desc,
                      widgetActionGroup,
                      size,
                      body,
                      link,
                    }: IWidget,
                    key: number
                  ) =>
                    get(
                      preferencesState,
                      `widgetSettings.${id}.display`,
                      true
                    ) && (
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
