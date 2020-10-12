import React, { CSSProperties, ReactNode } from "react";

import {
  Provider as FluentUIThemeProvider,
  SiteVariablesPrepared,
  mergeThemes,
} from "@fluentui/react-northstar";

import {
  ThemePrepared,
  ThemeInput,
  ComponentVariablesObject,
} from "@fluentui/styles";

import { teamsNextVariableAssignments, themes } from "../../lib/withTheme";

export interface IBoardThemeProps {
  globalTheme: ThemePrepared;
  children: ReactNode;
  style: CSSProperties;
}

const getLocalTheme = (themeKey: string): ThemeInput<any> => {
  return {
    componentStyles: {
      Box: {
        root: ({ variables }: ComponentVariablesObject) => ({
          "&::after": {
            backgroundColor: variables.separatorColor,
          },
        }),
      },
      CardFooter: {
        root: ({ variables }: ComponentVariablesObject) => ({
          marginBottom: 0,
          marginTop: "1.625rem",
          "&::before": {
            content: '""',
            display: "block",
            height: "1px",
            backgroundColor: variables.separatorColor,
            position: "relative",
            top: "-.5rem",
          },
        }),
      },
    },
    componentVariables: {
      CardFooter: ({ colorScheme }: SiteVariablesPrepared) => ({
        separatorColor: colorScheme.default.border1,
      }),
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
