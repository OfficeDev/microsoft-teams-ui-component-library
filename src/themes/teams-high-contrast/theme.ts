import { ThemePrepared, teamsDarkTheme } from "@fluentui/react-northstar";

// Teams high contrast theme
/**
 * Custom override styles, as needed, for each exported Stardust component.
 * All component-specific styling should be defined in these functions.
 */
import siteVariables from "./site-variables";
import { staticStyles } from "./static-styles";

import { cardStyles } from "./components/Card/card-styles";

export const highContrastThemeOverrides: Partial<ThemePrepared> = {
  componentStyles: {
    Card: cardStyles,
  },
  componentVariables: {},
  siteVariables: {
    ...teamsDarkTheme.siteVariables,
    ...siteVariables,
  },
  staticStyles,
};
