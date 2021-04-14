import React, { useLayoutEffect, useState, useRef } from "react";
import omit from "lodash/omit";
import cloneDeep from "lodash/cloneDeep";

import {
  Box,
  ButtonContent,
  ObjectShorthandCollection,
  Position,
  ProviderConsumer as FluentUIThemeConsumer,
  ShorthandCollection,
  Toolbar as FluentUIToolbar,
  ToolbarItemProps,
  ToolbarItemShorthandKinds,
  Tooltip,
  TreeItemProps,
  tooltipAsLabelBehavior,
} from "@fluentui/react-northstar";

import { SiteVariablesPrepared } from "@fluentui/styles";

import Icon from "../../lib/Icon";
import { TeamsTheme } from "../../themes";

import { actionKey, TAction, TActions } from "../..";

import { ToolbarFilter } from "./ToolbarFilter";
import { ToolbarFind } from "./ToolbarFind";
import { ToolbarTheme } from "./ToolbarTheme";

type TToolbarItems = ShorthandCollection<
  ToolbarItemProps,
  ToolbarItemShorthandKinds
>;

/**
 * A collection of action groups, keyed by group ID.
 * @public
 */
export type TActionGroups = {
  [actionGroupKey: string]: TActions;
};

export type TFilters = ObjectShorthandCollection<TreeItemProps, never>;

/**
 * The interaction payload sent when a user clicks on an action in the Toolbar. The action may
 * have one or more subjects if the action applies to entities in the main view, or it may be
 * `null` if the action has no subject.
 * @public
 */
export type TToolbarInteraction = {
  event: "click";
  target: "toolbar";
  subject: string | string[] | null;
  action: actionKey;
};

/**
 * The Toolbar component can be used to render a Toolbar above the main view, which can make
 * actions, find, and filter available. Designs for this component are available in the [Toolbar
 * page of the Microsoft Teams UI Kit](https://www.figma.com/file/EOsbapNvZgEwcA1mShswfh/Microsoft-Teams-UI-Kit-Community?node-id=3789%3A4186).
 * @public
 */
export interface IToolbarProps {
  /**
   * The groups of actions to make available in the Toolbar. Actions for different groups are
   * separated by a horizontal or vertical bar when adjacent.
   */
  actionGroups: TActionGroups;
  /**
   * The filters to make available in the Toolbar.
   */
  filters?: TFilters;
  /**
   * Whether the Toolbar should provide find functionality.
   */
  find?: boolean;
  /**
   * Whether to prevent multiple filters from being applied; when this is true and one filter is
   * already applied, if the user selects another filter the previous filter is removed and the new
   * filter is applied rather than both applying.
   */
  filtersSingleSelect?: boolean;
  /**
   * @internal
   */
  onSelectedFiltersChange?: (selectedFilters: string[]) => string[];
  /**
   * @internal
   */
  onFindQueryChange?: (findQuery: string) => string;
  /**
   * An interaction handler for the Toolbar. Interactions are triggered when the user clicks on an
   * action.
   */
  onInteraction?: (interaction: TToolbarInteraction) => void;
}

export type TToolbarLayout = "compact" | "verbose";

const slugSeparator = "__";

const toolbarMenuProps = {
  offset: [0, 4] as [number, number],
  position: "below" as Position,
};

const toolbarActionTooltipProps = (() => {
  const props = cloneDeep(toolbarMenuProps);
  props.offset[1] += 10;
  return props;
})();

const toolbarButtonStyles = {
  padding: ".5rem",
  borderWidth: "1px",
  marginTop: 0,
  marginBottom: 0,
  height: "3rem",
  minWidth: 0,
  "&:focus:before": {
    top: "calc(.5rem - 1px)",
    bottom: "calc(.5rem - 1px)",
  },
  "&:focus:after": {
    top: "calc(.5rem - 1px)",
    bottom: "calc(.5rem - 1px)",
  },
};

function flattenedActions(actionGroups: TActionGroups): TActions {
  return Object.keys(actionGroups).reduce(
    (acc_i: TActions, actionGroupSlug: string) => {
      const actionGroup = actionGroups[actionGroupSlug];
      return Object.keys(actionGroup).reduce((acc_j, actionKey) => {
        const action = actionGroup[actionKey];
        acc_j[`${actionGroupSlug}${slugSeparator}${actionKey}`] = action;
        return acc_j;
      }, acc_i);
    },
    {}
  );
}

function needsSeparator(
  actionKey: string,
  index: number,
  actionKeys: string[]
): boolean {
  return index === 0
    ? false
    : actionKeys[index - 1]?.split(slugSeparator)[0] !==
        actionKey.split(slugSeparator)[0];
}

interface IInFlowToolbarItemProps {
  action: TAction;
  layout: TToolbarLayout;
}

const InFlowToolbarItem = ({ action, layout }: IInFlowToolbarItemProps) => {
  const { icon, title } = action;
  const contentIcon = (
    <Box
      styles={{
        width: "1rem",
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
        "@media (min-width: 640px)": {
          marginRight: ".5rem",
        },
      }}
      className="extended-toolbar__near-side__item__icon"
    >
      <Icon icon={icon} />
    </Box>
  );

  switch (layout) {
    case "verbose":
      return (
        <>
          {contentIcon}
          <ButtonContent content={title} />
        </>
      );
    default:
    case "compact":
      return (
        <Tooltip
          {...toolbarActionTooltipProps}
          trigger={contentIcon}
          content={title}
          accessibility={tooltipAsLabelBehavior}
        />
      );
  }
};
/**
 * @public
 */
export const Toolbar = (props: IToolbarProps) => {
  const { actionGroups, filters, filtersSingleSelect, find } = props;

  const allActions = flattenedActions(actionGroups);

  const [overflowOpen, setOverflowOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const [layout, setLayout] = useState<TToolbarLayout>("compact");
  const [findActive, setFindActive] = useState<boolean>(false);

  const layoutQuery = useRef<MediaQueryList | null>(null);

  const onChangeLayout = () => {
    setLayout(
      layoutQuery.current && layoutQuery.current.matches ? "verbose" : "compact"
    );
  };

  useLayoutEffect(() => {
    layoutQuery.current = window.matchMedia("(min-width: 640px)");
    layoutQuery.current.addEventListener("change", onChangeLayout);
    onChangeLayout();
    return () =>
      layoutQuery.current?.removeEventListener("change", onChangeLayout);
  });

  const inFlowToolbarItems: TToolbarItems = Object.keys(allActions).reduce(
    (acc: TToolbarItems, actionKey, index, actionKeys) => {
      const action = allActions[actionKey];

      acc.push({
        key: actionKey,
        children: <InFlowToolbarItem action={action} layout={layout} />,
        title: action.title,
        "aria-label": action.title,
        className: "extended-toolbar__near-side__item",
        styles: {
          ...toolbarButtonStyles,
          flex: "0 0 auto",
          margin: "0 .0625rem",
          display: "inline-flex",
          justifyContent: "center",
          alignItems: "center",
        },
        ...(props.onInteraction && {
          onClick: () =>
            props.onInteraction!({
              event: "click",
              target: "toolbar",
              subject: action.subject || null,
              action: actionKey.split("__").pop()!,
            }),
        }),
      });
      if (needsSeparator(actionKey, index, actionKeys))
        acc.push({
          key: `divider${slugSeparator}${index}`,
          kind: "divider",
        });
      return acc;
    },
    []
  );

  const overflowToolbarItems: TToolbarItems = Object.keys(allActions).reduce(
    (acc: TToolbarItems, actionKey, index, actionKeys) => {
      const action = allActions[actionKey];
      acc.push({
        key: actionKey,
        content: action.title,
        icon: <Icon icon={action.icon} />,
        title: action.title,
        "aria-label": action.title,
        styles: { padding: ".375rem .5rem" },
        ...(props.onInteraction && {
          onClick: () =>
            props.onInteraction!({
              event: "click",
              target: "toolbar",
              action: actionKey.split("__").pop()!,
              subject: action.subject || null,
            }),
        }),
      });
      if (needsSeparator(actionKey, index, actionKeys))
        acc.push({
          key: `divider${slugSeparator}${index}`,
          kind: "divider",
          styles: { margin: ".25rem 0", "&:first-child": { display: "none" } },
        });
      return acc;
    },
    []
  );

  const displayFindOnly = find && layout === "compact" && findActive;

  return (
    <FluentUIThemeConsumer
      render={(globalTheme) => {
        const { t } = globalTheme.siteVariables;
        return (
          <ToolbarTheme globalTheme={globalTheme}>
            <Box
              className="extended-toolbar"
              variables={({ colorScheme, theme }: SiteVariablesPrepared) => ({
                backgroundColor:
                  theme === TeamsTheme.HighContrast
                    ? colorScheme.grey.background
                    : colorScheme.default.background2,
                elevation: colorScheme.elevations[16],
              })}
              styles={{
                display: "flex",
                justifyContent: "space-between",
                padding: "0 1.25rem",
                boxShadow: "none",
              }}
              {...omit(props, [
                "actionGroups",
                "filters",
                "find",
                "filtersSingleSelect",
                "onSelectedFiltersChange",
                "onFindQueryChange",
              ])}
            >
              {!displayFindOnly && (
                <FluentUIToolbar
                  items={inFlowToolbarItems}
                  overflow
                  overflowOpen={overflowOpen}
                  overflowItem={{
                    title: t["more"],
                    menu: toolbarMenuProps,
                    styles: toolbarButtonStyles,
                  }}
                  onOverflowOpenChange={(e, props) => {
                    const open = !!props?.overflowOpen;
                    setOverflowOpen(open);
                    if (open) setFiltersOpen(false);
                  }}
                  getOverflowItems={(startIndex) =>
                    overflowToolbarItems.slice(startIndex)
                  }
                  styles={{
                    flex: "1 0 0",
                    overflow: "hidden",
                    maxWidth: "40rem",
                    minWidth: "2rem",
                  }}
                />
              )}
              <Box
                styles={{
                  flex: displayFindOnly ? "1 1 100%" : "0 1 auto",
                  display: "flex",
                  flexFlow: "row nowrap",
                  overflow: "hidden",
                  paddingLeft: displayFindOnly ? "0" : "2.5rem",
                }}
              >
                {!displayFindOnly && filters && (
                  <ToolbarFilter
                    singleSelect={!!filtersSingleSelect}
                    open={filtersOpen}
                    onOpenChange={(_e, props) => {
                      const open = !!props?.open;
                      setFiltersOpen(open);
                      if (open) setOverflowOpen(false);
                    }}
                    onSelectedFiltersChange={props.onSelectedFiltersChange}
                    {...{
                      layout,
                      filters,
                      toolbarMenuProps,
                      toolbarButtonStyles,
                      t,
                    }}
                  />
                )}
                {find && (
                  <ToolbarFind
                    {...{
                      layout,
                      findActive,
                      setFindActive,
                      toolbarButtonStyles,
                      onFindQueryChange: props.onFindQueryChange,
                      t,
                    }}
                  />
                )}
              </Box>
            </Box>
          </ToolbarTheme>
        );
      }}
    />
  );
};
