import React, { ReactNode } from "react";

import {
  Provider as FluentUIThemeProvider,
  mergeThemes,
} from "@fluentui/react-northstar";

import { ThemePrepared, ComponentVariablesInput } from "@fluentui/styles";
import { TeamsTheme } from "../../lib/withTheme";

export interface IToolbarThemeProps {
  globalTheme: ThemePrepared;
  children: ReactNode;
}

const getLocalTheme = () => {
  return {
    componentVariables: {
      Card: ({
        colorScheme,
        borderRadius,
        borderWidth,
        shadowLevel1,
        theme,
      }: ComponentVariablesInput) => {
        return {
          backgroundColor: colorScheme.grey.background,
          backgroundColorHover: colorScheme.grey.background,
          boxShadow: shadowLevel1,
          boxShadowHover: shadowLevel1,
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
        };
      },
      Menu: ({ colorScheme }: ComponentVariablesInput) => ({
        color: colorScheme.default.foreground2,
      }),
    },
    componentStyles: {
      Menu: {
        root: {
          marginLeft: "-0.25rem",
          marginRight: "-0.25rem",
        },
      },
    },
  };
};

export const DataVizualizationTheme = ({
  globalTheme,
  children,
}: IToolbarThemeProps) => {
  const theme = mergeThemes(globalTheme, getLocalTheme());
  console.log(theme);
  return (
    <FluentUIThemeProvider
      theme={theme}
      style={{
        minHeight: "100vh",
        backgroundColor:
          theme.siteVariables.theme === TeamsTheme.HighContrast
            ? theme.siteVariables.colorScheme.grey.background
            : theme.siteVariables.colorScheme.grey.background2,
      }}
    >
      {children}
    </FluentUIThemeProvider>
  );
};
