import React, { useState } from "react";
import range from "lodash/range";

import {
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps,
} from "react-beautiful-dnd";

import {
  Avatar,
  Box,
  Button,
  Card,
  CardBehaviorProps,
  Flex,
  FocusZoneTabbableElements,
  Popup,
  Ref,
  SiteVariablesPrepared,
  Text,
  dialogBehavior,
  gridCellWithFocusableElementBehavior,
} from "@fluentui/react-northstar";

import { getCode, keyboardKey } from "@fluentui/keyboard-key";

import { MoreIcon, PaperclipIcon } from "@fluentui/react-icons-northstar";

import {
  getText,
  TLocale,
  TTextObject,
  TTranslations,
} from "../../translations";

import { TUsers } from "../..";

import setMultiple from "../../lib/setMultiple";
import { useAccessibility } from "@fluentui/react-bindings";

const boardItemBehavior = (props: CardBehaviorProps) =>
  setMultiple(gridCellWithFocusableElementBehavior(props), {
    "focusZone.props": {
      handleTabKey: FocusZoneTabbableElements.all,
      isCircularNavigation: true,
      shouldEnterInnerZone: (event: React.KeyboardEvent<HTMLElement>) =>
        getCode(event) === keyboardKey.Enter,
    },
    "keyActions.root.focus.keyCombinations": [{ keyCode: keyboardKey.Escape }],
  });

export interface IBoardItemProps {
  isDragging: boolean;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps;
  editItemDialog?: JSX.Element;
  t: TTranslations;
  item: IPreparedBoardItem;
  boardItemCardLayout: IBoardItemCardLayout;
  users: TUsers;
}

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

export interface IPreparedBoardItem extends IBoardItem {
  itemKey: string;
}

export interface IPreparedBoardItems {
  [laneKey: string]: IPreparedBoardItem[];
}

export interface IBoardItemCardLayout {
  previewPosition: "top" | "afterHeader";
  overflowPosition: "preview" | "header" | "footer";
}

interface IBoardItemBadgesProps {
  badges: IBoardItemBadges;
  t: TTranslations;
}

const BoardItemBadges = ({ badges }: IBoardItemBadgesProps) => {
  return (
    <Box>
      {Object.keys(badges).map((badgeKey) => {
        switch (badgeKey) {
          case "attachments":
            return (
              <Flex
                styles={{
                  height: "1.75rem",
                  color: "var(--content-color-secondary)",
                }}
                hAlign="center"
                vAlign="center"
                key={`BoardItem__Badge__${badgeKey}`}
              >
                <PaperclipIcon outline />
                <Text
                  size="small"
                  content={badges[badgeKey]}
                  styles={{ marginLeft: ".25rem" }}
                />
              </Flex>
            );
        }
      })}
    </Box>
  );
};

interface IBoardItemUsersProps {
  associatedUserKeys: string[];
  users: TUsers;
  locale: TLocale;
}

const BoardItemUsers = ({
  associatedUserKeys,
  users,
  locale,
}: IBoardItemUsersProps) => {
  // [v-wishow] todo: replace with AvatarGroup compoment to be released in Fluent UI
  // spec in Figma: https://www.figma.com/file/p5tprlOerFyzQ9YH4aMQBl/Avatar-Group-Fluent-UI?node-id=3%3A123
  return (
    <>
      {range(0, Math.min(associatedUserKeys.length, 3))
        .reverse()
        .map((i) => {
          const userKey = associatedUserKeys[i];
          const user = users[userKey];
          return associatedUserKeys.length > 3 && i === 2 ? (
            <Avatar
              size="small"
              key={`BoardItemUserAvatar__overflow`}
              name={`+${associatedUserKeys.length - 2}`}
              getInitials={(name) => name}
              variables={({ colorScheme }: SiteVariablesPrepared) => ({
                borderColor: colorScheme.default.background,
              })}
              styles={{ marginLeft: "-.375rem", order: i }}
            />
          ) : (
            <Avatar
              size="small"
              key={`BoardItemUserAvatar__${userKey}`}
              name={getText(locale, user.name)}
              variables={({ colorScheme }: SiteVariablesPrepared) => ({
                borderColor: colorScheme.default.background,
              })}
              {...(user.image ? { image: user.image } : {})}
              styles={{
                order: i,
                ...(i > 0 ? { marginLeft: "-.375rem" } : {}),
              }}
            />
          );
        })}
    </>
  );
};

interface IBoardItemBody {
  locale: TLocale;
  textObject: TTextObject;
}

const BoardItemBody = ({ locale, textObject }: IBoardItemBody) => {
  return <Text>{getText(locale, textObject)}</Text>;
};

interface IBoardItemPreview {
  preview: string;
}

const BoardItemPreview = ({ preview }: IBoardItemPreview) => {
  return (
    <Box
      styles={{
        backgroundSize: "cover",
        backgroundPosition: "center center",
        width: "100%",
        height: "6.625rem",
        marginBottom: ".75rem",
      }}
      style={{
        backgroundImage: `url(${preview})`,
      }}
    />
  );
};

export const BoardItem = React.memo((props: IBoardItemProps) => {
  const {
    isDragging,
    draggableProps,
    dragHandleProps,
    boardItemCardLayout,
    t,
    item,
    users,
    editItemDialog,
  } = props;

  const [itemNode, setItemNode] = useState<HTMLElement | null>(null);

  const getA11Props = useAccessibility(boardItemBehavior, {
    actionHandlers: {
      preventDefault: (event) => {
        // preventDefault only if event coming from inside the lane
        if (event.currentTarget !== event.target) {
          event.preventDefault();
        }
      },

      focus: (event) => {
        if (itemNode && event.target !== event.currentTarget) {
          itemNode.focus();
          event.stopPropagation();
        }
      },
    },
  });

  return (
    <Ref innerRef={setItemNode}>
      {getA11Props.unstable_wrapWithFocusZone(
        <Card
          {...getA11Props("root", {
            elevated: true,
            variables: ({ colorScheme }: SiteVariablesPrepared) => ({
              elevation: isDragging
                ? colorScheme.elevations[8]
                : colorScheme.elevations[4],
              hoverElevation: colorScheme.elevations[8],
              backgroundColor: colorScheme.default.background,
              borderColor: isDragging
                ? colorScheme.default.borderHover
                : colorScheme.default.border,
            }),
            styles: {
              position: "relative",
              zIndex: 1,
              margin: `0 1.25rem .5rem 1.25rem`,
              width: "auto",
              height: "auto",
            },
            ...draggableProps,
            ...dragHandleProps,
            "aria-label": `${t["board item"]}, ${getText(
              t.locale,
              item.title
            )}`,
            ...(isDragging ? { "data-isdragging": true } : {}),
            tabIndex: -1,
          })}
        >
          <Box
            styles={{
              borderRadius: "4px",
              overflow: "hidden",
            }}
          >
            {item.preview && boardItemCardLayout.previewPosition === "top" && (
              <BoardItemPreview preview={item.preview} />
            )}
            <Card.Body
              {...(!item.preview ||
              boardItemCardLayout.previewPosition !== "top"
                ? { styles: { marginTop: "1.25rem" } }
                : {})}
            >
              <Flex>
                <Box styles={{ flex: "1 0 0" }}>
                  <Text
                    weight="semibold"
                    as="h2"
                    styles={{ margin: 0, fontSize: "inherit" }}
                  >
                    {getText(t.locale, item.title)}
                  </Text>
                  {item.subtitle && (
                    <Text
                      size="small"
                      variables={({ colorScheme }: SiteVariablesPrepared) => ({
                        color: colorScheme.foreground1,
                      })}
                    >
                      {getText(t.locale, item.subtitle)}
                    </Text>
                  )}
                </Box>
                <Popup
                  content={editItemDialog}
                  trigger={
                    <Button
                      text
                      iconOnly
                      data-is-focusable="true"
                      aria-label={t["board item options"]}
                      icon={<MoreIcon size="small" outline />}
                      styles={{ minWidth: "1.25rem", height: "1.25rem" }}
                    />
                  }
                  position="below"
                  accessibility={dialogBehavior}
                  autoFocus={true}
                />
              </Flex>
            </Card.Body>
            {item.preview &&
              boardItemCardLayout.previewPosition === "afterHeader" && (
                <BoardItemPreview preview={item.preview} />
              )}
            {item.body && (
              <Card.Body>
                {Array.isArray(item.body) ? (
                  item.body.map((bodyItem, bi) => (
                    <BoardItemBody
                      locale={t.locale}
                      textObject={bodyItem}
                      key={`BoardItem__${item.itemKey}__${bi}`}
                    />
                  ))
                ) : (
                  <BoardItemBody
                    locale={t.locale}
                    textObject={item.body as TTextObject}
                  />
                )}
              </Card.Body>
            )}
            {(item.users || item.badges) && (
              <Card.Footer>
                <Flex>
                  <Box
                    styles={{
                      flex: "1 0 auto",
                      display: "flex",
                    }}
                  >
                    {item.users && (
                      <BoardItemUsers
                        locale={t.locale}
                        associatedUserKeys={item.users}
                        users={users}
                      />
                    )}
                  </Box>
                  {item.badges && (
                    <BoardItemBadges t={t} badges={item.badges} />
                  )}
                </Flex>
              </Card.Footer>
            )}
            <b
              style={{
                display: "block",
                marginTop: "1.25rem",
              }}
              role="presentation"
            />
          </Box>
        </Card>
      )}
    </Ref>
  );
});
