import {
  ComponentSlotStylesPrepared,
  TeamsThemeStylesProps,
} from "@fluentui/react-northstar";

export const formMessageStyles: ComponentSlotStylesPrepared<
  NonNullable<Partial<TeamsThemeStylesProps["FormMessage"]>>,
  any
> = {
  root: () => {
    return {
      paddingLeft: ".5rem",
    };
  },
};
