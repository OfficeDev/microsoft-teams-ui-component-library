import {
  ComponentSlotStylesPrepared,
  TeamsThemeStylesProps,
} from "@fluentui/react-northstar";

export const checkboxStyles: ComponentSlotStylesPrepared<
  NonNullable<Partial<TeamsThemeStylesProps["Checkbox"]>>,
  any
> = {
  root: (componentStyleParameters) => {
    const { variables } = componentStyleParameters;
    return {
      padding: ".25rem .3125rem",
      ...(variables.layout === "radio-like" && {
        display: "grid",
        gridTemplateColumns: "auto 0.75rem 1fr",
      }),
    };
  },
};
