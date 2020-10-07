import { TTextObject } from "../translations";

export type TAction = {
  title: string;
  icon?: string;
  multi?: boolean;
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
