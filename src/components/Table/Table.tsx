import React, { useLayoutEffect, useState, useRef } from "react";
import omit from "lodash/omit";

import {
  Button,
  Checkbox,
  Popup,
  Menu,
  PropsOfElement,
  ProviderConsumer as FluentUIThemeConsumer,
  ShorthandCollection,
  Table as FluentUITable,
  TableCellProps,
  TableRowProps,
  dialogBehavior,
  gridNestedBehavior,
  gridCellWithFocusableElementBehavior,
} from "@fluentui/react-northstar";

import {
  ArrowDownIcon,
  ArrowUpIcon,
  MoreIcon,
  OpenOutsideIcon,
} from "@fluentui/react-icons-northstar";

import { SiteVariablesPrepared } from "@fluentui/styles";

import Icon from "../../lib/Icon";

import { TableTheme } from "./TableTheme";

import getBreakpoints, {
  IColumn,
  accessoryWidth,
  columnMinWidth,
} from "./tableBreakpoints";

import { TActions } from "../../types/types";
import { convertRemToPixels } from "../../utils";

export type columnKey = string;
export type rowKey = string;
type sortOrder = [columnKey | "__rowKey__", "asc" | "desc"];

export type TSelected = Set<rowKey>;

export interface IRow {
  [columnKey: string]: string | TActions | undefined;
  actions?: TActions;
}

export interface ITableProps extends PropsOfElement<"div"> {
  columns: { [columnKey: string]: IColumn };
  rows: { [rowKey: string]: IRow };
  truncate?: boolean;
  selectable?: boolean;
  onSelectedChange?: (selected: TSelected) => TSelected;
  findQuery?: string;
  filterBy?: (row: IRow) => boolean;
}

interface ISortOrderIndicatorProps {
  columnKey: columnKey;
  sortOrder: sortOrder;
}

const SortOrderIndicator = ({
  columnKey,
  sortOrder,
}: ISortOrderIndicatorProps) => {
  const [sortOrderKey, sortOrderDirection] = sortOrder;
  if (columnKey === sortOrderKey) {
    if (sortOrderDirection === "asc") return <ArrowUpIcon />;
    else return <ArrowDownIcon />;
  } else return null;
};

const ariaSort = ({
  columnKey,
  sortOrder,
}: ISortOrderIndicatorProps): {
  "aria-sort": "ascending" | "descending" | undefined;
} => {
  const [sortOrderKey, sortOrderDirection] = sortOrder;
  if (columnKey === sortOrderKey) {
    if (sortOrderDirection === "asc") return { "aria-sort": "ascending" };
    else return { "aria-sort": "descending" };
  } else return { "aria-sort": undefined };
};

const defaultSortOrder: sortOrder = ["__rowKey__", "desc"];

const passThrough = (arg: any) => arg;

const rowPadding = 1.25;

export const Table = (props: ITableProps) => {
  const rowKeys = Object.keys(props.rows);
  const columnKeys = Object.keys(props.columns);

  const [sortOrder, setSortOrder] = useState<sortOrder>(defaultSortOrder);

  const [selected, setSelected] = useState<TSelected>(new Set());
  const propagateSetSelected = (selected: TSelected) =>
    setSelected((props.onSelectedChange || passThrough)(selected));

  const selectedIndeterminate =
    selected.size > 0 && selected.size < rowKeys.length;

  const hasActions =
    rowKeys.findIndex((rowKey) =>
      props.rows[rowKey].hasOwnProperty("actions")
    ) >= 0;

  const breakpoints = getBreakpoints(
    props.columns,
    hasActions,
    !!props.selectable
  );

  const tableWrapperRef = useRef(null);

  const [inFlowColumns, setInFlowColumns] = useState<Set<columnKey>>(
    // start by displaying all columns (in case of SSR)
    breakpoints.get(Infinity)!
  );

  const onResize = () => {
    if (tableWrapperRef.current !== null) {
      const tableWrapper = tableWrapperRef.current! as HTMLDivElement;
      const widths = Array.from(breakpoints.keys()).sort(
        (a: number, b: number) => a - b
      );
      const firstBreak = widths.findIndex(
        (width) =>
          width > tableWrapper.clientWidth - convertRemToPixels(rowPadding) * 2
      );
      // use the last width to not be greater than the client width, or zero if they all were
      const nextInFlowColumns = breakpoints.get(
        widths[Math.max(0, firstBreak - 1)]
      )!;
      // update the set of in-flow columns if the next set is a different size or contains different elements
      if (
        nextInFlowColumns.size !== inFlowColumns.size ||
        new Set(
          Array.from(nextInFlowColumns).filter((x) => !inFlowColumns.has(x))
        ).size > 0
      )
        setInFlowColumns(nextInFlowColumns);
    }
  };

  useLayoutEffect(() => {
    window.addEventListener("resize", onResize);
    onResize();
    return () => window.removeEventListener("resize", onResize);
  });

  const rowWidthStyles = (truncate: boolean) => {
    const minWidth = Array.from(inFlowColumns).reduce(
      (acc, columnKey) => acc + columnMinWidth(columnKey, props.columns),
      0
    );
    return {
      padding: `0 ${rowPadding}rem`,
      minWidth: `${minWidth}px`,
    };
  };

  const columnWidthStyles = (columnKey: string, truncate: boolean) => {
    const minWidth = columnMinWidth(columnKey, props.columns);
    return {
      flexGrow: minWidth,
      minWidth: `${minWidth}px`,
    };
  };

  const accessoryStyles = {
    flexShrink: 0,
    flexGrow: 0,
    width: `${accessoryWidth}px`,
    minWidth: `${accessoryWidth}px`,
    display: "flex",
    justifyContent: "center",
    height: "calc(3rem - 2px)",
  };

  const columnOrder = ["selection", ...columnKeys, "overflow"];

  const rowOrder =
    sortOrder[0] === defaultSortOrder[0]
      ? rowKeys
      : rowKeys.sort((rowKeyA, rowKeyB) => {
          let rowKeyI = rowKeyA,
            rowKeyJ = rowKeyB;
          if (sortOrder[1] === "asc") {
            rowKeyI = rowKeyB;
            rowKeyJ = rowKeyA;
          }
          return (props.rows[rowKeyI][sortOrder[0]] as string).localeCompare(
            props.rows[rowKeyJ]![sortOrder[0]] as string
          );
        });

  const hiddenColumns = new Set(
    columnKeys.filter((columnKey) => !inFlowColumns.has(columnKey))
  );

  const setRowSelected = (rowSelected: boolean, rowKey: rowKey) => {
    if (rowSelected) propagateSetSelected(new Set(selected.add(rowKey)));
    else {
      selected.delete(rowKey);
      propagateSetSelected(new Set(selected));
    }
  };

  const includeRow = (row: IRow) =>
    props.filterBy ? props.filterBy(row) : true;

  return (
    <FluentUIThemeConsumer
      render={(globalTheme) => (
        <TableTheme globalTheme={globalTheme}>
          <div
            ref={tableWrapperRef}
            style={{ width: "100%", overflowX: "auto" }}
          >
            <FluentUITable
              header={{
                key: "header",
                compact: true,
                variables: { compactRow: true },
                styles: rowWidthStyles(!!props.truncate),
                items: columnOrder.reduce(
                  (acc: ShorthandCollection<TableCellProps>, columnKey) => {
                    const column = props.columns[columnKey];
                    if (inFlowColumns.has(columnKey))
                      switch (columnKey) {
                        case "overflow":
                          acc.push({
                            key: "header__overflow",
                            content: "",
                            styles: accessoryStyles,
                            "data-is-focusable": false,
                          });
                          break;
                        case "selection":
                          acc.push({
                            key: "header__selection",
                            accessibility: gridCellWithFocusableElementBehavior,
                            content: (
                              <Checkbox
                                aria-label="Select all"
                                checked={selected.size > 0}
                                variables={{
                                  margin: 0,
                                  indeterminate: selectedIndeterminate,
                                }}
                                onChange={(_e, props) => {
                                  if (props?.checked)
                                    propagateSetSelected(new Set(rowKeys));
                                  else if (selectedIndeterminate)
                                    propagateSetSelected(new Set(rowKeys));
                                  else propagateSetSelected(new Set());
                                }}
                                styles={{
                                  gridTemplateColumns: "1fr",
                                }}
                              />
                            ),
                            styles: {
                              ...accessoryStyles,
                              height: "calc(2.5rem - 2px)",
                            },
                          });
                          break;
                        default:
                          acc.push({
                            key: `header__${columnKey}`,
                            content: column.sortable ? (
                              <Button
                                content={column.title}
                                icon={
                                  <SortOrderIndicator
                                    {...{ sortOrder, columnKey }}
                                  />
                                }
                                iconPosition="after"
                                text
                                styles={{ padding: 0 }}
                                onClick={() => {
                                  if (sortOrder[0] === columnKey) {
                                    if (sortOrder[1] === "desc") {
                                      setSortOrder([columnKey, "asc"]);
                                    } else {
                                      setSortOrder(defaultSortOrder);
                                    }
                                  } else {
                                    setSortOrder([columnKey, "desc"]);
                                  }
                                }}
                              />
                            ) : (
                              column.title
                            ),
                            styles: columnWidthStyles(
                              columnKey,
                              !!props.truncate
                            ),
                            ...(column.sortable
                              ? {
                                  accessibility: gridCellWithFocusableElementBehavior,
                                  ...ariaSort({ sortOrder, columnKey }),
                                }
                              : {}),
                          });
                          break;
                      }
                    return acc;
                  },
                  []
                ),
              }}
              rows={rowOrder.reduce(
                (acc: ShorthandCollection<TableRowProps>, rowKey: rowKey) => {
                  const row = props.rows[rowKey];
                  const rowActionKeys = (hiddenColumns.size
                    ? ["__details__"]
                    : []
                  ).concat(row.actions ? Object.keys(row.actions!) : []);
                  if (includeRow(row))
                    acc.push({
                      key: rowKey,
                      styles: rowWidthStyles(!!props.truncate),
                      variables: ({
                        colorScheme,
                        theme,
                      }: SiteVariablesPrepared) =>
                        selected.has(rowKey) &&
                        theme !== "teamsHighContrastTheme"
                          ? {
                              backgroundColor: colorScheme.grey.backgroundFocus,
                              color: colorScheme.grey.foregroundFocus,
                            }
                          : {},
                      onClick: ({ type }) => {
                        if (type === "click") return;
                        // respond only to keyboard space & enter for selection
                        props.selectable &&
                          setRowSelected(!selected.has(rowKey), rowKey);
                      },
                      items: columnOrder.reduce(
                        (
                          acc: ShorthandCollection<TableCellProps>,
                          columnKey
                        ) => {
                          if (inFlowColumns.has(columnKey))
                            switch (columnKey) {
                              case "overflow":
                                acc.push({
                                  key: `${rowKey}__overflow`,
                                  content: rowActionKeys.length ? (
                                    <Popup
                                      trigger={
                                        <Button
                                          icon={<MoreIcon />}
                                          text
                                          aria-label="More actions"
                                          styles={{ color: "currentColor" }}
                                        />
                                      }
                                      content={
                                        <Menu
                                          items={rowActionKeys.map(
                                            (rowActionKey) => {
                                              switch (rowActionKey) {
                                                case "__details__":
                                                  return {
                                                    key: `${rowKey}__details__`,
                                                    icon: <OpenOutsideIcon />,
                                                    content: "Details",
                                                  };
                                                default:
                                                  return {
                                                    key: `${rowKey}__${rowActionKey}`,
                                                    icon: (
                                                      <Icon
                                                        icon={
                                                          row.actions![
                                                            rowActionKey
                                                          ].icon
                                                        }
                                                      />
                                                    ),
                                                    content: row.actions![
                                                      rowActionKey
                                                    ].title,
                                                  };
                                              }
                                            }
                                          )}
                                          vertical
                                        />
                                      }
                                      offset={[-4, 4]}
                                      position="below"
                                      accessibility={dialogBehavior}
                                      autoFocus={true}
                                    />
                                  ) : (
                                    ""
                                  ),
                                  styles: accessoryStyles,
                                  accessibility: gridCellWithFocusableElementBehavior,
                                });
                                break;
                              case "selection":
                                acc.push({
                                  key: `${rowKey}__selection`,
                                  content: (
                                    <Checkbox
                                      aria-label="Select"
                                      variables={{ margin: 0 }}
                                      checked={selected.has(rowKey)}
                                      onChange={(_e, props) => {
                                        setRowSelected(
                                          !!props?.checked,
                                          rowKey
                                        );
                                      }}
                                      styles={{
                                        gridTemplateColumns: "1fr",
                                      }}
                                    />
                                  ),
                                  accessibility: gridCellWithFocusableElementBehavior,
                                  styles: accessoryStyles,
                                });
                                break;
                              default:
                                const cell = row[columnKey];
                                acc.push({
                                  key: `${rowKey}__${columnKey}`,
                                  content: cell,
                                  truncateContent: !!props.truncate,
                                  styles: columnWidthStyles(
                                    columnKey,
                                    !!props.truncate
                                  ),
                                });
                                break;
                            }
                          return acc;
                        },
                        []
                      ),
                    });
                  return acc;
                },
                []
              )}
              variables={({ theme, colorScheme }: SiteVariablesPrepared) => {
                return {
                  // box model
                  compactRowHeight: "2.5rem",
                  defaultRowMinHeight: "3rem",
                  defaultRowVerticalPadding: ".8125rem",
                  ...(props.truncate
                    ? {
                        defaultRowHeight: "3rem",
                      }
                    : {
                        defaultRowHeight: "auto",
                        cellVerticalAlignment: "flex-start",
                      }),
                  // colors
                  backgroundColor:
                    theme === "teamsHighContrastTheme"
                      ? colorScheme.grey.background
                      : colorScheme.grey.background2,
                  ...(theme === "teamsHighContrastTheme"
                    ? {
                        rowBorderColor: colorScheme.grey.foreground,
                        rowBorderHoverColor: colorScheme.grey.foreground,
                      }
                    : {}),
                };
              }}
              styles={{
                width: "auto",
              }}
              accessibility={gridNestedBehavior}
              {...omit(props, [
                "columns",
                "rows",
                "truncate",
                "selectable",
                "onSelectedChange",
                "findQuery",
                "filterBy",
              ])}
            />
          </div>
        </TableTheme>
      )}
    />
  );
};
