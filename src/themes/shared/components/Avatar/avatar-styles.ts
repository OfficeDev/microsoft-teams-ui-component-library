import {
  ComponentSlotStylesPrepared,
  TeamsThemeStylesProps,
} from "@fluentui/react-northstar";

export const avatarStyles: ComponentSlotStylesPrepared<
  NonNullable<Partial<TeamsThemeStylesProps["Avatar"]>>,
  any
> = {
  image: () => {
    return {
      borderColor: "var(--surface-background-color, transparent)",
      borderRadius: "var(--avatar__border-radius, 9999px)",
      clipPath: "var(--avatar__clip-path, none)",
    };
  },
  label: () => {
    return {
      borderColor: "var(--surface-background-color, transparent)",
    };
  },
  root: () => {
    return {
      backgroundColor: "var(--surface-background-color, transparent)",
    };
  },
};
