export type TAction = {
  title: string;
  icon?: string;
  multi?: boolean;
};

export type TActions = {
  [actionKey: string]: TAction;
};
