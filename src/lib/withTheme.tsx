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
        borderColor: variables.borderColor,
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
    ListItem: {
      root: ({ variables }: ComponentVariablesObject) => ({
        color: variables.color,
        backgroundColor: variables.backgroundColor,
        ...(variables.hoverBackgroundColor && {
          "&:hover": {
            backgroundColor: variables.hoverBackgroundColor,
          },
        }),
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

  const customScrollbarStyles =
    // From `react-perfect-scrollbar`:
    `/*
       * Container style
       */
      .ps {
        overflow: hidden !important;
        overflow-anchor: none;
        -ms-overflow-style: none;
        touch-action: auto;
        -ms-touch-action: auto;
      }
      
      /*
       * Scrollbar rail styles
       */
      .ps__rail-x {
        display: none;
        opacity: 1;
        transition: background-color .2s linear, opacity .2s linear;
        -webkit-transition: background-color .2s linear, opacity .2s linear;
        height: 6px;
        /* there must be 'bottom' or 'top' for ps__rail-x */
        bottom: 2px;
        /* please don't change 'position' */
        position: absolute;
      }
      
      .ps__rail-y {
        display: none;
        opacity: 1;
        transition: background-color .2s linear, opacity .2s linear;
        -webkit-transition: background-color .2s linear, opacity .2s linear;
        width: 6px;
        /* there must be 'right' or 'left' for ps__rail-y */
        ${rtl ? "left" : "right"}: 2px;
        /* please don't change 'position' */
        position: absolute;
      }
      
      .ps--active-x > .ps__rail-x,
      .ps--active-y > .ps__rail-y {
        display: block;
        background-color: transparent;
      }
      
      .ps:hover > .ps__rail-x,
      .ps:hover > .ps__rail-y,
      .ps--focus > .ps__rail-x,
      .ps--focus > .ps__rail-y,
      .ps--scrolling-x > .ps__rail-x,
      .ps--scrolling-y > .ps__rail-y {
        opacity: 1;
      }
      
      .ps .ps__rail-x:hover,
      .ps .ps__rail-y:hover,
      .ps .ps__rail-x:focus,
      .ps .ps__rail-y:focus,
      .ps .ps__rail-x.ps--clicking,
      .ps .ps__rail-y.ps--clicking {
        opacity: 1;
      }
      
      /*
       * Scrollbar thumb styles
       */
      .ps__thumb-x {
        opacity: ${themeName === TeamsTheme.HighContrast ? "1" : "0.2"};
        background-color: ${
          theme.siteVariables!.colorScheme.default.foreground
        };
        border-radius: 9999px;
        transition: background-color .2s linear, height .2s ease-in-out;
        -webkit-transition: background-color .2s linear, height .2s ease-in-out;
        height: 6px;
        /* there must be 'bottom' for ps__thumb-x */
        bottom: 2px;
        /* please don't change 'position' */
        position: absolute;
      }
      
      .ps__thumb-y {
        opacity: ${themeName === TeamsTheme.HighContrast ? "1" : "0.2"};
        background-color: ${
          theme.siteVariables!.colorScheme.default.foreground
        };
        border-radius: 9999px;
        transition: background-color .2s linear, width .2s ease-in-out;
        -webkit-transition: background-color .2s linear, width .2s ease-in-out;
        width: 6px;
        /* there must be 'right' for ps__thumb-y */
        right: 2px;
        /* please don't change 'position' */
        position: absolute;
      }
      
      .ps__rail-x:hover > .ps__thumb-x,
      .ps__rail-x:focus > .ps__thumb-x,
      .ps__rail-x.ps--clicking .ps__thumb-x {
        background-color: ${
          theme.siteVariables!.colorScheme.default.foreground
        };
        height: 6px;
      }
      
      .ps__rail-y:hover > .ps__thumb-y,
      .ps__rail-y:focus > .ps__thumb-y,
      .ps__rail-y.ps--clicking .ps__thumb-y {
        background-color: ${
          theme.siteVariables!.colorScheme.default.foreground
        };
        width: 6px;
      }
      
      /* MS supports */
      @supports (-ms-overflow-style: none) {
        .ps {
          overflow: auto !important;
        }
      }
      
      @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
        .ps {
          overflow: auto !important;
        }
      }
      .scrollbar-container {
        position: relative;
        height: 100%;
      }`;

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
          html, body, #root, #root > .ui-provider { height: 100% }
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
        ` + customScrollbarStyles}
      </style>
      {children}
    </FluentUIThemeProvider>
  );
};
