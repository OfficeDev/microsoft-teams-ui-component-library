import React, { ReactNode } from "react";

import {
  Provider as FluentUIThemeProvider,
  mergeThemes,
} from "@fluentui/react-northstar";

import {
  ThemePrepared,
  ThemeInput,
  ComponentVariablesInput,
  ComponentVariablesObject,
} from "@fluentui/styles";

import {
  teamsNextVariableAssignments,
  TeamsTheme,
  themes,
} from "../../lib/withTheme";

export interface IToolbarThemeProps {
  globalTheme: ThemePrepared;
  children: ReactNode;
}

const getLocalTheme = (themeKey: string): ThemeInput<any> => {
  const buttonRootVariables = ({
    colorScheme,
    theme,
  }: ComponentVariablesInput) => {
    let color = colorScheme.black.foreground;
    switch (theme) {
      case TeamsTheme.Dark:
        color = colorScheme.grey.foreground;
        break;
      case TeamsTheme.HighContrast:
        color = colorScheme.grey.foregroundHover;
        break;
    }
    return {
      color,
    };
  };

  const menuContentStyles = ({ theme }: ComponentVariablesObject) => {
    const { theme: themeKey, colorScheme } = theme.siteVariables;
    return {
      borderWidth: themeKey === TeamsTheme.HighContrast ? "1px" : 0,
      boxShadow: colorScheme.elevations[8],
    };
  };

  return {
    componentVariables: {
      Button: buttonRootVariables,
      Input: ({ colors, colorScheme, theme }: ComponentVariablesInput) => ({
        backgroundColor:
          theme === TeamsTheme.Dark
            ? colors.grey[750]
            : colorScheme.black.background,
      }),
      ToolbarItem: buttonRootVariables,
      TreeItem: ({ colorScheme, theme }: ComponentVariablesInput) => ({
        color:
          theme === TeamsTheme.HighContrast
            ? colorScheme.grey.backgroundFocus
            : colorScheme.grey.background2,
      }),
      TreeTitle: ({ colorScheme }: ComponentVariablesInput) => ({
        color: colorScheme.grey.foreground,
        // todo: set the hover color as well
      }),
    },
    componentStyles: {
      ButtonContent: {
        root: ({ variables }: ComponentVariablesObject) => ({
          fontWeight: 400,
        }),
      },
      Input: {
        input: {
          width: "100%",
        },
      },
      PopupContent: {
        content: (cvo: ComponentVariablesObject) =>
          Object.assign(menuContentStyles(cvo), { padding: 0 }),
      },
      ToolbarMenu: { root: menuContentStyles },
      TreeItem: {
        root: {
          paddingLeft: 0,
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            right: ".25rem",
            bottom: 0,
            left: ".25rem",
            background: "transparent",
            borderRadius: "2px",
          },
          "&:hover::before": {
            background: "currentColor",
          },
        },
      },
    },
  };
};

export const ToolbarTheme = ({ globalTheme, children }: IToolbarThemeProps) => {
  const mainTheme = globalTheme.siteVariables?.theme
    ? globalTheme
    : themes.teamsTheme;
  return (
    <FluentUIThemeProvider
      theme={mergeThemes(
        mainTheme,
        teamsNextVariableAssignments,
        getLocalTheme(globalTheme.siteVariables.theme)
      )}
    >
      {children}
    </FluentUIThemeProvider>
  );
};
