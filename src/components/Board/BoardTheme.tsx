import React, { CSSProperties, ReactNode } from "react";

import {
  Provider as FluentUIThemeProvider,
  mergeThemes,
} from "@fluentui/react-northstar";

import {
  ThemePrepared,
  ThemeInput,
  ComponentVariablesObject,
} from "@fluentui/styles";

import {
  IHVCTheme,
  teamsNextVariableAssignments,
  themes,
} from "../../lib/withTheme";

import { TeamsTheme } from "../../themes";

export interface IBoardThemeProps {
  globalTheme: ThemePrepared;
  children: ReactNode;
  style: CSSProperties;
}

const getLocalTheme = (themeKey: string): ThemeInput<any> => {
  return {
    componentStyles: {
      Avatar: {
        root: {
          borderRadius: "9999px",
        },
        image: {
          borderWidth: "1px",
          borderStyle: "solid",
        },
        label: {
          borderWidth: "1px",
          borderStyle: "solid",
        },
      },
      Box: {
        root: ({ variables }: ComponentVariablesObject) => ({
          "&::after": {
            borderColor: variables.borderFocus,
            backgroundColor: variables.separatorColor,
          },
          "&::before": {
            borderColor: variables.borderFocusWithin,
          },
        }),
      },
      Card: {
        root: ({ variables, theme }: ComponentVariablesObject) => {
          return {
            padding: "0",
            backgroundColor: variables.backgroundColor,
            borderWidth:
              theme.siteVariables.theme === TeamsTheme.HighContrast ? "1px" : 0,
            "--separator-color":
              theme.siteVariables.colorScheme.default.border1,
            "--content-color-secondary":
              theme.siteVariables.colorScheme.default.foreground2,
            "--surface-background-color":
              theme.siteVariables.colorScheme.default.background,
            "&:hover": {
              "--surface-background-color":
                theme.siteVariables.theme === TeamsTheme.HighContrast
                  ? theme.siteVariables.colorScheme.default.backgroundHover3
                  : theme.siteVariables.colorScheme.default.backgroundHover1,
            },
          };
        },
      },
      CardBody: {
        root: {
          margin: "0 1.25rem .75rem 1.25rem",
        },
      },
      CardFooter: {
        root: {
          marginTop: "1.625rem",
          marginLeft: "1.25rem",
          marginRight: "1.25rem",
          marginBottom: 0,
          "&::before": {
            content: '""',
            display: "block",
            height: "1px",
            backgroundColor: "var(--separator-color)",
            position: "relative",
            top: "-.5rem",
          },
        },
      },
      PopupContent: {
        content: {
          padding: ".5rem 0",
        },
      },
    },
    staticStyles: [
      `html[data-whatinput="keyboard"] .board__lane:focus::before {
        z-index: 2;
        top: 1px; bottom: 1px; left: 2px; right: 3px;
      }`,
      `html[data-whatinput="keyboard"] .board__lane:focus::after {
        z-index: 2;
        top: 0; bottom: 0; left: 1px; right: 2px;
      }`,
    ],
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

  const {
    siteVariables: { colorScheme, rtl, theme },
  } = mainTheme as IHVCTheme;

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
        opacity: ${theme === TeamsTheme.HighContrast ? "1" : "0.2"};
        background-color: ${colorScheme.default.foreground};
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
        opacity: ${theme === TeamsTheme.HighContrast ? "1" : "0.2"};
        background-color: ${colorScheme.default.foreground};
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
        background-color: ${colorScheme.default.foreground};
        height: 6px;
      }
      
      .ps__rail-y:hover > .ps__thumb-y,
      .ps__rail-y:focus > .ps__thumb-y,
      .ps__rail-y.ps--clicking .ps__thumb-y {
        background-color: ${colorScheme.default.foreground};
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
      theme={mergeThemes(
        mainTheme,
        teamsNextVariableAssignments,
        getLocalTheme(globalTheme.siteVariables.theme)
      )}
      style={style}
    >
      <style>{customScrollbarStyles}</style>
      {children}
    </FluentUIThemeProvider>
  );
};
