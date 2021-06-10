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
  gridCellMultipleFocusableBehavior,
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

import Icon from "../../lib/Icon";
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
  TPhrasingContent,
} from "../..";
import { TeamsTheme } from "../../themes";
import { TTranslations, getText, getAllText } from "../../translations";
import Phrasing, {
  phrasingHasFocusableElements,
  getPhrasingTextContent,
  getAllPhrasingTextContent,
} from "../../lib/Phrasing";

export type columnKey = string;
export type rowKey = string;
type sortOrder = [columnKey | "__rowKey__", "asc" | "desc"];

export type TSelected = Set<rowKey>;

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
 * Content for a table cell can be a name with an avatar. The avatar preceeds the name in the inline
 * direction and the name labels the avatar.
 */
export type TCellAvatarContent =
  | ICellIconAvatarContent
  | ICellImageAvatarContent;

/**
 * Table cells using avatars can specify an icon as the avatar’s visual content.
 */
export interface ICellIconAvatarContent
  extends Pick<IAvatarProps, "icon" | "variant"> {
  type: "avatar";
  content: TTextObject;
}

/**
 * Table cells using avatars can specify an image as the avatar’s visual content.
 */
export interface ICellImageAvatarContent
  extends Pick<IAvatarProps, "image" | "variant"> {
  type: "avatar";
  content: TTextObject;
}

/**
 * The content for a table cell
 */
export type TCellContent =
  | TPhrasingContent
  | ICellButtonContent
  | TCellAvatarContent;

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
  action?: actionKey;
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
   * all rows have in common in the Toolbar instance above the Table. If this is false, the Table
   * will call `onInteraction` any time the user clicks on a row.
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
   * action in a row, a button in a table cell, or anywhere in a row if `selectable` is `false. If
   * the Table is not rendered on its own, this may be proxied from its parent component, e.g. the
   * parent List.
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

interface ICellContentProps {
  locale: TLocale;
  cell: TCellContent;
  onInteraction: ((interaction: TTableInteraction) => void) | undefined;
  rowKey: rowKey;
  truncate: boolean;
  textSelectable: boolean;
}

const cellIconContentStyles = { marginTop: "-.25rem", marginBottom: "-.25rem" };

const CellContent = ({
  locale,
  cell,
  onInteraction,
  truncate,
  rowKey,
  textSelectable,
}: ICellContentProps) => {
  if (!cell) return null;
  if (get(cell, "type") === "button") {
    const buttonCell = cell as ICellButtonContent;
    const textContent = getText(locale, buttonCell.content);
    let props: ComponentProps<typeof Button> = {
      title: textContent,
      style: { margin: "-.8125rem 0", transform: "translateY(-.125rem)" },
      ...(buttonCell.disabled && { disabled: true }),
      ...(buttonCell.iconOnly ? { iconOnly: true } : { content: textContent }),
      ...(onInteraction && {
        onClick: (e: SyntheticEvent<HTMLElement>) => {
          e.stopPropagation();
          onInteraction({
            event: "click",
            target: "table",
            subject: rowKey,
            action: buttonCell.actionId,
          });
        },
      }),
      ...(buttonCell.icon && { icon: <Icon icon={buttonCell.icon} /> }),
      ...(buttonCell.iconPosition && { iconPosition: buttonCell.iconPosition }),
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
  if (get(cell, "type") === "avatar") {
    const avatarCell = cell as TCellAvatarContent;
    const name = getText(locale, avatarCell.content);
    const image = get(cell, "image");
    const icon = get(cell, "icon");
    return (
      <Flex vAlign="center">
        <Avatar
          {...{ name, variant: avatarCell.variant }}
          {...(image ? { image } : icon && { icon })}
          styles={{ margin: "-0.375rem 0 -0.375rem 0" }}
        />
        <Text
          styles={{
            marginLeft: ".5rem",
            ...(textSelectable && { pointerEvents: "all", cursor: "text" }),
          }}
          content={name}
        />
      </Flex>
    );
  } else {
    return (
      <Phrasing
        {...{
          content: cell as TPhrasingContent,
          iconStyles: cellIconContentStyles,
          truncate,
          locale,
          textSelectable,
        }}
      />
    );
  }
};

export const getAllCellTextContent = (cell: TCellContent): string => {
  if (!cell) return "";
  if (Array.isArray(cell))
    return getAllPhrasingTextContent(cell as TPhrasingContent);
  else return getAllText(get(cell, "content", cell));
};

export const getCellTextContent = (
  locale: TLocale,
  cell: TCellContent
): string => {
  if (!cell) return "";
  if (Array.isArray(cell))
    return getPhrasingTextContent(locale, cell as TPhrasingContent);
  else return getText(locale, get(cell, "content", cell));
};

/**
 * @public
 */
export const Table = (props: ITableProps) => {
  const rowKeys = Object.keys(props.rows);
  const columnKeys = Object.keys(props.columns);
  const truncate = !!props.truncate;
  const selectable = !!props.selectable;

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

  const breakpoints = getBreakpoints(props.columns, hasActions, selectable);

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
                return getCellTextContent(
                  t.locale,
                  props.rows[rowKeyI][sortOrder[0]] as TCellContent
                ).localeCompare(
                  getCellTextContent(
                    t.locale,
                    props.rows[rowKeyJ][sortOrder[0]] as TCellContent
                  )
                );
              });

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
                    ...rowWidthStyles(truncate, false),
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
                              styles: columnWidthStyles(columnKey, truncate),
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
                        styles: rowWidthStyles(truncate, selectable),
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
                        onClick: (e: SyntheticEvent<HTMLElement>) => {
                          if (props.selectable) {
                            e.stopPropagation();
                            setRowSelected(!selected.has(rowKey), rowKey);
                          } else if (props.onInteraction) {
                            e.stopPropagation();
                            props.onInteraction({
                              event: "click",
                              target: "table",
                              subject: rowKey,
                            });
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
                                        cell={cell as TCellContent}
                                        {...{
                                          rowKey,
                                          truncate,
                                          onInteraction: props.onInteraction,
                                          textSelectable: get(
                                            props,
                                            [
                                              "columns",
                                              columnKey,
                                              "textSelectable",
                                            ],
                                            false
                                          ),
                                        }}
                                      />
                                    ),
                                    styles: columnWidthStyles(
                                      columnKey,
                                      truncate
                                    ),
                                    ...(get(cell, "type") === "button" ||
                                    (Array.isArray(cell) &&
                                      phrasingHasFocusableElements(cell))
                                      ? {
                                          accessibility:
                                            get(cell, "type") === "button"
                                              ? gridCellWithFocusableElementBehavior
                                              : gridCellMultipleFocusableBehavior,
                                        }
                                      : {
                                          variables: { pointerEvents: "none" },
                                        }),
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
                    defaultRowHeight: "auto",
                    cellVerticalAlignment: "flex-start",
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
