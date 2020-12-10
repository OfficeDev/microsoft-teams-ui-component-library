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

import { teamsNextVariableAssignments, themes } from "../../lib/withTheme";

import { TeamsTheme } from "../../themes";

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
          "&::after": {
            borderColor: variables.borderFocus,
            backgroundColor: variables.separatorColor,
          },
          "&::before": {
            borderColor: variables.borderFocusWithin,
          },
        }),
      },
      Card: {
        root: ({ variables, theme }: ComponentVariablesObject) => {
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
                theme.siteVariables.theme === TeamsTheme.HighContrast
                  ? theme.siteVariables.colorScheme.default.backgroundHover3
                  : theme.siteVariables.colorScheme.default.backgroundHover1,
            },
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
    staticStyles: [
      `html[data-whatinput="keyboard"] .board__lane:focus::before {
        z-index: 2;
        top: 1px; bottom: 1px; left: 2px; right: 3px;
      }`,
      `html[data-whatinput="keyboard"] .board__lane:focus::after {
        z-index: 2;
        top: 0; bottom: 0; left: 1px; right: 2px;
      }`,
    ],
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
