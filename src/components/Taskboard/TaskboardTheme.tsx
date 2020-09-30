import React, { CSSProperties, ReactNode } from "react";

import {
  Provider as FluentUIThemeProvider,
  mergeThemes,
} from "@fluentui/react-northstar";

import { ThemePrepared, ThemeInput } from "@fluentui/styles";

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
  return (
    <FluentUIThemeProvider
      theme={mergeThemes(
        globalTheme,
        getLocalTheme(globalTheme.siteVariables.theme)
      )}
      style={style}
    >
      {children}
    </FluentUIThemeProvider>
  );
};
