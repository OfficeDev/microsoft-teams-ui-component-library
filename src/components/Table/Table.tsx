import React, { useLayoutEffect, useState, useRef } from "react";
import omit from "lodash/omit";
import debounce from "lodash/debounce";

import {
  Button,
  Checkbox,
  Popup,
  Menu,
  MenuButton,
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
  AcceptIcon,
  ChevronDownIcon,
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
  TSortable,
} from "./tableBreakpoints";

import { TActions } from "../..";
import { TeamsTheme } from "../../themes";
import { TTranslations } from "../../translations";

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
    if (sortOrderDirection === "asc")
      return (
        <>
          <ArrowUpIcon
            outline
            styles={{ marginRight: ".25rem", marginLeft: ".5rem" }}
          />
          <ChevronDownIcon outline size="small" />
        </>
      );
    else
      return (
        <>
          <ArrowDownIcon
            outline
            styles={{ marginRight: ".25rem", marginLeft: ".5rem" }}
          />
          <ChevronDownIcon outline size="small" />
        </>
      );
  } else return <ChevronDownIcon outline size="small" />;
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

  const $tableWrapper = useRef<HTMLDivElement | null>(null);

  const [inFlowColumns, setInFlowColumns] = useState<Set<columnKey>>(
    // start by displaying all columns (in case of SSR)
    breakpoints.get(Infinity)!
  );

  const onResize = () => {
    if ($tableWrapper.current !== null) {
      const widths = Array.from(breakpoints.keys()).sort(
        (a: number, b: number) => a - b
      );
      const firstBreak = widths.findIndex(
        (width) => width > $tableWrapper.current!.clientWidth
      );
      // use the last width to not be greater than the client width, or zero if they all were
      const nextInFlowColumns = breakpoints.get(
        widths[Math.max(0, firstBreak - 1)]
      )!;
      setInFlowColumns(nextInFlowColumns);
    }
  };

  useLayoutEffect(() => {
    const debouncedResize = debounce(onResize, 100);
    window.addEventListener("resize", debouncedResize);
    onResize();
    return () => window.removeEventListener("resize", debouncedResize);
  }, []);

  const rowWidthStyles = (truncate: boolean) => {
    const minWidth = Array.from(inFlowColumns).reduce(
      (acc, columnKey) => acc + columnMinWidth(columnKey, props.columns),
      0
    );
    return {
      padding: "0 1.25rem",
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

  const sortableLabelDesc = (t: TTranslations, sortable: TSortable): string =>
    t[`sort-order ${sortable} descending`];
  const sortableLabelAsc = (t: TTranslations, sortable: TSortable): string =>
    t[`sort-order ${sortable} ascending`];

  return (
    <FluentUIThemeConsumer
      render={(globalTheme) => (
        <TableTheme globalTheme={globalTheme}>
          <div ref={$tableWrapper} style={{ width: "100%", overflowX: "auto" }}>
            <FluentUITable
              header={{
                key: "header",
                compact: true,
                variables: { compactRow: true },
                styles: {
                  ...rowWidthStyles(!!props.truncate),
                  backgroundColor:
                    globalTheme.siteVariables.colorScheme.default.background2,
                },
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
                              <MenuButton
                                menu={[
                                  {
                                    content: sortableLabelDesc(
                                      globalTheme.siteVariables.t,
                                      column.sortable
                                    ),
                                    onClick: () => {
                                      setSortOrder(
                                        sortOrder[0] === columnKey &&
                                          sortOrder[1] === "desc"
                                          ? defaultSortOrder
                                          : [columnKey, "desc"]
                                      );
                                    },
                                    ...(sortOrder[0] === columnKey && {
                                      icon: (
                                        <AcceptIcon
                                          outline
                                          styles={{
                                            visibility:
                                              sortOrder[1] === "desc"
                                                ? "visible"
                                                : "hidden",
                                          }}
                                        />
                                      ),
                                    }),
                                  },
                                  {
                                    content: sortableLabelAsc(
                                      globalTheme.siteVariables.t,
                                      column.sortable
                                    ),
                                    onClick: () => {
                                      setSortOrder(
                                        sortOrder[0] === columnKey &&
                                          sortOrder[1] === "asc"
                                          ? defaultSortOrder
                                          : [columnKey, "asc"]
                                      );
                                    },
                                    ...(sortOrder[0] === columnKey && {
                                      icon: (
                                        <AcceptIcon
                                          outline
                                          styles={{
                                            visibility:
                                              sortOrder[1] === "asc"
                                                ? "visible"
                                                : "hidden",
                                          }}
                                        />
                                      ),
                                    }),
                                  },
                                ]}
                                trigger={
                                  <Button
                                    content={column.title}
                                    icon={
                                      <SortOrderIndicator
                                        {...{ sortOrder, columnKey }}
                                      />
                                    }
                                    iconPosition="after"
                                    text
                                    fluid
                                    styles={{
                                      padding: 0,
                                      height: "100%",
                                      justifyContent: "flex-start",
                                    }}
                                  />
                                }
                                styles={{ display: "block", height: "100%" }}
                              />
                            ) : (
                              column.title
                            ),
                            styles: columnWidthStyles(
                              columnKey,
                              !!props.truncate
                            ),
                            variables: { flush: !!column.sortable },
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
                        theme !== TeamsTheme.HighContrast
                          ? {
                              backgroundColor: colorScheme.grey.backgroundFocus,
                              color: colorScheme.grey.foregroundFocus,
                            }
                          : {
                              backgroundColor: colorScheme.default.background2,
                            },
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
                                          icon={<MoreIcon outline />}
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
                                                    icon: (
                                                      <OpenOutsideIcon
                                                        outline
                                                      />
                                                    ),
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
                    theme === TeamsTheme.HighContrast
                      ? colorScheme.grey.background
                      : colorScheme.grey.background2,
                  ...(theme === TeamsTheme.HighContrast
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
