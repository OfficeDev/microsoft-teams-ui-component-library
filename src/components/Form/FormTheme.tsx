import React, { ReactNode } from "react";

import {
  mergeThemes,
  Provider as FluentUIThemeProvider,
} from "@fluentui/react-northstar";

import { ThemeInput, ThemePrepared } from "@fluentui/styles";

import { teamsNextVariableAssignments, themes } from "../../lib/withTheme";

import { TeamsTheme } from "../../themes";

import { Surface } from "../../types/types.d";

export interface IFormThemeProps {
  globalTheme: ThemePrepared;
  children: ReactNode;
  surface: Surface;
}

const getLocalTheme = (
  themeName: TeamsTheme,
  surface: Surface
): ThemeInput<any> => {
  return {
    componentStyles: {
      Dropdown: {
        container: () => ({ backgroundColor: "var(--input-background)" }),
      },
      Input: {
        input: () => ({ backgroundColor: "var(--input-background)" }),
      },
    },
  };
};

export const FormTheme = ({
  globalTheme,
  children,
  surface,
}: IFormThemeProps) => {
  const mainTheme = globalTheme.siteVariables?.theme
    ? globalTheme
    : themes.teamsTheme;

  const cssProperties = (function () {
    switch (surface) {
      case Surface.base:
        return {
          "--surface-background":
            globalTheme.siteVariables.colorScheme.default.background2,
          "--shadow-background":
            globalTheme.siteVariables.colorScheme.default.border2,
          "--input-background":
            globalTheme.siteVariables.colorScheme.default.background,
        };
      case Surface.raised:
        return {
          "--surface-background":
            globalTheme.siteVariables.colorScheme.default.background,
          "--shadow-background":
            globalTheme.siteVariables.colorScheme.default.border1,
          "--input-background":
            globalTheme.siteVariables.colorScheme.default.background2,
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
      styles={cssProperties}
    >
      {children}
    </FluentUIThemeProvider>
  );
};
