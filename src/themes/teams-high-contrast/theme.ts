import {
  ThemePrepared,
  teamsHighContrastTheme,
} from "@fluentui/react-northstar";

// Teams high contrast theme
/**
 * Custom override styles, as needed, for each exported Stardust component.
 * All component-specific styling should be defined in these functions.
 */
import siteVariables from "./site-variables";
import { staticStyles } from "./static-styles";

import { buttonStyles } from "./components/Button/button-styles";
import { cardStyles } from "./components/Card/card-styles";

export const highContrastThemeOverrides: Partial<ThemePrepared> = {
  componentStyles: {
    Button: buttonStyles,
    Card: cardStyles,
  },
  componentVariables: {},
  siteVariables: {
    ...teamsHighContrastTheme.siteVariables,
    ...siteVariables,
  },
  staticStyles,
};
