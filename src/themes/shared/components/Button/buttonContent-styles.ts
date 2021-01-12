import {
  ComponentSlotStylesPrepared,
  TeamsThemeStylesProps,
} from "@fluentui/react-northstar";

export const buttonContentStyles: ComponentSlotStylesPrepared<
  NonNullable<Partial<TeamsThemeStylesProps["Button"]>>,
  any
> = {
  root: () => {
    return {
      fontWeight: "var(--button__content--font-weight, 600)" as "inherit",
    };
  },
};
