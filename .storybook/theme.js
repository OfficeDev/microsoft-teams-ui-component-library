import { create } from "@storybook/theming/create";

export default create({
  base: "light",
  brandTitle: "React Teams",
  brandImage: "https://i.ibb.co/T1GptPT/react-library-logo-v2.jpg",

  colorPrimary: "#6264A7",
  colorSecondary: "#616161",

  // UI
  appBg: "#EBEBEB",
  appContentBg: "rgb(245, 245, 245)",
  appBorderColor: "#E0E0E0",
  appBorderRadius: 4,

  // Typography
  fontBase: `"Segoe UI", Segoe UI, system-ui, "Apple Color Emoji", "Segoe UI Emoji", sans-serif`,
  fontCode: "monospace",

  // Text colors
  textColor: "#242424",
  textInverseColor: "rgba(255,255,255,0.9)",

  // Toolbar default and active colors
  barTextColor: "#616161",
  barSelectedColor: "#6264A7",
  barBg: "#F5F5F5",

  // Form colors
  inputBg: "white",
  inputBorder: "#E0E0E0",
  inputTextColor: "#242424",
  inputBorderRadius: 4,
});
