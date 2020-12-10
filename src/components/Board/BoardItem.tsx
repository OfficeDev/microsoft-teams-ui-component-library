import React from "react";
import range from "lodash/range";

import {
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps,
} from "react-beautiful-dnd";

import {
  Avatar,
  Box,
  Card,
  Flex,
  gridCellBehavior,
  SiteVariablesPrepared,
  Text,
} from "@fluentui/react-northstar";

import { PaperclipIcon } from "@fluentui/react-icons-northstar";

import {
  getText,
  TLocale,
  TTextObject,
  TTranslations,
} from "../../translations";

import {
  IPreparedBoardItem,
  IBoardItemBadges,
  IBoardItemCardLayout,
} from "./Board";

import { TUsers } from "../../types/types";

interface IBoardItemProps {
  isDragging: boolean;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps;
  t: TTranslations;
  scrollbarWidth: number;
  item: IPreparedBoardItem;
  boardItemCardLayout: IBoardItemCardLayout;
  users: TUsers;
}

interface IBoardItemBadgesProps {
  badges: IBoardItemBadges;
  t: TTranslations;
}

const BoardItemBadges = ({ badges, t }: IBoardItemBadgesProps) => {
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
    scrollbarWidth,
    isDragging,
    draggableProps,
    dragHandleProps,
    boardItemCardLayout,
    t,
    item,
    users,
  } = props;
  return (
    <Card
      elevated
      variables={({ colorScheme }: SiteVariablesPrepared) => ({
        elevation: isDragging
          ? colorScheme.elevations[8]
          : colorScheme.elevations[4],
        hoverElevation: colorScheme.elevations[8],
        backgroundColor: colorScheme.default.background,
        borderColor: isDragging
          ? colorScheme.default.borderHover
          : colorScheme.default.border,
      })}
      styles={{
        position: "relative",
        zIndex: 1,
        margin: `0 ${((20 - scrollbarWidth) / 16).toFixed(4)}rem .5rem 1.25rem`,
        width: "auto",
        height: "auto",
      }}
      accessibility={gridCellBehavior}
      {...draggableProps}
      {...dragHandleProps}
      aria-label={`${t["board item"]}, ${getText(t.locale, item.title)}`}
      {...(isDragging ? { "data-isdragging": true } : {})}
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
          {...(!item.preview || boardItemCardLayout.previewPosition !== "top"
            ? { styles: { marginTop: "1.25rem" } }
            : {})}
        >
          <Text weight="semibold">{getText(t.locale, item.title)}</Text>
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
              {item.badges && <BoardItemBadges t={t} badges={item.badges} />}
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
  );
});
