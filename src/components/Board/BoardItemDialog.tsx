import React, { Dispatch, SetStateAction } from "react";
import uniqueId from "lodash/uniqueId";
import cloneDeep from "lodash/cloneDeep";

import { TTranslations, getText } from "../../translations";

import { FormDialog } from "../Form/Form";
import {
  IBoardItem,
  IPreparedBoardItem,
  IPreparedBoardItems,
} from "./BoardItem";
import { TBoardLanes } from "./BoardLane";
import { TUsers } from "../../types/types";

export enum BoardItemDialogAction {
  Create,
  Edit,
}

export interface BoardItemDialogProps {
  action: BoardItemDialogAction;
  trigger: JSX.Element;
  initialState: Partial<IBoardItem>;
  arrangedLanes: TBoardLanes;
  setArrangedItems: Dispatch<SetStateAction<IPreparedBoardItems>>;
  arrangedItems: IPreparedBoardItems;
  users: TUsers;
  t: TTranslations;
}

export const BoardItemDialog = ({
  action,
  trigger,
  initialState,
  arrangedLanes,
  setArrangedItems,
  arrangedItems,
  users,
  t,
}: BoardItemDialogProps) => {
  return (
    <FormDialog
      trigger={trigger}
      headerSection={{
        title: (function () {
          switch (action) {
            case BoardItemDialogAction.Create:
              return t["add board item"];
            case BoardItemDialogAction.Edit:
              return t["edit board item"];
          }
        })(),
      }}
      sections={[
        {
          inputGroups: [
            {
              type: "text-inputs",
              fields: [
                {
                  type: "text",
                  title: t["title"],
                  inputId: "board-item__title",
                  initialValue: getText(t.locale, initialState["title"]),
                },
              ],
            },
            {
              type: "text-inputs",
              fields: [
                {
                  type: "text",
                  title: t["subtitle"],
                  inputId: "board-item__subtitle",
                  optional: true,
                  initialValue: getText(t.locale, initialState["subtitle"]),
                },
              ],
            },
            {
              type: "multiline-text",
              title: t["board item body"],
              inputId: "board-item__body",
              optional: true,
              initialValue: getText(
                t.locale,
                initialState.body
                  ? Array.isArray(initialState.body)
                    ? initialState.body[0]
                    : initialState.body
                  : ""
              ),
            },
            {
              type: "dropdown",
              title: t["board lane"],
              inputId: "board-item__lane",
              multiple: false,
              options: Object.keys(arrangedLanes).map((laneKey) => ({
                title: arrangedLanes[laneKey].title,
                value: laneKey,
              })),
              initialValue: initialState.lane,
            },
            {
              type: "dropdown",
              title: t["board item users"],
              inputId: "board-item__users",
              optional: true,
              multiple: true,
              options: Object.keys(users).map((userKey) => ({
                title: users[userKey].name,
                value: userKey,
              })),
              initialValues: initialState.users,
            },
          ],
        },
      ]}
      submit={t["save"]}
      cancel={(function () {
        switch (action) {
          case BoardItemDialogAction.Create:
            return t["discard"];
          case BoardItemDialogAction.Edit:
            return t["cancel"];
        }
      })()}
      __internal_callbacks__={{
        submit: (_e, formState) => {
          if (!formState) return;
          const boardItem = Object.keys(formState).reduce(
            (
              boardItem: {
                [boardItemPropKey: string]: string | string[] | number;
              },
              inputId
            ) => {
              const [_prefix, boardItemProperty] = inputId.split("__");
              const value = formState[inputId];
              if (value) boardItem[boardItemProperty] = value;
              return boardItem;
            },
            {
              order: -1,
              itemKey: uniqueId("nbi"),
            }
          );
          arrangedItems[boardItem.lane as string].push(
            (boardItem as unknown) as IPreparedBoardItem
          );
          setArrangedItems(cloneDeep(arrangedItems));
        },
      }}
    />
  );
};
