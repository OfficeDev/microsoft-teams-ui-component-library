import { TTextObject } from "../translations";

export type TAction = {
  title: string;
  subject?: string[] | string;
  icon?: string;
  multi?: boolean;
};

export type actionKey = string;

export type TActions = {
  [actionKey: string]: TAction;
};

/**
 * A User entity, which certain components can use as part of their content.
 */
export type TUser = {
  image?: string;
  name: TTextObject;
};

/**
 * A collection of Users, keyed by their unique ID.
 */
export type TUsers = {
  [userKey: string]: TUser;
};

export enum Surface {
  base = "base",
  raised = "raised",
}
