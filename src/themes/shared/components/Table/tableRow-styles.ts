import {
  ComponentSlotStylesPrepared,
  TeamsThemeStylesProps,
} from "@fluentui/react-northstar";

export const tableRowStyles: ComponentSlotStylesPrepared<
  NonNullable<Partial<TeamsThemeStylesProps["TableRow"]>>,
  any
> = {
  root: ({
    props: { header },
    theme: {
      siteVariables: { colorScheme },
    },
  }) => {
    return {
      borderBottomColor: colorScheme.default.border2,
      ...(header && { "--table-cell__content--font-size": "0.75rem" }),
      "&:hover": {
        backgroundColor: `${colorScheme.default.background4} !important`,
        borderLeftColor: `${colorScheme.default.background4} !important`,
        borderTopColor: `${colorScheme.default.background4} !important`,
        borderRightColor: `${colorScheme.default.background4} !important`,
        borderBottomColor: `${colorScheme.default.border2} !important`,
      },
    };
  },
};
