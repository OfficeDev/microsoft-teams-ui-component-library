import { ThemePrepared, teamsDarkTheme } from "@fluentui/react-northstar";
import { mergeSharedComponentStyles } from "../shared";

/**
 * Custom override styles, as needed, for each exported Stardust component.
 * All component-specific styling should be defined in these functions.
 */
import { alertStyles } from "./components/Alert/alert-styles";
import { flexStyles } from "./components/Flex/flex-styles";
import { treeStyles } from "./components/Tree/tree-styles";

import { staticStyles } from "./static-styles";

import siteVariables from "./site-variables";

/**
 * TFW 2 dark theme overrides
 */
export const darkV2ThemeOverrides: Partial<ThemePrepared> = {
  componentStyles: mergeSharedComponentStyles({
    Alert: alertStyles,
    Flex: flexStyles,
    Tree: treeStyles,
  }),
  siteVariables: {
    ...teamsDarkTheme.siteVariables,
    ...siteVariables,
  },
  staticStyles,
};
