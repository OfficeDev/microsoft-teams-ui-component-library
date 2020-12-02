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
      borderStyle: "solid",
      "&:hover": {
        borderColor: colorScheme.default.borderHover,
        backgroundColor: colorScheme.default.backgroundHover,
        color: colorScheme.default.foregroundHover + " !important",
      },
      "&:focus": {
        backgroundColor:
          !text && primary
            ? colorScheme.brand.background + " !important"
            : colorScheme.default.background + " !important",
        color:
          !text && primary
            ? colorScheme.brand.foreground4
            : colorScheme.default.foreground + " !important",
      },
    };
  },
};
