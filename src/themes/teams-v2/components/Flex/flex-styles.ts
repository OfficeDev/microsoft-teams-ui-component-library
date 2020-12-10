import {
  ComponentSlotStylesPrepared,
  TeamsThemeStylesProps,
} from "@fluentui/react-northstar";

type FlexVars = {
  appTileVertical: boolean;
};

export const flexStyles: ComponentSlotStylesPrepared<
  NonNullable<Partial<TeamsThemeStylesProps["Flex"]>>,
  Partial<FlexVars>
> = {
  root: (componentStyleParameters) => {
    const {
      theme: {
        siteVariables: { colorScheme },
      },
      variables: { appTileVertical },
    } = componentStyleParameters;
    const { default: colorSchemeDefault } = colorScheme;
    return {
      ...(appTileVertical && {
        color: colorSchemeDefault.foreground1,
        ":hover": {
          backgroundColor: colorSchemeDefault.backgroundHover,
          color: colorSchemeDefault.foregroundHover,
        },
      }),
    };
  },
};
