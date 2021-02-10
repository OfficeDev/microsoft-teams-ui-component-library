import React, { ReactNode } from "react";

import {
  Provider as FluentUIThemeProvider,
  mergeThemes,
  teamsTheme,
  teamsDarkTheme,
  teamsHighContrastTheme,
  ComponentVariablesInput,
  ThemePrepared,
} from "@fluentui/react-northstar";

import { ComponentVariablesObject, ThemeInput } from "@fluentui/styles";

import {
  defaultV2ThemeOverrides,
  darkV2ThemeOverrides,
  highContrastThemeOverrides,
  TeamsTheme,
} from "../themes";

import {
  TLocale,
  TTranslations,
  default as builtInTranslations,
} from "../translations";

export enum IThemeTeamsClient {
  HighContrast = "contrast",
  Dark = "dark",
  Default = "default",
}
export interface IThemeProviderProps {
  children: ReactNode;
  lang: TLocale;
  themeName: TeamsTheme | IThemeTeamsClient;
  translations?: { [locale: string]: TTranslations };
}

export const teamsNextVariableAssignments = {
  componentVariables: {
    TableRow: ({ colorScheme }: ComponentVariablesInput) => ({
      color: colorScheme.default.foreground1,
    }),
  },
  componentStyles: {
    Box: {
      root: ({ variables }: ComponentVariablesObject) => ({
        color: variables.color,
        backgroundColor: variables.backgroundColor,
        boxShadow: variables.elevation,
      }),
    },
    ButtonContent: {
      root: ({ variables }: ComponentVariablesObject) => ({
        fontWeight: variables.fontWeight,
      }),
    },
    Card: {
      root: ({ variables }: ComponentVariablesObject) => ({
        boxShadow: variables.elevation,
        "&:hover": { boxShadow: variables.hoverElevation },
        "&:focus": { boxShadow: variables.elevation },
      }),
    },
    Flex: {
      root: ({ variables }: ComponentVariablesObject) => ({
        color: variables.color,
        backgroundColor: variables.backgroundColor,
        boxShadow: variables.elevation,
      }),
    },
    ToolbarItem: {
      root: ({ variables }: ComponentVariablesObject) => ({
        color: variables.color,
        fontWeight: variables.fontWeight,
      }),
    },
    PopupContent: {
      content: ({ variables }: ComponentVariablesObject) => ({
        boxShadow: variables.elevation,
        borderWidth: variables.borderWidth,
      }),
    },
    PopupButton: {
      root: ({ variables }: ComponentVariablesObject) => ({
        color: variables.color,
      }),
    },
    TableRow: {
      root: ({ variables }: ComponentVariablesObject) => {
        return {
          height: variables.compactRow
            ? variables.compactRowHeight
            : variables.defaultRowHeight,
          minHeight: variables.compactRow
            ? variables.compactRowMinHeight
            : variables.defaultRowMinHeight,
          alignItems: variables.cellVerticalAlignment,
        };
      },
    },
    TableCell: {
      root: ({ variables }: ComponentVariablesObject) => ({
        paddingTop: variables.compactRow
          ? variables.compactRowVerticalPadding
          : variables.defaultRowVerticalPadding,
        paddingBottom: variables.compactRow
          ? variables.compactRowVerticalPadding
          : variables.defaultRowVerticalPadding,
      }),
    },
    TreeItem: {
      root: ({ variables }: ComponentVariablesObject) => ({
        color: variables.color,
      }),
    },
  },
};

export const themes: { [themeKey: string]: ThemeInput<any> } = {
  [TeamsTheme.Default]: mergeThemes(
    teamsTheme,
    teamsNextVariableAssignments,
    defaultV2ThemeOverrides
  ),
  [TeamsTheme.Dark]: mergeThemes(
    teamsDarkTheme,
    teamsNextVariableAssignments,
    darkV2ThemeOverrides
  ),
  [TeamsTheme.HighContrast]: mergeThemes(
    teamsHighContrastTheme,
    teamsNextVariableAssignments,
    highContrastThemeOverrides
  ),
};

export interface IHVCTheme extends ThemePrepared<any> {
  themeName: TeamsTheme;
  rtl: boolean;
  lang: TLocale;
  t: TTranslations;
}

export const HVCThemeProvider = ({
  children,
  lang,
  themeName,
  translations,
}: IThemeProviderProps) => {
  // [v-wishow] todo: translations will (presumably) eventually need to be loaded asynchronously

  switch (themeName) {
    case IThemeTeamsClient.Dark:
      themeName = TeamsTheme.Dark;
      break;
    case IThemeTeamsClient.Default:
      themeName = TeamsTheme.Default;
      break;
    case IThemeTeamsClient.HighContrast:
      themeName = TeamsTheme.HighContrast;
      break;
  }

  const theme = themes[themeName];
  const rtl = lang === "fa";

  if (theme.siteVariables) {
    theme.siteVariables.lang = lang;
    theme.siteVariables.rtl = rtl;
    theme.siteVariables.t =
      (translations && translations[lang]) || builtInTranslations[lang];
  }

  return (
    <FluentUIThemeProvider
      theme={theme}
      rtl={rtl}
      style={{
        backgroundColor:
          theme.siteVariables &&
          theme.siteVariables.colorScheme.default.background2,
      }}
    >
      <style>
        {`
          html, body, #root, #root > .ui-provider { min-height: 100% }
          ::-webkit-scrollbar { width: .75rem } 
          ::-webkit-scrollbar-track {
            background-color: ${theme.siteVariables?.colorScheme.default.background2};
          }
          ::-webkit-scrollbar-thumb {
            background-color: ${theme.siteVariables?.colorScheme.onyx.border2};
            border-radius: .75rem;
            border: 3px solid transparent;
            background-clip: content-box;
          }
          ::-webkit-scrollbar-thumb:hover {
            background-color: ${theme.siteVariables?.colorScheme.default.foreground2};
          }
          canvas {
            border-radius: 3px;
            transition: box-shadow .05s .1s ease-out;
          }
          canvas:focus {
            outline: none;
            box-shadow: inset 0 0 0 2px ${theme.siteVariables?.colorScheme.default.foregroundActive} !important;
          }
        `}
      </style>
      {children}
    </FluentUIThemeProvider>
  );
};
