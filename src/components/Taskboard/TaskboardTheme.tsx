import React, { CSSProperties, ReactNode } from "react";

import {
  Provider as FluentUIThemeProvider,
  mergeThemes,
} from "@fluentui/react-northstar";

import { ThemePrepared, ThemeInput } from "@fluentui/styles";

import { teamsNextVariableAssignments, themes } from "../../lib/withTheme";

export interface ITaskboardThemeProps {
  globalTheme: ThemePrepared;
  children: ReactNode;
  style: CSSProperties;
}

const getLocalTheme = (themeKey: string): ThemeInput<any> => {
  return {
    componentStyles: {},
    componentVariables: {},
  };
};

export const TaskboardTheme = ({
  globalTheme,
  children,
  style,
}: ITaskboardThemeProps) => {
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
