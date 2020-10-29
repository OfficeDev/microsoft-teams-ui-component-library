import {
  ThemePrepared,
  teamsHighContrastTheme,
} from "@fluentui/react-northstar";

/**
 * Custom override styles, as needed, for each exported Stardust component.
 * All component-specific styling should be defined in these functions.
 */
import { alertStyles } from "./components/Alert/alert-styles";
import { buttonStyles } from "./components/Button/button-styles";
import { flexStyles } from "./components/Flex/flex-styles";
import { treeStyles } from "./components/Tree/tree-styles";
import siteVariables from "./site-variables";

/**
 * TFW 2 dark theme overrides
 */
export const darkV2ThemeOverrides: Partial<ThemePrepared> = {
  componentStyles: {
    Alert: alertStyles,
    Button: buttonStyles,
    Flex: flexStyles,
    Tree: treeStyles,
  },
  siteVariables: {
    ...teamsHighContrastTheme.siteVariables,
    ...siteVariables,
  },
};
