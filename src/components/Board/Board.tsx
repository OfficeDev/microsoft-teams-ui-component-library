import React, {
  Dispatch,
  SetStateAction,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import set from "lodash/set";
import cloneDeep from "lodash/cloneDeep";
import pick from "lodash/pick";
import omit from "lodash/omit";
import uniqueId from "lodash/uniqueId";

import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
  DragStart,
  DragUpdate,
} from "react-beautiful-dnd";

import {
  AutoFocusZone,
  Box,
  Button,
  Flex,
  Input,
  MenuButton,
  ProviderConsumer as FluentUIThemeConsumer,
  Ref,
  SiteVariablesPrepared,
  Text,
  gridCellWithFocusableElementBehavior,
  gridNestedBehavior,
  gridRowNestedBehavior,
} from "@fluentui/react-northstar";

import { getCode, keyboardKey } from "@fluentui/keyboard-key";

import {
  AddIcon,
  MoreIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  TrashCanIcon,
} from "@fluentui/react-icons-northstar";

import { ICSSInJSStyle } from "@fluentui/styles";

import { BoardTheme } from "./BoardTheme";

import { TUsers } from "../../types/types";

import { TTranslations, TTextObject, getText } from "../../translations";

import { Toolbar } from "../Toolbar/Toolbar";
import { BoardItem } from "./BoardItem";

export interface IBoardItemCardLayout {
  previewPosition: "top" | "afterHeader";
  overflowPosition: "preview" | "header" | "footer";
}

const defaultBoardItemCardLayout: IBoardItemCardLayout = {
  previewPosition: "top",
  overflowPosition: "footer",
};

export type TBoardLane = {
  title: TTextObject;
};

export type TBoardLanes = {
  [laneKey: string]: TBoardLane;
};

export interface IBoardItemBadges {
  attachments?: number;
}

export interface IBoardItem {
  lane: string;
  order: number;
  title: TTextObject;
  subtitle?: TTextObject;
  body?: TTextObject | TTextObject[];
  users?: string[];
  badges?: IBoardItemBadges;
  preview?: string;
}

export type TBoardItems = {
  [itemKey: string]: IBoardItem;
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

interface IBoardLaneProps {
  lane?: TBoardLane;
  laneKey: string;
  last?: boolean;
  first?: boolean;
  preparedItems: IPreparedBoardItem[];
  users: TUsers;
  t: TTranslations;
  rtl: boolean;
  boardItemCardLayout: IBoardItemCardLayout;
  placeholderPosition: TPlaceholderPosition;
  exitPendingLane?: (value: string) => void;
  moveLane?: (laneKey: string, delta: -1 | 1) => void;
  deleteLane?: (laneKey: string) => void;
  pending?: boolean;
}

const separatorStyles: ICSSInJSStyle = {
  position: "relative",
  "&::after": {
    content: '""',
    display: "block",
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    width: "1px",
  },
};

const Placeholder = ({ position }: { position: TPlaceholderPosition }) =>
  position && (
    <Box
      variables={({ colorScheme }: SiteVariablesPrepared) => ({
        backgroundColor: colorScheme.brand.background1,
        borderColor: colorScheme.brand.foreground3,
      })}
      styles={{
        left: position[0] + "px",
        top: position[1] + "px",
        width: position[2] + "px",
        height: position[3] + "px",
        position: "absolute",
        borderRadius: "4px",
        borderWidth: "1px",
        zIndex: 0,
      }}
    />
  );

const laneFocusBorderStyles = {
  content: '""',
  display: "block",
  position: "absolute",
  borderStyle: "solid",
  borderWidth: 0,
  top: 0,
  bottom: 0,
  left: "1px",
  right: "2px",
  borderRadius: "4px",
  pointerEvents: "none",
};

const BoardLane = (props: IBoardLaneProps) => {
  const {
    users,
    lane,
    preparedItems,
    t,
    rtl,
    laneKey,
    last,
    first,
    boardItemCardLayout,
    placeholderPosition,
    exitPendingLane,
    deleteLane,
    moveLane,
  } = props;

  const [layoutState, setLayoutState] = useState<number>(-1);
  const [scrollbarWidth, setScrollbarWidth] = useState<number>(16);
  const $laneContent = useRef<HTMLDivElement | null>(null);
  const laneContentWidth = useRef<number | null>(null);

  const onResize = () => {
    setLayoutState(0);
  };

  useLayoutEffect(() => {
    // [v-wishow] The lane is rendered 3 times in order to measure the scrollbar and account for
    // its width, since it varies by the user agent and input situation:
    //
    // • 0: no content is rendered, in order to measure the lane width; entire lane is transparent
    // • 1: content is rendered in order to measure the width with scrollbar; lane is still transparent
    // • 2: content with adjusted scrollbar-side margin is rendered; lane is made visible.
    //
    // There is a possibility the adjusted scrollbar-side margin will change the overflow state due
    // to wrapping text. How to handle this case is to-be-designed.
    //
    // todo: Remove all of this when the custom scrollbar component is available.

    switch (layoutState) {
      case -1:
        window.addEventListener("resize", onResize);
        setLayoutState(0);
        break;
      case 0:
        if ($laneContent.current)
          laneContentWidth.current = $laneContent.current!.clientWidth;
        setLayoutState(1);
        break;
      case 1:
        if ($laneContent.current && laneContentWidth.current)
          setScrollbarWidth(
            laneContentWidth.current - $laneContent.current!.clientWidth
          );
        setLayoutState(2);
        break;
    }

    return () => {
      window.removeEventListener("resize", onResize);
    };
  });

  return (
    <Box
      styles={{
        display: "flex",
        flexFlow: "column nowrap",
        minWidth: "15rem",
        maxWidth: "22.5rem",
        borderRight: "1px solid transparent",
        flex: "1 0 0",
        opacity: layoutState === 2 ? 1 : 0,
        position: "relative",
        ":focus": { outline: "none" },
        "&::before": laneFocusBorderStyles,
        "&::after": laneFocusBorderStyles,
      }}
      variables={({ colorScheme }: SiteVariablesPrepared) => ({
        borderFocus: colorScheme.default.borderFocus,
        borderFocusWithin: colorScheme.default.borderFocusWithin,
      })}
      accessibility={(props) =>
        set(
          gridRowNestedBehavior(props),
          "focusZone.props.direction",
          0 /* FocusZoneDirection.vertical */
        )
      }
      className="board__lane"
      aria-label={`${t["board lane"]}, ${getText(
        t.locale,
        lane ? lane.title : t["lane pending"]
      )}`}
    >
      {props.pending ? (
        <AutoFocusZone>
          <Input
            placeholder={t["name lane"]}
            onBlur={(e) => {
              exitPendingLane!(e.target.value);
            }}
            onKeyDown={(e) => {
              switch (e.key) {
                case "Escape":
                  return exitPendingLane!("");
                case "Enter":
                  return exitPendingLane!((e.target as HTMLInputElement).value);
              }
            }}
            fluid
            styles={{ padding: ".05rem 1.25rem .25rem 1.25rem" }}
          />
        </AutoFocusZone>
      ) : (
        <Flex>
          <Text
            weight="bold"
            content={getText(t.locale, lane!.title)}
            style={{
              flex: "1 0 auto",
              padding: ".375rem 1.25rem .75rem 1.25rem",
            }}
          />
          <MenuButton
            trigger={
              <Button
                text
                iconOnly
                icon={<MoreIcon outline />}
                styles={{ marginRight: "1.25rem" }}
                aria-label={t["lane options"]}
              />
            }
            menu={[
              {
                content: t["move lane nearer"],
                icon: rtl ? (
                  <ArrowRightIcon outline />
                ) : (
                  <ArrowLeftIcon outline />
                ),
                disabled: first,
                onClick: () => {
                  moveLane && moveLane(laneKey, -1);
                },
              },
              {
                content: t["move lane further"],
                icon: rtl ? (
                  <ArrowLeftIcon outline />
                ) : (
                  <ArrowRightIcon outline />
                ),
                disabled: last,
                onClick: () => {
                  moveLane && moveLane(laneKey, 1);
                },
              },
              {
                kind: "divider",
              },
              {
                content: t["delete"],
                icon: <TrashCanIcon outline />,
                disabled: preparedItems?.length,
                onClick: () => {
                  deleteLane && deleteLane(laneKey);
                },
              },
            ]}
          />
        </Flex>
      )}
      <Box
        variables={({ colorScheme }: SiteVariablesPrepared) => ({
          backgroundColor: colorScheme.default.background2,
          separatorColor: colorScheme.default.border2,
        })}
        styles={{
          flex: "0 0 auto",
          padding: "0 1.25rem .75rem 1.25rem",
          ...(last ? {} : separatorStyles),
        }}
        accessibility={gridCellWithFocusableElementBehavior}
      >
        <Button
          icon={<AddIcon outline />}
          iconOnly
          fluid
          title={t["add board item"]}
          aria-label={t["add board item"]}
        />
      </Box>
      <Box
        variables={({ colorScheme }: SiteVariablesPrepared) => ({
          separatorColor: colorScheme.default.border2,
        })}
        styles={{
          flex: "1 0 0",
          overflow: "hidden",
          ...(last ? {} : separatorStyles),
        }}
      >
        <Droppable droppableId={laneKey}>
          {(provided, snapshot) => (
            <Box
              styles={{
                height: "100%",
                overflowY: "auto",
                paddingTop: "2px",
                position: "relative",
              }}
              ref={(element: HTMLDivElement) => {
                $laneContent.current = element;
                provided.innerRef(element);
              }}
              {...provided.droppableProps}
            >
              {layoutState > 0 && preparedItems?.length
                ? preparedItems.map((item) => (
                    <Draggable
                      draggableId={item.itemKey}
                      key={`Board__DraggableItem__${item.itemKey}`}
                      index={item.order}
                    >
                      {(provided, snapshot) => (
                        <Ref innerRef={provided.innerRef}>
                          <BoardItem
                            isDragging={snapshot.isDragging}
                            draggableProps={provided.draggableProps}
                            dragHandleProps={provided.dragHandleProps!}
                            {...{
                              scrollbarWidth,
                              item,
                              users,
                              t,
                              boardItemCardLayout,
                            }}
                          />
                        </Ref>
                      )}
                    </Draggable>
                  ))
                : null}
              {provided.placeholder}
              {snapshot.isDraggingOver && (
                <Placeholder position={placeholderPosition} />
              )}
            </Box>
          )}
        </Droppable>
      </Box>
    </Box>
  );
};

export interface IPreparedBoardItem extends IBoardItem {
  itemKey: string;
}

interface IPreparedBoardItems {
  [laneKey: string]: IPreparedBoardItem[];
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

type TPlaceholderPosition = null | [number, number, number, number];

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
          accessibility={(props) =>
            set(gridNestedBehavior(props), "focusZone.props", {
              shouldEnterInnerZone: function shouldEnterInnerZone(
                event: KeyboardEvent
              ) {
                return getCode(event) === keyboardKey.ArrowDown;
              },
              direction: 1 /* FocusZoneDirection.horizontal */,
              shouldResetActiveElementWhenTabFromZone: true,
            })
          }
        >
          {Object.keys(arrangedLanes).map((laneKey, laneIndex, laneKeys) => {
            const last = laneIndex === laneKeys.length - 1;
            return (
              <BoardLane
                first={laneIndex === 0}
                last={addingLane ? false : last}
                laneKey={laneKey}
                lane={arrangedLanes[laneKey]}
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
