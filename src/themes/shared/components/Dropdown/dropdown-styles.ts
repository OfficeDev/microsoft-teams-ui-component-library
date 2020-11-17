import {
  ComponentSlotStylesPrepared,
  TeamsThemeStylesProps,
} from "@fluentui/react-northstar";

export const dropdownStyles: ComponentSlotStylesPrepared<
  NonNullable<Partial<TeamsThemeStylesProps["Dropdown"]>>,
  any
> = {
  triggerButton: (componentStyleParameters) => {
    return {
      "--button__content--font-weight": 400,
    };
  },
};
