import groupBy from "lodash/groupBy";

export type TSortable = "alphabetical" | false;

export interface IColumn {
  title: string;
  minWidth?: number;
  hideable?: boolean;
  hidePriority?: number;
  sortable?: TSortable;
}

interface IPreparedColumn extends IColumn {
  key: string;
}

export const defaultMinWidth = 240;
export const accessoryWidth = 40;
export const staticSpacing = 40;
const defaultHidePriority = Infinity;

export type Breakpoints = Map<number, Set<string>>;

export const columnMinWidth = (
  columnKey: string,
  columns: { [columnKey: string]: IColumn }
) => {
  switch (columnKey) {
    case "overflow":
    case "selection":
      return accessoryWidth;
    default:
      return columns[columnKey].minWidth || defaultMinWidth;
  }
};

export default function getBreakpoints(
  columns: {
    [columnKey: string]: IColumn;
  },
  hasActions: boolean,
  selectable: boolean
): Breakpoints {
  const preparedColumns: IPreparedColumn[] = Object.keys(columns)
    // flatten columns and add key as value and defaults
    .map((columnKey) => ({
      key: columnKey,
      hidePriority: defaultHidePriority,
      ...columns[columnKey],
    }))
    // sort by priority
    .sort((columnA, columnB) => columnA.hidePriority - columnB.hidePriority);

  // group columns between those that can be hidden and those that can’t
  const preparedColumnsByHideable: {
    true: IPreparedColumn[];
    false: IPreparedColumn[];
  } = {
    true: [],
    false: [],
    ...groupBy(preparedColumns, (column) => !!column.hideable),
  };

  // define the set of columns that must be included in all breakpoints
  const baseSet = new Set(
    preparedColumnsByHideable["false"]
      .map((column) => column.key)
      .concat([
        ...(selectable ? ["selection"] : []),
        ...(hasActions || preparedColumnsByHideable["true"].length > 0
          ? ["overflow"]
          : []),
      ])
  );

  // accumulate breakpoints by each hide-able columns' minimum width
  return preparedColumnsByHideable["true"].reduce(
    (acc: { cursor: number; breakpoints: Breakpoints }, column, i, arr) => {
      const minWidth = columnMinWidth(column.key, columns);
      const cursor = acc.cursor + minWidth;
      return {
        cursor,
        breakpoints: acc.breakpoints.set(
          cursor,
          new Set(
            Array.from(acc.breakpoints.get(acc.cursor) || baseSet).concat([
              column.key,
              ...(i + 1 < arr.length ? ["overflow"] : []),
            ])
          )
        ),
      };
    },
    {
      // cursor begins at the min width for all columns that can’t be hidden
      cursor:
        preparedColumnsByHideable["false"].reduce(
          (acc, column) => acc + (column.minWidth || defaultMinWidth),
          0
        ) +
        (hasActions || preparedColumnsByHideable["true"].length > 0
          ? accessoryWidth
          : 0) +
        (selectable ? accessoryWidth : 0) +
        staticSpacing,
      breakpoints: new Map()
        // add an `Infinity` breakpoint which contains all column keys;
        // this is also what is returned if no columns are allowed to be hidden
        .set(
          Infinity,
          new Set(
            Object.keys(columns).concat([
              ...(selectable ? ["selection"] : []),
              ...(hasActions ? ["overflow"] : []),
            ])
          )
        )
        // add a breakpoint for the baseSet
        .set(
          Array.from(baseSet).reduce(
            (acc, columnKey) => acc + columnMinWidth(columnKey, columns),
            0
          ),
          baseSet
        ),
    }
    // return only the breakpoints from the accumulator
  ).breakpoints;
}
