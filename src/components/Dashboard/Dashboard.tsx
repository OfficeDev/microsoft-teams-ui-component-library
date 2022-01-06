import React, { useEffect, useState } from "react";
import get from "lodash/get";
import set from "lodash/set";
import produce from "immer";
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
  IDashboardInteractionWidgetButton,
} from "./DashboardWidget";
import { DashboardTheme } from "./DashboardTheme";
import { Sidebar } from "./Sidebar";
import { Toolbar } from "../Toolbar/Toolbar";
import { TCacheKey } from "../../types/types";

/**
 * The Dashboard component summarizes disparate types of information into a series of widgets.
 * Designs for this component are available in the [Dashboard page of the Microsoft Teams UI Kit](https://www.figma.com/file/EOsbapNvZgEwcA1mShswfh/Microsoft-Teams-UI-Kit-Community?node-id=3789%3A3890).
 * @public
 */
export interface IDashboard {
  /**
   * The widgets to make available in this Dashboard.
   */
  widgets: IWidget[];
  /**
   * Any initial preferences that should be set for this user, in case you save users’ preferences remotely.
   */
  preferences?: IDashboardPreferences;
  /**
   * Set this `cacheKey` to save user’s preferences on their local clients.
   */
  cacheKey?: TCacheKey;
  /**
   * A Dashboard will emit onInteraction payloads when the user updates any preferences.
   */
  onInteraction?: (interaction: TDashboardInteraction) => void;
  /**
   * Whether the Dashboard should render as just a block element. This will disable the toolbar and sidebar from which the user could control which widgets display.
   */
  blockOnly?: boolean;
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
export type TDashboardInteraction =
  | IDashboardInteractionUpdatePreferences
  | IDashboardInteractionWidgetAction
  | IDashboardInteractionWidgetButton;

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

/**
 * The widget action payload carries widget's action the user clicked on.
 * @public
 */
export interface IDashboardInteractionWidgetAction {
  event: "click";
  target: "action";
  widget: string;
  action: string;
}

const emptyPrefs = { widgetSettings: {} };

/*
 * This method returns the same stored preferences for any Dashboard.
 */
const getStoredPrefs = (cacheKey: TCacheKey) =>
  cacheKey
    ? (() => {
        const storedPrefs = window.localStorage.getItem(cacheKey);
        return storedPrefs ? JSON.parse(storedPrefs) : false;
      })() || emptyPrefs
    : (emptyPrefs as IDashboardPreferences);

/**
 * @public
 */
export function Dashboard({
  widgets,
  preferences,
  cacheKey,
  onInteraction,
  blockOnly,
}: IDashboard) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const closeSidebar = () => setSidebarOpen(false);

  const localStorageKey = cacheKey
    ? `@fluentui/react-teams__${cacheKey}`
    : undefined;

  const initializePreferencesState = () => {
    return produce(
      preferences || (getStoredPrefs(localStorageKey) as IDashboardPreferences),
      (draft: IDashboardPreferences) => {
        widgets.reduce((draft, { id }) => {
          return set(
            draft,
            `widgetSettings.${id}.display`,
            get(draft, `widgetSettings.${id}.display`, true)
          );
        }, draft);
      }
    );
  };

  const [preferencesState, setPreferencesState] =
    useState<IDashboardPreferences>(initializePreferencesState);

  useEffect(() => {
    localStorageKey &&
      window.localStorage.setItem(
        localStorageKey,
        JSON.stringify(preferencesState)
      );
  }, [preferencesState]);

  const updatePreferences = (nextPreferences: IDashboardPreferences) => {
    setPreferencesState(nextPreferences);
    onInteraction &&
      onInteraction({
        event: "update",
        target: "preferences",
        preferences: nextPreferences,
      });
  };

  const hideWidget = (widgetId: string) => {
    updatePreferences(
      produce(preferencesState, (draft) => {
        set(draft, `widgetSettings.${widgetId}.display`, false);
      })
    );
  };

  return (
    <FluentUIThemeConsumer
      render={(globalTheme) => {
        const { t, rtl } = globalTheme.siteVariables;
        return (
          <DashboardTheme globalTheme={globalTheme}>
            {!blockOnly && (
              <>
                <Toolbar
                  {...{
                    actionGroups: {
                      h1: {
                        edit: { title: t["edit dashboard"], icon: "Edit" },
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
                <Box styles={{ height: "1.25rem" }} role="presentation" />
                <Sidebar
                  open={sidebarOpen}
                  onClose={closeSidebar}
                  {...{ t, widgets, preferencesState, updatePreferences }}
                />
              </>
            )}
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
                    (blockOnly ||
                      get(
                        preferencesState,
                        `widgetSettings.${id}.display`,
                        true
                      )) && (
                      <Widget key={key} size={size}>
                        <WidgetTitle
                          {...{
                            widgetId: id,
                            title,
                            desc,
                            globalTheme,
                            widgetActionGroup,
                            onInteraction,
                            hideWidget: blockOnly ? null : hideWidget,
                            t,
                          }}
                        />
                        <WidgetBody
                          {...{ body, t }}
                          siteVariables={globalTheme.siteVariables}
                        />
                        {link && (
                          <WidgetFooter
                            {...{ link, t, rtl, id, onInteraction }}
                            siteVariables={globalTheme.siteVariables}
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
