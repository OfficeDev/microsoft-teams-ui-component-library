import {
  ComponentSlotStylesPrepared,
  TeamsThemeStylesProps,
} from "@fluentui/react-northstar";

const avatarContentStyles = {
  borderColor: "var(--surface-background-color, transparent)",
  borderRadius: "var(--avatar__border-radius, 9999px)",
  clipPath: "var(--avatar__clip-path, none)",
};

export const avatarStyles: ComponentSlotStylesPrepared<
  NonNullable<Partial<TeamsThemeStylesProps["Avatar"]>>,
  any
> = {
  image: () => {
    return avatarContentStyles;
  },
  label: () => {
    return avatarContentStyles;
  },
  icon: () => {
    return avatarContentStyles;
  },
  root: () => {
    return {
      backgroundColor: "var(--surface-background-color, transparent)",
    };
  },
};
