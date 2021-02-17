import React, { ReactNode } from "react";

import {
  mergeThemes,
  Provider as FluentUIThemeProvider,
} from "@fluentui/react-northstar";

import {
  ICSSInJSStyle,
  SiteVariablesPrepared,
  ThemeInput,
  ThemePrepared,
} from "@fluentui/styles";

import { teamsNextVariableAssignments, themes } from "../../lib/withTheme";

import { TeamsTheme } from "../../themes";

import { Surface } from "../../types/types";

export interface IFormThemeProps {
  globalTheme: ThemePrepared;
  children: ReactNode;
  surface: Surface;
  styles?: ICSSInJSStyle;
}

const getLocalTheme = (
  themeName: TeamsTheme,
  surface: Surface
): ThemeInput<any> => {
  return {
    componentStyles: {
      Dropdown: {
        container: () => ({
          backgroundColor: "var(--input-background)",
          "&:hover": { backgroundColor: "var(--input-background)" },
          "&:focus": { backgroundColor: "var(--input-background)" },
          borderTopWidth: themeName === TeamsTheme.HighContrast ? "1px" : 0,
          borderRightWidth: themeName === TeamsTheme.HighContrast ? "1px" : 0,
          borderBottomWidth: themeName === TeamsTheme.HighContrast ? "2px" : 0,
          borderLeftWidth: themeName === TeamsTheme.HighContrast ? "1px" : 0,
        }),
      },
      Input: {
        input: () => ({ backgroundColor: "var(--input-background)" }),
      },
      InputLabel: {
        root: ({ theme }: SiteVariablesPrepared) => ({
          color: theme.siteVariables.colorScheme.default.foreground1,
          fontSize: ".75rem",
        }),
      },
      FormLabel: {
        root: ({ theme }: SiteVariablesPrepared) => ({
          color: theme.siteVariables.colorScheme.default.foreground1,
          fontSize: ".75rem",
        }),
      },
      TextArea: {
        root: () => ({ backgroundColor: "var(--input-background)" }),
      },
    },
  };
};

export const FormTheme = ({
  globalTheme,
  children,
  surface,
  styles,
}: IFormThemeProps) => {
  const mainTheme = globalTheme.siteVariables?.theme
    ? globalTheme
    : themes.teamsTheme;

  const cssProperties = (function () {
    switch (surface) {
      case Surface.base:
        return {
          background: "transparent",
          "--surface-background":
            globalTheme.siteVariables.colorScheme.default.background2,
          "--overlay-background":
            globalTheme.siteVariables.colorScheme.default.background,
          "--shadow-background":
            globalTheme.siteVariables.colorScheme.default.border2,
          "--input-background":
            globalTheme.siteVariables.colorScheme.default.background,
        };
      case Surface.raised:
        return {
          background: "transparent",
          "--surface-background": "transparent",
          "--overlay-background":
            globalTheme.siteVariables.colorScheme.default.background,
          "--shadow-background":
            globalTheme.siteVariables.colorScheme.default.border1,
          "--input-background": (function () {
            switch (mainTheme.siteVariables?.theme as TeamsTheme) {
              case TeamsTheme.Dark:
                return globalTheme.siteVariables.colorScheme.default
                  .background1;
              default:
                return globalTheme.siteVariables.colorScheme.default
                  .background2;
            }
          })(),
        };
    }
  })();

  return (
    <FluentUIThemeProvider
      theme={mergeThemes(
        mainTheme,
        teamsNextVariableAssignments,
        getLocalTheme(globalTheme.siteVariables.theme, surface)
      )}
      styles={{ ...cssProperties, ...styles }}
    >
      {children}
    </FluentUIThemeProvider>
  );
};
