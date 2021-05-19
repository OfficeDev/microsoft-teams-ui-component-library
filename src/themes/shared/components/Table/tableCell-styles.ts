import {
  ComponentSlotStylesPrepared,
  TeamsThemeStylesProps,
} from "@fluentui/react-northstar";

export const tableCellStyles: ComponentSlotStylesPrepared<
  NonNullable<Partial<TeamsThemeStylesProps["TableCell"]>>,
  any
> = {
  content: ({
    theme: {
      siteVariables: { colorScheme },
    },
  }) => {
    return {
      fontSize: "var(--table-cell__content--font-size, 0.875rem)" as "inherit",
      color: `var(--table-cell__content--color, ${colorScheme.default.foreground})` as "inherit",
      backgroundColor: `var(--table-cell__content--background-color, transparent)` as "inherit",
    };
  },
};
