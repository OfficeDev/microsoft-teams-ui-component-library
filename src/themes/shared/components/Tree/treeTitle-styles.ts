import {
  ComponentSlotStylesPrepared,
  TeamsThemeStylesProps,
} from "@fluentui/react-northstar";

export const treeTitleStyles: ComponentSlotStylesPrepared<
  NonNullable<Partial<TeamsThemeStylesProps["TreeTitle"]>>,
  any
> = {
  selectionIndicator: () => {
    return {
      // This should always be displayed per WGAG §1.3:
      // https://www.w3.org/TR/WCAG20/#content-structure-separation.
      // Otherwise tree items that are selectable appear identical to tree items that are not to
      // users who cannot hover with a pointer device.
      // A consistent fix has not arrived in Fluent UI as of v0.56:
      // https://github.com/microsoft/fluentui/issues/14720
      display: "inherit",
    };
  },
};
