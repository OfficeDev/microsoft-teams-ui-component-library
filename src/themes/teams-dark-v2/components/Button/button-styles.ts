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
    } = componentStyleParameters;
    return {
      borderRadius: "4px",
    };
  },
};
