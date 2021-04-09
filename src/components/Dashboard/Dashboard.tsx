import React, { useRef, useState } from "react";
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
  onInteraction?: (interaction: TDashboardInteraction) => void;
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
 * A Dashboard will emit onInteraction payloads when the user updates any preferences.
 * @public
 */
export type TDashboardInteraction = IDashboardInteractionUpdatePreferences;

/**
 * The preferences update payload carries the preferences the developer should store for the user,
 * if appropriate.
 * @public
 */
export interface IDashboardInteractionUpdatePreferences {
  event: "update";
  target: "preferences";
  preferences: IDashboardPreferences;
}

const randomLocalStorageKey = () => Math.random().toString(36).substr(2, 9);

/*
 * This method returns the same stored preferences for any Dashboard.
 */
const getStoredPrefs = (localStorageKey: string) =>
  ((() => {
    const storedPrefs = window.localStorage.getItem(localStorageKey);
    return storedPrefs ? JSON.parse(storedPrefs) : false;
  })() || { widgetSettings: {} }) as IDashboardPreferences;

/**
 * @public
 */
export function Dashboard({ widgets, preferences, onInteraction }: IDashboard) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const closeSidebar = () => setSidebarOpen(false);

  const localStorageKey = useRef(randomLocalStorageKey());

  const [preferencesState, setPreferencesState] = useState<
    IDashboardPreferences
  >(
    (() => {
      return cloneDeep(
        widgets.reduce((loadedPrefs, { id }) => {
          return set(
            loadedPrefs,
            `widgetSettings.${id}.display`,
            get(loadedPrefs, `widgetSettings.${id}.display`, true)
          );
        }, preferences || getStoredPrefs(localStorageKey.current))
      );
    })()
  );

  const updatePreferences = (nextPreferences: IDashboardPreferences) => {
    setPreferencesState(cloneDeep(nextPreferences));
    window.localStorage.setItem(
      localStorageKey.current,
      JSON.stringify(nextPreferences)
    );
    onInteraction &&
      onInteraction({
        event: "update",
        target: "preferences",
        preferences: nextPreferences,
      });
  };

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
              {...{ t, widgets, preferencesState, updatePreferences }}
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
