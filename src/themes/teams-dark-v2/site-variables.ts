import { colorPaletteV2 } from "../teams-v2/site-variables";
import { TeamsTheme } from "../constants";

/**
 * Site variable overrides for the TFW 2 dark theme
 */
export default {
  theme: TeamsTheme.Dark,
  colors: colorPaletteV2,
  colorScheme: {
    elevations: {
      2: "0px 0.8px 1.8px rgba(0, 0, 0, 0.32), 0px 0.15px 0.45px rgba(0, 0, 0, 0.28)",
      4: "0px 1.6px 3.6px rgba(0, 0, 0, 0.28), 0px 0.3px 0.9px rgba(0, 0, 0, 0.32)",
      8: "0px 3.2px 7.2px rgba(0, 0, 0, 0.32), 0px 0.6px 1.8px rgba(0, 0, 0, 0.28)",
      16: "0px 6.4px 14.4px rgba(0, 0, 0, 0.32), 0px 1.2px 3.6px rgba(0, 0, 0, 0.28)",
      32: "0px 12.8px 28.8px rgba(0, 0, 0, 0.32), 0px 2.4px 7.2px rgba(0, 0, 0, 0.28)",
      64: "0px 25.6px 57.6px rgba(0, 0, 0, 0.32), 0px 4.8px 14.4px rgba(0, 0, 0, 0.28)",
    },
    default: {
      foreground: colorPaletteV2.white,
      foreground1: colorPaletteV2.grey["220"],
      foreground2: colorPaletteV2.grey["310"],
      foreground3: colorPaletteV2.white,
      foreground4: colorPaletteV2.white,

      background: colorPaletteV2.grey["700"],
      background1: colorPaletteV2.grey["750"],
      background2: colorPaletteV2.grey["800"],
      background3: colorPaletteV2.grey["870"],
      background4: colorPaletteV2.grey["550"],
      background5: colorPaletteV2.grey["600"],

      border: colorPaletteV2.grey["450"],
      border1: colorPaletteV2.grey["850"],
      border2: colorPaletteV2.grey["900"],
      border3: colorPaletteV2.grey["550"],

      foregroundHover: colorPaletteV2.white,
      foregroundHover1: colorPaletteV2.white,
      foregroundHover2: colorPaletteV2.white,

      backgroundHover: colorPaletteV2.grey["550"],
      backgroundHover1: colorPaletteV2.grey["750"],
      backgroundHover2: "transparent",
      backgroundHover3: colorPaletteV2.grey["650"],
      backgroundHover4: colorPaletteV2.grey["750"],
      backgroundHover6: colorPaletteV2.grey["550"],
      borderHover: colorPaletteV2.grey["430"],

      foregroundPressed: colorPaletteV2.white,
      backgroundPressed: colorPaletteV2.grey["650"],

      foregroundActive: colorPaletteV2.white,
      foregroundActive1: colorPaletteV2.white,

      backgroundActive: colorPaletteV2.grey["600"],
      backgroundActive1: colorPaletteV2.grey["800"],

      borderActive: colorPaletteV2.grey["440"],

      // foregroundFocus: not specified,
      // backgroundFocus: not specified,

      borderFocus: colorPaletteV2.white,
      borderFocusWithin: colorPaletteV2.black,

      foregroundDisabled: colorPaletteV2.grey["460"],
      foregroundDisabled1: colorPaletteV2.grey["460"],

      borderDisabled: colorPaletteV2.grey["500"],

      backgroundDisabled: colorPaletteV2.grey["800"],
      backgroundDisabled1: colorPaletteV2.grey["800"],
    },
    brand: {
      background: colorPaletteV2.brand["600"],
      background1: colorPaletteV2.brand["1000"],
      background2: colorPaletteV2.brand["900"],
      background3: colorPaletteV2.brand["1000"],
      background4: colorPaletteV2.grey["910"],

      foreground: colorPaletteV2.brand["450"],
      foreground1: colorPaletteV2.brand["450"],
      foreground2: colorPaletteV2.brand["450"],
      foreground3: colorPaletteV2.brand["200"],
      foreground4: colorPaletteV2.white,

      border: colorPaletteV2.grey["450"],
      border1: colorPaletteV2.brand["800"],
      border2: colorPaletteV2.brand["800"],

      foregroundHover: colorPaletteV2.brand["450"],
      foregroundHover1: colorPaletteV2.white,
      foregroundHover2: colorPaletteV2.brand["200"],

      borderHover: colorPaletteV2.brand["600"],

      backgroundHover: colorPaletteV2.brand["700"],
      backgroundHover1: colorPaletteV2.brand["900"],

      foregroundPressed: colorPaletteV2.brand["200"],
      foregroundPressed1: colorPaletteV2.white,

      backgroundPressed: colorPaletteV2.brand["800"],

      borderPressed: colorPaletteV2.brand["800"],

      foregroundActive: colorPaletteV2.brand["450"],
      foregroundActive1: colorPaletteV2.brand["450"],
      foregroundActive2: colorPaletteV2.brand["50"],

      backgroundActive: colorPaletteV2.brand["450"],
      backgroundActive1: colorPaletteV2.brand["450"],

      borderActive: colorPaletteV2.grey["450"],
      borderActive1: colorPaletteV2.brand["800"],
      borderActive2: colorPaletteV2.brand["800"],

      foregroundFocus: colorPaletteV2.brand["450"],
      foregroundFocus1: colorPaletteV2.brand["450"],
      foregroundFocus2: colorPaletteV2.brand["450"],
      foregroundFocus3: colorPaletteV2.brand["50"],
      foregroundFocus4: colorPaletteV2.white,

      backgroundFocus: colorPaletteV2.brand["450"],
      backgroundFocus1: colorPaletteV2.brand["1000"],
      backgroundFocus2: colorPaletteV2.brand["900"],
      backgroundFocus3: colorPaletteV2.brand["1000"],

      borderFocus: colorPaletteV2.white,
      borderFocus1: colorPaletteV2.brand["450"],

      borderFocusWithin: colorPaletteV2.black,

      foregroundDisabled: colorPaletteV2.grey["460"],
      foregroundDisabled1: colorPaletteV2.grey["460"],

      borderDisabled: colorPaletteV2.grey["500"],

      backgroundDisabled: colorPaletteV2.grey["800"],
      backgroundDisabled1: colorPaletteV2.grey["800"],
    },
  },
};
