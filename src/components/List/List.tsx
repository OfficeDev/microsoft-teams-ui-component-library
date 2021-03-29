import React, { useState } from "react";
import pick from "lodash/pick";
import {
  Table,
  ITableProps,
  TSelected,
  TTableInteraction,
  columnKey,
  rowKey,
  IRow,
} from "../Table/Table";
import {
  Toolbar,
  TActionGroups,
  TFilters,
  TToolbarInteraction,
} from "../Toolbar/Toolbar";
import { TActions } from "../..";

/**
 * List interactions are proxied from the Table or the Toolbar. All are clicks on actions.
 * @public
 */
export type TListInteraction = TTableInteraction | TToolbarInteraction;

/**
 * The List component can be used to display a list of items as a table which can be sorted,
 * filtered, and searched.. Designs for this component are available in the [List page of the Microsoft Teams UI Kit](https://www.figma.com/file/EOsbapNvZgEwcA1mShswfh/Microsoft-Teams-UI-Kit-Community?node-id=3789%3A3790).
 * @public
 */
export interface IListProps extends ITableProps {
  /**
   * The action groups to show when no items are selected.
   */
  emptySelectionActionGroups: TActionGroups;
  /**
   * The set of columns as column IDs to offer in the filter menu.
   */
  filters?: columnKey[];
  /**
   * Whether to prevent multiple filters from being applied; when this is true and one filter is
   * already applied, if the user selects another filter the previous filter is removed and the new
   * filter is applied rather than both applying.
   */
  filtersSingleSelect?: boolean;
  /**
   * Whether to provide the find feature, which filters the list by an arbitrary string input the
   * user can provide.
   */
  find?: boolean;
  /**
   * An interaction handler for the List. Interactions are triggered when the user clicks on an
   * action for the List or for an item in the List.
   */
  onInteraction?: (interaction: TListInteraction) => void;
}

/**
 * @public
 */
export const List = (props: IListProps) => {
  const tableProps = pick(props, [
    "columns",
    "rows",
    "selectable",
    "truncate",
    "onInteraction",
  ]);
  const toolbarProps = pick(props, [
    "filtersSingleSelect",
    "find",
    "onInteraction",
  ]);

  // Row selection and common actions

  const [selectedRows, setSelectedRows] = useState<TSelected>(new Set());

  const onSelectedChange = (selected: TSelected) => {
    setSelectedRows(selected);
    return selected;
  };

  const getCommonActionGroups = (): TActionGroups => {
    const selectedRowsArr = Array.from(selectedRows);
    const firstActions = props.rows[selectedRowsArr[0]].actions as TActions;
    if (firstActions) {
      // return the only selected row's actions if just one is selected
      if (selectedRowsArr.length === 1)
        return {
          g1: Object.keys(firstActions).reduce((acc: TActions, actionKey) => {
            acc[actionKey] = {
              ...firstActions[actionKey],
              subject: selectedRowsArr,
            };
            return acc;
          }, {}),
        };
      else {
        // find all common actions where `multi` is truthy
        const firstMultiActionKeys = new Set(
          Object.keys(firstActions).filter(
            (actionKey) => firstActions[actionKey].multi
          )
        );
        const commonMultiActionKeys = selectedRowsArr
          .slice(1)
          .reduce((acc, rowKey) => {
            const rowActions = props.rows[rowKey].actions || {};
            const multiActionKeys = new Set(
              Object.keys(rowActions).filter(
                (actionKey) => rowActions[actionKey].multi
              )
            );
            return new Set(
              Array.from(acc).filter((actionKey) =>
                multiActionKeys.has(actionKey)
              )
            );
          }, firstMultiActionKeys);
        return {
          g1: Array.from(commonMultiActionKeys).reduce(
            (acc: TActions, actionKey) => {
              acc[actionKey] = {
                ...firstActions[actionKey],
                subject: selectedRowsArr,
              };
              return acc;
            },
            {}
          ),
        };
      }
    }
    // there are no actions selected rows could have in common
    else return {};
  };

  const actionGroups =
    selectedRows.size > 0
      ? getCommonActionGroups()
      : props.emptySelectionActionGroups;

  // Filters and find:

  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const onSelectedFiltersChange = (selectedFilters: string[]) => {
    setSelectedFilters(selectedFilters);
    return selectedFilters;
  };

  const filterMap: { [filterId: string]: [columnKey, string] } = {};

  const filters = ((): TFilters => {
    return props.filters
      ? props.filters.reduce((acc: TFilters, columnKey, c) => {
          acc[c] = {
            id: `f${c}`,
            title: props.columns[columnKey].title,
            items: Array.from(
              Object.keys(props.rows).reduce(
                (acc: Set<string>, rowKey: rowKey) => {
                  acc.add(props.rows[rowKey][columnKey] as string);
                  return acc;
                },
                new Set()
              )
            ).map((title, v) => {
              const id = `f${c}f${v}`;
              filterMap[id] = [columnKey, title];
              return {
                id,
                title,
              };
            }),
          };
          return acc;
        }, [])
      : [];
  })();

  const [findQuery, setFindQuery] = useState<RegExp | string | null>(null);
  const onFindQueryChange = (query: string): string => {
    if (query.length > 0) {
      try {
        setFindQuery(new RegExp(query, "imu"));
      } catch (_err) {
        setFindQuery(query);
      }
    } else setFindQuery(null);
    return query;
  };

  const rowPassesFilters = (row: IRow): boolean => {
    if (selectedFilters.length === 0) return true;
    else {
      return (
        selectedFilters.findIndex((filterId) => {
          const [columnKey, value] = filterMap[filterId];
          return row[columnKey] === value;
        }) > -1
      );
    }
  };

  const rowPassesFind = (row: IRow): boolean => {
    if (findQuery) {
      return (
        Object.keys(row).findIndex((columnKey) => {
          const value = row[columnKey];
          return (
            typeof value === "string" &&
            (typeof findQuery === "string"
              ? value.includes(findQuery)
              : findQuery.test(value))
          );
        }) > -1
      );
    } else return true;
  };

  const filterBy = (row: IRow): boolean => {
    return rowPassesFilters(row) && rowPassesFind(row);
  };

  // Return value

  return (
    <>
      <Toolbar
        {...toolbarProps}
        {...{
          actionGroups,
          filters,
          onSelectedFiltersChange,
          onFindQueryChange,
        }}
        aria-controls="fluentui-teams__list-content"
        aria-label="List content controls"
      />
      <Table
        {...tableProps}
        {...{ onSelectedChange, filterBy }}
        aria-live="polite"
        id="fluentui-teams__list-content"
        aria-label="List content"
      />
    </>
  );
};
