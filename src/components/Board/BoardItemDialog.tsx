import React from "react";

import { TTranslations } from "../../translations";

import { FormDialog } from "../Form/Form";

export enum BoardItemDialogAction {
  Create,
  Edit,
}

export interface BoardItemDialogProps {
  action: BoardItemDialogAction;
  trigger: JSX.Element;
  t: TTranslations;
}

export const BoardItemDialog = ({
  action,
  trigger,
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
      sections={[]}
      submit={t["confirm"]}
      cancel={t["cancel"]}
      __internal_callbacks__={{
        submit: (_e, formState) => {
          debugger;
        },
      }}
    />
  );
};
