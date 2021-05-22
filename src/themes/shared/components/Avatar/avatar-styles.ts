import {
  ComponentSlotStylesPrepared,
  TeamsThemeStylesProps,
} from "@fluentui/react-northstar";

export const avatarStyles: ComponentSlotStylesPrepared<
  NonNullable<Partial<TeamsThemeStylesProps["Avatar"]>>,
  any
> = {
  image: (componentStyleParameters) => {
    const {
      theme: {
        siteVariables: { colorScheme },
      },
    } = componentStyleParameters;
    return {
      borderColor: `var(--surface-background-color, transparent)`,
    };
  },
  label: (componentStyleParameters) => {
    const {
      theme: {
        siteVariables: { colorScheme },
      },
    } = componentStyleParameters;
    return {
      borderColor: `var(--surface-background-color, transparent)`,
    };
  },
  root: (componentStyleParameters) => {
    const {
      theme: {
        siteVariables: { colorScheme },
      },
    } = componentStyleParameters;
    return {
      backgroundColor: `var(--surface-background-color, transparent)`,
    };
  },
};
