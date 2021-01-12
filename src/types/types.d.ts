import { ComponentEventHandler } from "@fluentui/react-northstar";
import { TTextObject } from "../translations";

export type TAction = {
  title: string;
  subject: string[] | string;
  icon?: string;
  multi?: boolean;
};

export type actionKey = string;

export type TActions = {
  [actionKey: string]: TAction;
};

export type TActionsWithoutSubjects = {
  [actionKey: string]: Omit<TAction, "subject">;
};

export type TUser = {
  image?: string;
  name: TTextObject;
};

export type TUsers = {
  [userKey: string]: TUser;
};

export interface WithOptionalInternalCallbacks<P> {
  __internal_callbacks__?: {
    [callbackId: string]: ComponentEventHandler<P>;
  };
}

export enum Surface {
  base = "base",
  raised = "raised",
}
