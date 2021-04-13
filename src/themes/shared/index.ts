import { mergeComponentStyles } from "@fluentui/react-northstar";
import mergeWith from "lodash/mergeWith";

import { avatarStyles } from "./components/Avatar/avatar-styles";
import { buttonStyles } from "./components/Button/button-styles";
import { buttonContentStyles } from "./components/Button/buttonContent-styles";
import { checkboxStyles } from "./components/Checkbox/checkbox-styles";
import { cardStyles } from "./components/Card/card-styles";
import { dialogStyles } from "./components/Dialog/dialog-styles";
import { dropdownStyles } from "./components/Dropdown/dropdown-styles";
import { formMessageStyles } from "./components/Form/formMessage-styles";
import { inputStyles } from "./components/Input/input-styles";
import { radiogroupItemStyles } from "./components/Radiogroup/radiogroupItem-styles";

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
  Avatar: avatarStyles,
  Button: buttonStyles,
  ButtonContent: buttonContentStyles,
  Card: cardStyles,
  Checkbox: checkboxStyles,
  Dialog: dialogStyles,
  Dropdown: dropdownStyles,
  FormMessage: formMessageStyles,
  Input: inputStyles,
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
