import React from "react";
import {
  Flex,
  ProviderConsumer as FluentUIThemeConsumer,
} from "@fluentui/react-northstar";
import { TeamsTheme } from "../../lib/withTheme";

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

const Default = React.lazy(() => import("./States/Default"));
const Empty = React.lazy(() => import("./States/Empty"));
const Error = React.lazy(() => import("./States/Error"));
const Files = React.lazy(() => import("./States/Files"));
const Thanks = React.lazy(() => import("./States/Thanks"));
const Welcome = React.lazy(() => import("./States/Welcome"));
const WentWrong = React.lazy(() => import("./States/WentWrong"));

const STATES = {
  default: Default,
  error: Error,
  thanks: Thanks,
  empty: Empty,
  welcome: Welcome,
  wentWrong: WentWrong,
  files: Files,
};

export enum States {
  Default = "default",
  Welcome = "welcome",
  Empty = "empty",
  Files = "files",
  Error = "error",
  Thanks = "thanks",
  WentWrong = "wentWrong",
}

export function EmptyStates({ option }: { option: States }) {
  const State: React.LazyExoticComponent<({
    theme,
  }: {
    theme: TeamsTheme;
  }) => JSX.Element> = STATES[option];
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
          <React.Suspense fallback={<></>}>
            <State theme={globalTheme.siteVariables.theme} />
          </React.Suspense>
        </Flex>
      )}
    />
  );
}
