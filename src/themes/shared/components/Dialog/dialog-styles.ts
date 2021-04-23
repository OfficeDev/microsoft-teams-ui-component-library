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
          height: "100%",
          borderRadius: 0,
          background: colorScheme.default.background2,
          boxShadow: colorScheme.elevations[8],
          display: "flex",
          flexFlow: "column nowrap",
          padding: 0,
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
          overflow: "auto",
          marginBottom: 0,
        };
      default:
        return {};
    }
  },
  footer: (componentStyleParameters) => {
    const {
      variables,
      theme: {
        siteVariables: { colorScheme, theme },
      },
    } = componentStyleParameters;
    switch (variables.variant) {
      case DialogVariant.sidebar:
        return {
          flex: "0 0 auto",
          padding: "1rem 2rem 2rem 2rem",
          marginTop: 0,
        };
      default:
        return {};
    }
  },
};
