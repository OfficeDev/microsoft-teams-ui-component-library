import React, { ReactNode } from "react";
import { radios, boolean } from "@storybook/addon-knobs";

import {
  Provider as FluentUIThemeProvider,
  mergeThemes,
  teamsTheme,
  teamsDarkTheme,
  teamsHighContrastTheme,
} from "@fluentui/react-northstar";

import { ComponentVariablesObject, ThemeInput } from "@fluentui/styles";

export interface IThemeProviderProps {
  children: ReactNode;
}

const teamsNextColors = {
  grey: {
    100: "#F7F7F7",
    800: "#202020",
  },
};

const teamsNextThemeSiteVariables = {
  teamsTheme: {
    theme: "teamsTheme",
    colors: teamsNextColors,
    colorScheme: {
      elevations: {
        8: "0px 3.2px 7.2px rgba(0, 0, 0, 0.13), 0px 0.6px 1.8px rgba(0, 0, 0, 0.11)",
        16: "0px 6.4px 14.4px rgba(0, 0, 0, 0.07), 0px 1.2px 3.6px rgba(0, 0, 0, 0.03)",
      },
      grey: {
        background2: teamsNextColors.grey[100],
      },
    },
  },
  teamsDarkTheme: {
    theme: "teamsDarkTheme",
    colors: teamsNextColors,
    colorScheme: {
      elevations: {
        8: "0px 3.2px 7.2px rgba(0, 0, 0, 0.13), 0px 0.6px 1.8px rgba(0, 0, 0, 0.11)",
        16: "0px 6.4px 14.4px rgba(0, 0, 0, 0.32), 0px 1.2px 3.6px rgba(0, 0, 0, 0.28)",
      },
      grey: {
        background2: teamsNextColors.grey[800],
      },
    },
  },
  teamsHighContrastTheme: {
    theme: "teamsHighContrastTheme",
    colors: teamsNextColors,
    colorScheme: {
      elevations: {
        8: "none",
        16: "none",
      },
    },
  },
};

export const teamsNextVariableAssignments = {
  componentStyles: {
    Box: {
      root: ({ variables }: ComponentVariablesObject) => ({
        backgroundColor: variables.backgroundColor,
        boxShadow: variables.elevation,
      }),
    },
    Button: {
      root: ({ variables }: ComponentVariablesObject) => ({
        color: variables.color,
      }),
    },
    ButtonContent: {
      root: ({ variables }: ComponentVariablesObject) => ({
        fontWeight: variables.fontWeight,
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
      root: ({ variables }: ComponentVariablesObject) => ({
        height: variables.compactRow
          ? variables.compactRowHeight
          : variables.defaultRowHeight,
        minHeight: variables.compactRow
          ? variables.compactRowMinHeight
          : variables.defaultRowMinHeight,
        alignItems: variables.cellVerticalAlignment,
      }),
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
  teamsTheme: mergeThemes(teamsTheme, {
    siteVariables: teamsNextThemeSiteVariables.teamsTheme,
  }),
  teamsDarkTheme: mergeThemes(teamsDarkTheme, {
    siteVariables: teamsNextThemeSiteVariables.teamsDarkTheme,
  }),
  teamsHighContrastTheme: mergeThemes(teamsHighContrastTheme, {
    siteVariables: teamsNextThemeSiteVariables.teamsHighContrastTheme,
  }),
};

const themeKnob = () =>
  radios(
    "Theme",
    {
      "Teams Light": "teamsTheme",
      "Teams Dark": "teamsDarkTheme",
      "Teams High Contrast": "teamsHighContrastTheme",
    },
    "teamsTheme",
    "Theme"
  );

export const StorybookThemeProvider = ({ children }: IThemeProviderProps) => {
  return (
    <FluentUIThemeProvider
      theme={themes[themeKnob()]}
      styles={{ height: "100vh" }}
      rtl={boolean("Text direction RTL", false, "Theme")}
    >
      {children}
    </FluentUIThemeProvider>
  );
};
