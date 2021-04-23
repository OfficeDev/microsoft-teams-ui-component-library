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
import { Toolbar } from "../Toolbar/Toolbar";

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
   * A Dashboard will emit onInteraction payloads when the user updates any preferences.
   */
  onInteraction?: (interaction: TDashboardInteraction) => void;
}

/**
 * A Dashboard will emit onInteraction payloads when the user clicks on any widget actions.
 * @public
 */
export type TDashboardInteraction = IDashboardInteractionWidgetAction;

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

const toolbarConfig = {
  actionGroups: {
    h1: {
      edit: { title: "Edit dashboard", icon: "Edit" },
    },
  },
  filters: [],
  find: false,
};

/**
 * @public
 */
export function Dashboard({ widgets, onInteraction }: IDashboard) {
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
                ) => (
                  <Widget key={key} size={size}>
                    <WidgetTitle
                      {...{
                        widgetId: id,
                        title,
                        desc,
                        globalTheme,
                        widgetActionGroup,
                        onInteraction,
                      }}
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
      )}
    />
  );
}
