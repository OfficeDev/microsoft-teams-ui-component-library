import {
  ComponentSlotStylesPrepared,
  TeamsThemeStylesProps,
} from "@fluentui/react-northstar";
import { DialogVariant } from "../../../../types/types";
import { TeamsTheme } from "../../../constants";

export const dialogStyles: ComponentSlotStylesPrepared<
  NonNullable<Partial<TeamsThemeStylesProps["Dialog"]>>,
  any
> = {
  overlay: (componentStyleParameters) => {
    const {
      variables,
      theme: {
        siteVariables: { colorScheme, theme },
      },
    } = componentStyleParameters;
    switch (variables.variant) {
      case DialogVariant.sidebar:
        return {
          background: "transparent",
          flexDirection: "column",
          justifyContent: "stretch",
          alignItems: "flex-end",
        };
      default:
        return {};
    }
  },
  root: (componentStyleParameters) => {
    const {
      variables,
      theme: {
        siteVariables: { colorScheme, theme },
      },
    } = componentStyleParameters;
    switch (variables.variant) {
      case DialogVariant.sidebar:
        return {
          borderRadius: 0,
          background: colorScheme.default.background2,
          boxShadow: colorScheme.elevations[8],
          flex: "1 0 0",
          overflow: "auto",
        };
      default:
        return {};
    }
  },
  content: (componentStyleParameters) => {
    const {
      variables,
      theme: {
        siteVariables: { colorScheme, theme },
      },
    } = componentStyleParameters;
    switch (variables.variant) {
      case DialogVariant.sidebar:
        return {
          flex: "1 0 0",
        };
      default:
        return {};
    }
  },
};
