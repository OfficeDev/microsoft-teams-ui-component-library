import { TeamsTheme } from "../../themes";

export enum CommunicationOptions {
  Default = "default",
  Welcome = "welcome",
  Hello = "hello",
  Empty = "empty",
  Error = "error",
  Thanks = "thanks",
}

export type TCommunication =
  | { option?: CommunicationOptions; fields: TCommunicationFields }
  | { option: CommunicationOptions; fields?: TCommunicationFields };

export type TCommunicationFields =
  | ICommunicationFields
  | ICommunicationFieldsWithThemedImage;

export interface ICommunicationFields {
  title?: string;
  desc?: string;
  image?: ICommunicationImage;
  actions?: CommunicationActions;
}
export interface ICommunicationFieldsWithThemedImage {
  title?: string;
  desc?: string;
  themedImage?: ICommunicationThemedImage;
  actions?: CommunicationActions;
}

export interface ICommunicationImage {
  src: string;
  ariaLabel: string;
}

export interface ICommunicationIllustration {
  [TeamsTheme.Default]: React.ReactNode;
  [TeamsTheme.Dark]: React.ReactNode;
  [TeamsTheme.HighContrast]: React.ReactNode;
}

export interface ICommunicationThemedImage {
  [TeamsTheme.Default]: string;
  [TeamsTheme.Dark]: string;
  [TeamsTheme.HighContrast]: string;
  ariaLabel: string;
}

export type CommunicationActions =
  | {
      primary: ICommunicationAction;
      secondary?: ICommunicationAction;
      tertiary?: ICommunicationAction;
    }
  | {
      primary?: ICommunicationAction;
      secondary: ICommunicationAction;
      tertiary?: ICommunicationAction;
    }
  | {
      primary?: ICommunicationAction;
      secondary?: ICommunicationAction;
      tertiary: ICommunicationAction;
    };

export interface ICommunicationAction {
  label: string;
  action: () => void;
}
