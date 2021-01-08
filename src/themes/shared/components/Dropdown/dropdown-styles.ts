import {
  ComponentSlotStylesPrepared,
  TeamsThemeStylesProps,
} from "@fluentui/react-northstar";

const borderZero = {
  borderTopWidth: "0",
  borderRightWidth: "0",
  borderBottomWidth: "0",
  borderLeftWidth: "0",
};

export const dropdownStyles: ComponentSlotStylesPrepared<
  NonNullable<Partial<TeamsThemeStylesProps["Dropdown"]>>,
  any
> = {
  root: (componentStyleParameters) => {
    const {
      props,
      theme: {
        siteVariables: { colorScheme },
      },
    } = componentStyleParameters;
    return {
      borderRadius: "4px",
      position: "relative",
      "&::after": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        borderRadius: "4px",
        borderStyle: "solid",
        borderWidth: "1px",
        borderColor: props.error ? colorScheme.red.foreground : "transparent",
        pointerEvents: "none",
      },
    };
  },
  container: (componentStyleParameters) => {
    return {
      ...borderZero,
      "&:hover": borderZero,
    };
  },
  triggerButton: (componentStyleParameters) => {
    return {
      "--button__content--font-weight": 400,
    };
  },
};
