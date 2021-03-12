import { TTextObject } from "../translations";

/**
 * An action a user can apply to an entity.
 */
export type TAction = {
  /**
   * The text content of the action.
   */
  title: string;
  /**
   * The unique ID of the entity/entities that the action applies to.
   */
  subject?: string[] | string;
  /**
   * The icon to associate with the action.
   */
  icon?: string;
  /**
   * Whether the action can be applied to multiple entities, or just one at a time.
   */
  multi?: boolean;
};

export type actionKey = string;

/**
 * A collection of actions, keyed by the action ID.
 */
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
