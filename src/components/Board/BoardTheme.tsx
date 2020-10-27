import React, { CSSProperties, ReactNode } from "react";

import {
  Provider as FluentUIThemeProvider,
  mergeThemes,
} from "@fluentui/react-northstar";

import {
  ThemePrepared,
  ThemeInput,
  ComponentVariablesObject,
} from "@fluentui/styles";

import {
  teamsNextVariableAssignments,
  TeamsTheme,
  themes,
} from "../../lib/withTheme";

export interface IBoardThemeProps {
  globalTheme: ThemePrepared;
  children: ReactNode;
  style: CSSProperties;
}

const getLocalTheme = (themeKey: string): ThemeInput<any> => {
  return {
    componentStyles: {
      Avatar: {
        root: {
          backgroundColor: "var(--surface-background-color)",
          borderRadius: "9999px",
        },
        image: {
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: "var(--surface-background-color)",
        },
        label: {
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: "var(--surface-background-color)",
        },
      },
      Box: {
        root: ({ variables }: ComponentVariablesObject) => ({
          "&::before": {
            borderColor: variables.borderFocus,
          },
          "&::after": {
            backgroundColor: variables.separatorColor,
            borderColor: variables.borderFocusWithin,
          },
        }),
      },
      Card: {
        root: ({ variables, theme }: ComponentVariablesObject) => {
          console.log("[Card root]", theme.siteVariables.theme);
          return {
            padding: "0",
            backgroundColor: variables.backgroundColor,
            borderWidth:
              theme.siteVariables.theme === TeamsTheme.HighContrast ? "1px" : 0,
            "--separator-color":
              theme.siteVariables.colorScheme.default.border1,
            "--content-color-secondary":
              theme.siteVariables.colorScheme.default.foreground2,
            "--surface-background-color":
              theme.siteVariables.colorScheme.default.background,
            "&:hover": {
              "--surface-background-color":
                theme.siteVariables.colorScheme.default.backgroundHover1,
            },
            ...(theme.siteVariables.theme === TeamsTheme.HighContrast
              ? {
                  borderColor: variables.borderColor,
                  "&:hover": {
                    backgroundColor:
                      theme.siteVariables.colorScheme.default.background,
                    borderColor:
                      theme.siteVariables.colorScheme.default.borderHover,
                  },
                }
              : {}),
          };
        },
      },
      CardBody: {
        root: {
          margin: "0 1.25rem .75rem 1.25rem",
        },
      },
      CardFooter: {
        root: {
          marginTop: "1.625rem",
          marginLeft: "1.25rem",
          marginRight: "1.25rem",
          marginBottom: 0,
          "&::before": {
            content: '""',
            display: "block",
            height: "1px",
            backgroundColor: "var(--separator-color)",
            position: "relative",
            top: "-.5rem",
          },
        },
      },
    },
  };
};

export const BoardTheme = ({
  globalTheme,
  children,
  style,
}: IBoardThemeProps) => {
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
      style={style}
    >
      {children}
    </FluentUIThemeProvider>
  );
};
