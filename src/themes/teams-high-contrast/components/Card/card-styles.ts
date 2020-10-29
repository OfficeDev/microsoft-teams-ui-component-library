import {
  ComponentSlotStylesPrepared,
  TeamsThemeStylesProps,
} from "@fluentui/react-northstar";

export const cardStyles: ComponentSlotStylesPrepared<
  NonNullable<Partial<TeamsThemeStylesProps["Card"]>>,
  any
> = {
  root: ({
    theme: {
      siteVariables: { colorScheme, colors },
    },
    variables: {},
  }) => {
    return {};
  },
};
