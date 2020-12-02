import {
  ComponentSlotStylesPrepared,
  TeamsThemeStylesProps,
} from "@fluentui/react-northstar";

type AlertVars = {
  statusNote: boolean;
};

export const alertStyles: ComponentSlotStylesPrepared<
  NonNullable<Partial<TeamsThemeStylesProps["Alert"]>>,
  Partial<AlertVars>
> = {
  root: (componentStyleParameters) => {
    const {
      theme: {
        siteVariables: { colorScheme },
      },
      variables: { statusNote },
    } = componentStyleParameters;
    const { default: colorSchemeDefault } = colorScheme;
    return {
      ...(statusNote && {
        backgroundColor: colorSchemeDefault.background4,
      }),
    };
  },
};
