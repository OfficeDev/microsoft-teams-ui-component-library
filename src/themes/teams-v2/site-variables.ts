import { TeamsTheme } from "../constants";

/**
 * Color palette for the following new themes.
 *
 * TFL Default - tfl-default
 * TFL Dark - tfl-dark
 * TFW 2 Default - defaultV2
 * TFW 2 Dark - darkV2
 *
 * Design spec at
 *
 * https://www.figma.com/file/bD1cO42H6KuWwpyEeNWoIz/Shell20-ShipPlan-POR?node-id=0%3A1
 */
export const colorPaletteV2 = {
  black: "#000",
  white: "#fff",
  grey: {
    25: "#fafafa",
    50: "#f5f5f5",
    100: "#f0f0f0",
    150: "#ebebeb",
    200: "#e0e0e0",
    220: "#d6d6d6",
    230: "#d1d1d1",
    250: "#c7c7c7",
    270: "#bdbdbd",
    300: "#b3b3b3",
    310: "#adadad",
    350: "#949494",
    400: "#8a8a8a",
    430: "#707070",
    440: "#666",
    450: "#616161",
    460: "#5c5c5c",
    500: "#424242",
    550: "#3d3d3d",
    600: "#333",
    650: "#2e2e2e",
    700: "#292929",
    750: "#242424",
    800: "#1f1f1f",
    850: "#1a1a1a",
    870: "#141414",
    900: "#0f0f0f",
    910: "#0a0a0a",
  },
  brand: {
    50: "#e9eaf6",
    100: "#dbdcf0",
    200: "#c7c9ff",
    300: "#b2b5ff",
    400: "#a6a7dc",
    450: "#9ea2ff",
    500: "#7479dc",
    600: "#6264a7",
    700: "#494b83",
    800: "#464775",
    900: "#3d3e66",
    1000: "#323348",
  },
};

/**
 * Site variable overrides for the TFW 2 default theme
 */
export default {
  theme: TeamsTheme.Default,
  colors: colorPaletteV2,
};
