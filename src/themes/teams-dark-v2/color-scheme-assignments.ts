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
          2: "0px 0.8px 1.8px rgba(0, 0, 0, 0.32), 0px 0.15px 0.45px rgba(0, 0, 0, 0.28)",
          4: "0px 1.6px 3.6px rgba(0, 0, 0, 0.28), 0px 0.3px 0.9px rgba(0, 0, 0, 0.32)",
          8: "0px 3.2px 7.2px rgba(0, 0, 0, 0.32), 0px 0.6px 1.8px rgba(0, 0, 0, 0.28)",
          16: "0px 6.4px 14.4px rgba(0, 0, 0, 0.32), 0px 1.2px 3.6px rgba(0, 0, 0, 0.28)",
          32: "0px 12.8px 28.8px rgba(0, 0, 0, 0.32), 0px 2.4px 7.2px rgba(0, 0, 0, 0.28)",
          64: "0px 25.6px 57.6px rgba(0, 0, 0, 0.32), 0px 4.8px 14.4px rgba(0, 0, 0, 0.28)",
        },
        default: {
          foreground: colors.white,
          foreground1: colors.grey["220"],
          foreground2: colors.grey["310"],
          foreground3: colors.white,
          foreground4: colors.white,

          background: colors.grey["700"],
          background1: colors.grey["750"],
          background2: colors.grey["800"],
          background3: colors.grey["870"],
          background4: colors.grey["550"],
          background5: colors.grey["600"],

          border: colors.grey["450"],
          border1: colors.grey["850"],
          border2: colors.grey["900"],
          border3: colors.grey["550"],

          foregroundHover: colors.white,
          foregroundHover1: colors.white,
          foregroundHover2: colors.white,

          backgroundHover: colors.grey["550"],
          backgroundHover1: colors.grey["750"],
          backgroundHover2: "transparent",
          backgroundHover3: colors.grey["650"],
          backgroundHover4: colors.grey["750"],
          backgroundHover6: colors.grey["550"],
          borderHover: colors.grey["430"],

          foregroundPressed: colors.white,
          backgroundPressed: colors.grey["650"],

          foregroundActive: colors.white,
          foregroundActive1: colors.white,

          backgroundActive: colors.grey["600"],
          backgroundActive1: colors.grey["800"],

          borderActive: colors.grey["440"],

          // foregroundFocus: not specified,
          // backgroundFocus: not specified,

          borderFocus: colors.white,
          borderFocusWithin: colors.black,

          foregroundDisabled: colors.grey["460"],
          foregroundDisabled1: colors.grey["460"],

          borderDisabled: colors.grey["500"],

          backgroundDisabled: colors.grey["800"],
          backgroundDisabled1: colors.grey["800"],
        },
        brand: {
          background: colors.brand["600"],
          background1: colors.brand["1000"],
          background2: colors.brand["900"],
          background3: colors.brand["1000"],
          background4: colors.grey["910"],

          foreground: colors.brand["450"],
          foreground1: colors.brand["450"],
          foreground2: colors.brand["450"],
          foreground3: colors.brand["200"],
          foreground4: colors.white,

          border: colors.grey["450"],
          border1: colors.brand["800"],
          border2: colors.brand["800"],

          foregroundHover: colors.brand["450"],
          foregroundHover1: colors.white,
          foregroundHover2: colors.brand["200"],

          borderHover: colors.brand["600"],

          backgroundHover: colors.brand["700"],
          backgroundHover1: colors.brand["900"],

          foregroundPressed: colors.brand["200"],
          foregroundPressed1: colors.white,

          backgroundPressed: colors.brand["800"],

          borderPressed: colors.brand["800"],

          foregroundActive: colors.brand["450"],
          foregroundActive1: colors.brand["450"],
          foregroundActive2: colors.brand["50"],

          backgroundActive: colors.brand["450"],
          backgroundActive1: colors.brand["450"],

          borderActive: colors.grey["450"],
          borderActive1: colors.brand["800"],
          borderActive2: colors.brand["800"],

          foregroundFocus: colors.brand["450"],
          foregroundFocus1: colors.brand["450"],
          foregroundFocus2: colors.brand["450"],
          foregroundFocus3: colors.brand["50"],
          foregroundFocus4: colors.white,

          backgroundFocus: colors.brand["450"],
          backgroundFocus1: colors.brand["1000"],
          backgroundFocus2: colors.brand["900"],
          backgroundFocus3: colors.brand["1000"],

          borderFocus: colors.white,
          borderFocus1: colors.brand["450"],

          borderFocusWithin: colors.black,

          foregroundDisabled: colors.grey["460"],
          foregroundDisabled1: colors.grey["460"],

          borderDisabled: colors.grey["500"],

          backgroundDisabled: colors.grey["800"],
          backgroundDisabled1: colors.grey["800"],
        },
      },
    },
  });
};
