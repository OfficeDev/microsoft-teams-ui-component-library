import React from "react";

import {
  Popup,
  Button,
  MoreIcon,
  ComponentEventHandler,
  PopupProps,
  Menu,
  mergeThemes,
  ComponentVariablesInput,
  Provider as FluentUIThemeProvider,
  ThemePrepared,
  EyeSlashIcon,
} from "@fluentui/react-northstar";

import { TeamsTheme } from "../../themes";
import Icon from "../../lib/Icon";
import { TDashboardInteraction } from "./Dashboard";
import { getText, TTextObject, TTranslations } from "../../translations";

/**
 * An action item displayed in a widget’s overflow menu.
 * @public
 */
export interface IWidgetAction {
  /**
   * A unique ID to use to refer to the action.
   */
  id: string;
  /**
   * The icon
   */
  icon?: string;
  /**
   * The text content of the trigger for the action.
   */
  title: TTextObject;
}

interface IDashboardCallout {
  widgetId: string;
  open: boolean;
  onOpenChange: ComponentEventHandler<PopupProps>;
  menuProps: any;
  globalTheme: ThemePrepared;
  widgetActionGroup?: IWidgetAction[];
  hideWidget: null | ((widgetId: string) => void);
  t: TTranslations;
  onInteraction?: (interaction: TDashboardInteraction) => void;
}

const getLocalTheme = () => {
  return {
    componentVariables: {
      PopupContent: ({
        colorScheme,
        borderRadius,
        borderWidth,
        shadowLevel1,
        shadowLevel4,
        theme,
      }: ComponentVariablesInput) => ({
        backgroundColor: colorScheme.grey.background,
        backgroundColorHover: colorScheme.grey.background,
        boxShadow: `${shadowLevel1}, ${shadowLevel4}`,
        borderRadius,
        borderSize: borderWidth,
        borderColor:
          theme === TeamsTheme.HighContrast
            ? colorScheme.grey.backgroundFocus
            : "transparent",
        borderColorHover:
          theme === TeamsTheme.HighContrast
            ? colorScheme.grey.backgroundFocus
            : "transparent",
      }),
    },
    componentStyles: {
      Menu: {
        root: {
          width: "100%",
          marginRight: "0",
          marginLeft: "0",
          border: "none",
          padding: "0 0.25rem",
        },
      },
      MenuDivider: {
        root: { margin: "0.25rem 0" },
      },
      PopupContent: {
        content: {
          width: "12.5rem",
          padding: "0",
          boxShadow:
            " 0px 1.2px 3.6px rgba(0, 0, 0, 0.11), 0px 6.4px 14.4px rgba(0, 0, 0, 0.13)",
        },
      },
    },
  };
};

export const DashboardCallout = ({
  widgetId,
  open,
  onOpenChange,
  menuProps,
  globalTheme,
  widgetActionGroup,
  hideWidget,
  t,
  onInteraction,
}: IDashboardCallout) => {
  const theme = mergeThemes(globalTheme, getLocalTheme());

  const hideWidgetAction = {
    id: "hide_widget",
    content: t["hide widget"],
    icon: <EyeSlashIcon />,
    onClick: () => hideWidget && hideWidget(widgetId),
  };

  return (
    <FluentUIThemeProvider theme={theme}>
      {(hideWidget || widgetActionGroup) && (
        <Popup
          {...menuProps}
          open={open}
          onOpenChange={onOpenChange}
          trigger={
            <Button
              text
              iconOnly
              aria-label={t["more"]}
              icon={<MoreIcon />}
              styles={{
                margin: "0 -0.35rem",
              }}
            />
          }
          content={{
            styles: { width: "12.5rem" },
            content: (
              <Menu
                items={
                  widgetActionGroup
                    ? [
                        ...widgetActionGroup.map(
                          ({ id, icon, title }: IWidgetAction) => {
                            return {
                              key: id,
                              icon: <Icon icon={icon} />,
                              content: getText(t.locale, title),
                              ...(onInteraction && {
                                onClick: () =>
                                  onInteraction({
                                    event: "click",
                                    target: "action",
                                    widget: widgetId,
                                    action: id,
                                  }),
                              }),
                            };
                          }
                        ),
                        ...(hideWidget
                          ? [, { kind: "divider" }, hideWidgetAction]
                          : []),
                      ]
                    : [hideWidgetAction]
                }
                vertical
              />
            ),
          }}
          trapFocus={{
            firstFocusableSelector:
              ".extended-toolbar__filters-menu__tree [data-is-focusable=true]",
          }}
        />
      )}
    </FluentUIThemeProvider>
  );
};
