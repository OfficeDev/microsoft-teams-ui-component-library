import {
  ComponentSlotStylesPrepared,
  TeamsThemeStylesProps,
} from "@fluentui/react-northstar";
import { Surface } from "../../../../types/types";
import { TeamsTheme } from "../../../constants";

export const inputStyles: ComponentSlotStylesPrepared<
  NonNullable<Partial<TeamsThemeStylesProps["Input"]>>,
  any
> = {
  input: (componentStyleParameters) => {
    const {
      variables,
      theme: {
        siteVariables: { colorScheme, theme },
      },
    } = componentStyleParameters;
    return {
      backgroundColor: (() => {
        switch (variables.surface) {
          case Surface.base:
            return colorScheme.default.background;
          case Surface.raised:
          default:
            switch (theme as TeamsTheme) {
              case TeamsTheme.Dark:
                return colorScheme.default.background1;
              default:
                return colorScheme.default.background2;
            }
        }
      })(),
    };
  },
};
