import { mergeThemes, ThemeInput } from "@fluentui/react-northstar";

export default (theme: ThemeInput) => {
  const { colors } = theme.siteVariables!;
  return mergeThemes(theme, {
    siteVariables: {
      /**
       * Design spec at
       * https://www.figma.com/file/bD1cO42H6KuWwpyEeNWoIz/Shell20-ShipPlan-POR?node-id=0%3A1
       */
      colorScheme: {
        elevations: {
          2: "0px 0.8px 1.8px rgba(0, 0, 0, 0.13), 0px 0.15px 0.45px rgba(0, 0, 0, 0.11)",
          4: "0px 1.6px 3.6px rgba(0, 0, 0, 0.11), 0px 0.3px 0.9px rgba(0, 0, 0, 0.07)",
          8: "0px 3.2px 7.2px rgba(0, 0, 0, 0.13), 0px 0.6px 1.8px rgba(0, 0, 0, 0.11)",
          16: "0px 6.4px 14.4px rgba(0, 0, 0, 0.13), 0px 1.2px 3.6px rgba(0, 0, 0, 0.11)",
          32: "0px 12.8px 28.8px rgba(0, 0, 0, 0.22), 0px 2.4px 7.4px rgba(0, 0, 0, 0.18)",
          64: "0px 25.6px 57.6px rgba(0, 0, 0, 0.22), 0px 4.8px 14.4px rgba(0, 0, 0, 0.18)",
        },
        default: {
          foreground: colors.grey["750"],
          foreground1: colors.grey["500"],
          foreground2: colors.grey["450"],
          foreground3: colors.white,
          foreground4: colors.white,

          background: colors.white,
          background1: colors.grey["25"],
          background2: colors.grey["50"],
          background3: colors.grey["100"],
          background4: colors.grey["150"],
          background5: colors.grey["200"],

          border: colors.grey["230"],
          border1: colors.grey["100"],
          border2: colors.grey["200"],
          border3: colors.grey["100"],

          foregroundHover: colors.grey["750"],
          foregroundHover1: colors.white,
          foregroundHover2: colors.white,

          backgroundHover: colors.grey["50"],
          backgroundHover1: colors.grey["25"],
          backgroundHover2: "transparent",
          backgroundHover3: colors.grey["150"],
          backgroundHover4: colors.grey["25"],

          borderHover: colors.grey["250"],

          foregroundPressed: colors.grey["750"],
          backgroundPressed: colors.grey["200"],

          foregroundActive: colors.grey["750"],
          foregroundActive1: colors.white,

          backgroundActive: colors.grey["150"],
          backgroundActive1: colors.white,

          borderActive: colors.grey["270"],

          // foregroundFocus: not specified,
          // backgroundFocus: not specified,

          borderFocus: colors.black,
          borderFocusWithin: colors.white,

          foregroundDisabled: colors.grey["250"],
          foregroundDisabled1: colors.grey["250"],

          borderDisabled: colors.grey["200"],

          backgroundDisabled: colors.grey["100"],
          backgroundDisabled1: colors.grey["100"],
        },
        brand: {
          background: colors.brand["600"],
          background1: colors.brand["50"],
          background2: colors.brand["900"],
          background3: colors.brand["1000"],
          background4: colors.brand["800"],

          foreground: colors.brand["600"],
          foreground1: colors.brand["600"],
          foreground2: colors.brand["700"],
          foreground3: colors.brand["200"],
          foreground4: colors.white,

          border: colors.grey["200"],
          border1: colors.brand["300"],
          border2: colors.brand["200"],

          foregroundHover: colors.brand["600"],
          foregroundHover1: colors.white,
          foregroundHover2: colors.brand["200"],

          borderHover: colors.brand["300"],

          backgroundHover: colors.brand["700"],
          backgroundHover1: colors.brand["50"],

          foregroundPressed: colors.brand["700"],
          foregroundPressed1: colors.white,

          backgroundPressed: colors.brand["800"],

          borderPressed: colors.brand["300"],

          foregroundActive: colors.brand["600"],
          foregroundActive1: colors.brand["600"],
          foregroundActive2: colors.brand["50"],

          backgroundActive: colors.brand["600"],
          backgroundActive1: colors.brand["600"],

          borderActive: colors.grey["200"],
          borderActive1: colors.brand["50"],
          borderActive2: colors.brand["300"],

          foregroundFocus: colors.brand["600"],
          foregroundFocus1: colors.brand["600"],
          foregroundFocus2: colors.brand["700"],
          foregroundFocus3: colors.brand["50"],
          foregroundFocus4: colors.white,

          backgroundFocus: colors.brand["600"],
          backgroundFocus1: colors.brand["50"],
          backgroundFocus2: colors.brand["900"],
          backgroundFocus3: colors.brand["1000"],

          borderFocus: colors.black,
          borderFocus1: colors.brand["600"],

          borderFocusWithin: colors.white,

          foregroundDisabled: colors.grey["250"],
          foregroundDisabled1: colors.grey["250"],

          borderDisabled: colors.grey["550"],

          backgroundDisabled: colors.grey["100"],
          backgroundDisabled1: colors.grey["100"],
        },
      },
    },
  });
};
