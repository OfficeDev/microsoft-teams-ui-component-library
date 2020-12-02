import { radios, select } from "@storybook/addon-knobs";
import translations, { TLocale, TTranslations } from "../translations";
import { Provider as FluentUIThemeProvider } from "@fluentui/react-northstar";
import { StoryFn } from "@storybook/addons";
import React, { ReactNode } from "react";
import { themes } from "./withTheme";
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
  const lang = langKnob() as TLocale;

  // [v-wishow] todo: translations will (presumably) eventually need to be loaded asynchronously

  const theme = themes[themeKnob()];
  const rtl = lang === "fa";

  if (theme.siteVariables) {
    theme.siteVariables.lang = lang;
    theme.siteVariables.rtl = rtl;
    theme.siteVariables.t = translations[lang] as TTranslations;
  }
  return (
    <FluentUIThemeProvider theme={theme} rtl={rtl}>
      <style>{`html, body, #root, #root > .ui-provider { height: 100% } #root > .ui-provider { overflow: auto }`}</style>
      {children}
    </FluentUIThemeProvider>
  );
};

export const withStorybookTheme = (storyFn: StoryFn<any>) => (
  <StorybookThemeProvider>{storyFn()}</StorybookThemeProvider>
);
