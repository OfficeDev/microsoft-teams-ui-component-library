import { TTextObject } from "../translations";

/**
 * An action a user can apply to an entity.
 * @public
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

/**
 * @public
 */
export type actionKey = string;

/**
 * A collection of actions, keyed by the action ID.
 * @public
 */
export type TActions = {
  [actionKey: string]: TAction;
};

/**
 * A User entity, which certain components can use as part of their content.
 * @public
 */
export type TUser = {
  image?: string;
  name: TTextObject;
};

/**
 * A collection of Users, keyed by their unique ID.
 * @public
 */
export type TUsers = {
  [userKey: string]: TUser;
};

/**
 * If undefined, the component should not attempt to save or load properties from local storage.
 * Otherwise this string should be used to identify a component’s intention; user preferences
 * and potentially other properties will be saved to and loaded from the local storage for a user’s
 * client by this key.
 * @public
 */
export type TCacheKey = string | undefined;

/**
 * @internal
 */
export enum Surface {
  base = "base",
  raised = "raised",
}

/**
 * @internal
 */
export enum DialogVariant {
  normal = "normal",
  sidebar = "sidebar",
}

/**
 * The stylistic variants available to the buttons used by these components.
 * @public
 */
export enum EButtonVariants {
  default = "default",
  primary = "primary",
  tinted = "tinted",
  text = "text",
}

/**
 * The stylistic variants available to the avatars used by these components.
 * @public
 */

export enum EAvatarVariant {
  human = "human",
  entity = "entity",
  bot = "bot",
}
