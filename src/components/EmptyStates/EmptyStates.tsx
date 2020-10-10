import React from "react";
import {
  Flex,
  FlexItem,
  Button,
  Text,
  ProviderConsumer as FluentUIThemeConsumer,
} from "@fluentui/react-northstar";
import { Illustration } from "./Illustration";

interface IState {
  title?: string;
  desc?: string;
  image?: StateOptions;
  actions?: IStateActions;
}

interface IStateActions {
  primary?: IStateAction;
  secondary?: IStateAction;
  tertiary?: IStateAction;
}

interface IStateAction {
  label: string;
}

export enum StateOptions {
  Default = "default",
  Welcome = "welcome",
  Empty = "empty",
  Files = "files",
  Error = "error",
  Thanks = "thanks",
  WentWrong = "wentWrong",
}

export const states = {
  default: {
    title: "Primary line of text",
    desc:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    image: StateOptions.Default,
    actions: {
      primary: {
        label: "Primary action",
      },
      secondary: {
        label: "Secondary action",
      },
      tertiary: {
        label: "Secondary action",
      },
    },
  },
  welcome: {
    title: `Welcome to {{appName}}! We’re glad you’re here.`,
    desc: `{{appName}} is your tool to create, take, and manage polls.`,
    image: StateOptions.Welcome,
    actions: {
      primary: {
        label: "Sign In",
      },
      secondary: {
        label: "Sign Up",
      },
      tertiary: {
        label: "Learn more about {{appName}}",
      },
    },
  },
  welcome2: {
    title: `Welcome to your homepage, {{userName}}`,
    desc: `This is where you will find all of your boards that organize your photos, files, and tasks across your different teams.`,
    image: StateOptions.Files,
    actions: {
      primary: {
        label: "Create a board",
      },
      secondary: {
        label: "Find an existing board",
      },
    },
  },
  empty: {
    image: StateOptions.Empty,
    actions: {
      primary: {
        label: "Creat a task",
      },
      secondary: {
        label: "Find an existing task",
      },
    },
  },
  empty2: {
    image: StateOptions.Empty,
    title: "You don’t have any tasks yet",
    desc:
      "Once you are assigned a task, you can find it here. Until then, enjoy your time off.",
  },
  error: {
    title: `Something went wrong.`,
    desc: `Looks like there is a glitch in our system. You can refresh or start over if that doesn’t seem to fix the issue.`,
    image: StateOptions.WentWrong,
    actions: {
      primary: {
        label: "Refresh",
      },
      tertiary: {
        label: "Start over",
      },
    },
  },
  error2: {
    title: "No results found",
    desc:
      "Try refining your search by using common words and checking for spelling errors.",
  },
  thanks: {
    title: "You’re awesome.",
    desc: "You’ve just completed your weekly goal in record time.",
    image: StateOptions.Thanks,
    actions: {
      primary: {
        label: "Start the next challenge",
      },
      secondary: {
        label: "Celebrate with your colleagues",
      },
    },
  },
};

export function EmptyStates({ option }: { option: any }) {
  return (
    <FluentUIThemeConsumer
      render={(globalTheme) => (
        <Flex
          styles={{
            width: "100%",
            height: "100%",
          }}
          vAlign="center"
          hAlign="center"
        >
          <StatesConteiner {...option} />
        </Flex>
      )}
    />
  );
}

const StatesConteiner = ({ title, desc, image, actions }: IState) => (
  <Flex
    hAlign="center"
    gap="gap.large"
    column
    style={{
      width: "100%",
      maxWidth: "33.5rem",
      margin: "3rem 1.25rem",
    }}
  >
    {image && <Illustration option={image} />}
    {(title || desc) && (
      <FlexItem>
        <Flex hAlign="center" column>
          {title && (
            <Text
              content={title}
              size="large"
              weight="bold"
              as="h1"
              styles={{ marginTop: 0, marginBottom: ".5rem" }}
            />
          )}
          {desc && (
            <Text
              content={desc}
              as="p"
              styles={{ textAlign: "center", margin: 0 }}
            />
          )}
        </Flex>
      </FlexItem>
    )}
    {actions && (
      <FlexItem>
        <Flex
          gap="gap.small"
          column
          styles={{
            width: "100%",
            maxWidth: "17.5rem",
          }}
        >
          {actions.primary && (
            <Button
              content={actions.primary.label}
              styles={{ width: "100%" }}
              primary
            />
          )}
          {actions.secondary && (
            <Button
              content={actions.secondary.label}
              styles={{ width: "100%" }}
            />
          )}
          {actions.tertiary && (
            <Button text primary>
              <Text content={actions.tertiary.label} weight="light" />
            </Button>
          )}
        </Flex>
      </FlexItem>
    )}
  </Flex>
);
