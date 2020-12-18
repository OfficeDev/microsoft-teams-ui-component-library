import React, { useLayoutEffect, useRef, useState } from "react";

import {
  AutoFocusZone,
  Box,
  Button,
  Flex,
  FocusZoneTabbableElements,
  GridRowBehaviorProps,
  Input,
  MenuButton,
  Ref,
  SiteVariablesPrepared,
  Text,
  gridCellWithFocusableElementBehavior,
  gridRowNestedBehavior,
} from "@fluentui/react-northstar";

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  MoreIcon,
  TrashCanIcon,
} from "@fluentui/react-icons-northstar";

import { ICSSInJSStyle } from "@fluentui/styles";

import { useAccessibility } from "@fluentui/react-bindings";

import { getCode, keyboardKey } from "@fluentui/keyboard-key";

import { Draggable, Droppable } from "react-beautiful-dnd";

import { getText, TTextObject, TTranslations } from "../../translations";

import {
  BoardItem,
  IPreparedBoardItem,
  IBoardItemCardLayout,
  IBoardItem,
} from "./BoardItem";

import { TUsers } from "../../types/types";

import setMultiple from "../../lib/setMultiple";

export interface IBoardLaneProps {
  lane?: TBoardLane;
  laneKey: string;
  last?: boolean;
  first?: boolean;
  addItemDialog?: JSX.Element;
  editItemDialog?: (boardItem: IBoardItem) => JSX.Element;
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

export type TBoardLane = {
  title: TTextObject;
};

export type TBoardLanes = {
  [laneKey: string]: TBoardLane;
};

export type TPlaceholderPosition = null | [number, number, number, number];

const boardLaneBehavior = (props: GridRowBehaviorProps) => {
  return setMultiple(gridRowNestedBehavior(props), {
    "focusZone.props": {
      handleTabKey: FocusZoneTabbableElements.all,
      isCircularNavigation: true,
      shouldEnterInnerZone: (event: React.KeyboardEvent<HTMLElement>) =>
        getCode(event) === keyboardKey.Enter,
    },
    "attributes.root": {
      role: "group",
      "data-is-focusable": true,
      tabIndex: -1,
    },
    "keyActions.root.focus.keyCombinations": [{ keyCode: keyboardKey.Escape }],
    "keyActions.root.ignore.keyCombinations": [
      { keyCode: keyboardKey.ArrowRight },
      { keyCode: keyboardKey.ArrowDown },
      { keyCode: keyboardKey.ArrowLeft },
      { keyCode: keyboardKey.ArrowUp },
    ],
  });
};

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

export const BoardLane = (props: IBoardLaneProps) => {
  const {
    users,
    lane,
    preparedItems,
    t,
    rtl,
    laneKey,
    last,
    first,
    addItemDialog,
    editItemDialog,
    boardItemCardLayout,
    placeholderPosition,
    exitPendingLane,
    deleteLane,
    moveLane,
  } = props;

  const [layoutState, setLayoutState] = useState<number>(-1);
  const [scrollbarWidth, setScrollbarWidth] = useState<number>(16);
  const [laneNode, setLaneNode] = useState<HTMLElement | null>(null);
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

  const getA11Props = useAccessibility(boardLaneBehavior, {
    actionHandlers: {
      preventDefault: (event) => {
        // preventDefault only if event coming from inside the lane
        if (event.currentTarget !== event.target) {
          event.preventDefault();
        }
      },

      focus: (event) => {
        if (laneNode) {
          laneNode.focus();
          event.stopPropagation();
        }
      },

      ignore: (event) => {
        event.preventDefault();
        event.stopPropagation();
      },
    },
  });

  return (
    <Ref innerRef={setLaneNode}>
      {getA11Props.unstable_wrapWithFocusZone(
        <Box
          {...getA11Props("root", {
            className: "board__lane",
            styles: {
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
            },
            variables: ({ colorScheme }: SiteVariablesPrepared) => ({
              borderFocus: colorScheme.default.borderFocus,
              borderFocusWithin: colorScheme.default.borderFocusWithin,
            }),
            "aria-label": `${
              lane ? getText(t.locale, lane.title) : t["lane pending"]
            }, ${t["board lane instructions"]}`,
          })}
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
                      return exitPendingLane!(
                        (e.target as HTMLInputElement).value
                      );
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
                  fontSize: "inherit",
                  margin: "inherit",
                }}
                as="h1"
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
            {addItemDialog}
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
                                {...(editItemDialog && {
                                  editItemDialog: editItemDialog(item),
                                })}
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
      )}
    </Ref>
  );
};
