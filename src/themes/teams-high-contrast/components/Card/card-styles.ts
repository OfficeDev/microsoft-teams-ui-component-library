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
      siteVariables: { colorScheme },
    },
    variables: {},
  }) => {
    return {
      borderRadius: "4px",
      borderColor: colorScheme.default.border,
      "&:hover": {
        backgroundColor: colorScheme.default.background,
        borderColor: colorScheme.default.borderHover,
      },
    };
  },
};
