import React, { ReactNode } from "react";

import {
  Provider as FluentUIThemeProvider,
  mergeThemes,
  ComponentVariablesObject,
} from "@fluentui/react-northstar";

import { ThemePrepared } from "@fluentui/styles";
import { TeamsTheme } from "../../themes";

export interface IDashabordThemeProps {
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
    },
  };
};

export const DataVizualizationTheme = ({
  globalTheme,
  children,
}: IDashabordThemeProps) => {
  const theme = mergeThemes(globalTheme, getLocalTheme());
  return (
    <FluentUIThemeProvider
      theme={theme}
      style={{
        backgroundColor:
          theme.siteVariables.theme === TeamsTheme.HighContrast
            ? theme.siteVariables.colorScheme.grey.background
            : theme.siteVariables.colorScheme.default.background2,
      }}
    >
      {children}
    </FluentUIThemeProvider>
  );
};
