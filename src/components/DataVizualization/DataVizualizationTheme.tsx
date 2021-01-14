import React, { ReactNode } from "react";

import {
  Provider as FluentUIThemeProvider,
  mergeThemes,
  ComponentVariablesObject,
  ComponentVariablesInput,
} from "@fluentui/react-northstar";

import { ThemePrepared } from "@fluentui/styles";
import { TeamsTheme } from "../../themes";

export interface IDashabordThemeProps {
  globalTheme: ThemePrepared;
  children: ReactNode;
}
const menuContentStyles = ({ theme }: ComponentVariablesObject) => {
  const { theme: themeKey, colorScheme } = theme.siteVariables;
  return {
    borderWidth: themeKey === TeamsTheme.HighContrast ? "1px" : 0,
    boxShadow: colorScheme.elevations[8],
    backgroundColor:
      themeKey === TeamsTheme.Dark
        ? colorScheme.default.border2
        : colorScheme.default.foregroundFocus,
  };
};
const getLocalTheme = () => {
  return {
    componentStyles: {
      Box: {
        root: ({ theme }: ComponentVariablesObject) => ({
          "--charts-axes-labels-fg":
            theme.siteVariables.colorScheme.default.foreground2,
        }),
      },
      // ToolbarMenu: { root: menuContentStyles },
      ToolbarMenuItem: {
        root: {
          padding: 0,
        },
      },
    },
  };
};

export const DataVizualizationTheme = ({
  globalTheme,
  children,
}: IDashabordThemeProps) => {
  const theme = mergeThemes(globalTheme, getLocalTheme());
  return (
    <FluentUIThemeProvider theme={theme} styles={{ height: "100%" }}>
      {children}
    </FluentUIThemeProvider>
  );
};
