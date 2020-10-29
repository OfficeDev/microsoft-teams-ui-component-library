import { ThemePrepared, teamsTheme } from "@fluentui/react-northstar";

/**
 * Custom override styles, as needed, for each exported Stardust component.
 * All component-specific styling should be defined in these functions.
 */
import { alertStyles } from "./components/Alert/alert-styles";
import { buttonStyles } from "./components/Button/button-styles";
import { flexStyles } from "./components/Flex/flex-styles";
import siteVariables from "./site-variables";

/**
 * TFW 2 default theme overrides
 */
export const defaultV2ThemeOverrides: Partial<ThemePrepared> = {
  componentStyles: {
    Alert: alertStyles,
    Button: buttonStyles,
    Flex: flexStyles,
  },
  siteVariables: {
    ...teamsTheme.siteVariables,
    ...siteVariables,
  },
};
