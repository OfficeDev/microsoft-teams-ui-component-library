import {
  ComponentSlotStylesPrepared,
  TeamsThemeStylesProps,
} from "@fluentui/react-northstar";

type FlexVars = {
  isCallingSidePanel: boolean;
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
      variables: { isCallingSidePanel, appTileVertical },
    } = componentStyleParameters;
    const { default: colorSchemeDefault } = colorScheme;
    return {
      ...(isCallingSidePanel && {
        background: colorSchemeDefault.background2,
        borderLeft: `.1rem solid ${colorSchemeDefault.border2}`,
      }),
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
