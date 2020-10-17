import React from "react";
import {
  Flex,
  ProviderConsumer as FluentUIThemeConsumer,
} from "@fluentui/react-northstar";
import { TeamsTheme } from "../../lib/withTheme";
import { IState } from "./States/State";

const Default = React.lazy(() => import("./States/Default"));
const Empty = React.lazy(() => import("./States/Empty"));
const Error = React.lazy(() => import("./States/Error"));
const Hello = React.lazy(() => import("./States/Hello"));
const Thanks = React.lazy(() => import("./States/Thanks"));
const Welcome = React.lazy(() => import("./States/Welcome"));
// const WentWrong = React.lazy(() => import("./States/WentWrong"));

export enum StatesOptions {
  Default = "default",
  Welcome = "welcome",
  Hello = "hello",
  Empty = "empty",
  Error = "error",
  Thanks = "thanks",
}

const STATES = {
  [StatesOptions.Default]: Default,
  [StatesOptions.Welcome]: Welcome,
  [StatesOptions.Hello]: Hello,
  [StatesOptions.Empty]: Empty,
  [StatesOptions.Error]: Error,
  [StatesOptions.Thanks]: Thanks,
};

type TStates =
  | { option?: StatesOptions; values: IState }
  | { option: StatesOptions; values?: IState };

export function States({ option, values }: TStates) {
  const State: React.LazyExoticComponent<({
    theme,
    values,
  }: {
    theme: TeamsTheme;
    values?: IState;
  }) => JSX.Element> = STATES[option ? option : StatesOptions.Default];
  return (
    <FluentUIThemeConsumer
      render={(globalTheme) => (
        <Flex
          vAlign="center"
          hAlign="center"
          styles={{
            width: "100%",
            height: "100%",
          }}
        >
          <React.Suspense fallback={<></>}>
            <State theme={globalTheme.siteVariables.theme} values={values} />
          </React.Suspense>
        </Flex>
      )}
    />
  );
}

// export const states = {
//   default: {
//     title: "Primary line of text",
//     desc:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
//     image: StateOptions.Default,
//     actions: {
//       primary: {
//         label: "Primary action",
//       },
//       secondary: {
//         label: "Secondary action",
//       },
//       tertiary: {
//         label: "Secondary action",
//       },
//     },
//   },
//   welcome: {
//     title: `Welcome to {{appName}}! We’re glad you’re here.`,
//     desc: `{{appName}} is your tool to create, take, and manage polls.`,
//     image: StateOptions.Welcome,
//     actions: {
//       primary: {
//         label: "Sign In",
//       },
//       secondary: {
//         label: "Sign Up",
//       },
//       tertiary: {
//         label: "Learn more about {{appName}}",
//       },
//     },
//   },
//   welcome2: {
//     title: `Welcome to your homepage, {{userName}}`,
//     desc: `This is where you will find all of your boards that organize your photos, files, and tasks across your different teams.`,
//     image: StateOptions.Files,
//     actions: {
//       primary: {
//         label: "Create a board",
//       },
//       secondary: {
//         label: "Find an existing board",
//       },
//     },
//   },
//   empty: {
//     image: StateOptions.Empty,
//     actions: {
//       primary: {
//         label: "Creat a task",
//       },
//       secondary: {
//         label: "Find an existing task",
//       },
//     },
//   },
//   empty2: {
//     image: StateOptions.Empty,
//     title: "You don’t have any tasks yet",
//     desc:
//       "Once you are assigned a task, you can find it here. Until then, enjoy your time off.",
//   },
//   error: {
//     title: `Something went wrong.`,
//     desc: `Looks like there is a glitch in our system. You can refresh or start over if that doesn’t seem to fix the issue.`,
//     image: StateOptions.WentWrong,
//     actions: {
//       primary: {
//         label: "Refresh",
//       },
//       tertiary: {
//         label: "Start over",
//       },
//     },
//   },
//   error2: {
//     title: "No results found",
//     desc:
//       "Try refining your search by using common words and checking for spelling errors.",
//   },
//   thanks: {
//     title: "You’re awesome.",
//     desc: "You’ve just completed your weekly goal in record time.",
//     image: StateOptions.Thanks,
//     actions: {
//       primary: {
//         label: "Start the next challenge",
//       },
//       secondary: {
//         label: "Celebrate with your colleagues",
//       },
//     },
//   },
// };
