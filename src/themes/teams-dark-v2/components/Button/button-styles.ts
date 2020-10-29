import {
  ComponentSlotStylesPrepared,
  TeamsThemeStylesProps,
} from "@fluentui/react-northstar";

type ButtonVars = {
  isRosterHeaderMoreMenuButton: boolean;
};

export const buttonStyles: ComponentSlotStylesPrepared<
  NonNullable<Partial<TeamsThemeStylesProps["Button"]>>,
  Partial<ButtonVars>
> = {
  root: (componentStyleParameters) => {
    const {
      theme: {
        siteVariables: { colorScheme },
      },
      variables: { isRosterHeaderMoreMenuButton },
    } = componentStyleParameters;
    const { default: colorSchemeDefault } = colorScheme;
    return {
      ...(isRosterHeaderMoreMenuButton && {
        backgroundColor: colorSchemeDefault.background2,
      }),
      /**
       * This is the entry point for namespaces
       */
    };
  },
};
