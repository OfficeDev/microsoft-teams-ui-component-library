import React from "react";
import {
  Flex,
  ProviderConsumer as FluentUIThemeConsumer,
} from "@fluentui/react-northstar";
import { TeamsTheme } from "../../themes";
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
