import React, { Dispatch, SetStateAction, useState } from "react";

import cloneDeep from "lodash/cloneDeep";
import pick from "lodash/pick";
import omit from "lodash/omit";
import uniqueId from "lodash/uniqueId";

import {
  DragDropContext,
  DropResult,
  DragStart,
  DragUpdate,
  ResponderProvided,
} from "react-beautiful-dnd";

import {
  Accessibility,
  Box,
  Button,
  Dialog,
  Flex,
  FocusZoneTabbableElements,
  MenuItem,
  ProviderConsumer as FluentUIThemeConsumer,
  SiteVariablesPrepared,
} from "@fluentui/react-northstar";

import {
  AddIcon,
  EditIcon,
  TrashCanIcon,
} from "@fluentui/react-icons-northstar";

import { getCode, keyboardKey } from "@fluentui/keyboard-key";

import { BoardTheme } from "./BoardTheme";

import { TUsers, Toolbar, TCommunication, Communication } from "../..";

import { getText, interpolate, TTranslations } from "../../translations";

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
import { CommunicationOptions } from "../Communication";

const boardBehavior: Accessibility = () => ({
  attributes: {
    root: {
      role: "region",
      "aria-label": "Board lanes",
    },
  },
  focusZone: {
    props: {
      shouldEnterInnerZone: (event) => getCode(event) === keyboardKey.Enter,
      handleTabKey: FocusZoneTabbableElements.all,
    },
  },
});

const defaultBoardItemCardLayout: IBoardItemCardLayout = {
  previewPosition: "top",
  overflowPosition: "footer",
};

interface IBoardInteractionUpdateLanes {
  event: "update";
  target: "lanes";
  lanes: TBoardLanes;
}

interface IBoardInteractionUpdateItems {
  event: "update";
  target: "items";
  items: IPreparedBoardItems;
}

export type TBoardInteraction =
  | IBoardInteractionUpdateLanes
  | IBoardInteractionUpdateItems;

export interface IBoardProps {
  users: TUsers;
  lanes: TBoardLanes;
  items: TBoardItems;
  boardItemCardLayout?: IBoardItemCardLayout;
  emptyState?: TCommunication;
  onInteraction?: (interaction: TBoardInteraction) => void;
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

  const onDragStart = (event: DragStart, provided: ResponderProvided) => {
    const laneKey = event.source.droppableId;
    const itemKey = event.draggableId;
    const boardLane = arrangedLanes[laneKey];
    const boardItem = arrangedItems[laneKey].find(
      (boardItem) => boardItem.itemKey === itemKey
    );

    const announcement = interpolate(t["on drag start board item"], [
      {
        itemTitle: getText(t.locale, boardItem!.title),
        itemPosition: arrangedItems[laneKey].indexOf(boardItem!) + 1,
        laneLength: arrangedItems[laneKey].length,
        laneTitle: getText(t.locale, boardLane.title),
      },
    ]);

    provided.announce(announcement);

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

  const onDragUpdate = (event: DragUpdate, provided: ResponderProvided) => {
    if (!event.destination) return;
    const $draggable = getDraggable(event.draggableId);
    const $droppable = getDroppable(event.destination.droppableId);
    if (!$draggable || !$droppable) return;

    const destinationLaneKey = event.destination!.droppableId;
    const itemKey = event.draggableId;
    const boardLane = arrangedLanes[destinationLaneKey];
    const boardItem = arrangedItems[event.source.droppableId].find(
      (boardItem) => boardItem.itemKey === itemKey
    );

    const announcement = interpolate(
      t[
        destinationLaneKey === event.source.droppableId
          ? "on drag update board item same lane"
          : "on drag update board item different lane"
      ],
      [
        {
          itemTitle: getText(t.locale, (boardItem as IPreparedBoardItem).title),
          itemPosition: event.destination.index + 1,
          laneLength: arrangedItems[destinationLaneKey].length,
          laneTitle: getText(t.locale, (boardLane as TBoardLane).title),
        },
      ]
    );

    provided.announce(announcement);

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

  const onDragEnd = (
    { draggableId, reason, source, destination }: DropResult,
    provided: ResponderProvided
  ) => {
    let announcement;

    const boardItem = arrangedItems[source.droppableId].find(
      (boardItem) => boardItem.itemKey === draggableId
    );

    if (destination) {
      const laneKey = destination.droppableId;
      const boardLane = laneKey && arrangedLanes[laneKey];

      announcement = interpolate(t["on drag end board item"], [
        {
          itemTitle: getText(t.locale, (boardItem as IPreparedBoardItem).title),
          itemPosition: Math.max(1, destination.index + 1),
          laneLength: arrangedItems[laneKey].length,
          laneTitle: getText(t.locale, (boardLane as TBoardLane).title),
        },
      ]);
    } else {
      announcement = interpolate(t["on drag cancel board item"], [
        {
          itemTitle: getText(t.locale, (boardItem as IPreparedBoardItem).title),
        },
      ]);
    }

    provided.announce(announcement);

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
                editItemDialog={(boardItem: IBoardItem) => (
                  <>
                    <BoardItemDialog
                      action={BoardItemDialogAction.Edit}
                      trigger={
                        <MenuItem
                          vertical
                          icon={<EditIcon outline size="small" />}
                          content={t["edit board item"]}
                        />
                      }
                      initialState={boardItem}
                      {...{
                        arrangedLanes,
                        users,
                        t,
                        setArrangedItems,
                        arrangedItems,
                      }}
                    />
                    <Dialog
                      trigger={
                        <MenuItem
                          vertical
                          icon={<TrashCanIcon outline size="small" />}
                          content={t["delete"]}
                        />
                      }
                      content={getText(t.locale, t["confirm delete"], {
                        title: getText(t.locale, boardItem.title),
                      })}
                      confirmButton={{ content: t["delete"] }}
                      cancelButton={{ content: t["cancel"] }}
                      onConfirm={() => {
                        const pos = arrangedItems[boardItem.lane].findIndex(
                          (laneItem) =>
                            laneItem.itemKey ===
                            (boardItem as IPreparedBoardItem).itemKey
                        );
                        arrangedItems[boardItem.lane].splice(pos, 1);
                        setArrangedItems(cloneDeep(arrangedItems));
                      }}
                    />
                  </>
                )}
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
  const [arrangedLanes, setStateArrangedLanes] = useState<TBoardLanes>(
    props.lanes
  );

  const [arrangedItems, setStateArrangedItems] = useState<IPreparedBoardItems>(
    prepareBoardItems(props.items, props.lanes)
  );

  const [addingLane, setAddingLane] = useState<boolean>(false);

  const setArrangedLanes = (lanes: TBoardLanes) => {
    if (props.onInteraction)
      props.onInteraction({ event: "update", target: "lanes", lanes });
    return setStateArrangedLanes(lanes as SetStateAction<TBoardLanes>);
  };

  const setArrangedItems = (items: IPreparedBoardItems) => {
    if (props.onInteraction)
      props.onInteraction({ event: "update", target: "items", items });
    return setStateArrangedItems(items as SetStateAction<IPreparedBoardItems>);
  };

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
                      subject: "add_column",
                    },
                  },
                }}
                onInteraction={({ subject }) => {
                  if (subject === "add_column") setAddingLane(true);
                }}
              />
              {Object.keys(arrangedLanes).length > 0 || addingLane ? (
                <BoardStandalone
                  {...{
                    t,
                    rtl,
                    arrangedLanes,
                    arrangedItems,
                    setArrangedItems: setArrangedItems as Dispatch<
                      SetStateAction<IPreparedBoardItems>
                    >,
                    addingLane,
                    setAddingLane,
                    setArrangedLanes: setArrangedLanes as Dispatch<
                      SetStateAction<TBoardLanes>
                    >,
                  }}
                  {...pick(props, ["users", "boardItemCardLayout"])}
                />
              ) : (
                <Communication
                  {...(props.emptyState || {
                    option: CommunicationOptions.Empty,
                    fields: {
                      title: getText(t.locale, t["board empty header"]),
                      desc: getText(t.locale, t["board empty body"]),
                    },
                  })}
                />
              )}
            </Flex>
          </BoardTheme>
        );
      }}
    />
  );
};
