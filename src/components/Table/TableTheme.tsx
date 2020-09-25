import React, { ReactNode } from "react";

import {
  Provider as FluentUIThemeProvider,
  mergeThemes,
} from "@fluentui/react-northstar";

import {
  ThemePrepared,
  ThemeInput,
  ComponentVariablesInput,
  ComponentVariablesObject,
} from "@fluentui/styles";

export interface ITableThemeProps {
  globalTheme: ThemePrepared;
  children: ReactNode;
}

const menuContentStyles = ({ theme }: ComponentVariablesObject) => {
  const { theme: themeKey, colorScheme } = theme.siteVariables;
  return {
    borderWidth: themeKey === "teamsHighContrastTheme" ? "1px" : 0,
    boxShadow: colorScheme.elevations[8],
  };
};

const getLocalTheme = (_themeKey: string): ThemeInput<any> => {
  return {
    componentVariables: {
      Checkbox: ({}: ComponentVariablesInput) => ({}),
    },
    componentStyles: {
      Button: {
        root: () => ({ minWidth: 0 }),
      },
      ButtonContent: {
        root: ({ variables }: ComponentVariablesObject) => ({
          fontWeight: 400,
          fontSize: "inherit",
        }),
      },
      Checkbox: {
        root: () => ({
          padding: ".375rem",
        }),
        checkbox: ({ variables, theme }: ComponentVariablesObject) => {
          if (variables.indeterminate) {
            switch (theme.siteVariables.theme) {
              // todo: these are necessary to add an indeterminate state to the `Checkbox` component; reassess when upgrading Fluent UI as it may no longer be necessary.
              case "teamsHighContrastTheme":
                return {
                  backgroundImage: `url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' role='presentation' style='background-color: %231aebff; padding: 2px;' focusable='false' viewBox='8 8 22.5 22.5'%3E%3Cg%3E%3Cpath fill='%23000' d='M10 16v-1h12v1H10z 11.875a.968.968 0 0 1-.289.711l-8.25 8.25c-.192.193-.43.289-.711.289s-.519-.096-.711-.289l-4.75-4.75a.965.965 0 0 1-.289-.711c0-.125.027-.25.082-.375s.129-.234.223-.328a.953.953 0 0 1 .695-.297c.135 0 .266.025.391.074.125.05.231.121.32.215l4.039 4.047 7.539-7.547a.886.886 0 0 1 .32-.215c.125-.049.255-.074.391-.074a1.004 1.004 0 0 1 .922.625.97.97 0 0 1 .078.375z' /%3E%3C/g%3E%3C/svg%3E")`,
                };
              case "teamsDarkTheme":
                return {
                  backgroundImage: `url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' role='presentation' style='background-color: %23A6A7DC; padding: 2px;' focusable='false' viewBox='8 8 22.5 22.5'%3E%3Cg%3E%3Cpath fill='%232D2C2C' d='M10 16v-1h12v1H10z 11.875a.968.968 0 0 1-.289.711l-8.25 8.25c-.192.193-.43.289-.711.289s-.519-.096-.711-.289l-4.75-4.75a.965.965 0 0 1-.289-.711c0-.125.027-.25.082-.375s.129-.234.223-.328a.953.953 0 0 1 .695-.297c.135 0 .266.025.391.074.125.05.231.121.32.215l4.039 4.047 7.539-7.547a.886.886 0 0 1 .32-.215c.125-.049.255-.074.391-.074a1.004 1.004 0 0 1 .922.625.97.97 0 0 1 .078.375z' /%3E%3C/g%3E%3C/svg%3E")`,
                };
              default:
                return {
                  backgroundImage: `url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' role='presentation' style='background-color: %236264A7; padding: 2px;' focusable='false' viewBox='8 8 22.5 22.5'%3E%3Cg%3E%3Cpath fill='%23fff' d='M10 16v-1h12v1H10z 11.875a.968.968 0 0 1-.289.711l-8.25 8.25c-.192.193-.43.289-.711.289s-.519-.096-.711-.289l-4.75-4.75a.965.965 0 0 1-.289-.711c0-.125.027-.25.082-.375s.129-.234.223-.328a.953.953 0 0 1 .695-.297c.135 0 .266.025.391.074.125.05.231.121.32.215l4.039 4.047 7.539-7.547a.886.886 0 0 1 .32-.215c.125-.049.255-.074.391-.074a1.004 1.004 0 0 1 .922.625.97.97 0 0 1 .078.375z' /%3E%3C/g%3E%3C/svg%3E")`,
                };
            }
          }
          return {};
        },
      },
      Menu: {
        root: () => ({ borderWidth: 0 }),
      },
      PopupContent: {
        content: (cvo: ComponentVariablesObject) =>
          Object.assign(menuContentStyles(cvo), { padding: 0 }),
      },
    },
  };
};

export const TableTheme = ({ globalTheme, children }: ITableThemeProps) => {
  return (
    <FluentUIThemeProvider
      theme={mergeThemes(
        globalTheme,
        getLocalTheme(globalTheme.siteVariables.theme)
      )}
    >
      {children}
    </FluentUIThemeProvider>
  );
};
