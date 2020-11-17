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
      "&::before": {
        content: '""',
        display: "block",
        borderRadius: "9999px",
        width: "100%",
        height: "100%",
        padding: "2px",
        backgroundClip: "content-box !important",
        background: "var(--radiogroup__item__indicator-color--inner)",
      },
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
    };
  },
};
