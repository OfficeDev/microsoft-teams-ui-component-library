import React, {
  useLayoutEffect,
  useState,
  useRef,
  SyntheticEvent,
  ComponentProps,
} from "react";
import omit from "lodash/omit";
import debounce from "lodash/debounce";
import get from "lodash/get";

import {
  Button,
  Checkbox,
  Flex,
  Popup,
  Menu,
  MenuButton,
  PropsOfElement,
  ProviderConsumer as FluentUIThemeConsumer,
  ShorthandCollection,
  Table as FluentUITable,
  TableCellProps,
  TableRowProps,
  Text,
  dialogBehavior,
  gridNestedBehavior,
  gridCellWithFocusableElementBehavior,
  ButtonProps,
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

import Icon, { IIconProps } from "../../lib/Icon";
import Avatar, { IAvatarProps } from "../../lib/Avatar";

import { TableTheme } from "./TableTheme";

import getBreakpoints, {
  IColumn,
  accessoryWidth,
  columnMinWidth,
  TSortable,
} from "./tableBreakpoints";

import {
  TActions,
  actionKey,
  TTextObject,
  TLocale,
  EButtonVariants,
} from "../..";
import { TeamsTheme } from "../../themes";
import { TTranslations, getText } from "../../translations";

export type columnKey = string;
export type rowKey = string;
type sortOrder = [columnKey | "__rowKey__", "asc" | "desc"];

export type TSelected = Set<rowKey>;

export interface IIconOrnament extends IIconProps {
  type: "icon";
}

export interface IAvatarOrnament
  extends Pick<IAvatarProps, "image" | "variant"> {
  type: "avatar";
  name: TTextObject;
}

/**
 * Table cell content ornaments can be avatars or icons.
 */
export type TContentOrnament = IAvatarOrnament | IIconOrnament;

/**
 * Content for a table cell can specify optional elements to display before and after the cell’s
 * text content.
 */
export interface ICellContent {
  before?: TContentOrnament;
  content: TTextObject;
  after?: TContentOrnament;
}

/**
 * Content for a table cell can be a button. When clicked, buttons emit an Interaction event.
 */
export interface ICellButtonContent
  extends Pick<ButtonProps, "iconPosition" | "disabled" | "iconOnly"> {
  type: "button";
  actionId: string;
  content: TTextObject;
  variant?: EButtonVariants;
  icon?: string;
}

/**
 * The content for a table cell
 */
export type TCellContent = TTextObject | ICellContent | ICellButtonContent;

/**
 * A collection of data to display for a row, keyed by the column ID except for `actions`, which
 * contains the collection of actions to make available in the row’s overflow menu.
 * @public
 */
export interface IRow {
  [columnKey: string]: TCellContent | TActions | undefined;
  actions?: TActions;
}

/**
 * An interaction payload emitted by Table.
 * @public
 */
export type TTableInteraction = {
  event: "click";
  target: "table";
  subject: rowKey | rowKey[];
  action: actionKey;
};

/**
 * The Table component is used by the List template as its primary content.
 * @public
 */
export interface ITableProps extends PropsOfElement<"div"> {
  /**
   * A collection of columns to display, keyed by column ID.
   */
  columns: { [columnKey: string]: IColumn };
  /**
   * A collection of rows to display, keyed by row ID.
   */
  rows: { [rowKey: string]: IRow };
  /**
   * If true, limits content to a single line and truncate with the language’s default ellipsis,
   * or if false, content in each cell wraps exhaustively.
   */
  truncate?: boolean;
  /**
   * Whether the user can select rows. In the context of a List component, this supplies any actions
   * all rows have in common in the Toolbar instance above the Table.
   */
  selectable?: boolean;
  /**
   * @internal
   */
  onSelectedChange?: (selected: TSelected) => TSelected;
  /**
   * @internal
   */
  findQuery?: string;
  /**
   * @internal
   */
  filterBy?: (row: IRow) => boolean;
  /**
   * An interaction handler for the Table. Interactions are triggered when the user clicks on an
   * action in a row. If the Table is not rendered on its own, this may be proxied from its parent
   * component, e.g. the parent List.
   */
  onInteraction?: (interaction: TTableInteraction) => void;
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

const nonTextRowContentMargin = { margin: "-0.375rem 0 -0.375rem 0" };

const CellContentOrnament = ({ type, ...props }: TContentOrnament) => {
  switch (type) {
    case "avatar":
      return (
        <Avatar {...(props as IAvatarProps)} styles={nonTextRowContentMargin} />
      );
    case "icon":
      return <Icon {...(props as IIconProps)} />;
    default:
      return null;
  }
};

interface ICellContentProps {
  locale: TLocale;
  rtl: boolean;
  cell: TCellContent;
  onInteraction: ((interaction: TTableInteraction) => void) | undefined;
  rowKey: rowKey;
}

const CellContent = ({
  locale,
  rtl,
  cell,
  onInteraction,
  rowKey,
}: ICellContentProps) => {
  if (!cell) return null;
  if (get(cell, "type") === "button") {
    const buttonCell = cell as ICellButtonContent;
    const textContent = getText(locale, buttonCell.content);
    let props: ComponentProps<typeof Button> = {
      title: textContent,
      ...(buttonCell.disabled && { disabled: true }),
      ...(buttonCell.iconOnly ? { iconOnly: true } : { content: textContent }),
      ...(onInteraction && {
        onClick: () =>
          onInteraction({
            event: "click",
            target: "table",
            subject: rowKey,
            action: buttonCell.actionId,
          }),
      }),
      ...(buttonCell.icon && { icon: <Icon icon={buttonCell.icon} /> }),
      ...(buttonCell.iconPosition && { iconPosition: buttonCell.iconPosition }),
      styles: nonTextRowContentMargin,
    };
    switch (buttonCell.variant) {
      case EButtonVariants.primary:
        props = {
          ...props,
          primary: true,
        };
        break;
      case EButtonVariants.text:
        props = {
          ...props,
          text: true,
        };
        break;
      case EButtonVariants.tinted:
        props = {
          ...props,
          tinted: true,
        };
        break;
      case EButtonVariants.default:
      default:
        break;
    }
    return <Button {...props} />;
  }
  if (cell.hasOwnProperty("content")) {
    const ornamentedCell = cell as ICellContent;
    return (
      <Flex vAlign="center">
        {ornamentedCell.before && (
          <CellContentOrnament
            {...ornamentedCell.before}
            {...(ornamentedCell.before.hasOwnProperty("name") && {
              name: getText(
                locale,
                (ornamentedCell.before as IAvatarOrnament).name
              ),
            })}
          />
        )}
        <Text
          styles={{
            marginLeft: ornamentedCell.hasOwnProperty(rtl ? "after" : "before")
              ? ".5rem"
              : 0,
            marginRight: ornamentedCell.hasOwnProperty(rtl ? "before" : "after")
              ? ".5rem"
              : 0,
          }}
        >
          {getText(locale, ornamentedCell.content)}
        </Text>
        {ornamentedCell.after && (
          <CellContentOrnament
            {...ornamentedCell.after}
            {...(ornamentedCell.after.hasOwnProperty("name") && {
              name: getText(
                locale,
                (ornamentedCell.after as IAvatarOrnament).name
              ),
            })}
          />
        )}
      </Flex>
    );
  } else {
    return <Text>{getText(locale, cell as TTextObject)}</Text>;
  }
};

/**
 * @public
 */
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

  const rowWidthStyles = (truncate: boolean, selectable: boolean) => {
    const minWidth = Array.from(inFlowColumns).reduce(
      (acc, columnKey) => acc + columnMinWidth(columnKey, props.columns),
      0
    );
    return {
      padding: "0 1.25rem",
      minWidth: `${minWidth}px`,
      ...(selectable && { cursor: "pointer" }),
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
      render={(globalTheme) => {
        const { t, rtl } = globalTheme.siteVariables;
        return (
          <TableTheme globalTheme={globalTheme}>
            <div
              ref={$tableWrapper}
              style={{ width: "100%", overflowX: "auto" }}
            >
              <FluentUITable
                header={{
                  key: "header",
                  compact: true,
                  variables: { compactRow: true },
                  styles: {
                    ...rowWidthStyles(!!props.truncate, false),
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
                            const columnTitle = column?.icon ? (
                              <Flex vAlign="center">
                                <Icon icon={column.icon} />
                                <Text
                                  style={{
                                    [rtl
                                      ? "marginRight"
                                      : "marginLeft"]: ".5rem",
                                  }}
                                >
                                  {getText(t.locale, column.title)}
                                </Text>
                              </Flex>
                            ) : (
                              <Text>{getText(t.locale, column.title)}</Text>
                            );
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
                                      content={columnTitle}
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
                                columnTitle
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
                        styles: rowWidthStyles(
                          !!props.truncate,
                          !!props.selectable
                        ),
                        variables: ({
                          colorScheme,
                          theme,
                        }: SiteVariablesPrepared) =>
                          selected.has(rowKey) &&
                          theme !== TeamsTheme.HighContrast
                            ? {
                                backgroundColor:
                                  colorScheme.grey.backgroundFocus,
                                color: colorScheme.grey.foregroundFocus,
                              }
                            : {
                                backgroundColor:
                                  colorScheme.default.background2,
                              },
                        onClickCapture: (e: SyntheticEvent<HTMLElement>) => {
                          if (props.selectable) {
                            const aaClass = (e.target as HTMLElement).getAttribute(
                              "data-aa-class"
                            );
                            if (aaClass && aaClass.startsWith("Table")) {
                              e.stopPropagation();
                              setRowSelected(!selected.has(rowKey), rowKey);
                            }
                          }
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
                                                      ...(props.onInteraction && {
                                                        onClick: () =>
                                                          props.onInteraction!({
                                                            event: "click",
                                                            target: "table",
                                                            subject: rowKey,
                                                            action: rowActionKey,
                                                          }),
                                                      }),
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
                                                      ...(props.onInteraction && {
                                                        onClick: () =>
                                                          props.onInteraction!({
                                                            event: "click",
                                                            target: "table",
                                                            subject: rowKey,
                                                            action: rowActionKey,
                                                          }),
                                                      }),
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
                                    content: (
                                      <CellContent
                                        locale={t.locale}
                                        rtl={t.rtl}
                                        cell={cell as TCellContent}
                                        {...{
                                          rowKey,
                                          onInteraction: props.onInteraction,
                                        }}
                                      />
                                    ),
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
        );
      }}
    />
  );
};
