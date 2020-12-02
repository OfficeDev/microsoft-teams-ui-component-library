import {
  ComponentSlotStylesPrepared,
  TeamsThemeStylesProps,
} from "@fluentui/react-northstar";

export const buttonStyles: ComponentSlotStylesPrepared<
  NonNullable<Partial<TeamsThemeStylesProps["Button"]>>,
  any
> = {
  root: (componentStyleParameters) => {
    const {
      theme: {
        siteVariables: { colorScheme },
      },
      props: { primary, text },
    } = componentStyleParameters;
    return {
      borderRadius: "4px",
      color: colorScheme.default.foreground,
      ...(!text && {
        boxShadow: colorScheme.elevations[4],
        ...(primary && {
          color: colorScheme.brand.foregroundHover1,
        }),
        "&:active": {
          boxShadow: colorScheme.elevations[2],
        },
      }),
    };
  },
};
