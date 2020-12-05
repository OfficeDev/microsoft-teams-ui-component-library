import React from "react";

import { TTranslations, getText } from "../../translations";

import { FormDialog } from "../Form/Form";
import { IBoardItem } from "./BoardItem";
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
  users: TUsers;
  t: TTranslations;
}

export const BoardItemDialog = ({
  action,
  trigger,
  initialState,
  arrangedLanes,
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
                  inputId: "board__item__title",
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
                  inputId: "board__item__subtitle",
                  initialValue: getText(t.locale, initialState["subtitle"]),
                },
              ],
            },
            {
              type: "multiline-text",
              title: t["board item body"],
              inputId: "board__item__body",
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
              inputId: "board__item__lane",
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
              inputId: "board__item__users",
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
      cancel={t["discard"]}
      __internal_callbacks__={{
        submit: (_e, formState) => {
          debugger;
        },
      }}
    />
  );
};
