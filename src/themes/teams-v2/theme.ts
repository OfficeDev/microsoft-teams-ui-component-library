import { ThemePrepared, teamsTheme } from "@fluentui/react-northstar";
import { mergeSharedComponentStyles, sharedStaticStyles } from "../shared";

/**
 * Custom override styles, as needed, for each exported Stardust component.
 * All component-specific styling should be defined in these functions.
 */
import { alertStyles } from "./components/Alert/alert-styles";
import { flexStyles } from "./components/Flex/flex-styles";

import { staticStyles } from "./static-styles";

import siteVariables from "./site-variables";

/**
 * TFW 2 default theme overrides
 */
export const defaultV2ThemeOverrides: Partial<ThemePrepared> = {
  componentStyles: mergeSharedComponentStyles({
    Alert: alertStyles,
    Flex: flexStyles,
  }),
  siteVariables: {
    ...teamsTheme.siteVariables,
    ...siteVariables,
  },
  staticStyles: sharedStaticStyles.concat(staticStyles),
};

export { default as defaultV2ColorAssignments } from "./color-scheme-assignments";
