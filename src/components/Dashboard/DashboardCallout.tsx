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
  title: string;
}

interface IDashboardCallout {
  open: boolean;
  onOpenChange: ComponentEventHandler<PopupProps>;
  menuProps: any;
  globalTheme: ThemePrepared;
  widgetActionGroup?: IWidgetAction[];
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

const hideWidgetAction = {
  id: "hide_widget",
  content: "Hide widget",
  icon: <EyeSlashIcon />,
};

export const DashboardCallout = ({
  open,
  onOpenChange,
  menuProps,
  globalTheme,
  widgetActionGroup,
}: IDashboardCallout) => {
  const theme = mergeThemes(globalTheme, getLocalTheme());
  return (
    <FluentUIThemeProvider theme={theme}>
      <Popup
        {...menuProps}
        open={open}
        onOpenChange={onOpenChange}
        trigger={
          <Button
            text
            iconOnly
            aria-label="More actions"
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
                            content: title,
                          };
                        }
                      ),
                      { kind: "divider" },
                      hideWidgetAction,
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
    </FluentUIThemeProvider>
  );
};
