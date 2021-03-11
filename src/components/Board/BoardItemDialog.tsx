import React, { Dispatch, SetStateAction } from "react";
import uniqueId from "lodash/uniqueId";
import cloneDeep from "lodash/cloneDeep";

import { getText, TTranslations } from "../../translations";

import { FormDialog } from "../Form/Form";
import { EInlineInputType, EInputBlockType } from "../Form/FormContent";
import { IPreparedBoardItem, IPreparedBoardItems } from "./BoardItem";
import { TBoardLanes } from "./BoardLane";
import { TUsers } from "../../types/types";

export enum BoardItemDialogAction {
  Create,
  Edit,
}

export interface BoardItemDialogProps {
  action: BoardItemDialogAction;
  trigger: JSX.Element;
  initialState: Partial<IPreparedBoardItem>;
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
          inputBlocks: [
            {
              type: EInputBlockType.inlineInputs,
              fields: [
                {
                  type: EInlineInputType.text,
                  title: t["title"],
                  inputId: "board-item__title",
                  initialValue: getText(t.locale, initialState["title"]),
                },
              ],
            },
            {
              type: EInputBlockType.inlineInputs,
              fields: [
                {
                  type: EInlineInputType.text,
                  title: t["subtitle"],
                  inputId: "board-item__subtitle",
                  initialValue: getText(t.locale, initialState["subtitle"]),
                },
              ],
            },
            {
              type: EInputBlockType.multilineText,
              title: t["board item body"],
              inputId: "board-item__body",
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
              type: EInputBlockType.dropdown,
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
              type: EInputBlockType.dropdown,
              title: t["board item users"],
              inputId: "board-item__users",
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
      onInteraction={({ formState }) => {
        if (!formState) return;
        const boardItem = Object.keys(formState).reduce(
          (
            boardItem: {
              [boardItemPropKey: string]: any;
            },
            inputId
          ) => {
            const [_prefix, boardItemProperty] = inputId.split("__");
            const value = formState[inputId];
            if (value) boardItem[boardItemProperty] = value;
            return boardItem;
          },
          (function () {
            switch (action) {
              case BoardItemDialogAction.Create:
                return {
                  order: -1,
                  itemKey: uniqueId("nbi"),
                };
              case BoardItemDialogAction.Edit:
                return cloneDeep(initialState);
            }
          })()
        );
        switch (action) {
          case BoardItemDialogAction.Create:
            arrangedItems[boardItem.lane as string].push(
              (boardItem as unknown) as IPreparedBoardItem
            );
            break;
          case BoardItemDialogAction.Edit:
            const fromPos = arrangedItems[
              initialState.lane as string
            ].findIndex(
              (laneItem) => laneItem.itemKey === initialState.itemKey!
            );
            if (boardItem.lane !== initialState.lane) {
              arrangedItems[initialState.lane as string].splice(fromPos, 1);
              arrangedItems[boardItem.lane as string].push(
                boardItem as IPreparedBoardItem
              );
            } else {
              arrangedItems[boardItem.lane as string][
                fromPos
              ] = boardItem as IPreparedBoardItem;
            }
        }
        setArrangedItems(cloneDeep(arrangedItems));
      }}
    />
  );
};
