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
      borderColor: `var(--surface-background-color, ${colorScheme.default.background})`,
    };
  },
  label: (componentStyleParameters) => {
    const {
      theme: {
        siteVariables: { colorScheme },
      },
    } = componentStyleParameters;
    return {
      borderColor: `var(--surface-background-color, ${colorScheme.default.background})`,
    };
  },
  root: (componentStyleParameters) => {
    const {
      theme: {
        siteVariables: { colorScheme },
      },
    } = componentStyleParameters;
    return {
      backgroundColor: `var(--surface-background-color, ${colorScheme.default.background})`,
    };
  },
};
