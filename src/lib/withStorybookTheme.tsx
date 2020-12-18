import { radios, select } from "@storybook/addon-knobs";
import translations, { TLocale, TTranslations } from "../translations";
import { Provider as FluentUIThemeProvider } from "@fluentui/react-northstar";
import { StoryFn } from "@storybook/addons";
import React, { ReactNode } from "react";
import { HVCThemeProvider, themes } from "./withTheme";
import { TeamsTheme } from "../themes";

const langKnob = () =>
  select(
    "Language",
    {
      "English (US)": "en-US",
      فارسی: "fa",
    },
    "en-US",
    "Theme"
  );

const themeKnob = () =>
  radios(
    "Theme",
    {
      "Teams Light": TeamsTheme.Default,
      "Teams Dark": TeamsTheme.Dark,
      "Teams High Contrast": TeamsTheme.HighContrast,
    },
    TeamsTheme.Default,
    "Theme"
  );

export interface IStorybookThemeProviderProps {
  children: ReactNode;
}

export const StorybookThemeProvider = ({
  children,
}: IStorybookThemeProviderProps) => {
  return (
    <HVCThemeProvider themeName={themeKnob()} lang={langKnob()}>
      {children}
    </HVCThemeProvider>
  );
};

export const withStorybookTheme = (storyFn: StoryFn<any>) => (
  <StorybookThemeProvider>{storyFn()}</StorybookThemeProvider>
);
