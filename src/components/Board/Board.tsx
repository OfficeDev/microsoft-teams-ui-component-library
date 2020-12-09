import React, { Dispatch, SetStateAction, useState } from "react";

import cloneDeep from "lodash/cloneDeep";
import pick from "lodash/pick";
import omit from "lodash/omit";
import uniqueId from "lodash/uniqueId";

import setMultiple from "../../lib/setMultiple";

import {
  DragDropContext,
  DropResult,
  DragStart,
  DragUpdate,
} from "react-beautiful-dnd";

import {
  Box,
  Button,
  Flex,
  FocusZoneDirection,
  FocusZoneTabbableElements,
  GridBehaviorProps,
  ProviderConsumer as FluentUIThemeConsumer,
  SiteVariablesPrepared,
  gridNestedBehavior,
} from "@fluentui/react-northstar";

import { AddIcon } from "@fluentui/react-icons-northstar";

import { getCode, keyboardKey } from "@fluentui/keyboard-key";

import { BoardTheme } from "./BoardTheme";

import { TUsers } from "../../types/types";

import { TTranslations } from "../../translations";

import { Toolbar } from "../Toolbar/Toolbar";

import {
  BoardLane,
  TPlaceholderPosition,
  TBoardLanes,
  TBoardLane,
} from "./BoardLane";

import {
  TBoardItems,
  IBoardItem,
  IPreparedBoardItems,
  IPreparedBoardItem,
  IBoardItemCardLayout,
} from "./BoardItem";

import { BoardItemDialog, BoardItemDialogAction } from "./BoardItemDialog";

const boardBehavior = (props: GridBehaviorProps) =>
  setMultiple(gridNestedBehavior(props), {
    "focusZone.props": {
      handleTabKey: FocusZoneTabbableElements.all,
      isCircularNavigation: true,
      direction: FocusZoneDirection.horizontal,
      pagingSupportDisabled: true,
      shouldEnterInnerZone: (event: React.KeyboardEvent<HTMLElement>) => {
        const code = getCode(event);
        return code === keyboardKey.ArrowDown || code === keyboardKey.Enter;
      },
    },
    "attributes.root": {
      role: "grid",
      "data-is-focusable": true,
      tabIndex: -1,
    },
    "keyActions.root.focus.keyCombinations": [{ keyCode: keyboardKey.Escape }],
  });

const defaultBoardItemCardLayout: IBoardItemCardLayout = {
  previewPosition: "top",
  overflowPosition: "footer",
};

export interface IBoardProps {
  users: TUsers;
  lanes: TBoardLanes;
  items: TBoardItems;
  boardItemCardLayout?: IBoardItemCardLayout;
}

interface IBoardStandaloneProps {
  users: TUsers;
  arrangedLanes: TBoardLanes;
  setArrangedLanes: Dispatch<SetStateAction<TBoardLanes>>;
  arrangedItems: IPreparedBoardItems;
  setArrangedItems: Dispatch<SetStateAction<IPreparedBoardItems>>;
  boardItemCardLayout?: IBoardItemCardLayout;
  addingLane: boolean;
  setAddingLane: Dispatch<SetStateAction<boolean>>;
  t: TTranslations;
  rtl: boolean;
}

const prepareBoardItems = (
  items: {
    [itemKey: string]: IBoardItem;
  },
  lanes: { [laneKey: string]: TBoardLane }
): IPreparedBoardItems => {
  const unsortedPreparedBoardItems = Object.keys(items).reduce(
    (acc: IPreparedBoardItems, itemKey) => {
      const item = items[itemKey] as IPreparedBoardItem;
      item.itemKey = itemKey;
      if (acc.hasOwnProperty(item.lane)) acc[item.lane].push(item);
      else acc[item.lane] = [item];
      return acc;
    },
    {}
  );

  return Object.keys(lanes).reduce((acc: IPreparedBoardItems, laneKey) => {
    acc[laneKey] = unsortedPreparedBoardItems.hasOwnProperty(laneKey)
      ? unsortedPreparedBoardItems[laneKey].sort((a, b) => a.order - b.order)
      : [];
    return acc;
  }, {});
};

const resetOrder = (item: IPreparedBoardItem, newOrder: number) => {
  item.order = newOrder;
  return item;
};

const getDraggable = (draggableId: string) =>
  document.querySelector(
    `[data-rbd-drag-handle-draggable-id='${draggableId}']`
  );
const getDroppable = (droppableId: string) =>
  document.querySelector(`[data-rbd-droppable-id='${droppableId}']`);

const getClientYChildren = (
  $parent: Element,
  draggableId: string,
  endIndex: number
) =>
  Array.from($parent.children)
    .filter(($child) => {
      const childDraggableId = $child.getAttribute("data-rbd-draggable-id");
      return (
        typeof childDraggableId === "string" && childDraggableId !== draggableId
      );
    })
    .slice(0, endIndex);

const getPlaceholderPosition = (
  $draggable: Element,
  clientYChildren: Element[]
): TPlaceholderPosition => {
  if (!$draggable || !$draggable.parentNode) return null;

  const { clientHeight, clientWidth } = $draggable;

  const clientY = clientYChildren.reduce((acc, $child) => {
    return acc + $child.clientHeight + 8;
  }, 2);

  const clientX = 20;

  return [clientX, clientY, clientWidth, clientHeight];
};

const BoardStandalone = (props: IBoardStandaloneProps) => {
  const {
    users,
    arrangedLanes,
    setArrangedLanes,
    arrangedItems,
    setArrangedItems,
    addingLane,
    setAddingLane,
    t,
    rtl,
  } = props;

  const [placeholderPosition, setPlaceholderPosition] = useState<
    TPlaceholderPosition
  >(null);

  const onDragStart = (event: DragStart) => {
    const $draggable = getDraggable(event.draggableId);
    if (!$draggable || !$draggable.parentNode) return;
    setPlaceholderPosition(
      getPlaceholderPosition(
        $draggable,
        getClientYChildren(
          $draggable.parentNode as Element,
          event.draggableId,
          event.source.index
        )
      )
    );
  };

  const onDragUpdate = (event: DragUpdate) => {
    if (!event.destination) return;
    const $draggable = getDraggable(event.draggableId);
    const $droppable = getDroppable(event.destination.droppableId);
    if (!$draggable || !$droppable) return;

    setPlaceholderPosition(
      getPlaceholderPosition(
        $draggable,
        getClientYChildren(
          $droppable,
          event.draggableId,
          event.destination.index
        )
      )
    );
  };

  const onDragEnd = ({ draggableId, source, destination }: DropResult) => {
    if (destination) {
      const sourceLaneKey = source.droppableId;
      const destinationLaneKey = destination.droppableId;

      const movingItems = arrangedItems[sourceLaneKey].splice(source.index, 1);

      arrangedItems[sourceLaneKey].map(resetOrder);

      arrangedItems[destinationLaneKey].splice(
        destination.index,
        0,
        movingItems[0]
      );

      arrangedItems[destinationLaneKey].map(resetOrder);

      setPlaceholderPosition(null);
      return setArrangedItems(cloneDeep(arrangedItems));
    }
  };

  const moveLane = (laneKey: string, delta: 1 | -1) => {
    const laneKeys = Object.keys(arrangedLanes);
    const from = laneKeys.indexOf(laneKey);
    laneKeys.splice(from + delta, 0, laneKeys.splice(from, 1)[0]);
    setArrangedLanes(
      laneKeys.reduce(
        (nextArrangedLanes: TBoardLanes, currentLaneKey: string) => {
          nextArrangedLanes[currentLaneKey] = arrangedLanes[currentLaneKey];
          return nextArrangedLanes;
        },
        {}
      )
    );
  };

  const deleteLane = (laneKey: string) => {
    setArrangedLanes(omit(arrangedLanes, [laneKey]));
  };

  return (
    <DragDropContext {...{ onDragStart, onDragUpdate, onDragEnd }}>
      <Box styles={{ overflowX: "auto", flex: "1 0 0" }}>
        <Box
          styles={{ height: "100%", display: "flex" }}
          accessibility={boardBehavior}
        >
          {Object.keys(arrangedLanes).map((laneKey, laneIndex, laneKeys) => {
            const last = laneIndex === laneKeys.length - 1;
            return (
              <BoardLane
                first={laneIndex === 0}
                last={addingLane ? false : last}
                laneKey={laneKey}
                lane={arrangedLanes[laneKey]}
                addItemDialog={
                  <BoardItemDialog
                    action={BoardItemDialogAction.Create}
                    trigger={
                      <Button
                        icon={<AddIcon outline />}
                        iconOnly
                        fluid
                        title={t["add board item"]}
                        aria-label={t["add board item"]}
                      />
                    }
                    initialState={{ lane: laneKey }}
                    {...{
                      arrangedLanes,
                      users,
                      t,
                      setArrangedItems,
                      arrangedItems,
                    }}
                  />
                }
                key={`BoardLane__${laneKey}`}
                preparedItems={arrangedItems[laneKey]}
                users={users}
                t={t}
                rtl={rtl}
                boardItemCardLayout={
                  props.boardItemCardLayout || defaultBoardItemCardLayout
                }
                placeholderPosition={placeholderPosition}
                moveLane={moveLane}
                deleteLane={deleteLane}
              />
            );
          })}
          {addingLane && (
            <BoardLane
              last
              pending
              laneKey={uniqueId("pl")}
              key="BoardLane__pending_lane"
              preparedItems={[]}
              users={users}
              t={t}
              rtl={rtl}
              boardItemCardLayout={
                props.boardItemCardLayout || defaultBoardItemCardLayout
              }
              placeholderPosition={null}
              exitPendingLane={(value) => {
                if (value.length > 0) {
                  const newLaneKey = uniqueId("sl");
                  setArrangedLanes(
                    Object.assign(arrangedLanes, {
                      [newLaneKey]: { title: value },
                    })
                  );
                  setArrangedItems(
                    Object.assign(arrangedItems, { [newLaneKey]: [] })
                  );
                }
                setAddingLane(false);
              }}
            />
          )}
        </Box>
      </Box>
    </DragDropContext>
  );
};

export const Board = (props: IBoardProps) => {
  const [arrangedLanes, setArrangedLanes] = useState<TBoardLanes>(props.lanes);

  const [arrangedItems, setArrangedItems] = useState<IPreparedBoardItems>(
    prepareBoardItems(props.items, props.lanes)
  );

  const [addingLane, setAddingLane] = useState<boolean>(false);

  return (
    <FluentUIThemeConsumer
      render={(globalTheme) => {
        const { t, rtl } = globalTheme.siteVariables;
        return (
          <BoardTheme globalTheme={globalTheme} style={{ height: "100%" }}>
            <Flex
              column
              variables={({ colorScheme }: SiteVariablesPrepared) => ({
                backgroundColor: colorScheme.default.background2,
              })}
              styles={{ height: "100%" }}
            >
              <Toolbar
                actionGroups={{
                  g1: {
                    a1: {
                      icon: "Add",
                      title: t["add lane"],
                      __internal_callback__: "add_column",
                    },
                  },
                }}
                __internal_callbacks__={{
                  add_column: () => setAddingLane(true),
                }}
              />
              <BoardStandalone
                {...{
                  t,
                  rtl,
                  arrangedLanes,
                  arrangedItems,
                  setArrangedItems,
                  addingLane,
                  setAddingLane,
                  setArrangedLanes,
                }}
                {...pick(props, ["users", "boardItemCardLayout"])}
              />
            </Flex>
          </BoardTheme>
        );
      }}
    />
  );
};
