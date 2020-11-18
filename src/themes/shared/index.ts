import { mergeComponentStyles } from "@fluentui/react-northstar";
import mergeWith from "lodash/mergeWith";

import { buttonStyles } from "./components/Button/button-styles";
import { buttonContentStyles } from "./components/Button/buttonContent-styles";
import { checkboxStyles } from "./components/Checkbox/checkbox-styles";
import { cardStyles } from "./components/Card/card-styles";
import { radiogroupItemStyles } from "./components/RadiogroupItem/radiogroupItem-styles";
import { dropdownStyles } from "./components/Dropdown/dropdown-styles";

import {
  ComponentSlotStylesPrepared,
  ThemeComponentStylesPrepared,
} from "@fluentui/styles";

type TComponentStyles = {
  [key in keyof ThemeComponentStylesPrepared<
    Record<string, any>
  >]: ComponentSlotStylesPrepared;
};

export const sharedComponentStyles: TComponentStyles = {
  Button: buttonStyles,
  ButtonContent: buttonContentStyles,
  Card: cardStyles,
  Checkbox: checkboxStyles,
  Dropdown: dropdownStyles,
  RadioGroupItem: radiogroupItemStyles,
};

export const mergeSharedComponentStyles = (
  componentStyles: TComponentStyles
): TComponentStyles => {
  return mergeWith(
    componentStyles,
    sharedComponentStyles,
    (
      styles: ComponentSlotStylesPrepared,
      sharedStyles: ComponentSlotStylesPrepared
    ) => {
      if (styles && sharedStyles) {
        return mergeComponentStyles(sharedStyles, styles);
      } else return styles || sharedStyles;
    }
  );
};

export { staticStyles as sharedStaticStyles } from "./static-styles";
