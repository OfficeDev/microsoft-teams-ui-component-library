import { ComponentEventHandler } from "@fluentui/react-northstar";
import { TTextObject } from "../translations";

export type TAction = {
  title: string;
  icon?: string;
  multi?: boolean;
  __internal_callback__?: string;
};

export type TActions = {
  [actionKey: string]: TAction;
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
