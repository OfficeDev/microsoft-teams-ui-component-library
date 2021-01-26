import React, { ReactNode } from "react";

import {
  Provider as FluentUIThemeProvider,
  mergeThemes,
  ComponentVariablesObject,
} from "@fluentui/react-northstar";

import { ThemePrepared } from "@fluentui/styles";

export interface IChartThemeProps {
  globalTheme: ThemePrepared;
  children: ReactNode;
}

const getLocalTheme = () => {
  return {
    componentStyles: {
      Box: {
        root: ({ theme }: ComponentVariablesObject) => ({
          "--charts-axes-labels-fg":
            theme.siteVariables.colorScheme.default.foreground2,
        }),
      },
      ToolbarMenuItem: {
        root: {
          padding: 0,
        },
      },
    },
  };
};

export const ChartTheme = ({ globalTheme, children }: IChartThemeProps) => {
  const theme = mergeThemes(globalTheme, getLocalTheme());
  return (
    <FluentUIThemeProvider theme={theme} styles={{ height: "100%" }}>
      {children}
    </FluentUIThemeProvider>
  );
};
