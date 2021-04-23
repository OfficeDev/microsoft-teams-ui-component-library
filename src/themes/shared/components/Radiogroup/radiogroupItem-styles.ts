import {
  ComponentSlotStylesPrepared,
  TeamsThemeStylesProps,
} from "@fluentui/react-northstar";

import get from "lodash/get";

export const radiogroupItemStyles: ComponentSlotStylesPrepared<
  NonNullable<Partial<TeamsThemeStylesProps["Button"]>>,
  any
> = {
  indicator: (componentStyleParameters) => {
    const {
      theme: {
        siteVariables: { colorScheme },
      },
      props,
    } = componentStyleParameters;
    const checked = get(props, "checked");
    return {
      width: "1rem",
      height: "1rem",
      background: "transparent",
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: "var(--radiogroup__item__indicator-color--outer)",
      borderRadius: "99px",
      "&::before": {
        content: '""',
        display: "block",
        borderRadius: "9999px",
        width: "100%",
        height: "100%",
        padding: "var(--radiogroup__item__indicator-padding--inner, 2px)",
        backgroundClip: "content-box !important",
        background: "var(--radiogroup__item__indicator-color--inner)",
      },
      "& .ui-icon": { display: "none" },
    };
  },
  root: (componentStyleParameters) => {
    const {
      theme: {
        siteVariables: { colorScheme },
      },
      props,
    } = componentStyleParameters;
    const checked = get(props, "checked");
    return {
      borderWidth: 0,
      marginLeft: 0,
      marginTop: 0,
      marginRight: 0,
      marginBottom: 0,
      padding: ".25rem .3125rem",
      "--radiogroup__item__indicator-color--outer": checked
        ? colorScheme.brand.borderFocus1
        : colorScheme.default.foreground2,
      "--radiogroup__item__indicator-color--inner": checked
        ? colorScheme.brand.borderFocus1
        : "transparent",
      "&:hover": checked
        ? {
            "--radiogroup__item__indicator-color--outer":
              colorScheme.brand.backgroundHover,
            "--radiogroup__item__indicator-color--inner":
              colorScheme.brand.backgroundHover,
          }
        : {
            "--radiogroup__item__indicator-color--outer":
              colorScheme.default.foreground1,
          },
      "&:active": {
        "--radiogroup__item__indicator-padding--inner": "3px",
        "--radiogroup__item__indicator-color--outer": checked
          ? colorScheme.brand.backgroundPressed
          : colorScheme.default.foregroundPressed,
        "--radiogroup__item__indicator-color--inner": checked
          ? colorScheme.brand.backgroundPressed
          : colorScheme.default.foreground2,
      },
    };
  },
};
