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
      props: { primary },
    } = componentStyleParameters;
    const { brand: colorSchemeBrand } = colorScheme;
    return {
      ...(primary && {
        color: colorSchemeBrand.foregroundHover1,
      }),
    };
  },
};
