import React from "react";
import {
  Flex,
  ProviderConsumer as FluentUIThemeConsumer,
} from "@fluentui/react-northstar";
import { TeamsTheme } from "../../lib/withTheme";
import { ILayout } from "./Layout";

const Default = React.lazy(() => import("./CommunicationOptions/Default"));
const Empty = React.lazy(() => import("./CommunicationOptions/Empty"));
const Error = React.lazy(() => import("./CommunicationOptions/Error"));
const Hello = React.lazy(() => import("./CommunicationOptions/Hello"));
const Thanks = React.lazy(() => import("./CommunicationOptions/Thanks"));
const Welcome = React.lazy(() => import("./CommunicationOptions/Welcome"));

export enum CommunicationOptions {
  Default = "default",
  Welcome = "welcome",
  Hello = "hello",
  Empty = "empty",
  Error = "error",
  Thanks = "thanks",
}

const COMMUNICATION_COMPONENTS = {
  [CommunicationOptions.Default]: Default,
  [CommunicationOptions.Welcome]: Welcome,
  [CommunicationOptions.Hello]: Hello,
  [CommunicationOptions.Empty]: Empty,
  [CommunicationOptions.Error]: Error,
  [CommunicationOptions.Thanks]: Thanks,
};

type TCommunication =
  | { option?: CommunicationOptions; values: ILayout }
  | { option: CommunicationOptions; values?: ILayout };

export function Communication({ option, values }: TCommunication) {
  const Message: React.LazyExoticComponent<({
    theme,
    values,
  }: {
    theme: TeamsTheme;
    values?: ILayout;
  }) => JSX.Element> =
    COMMUNICATION_COMPONENTS[option ? option : CommunicationOptions.Default];
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
            <Message theme={globalTheme.siteVariables.theme} values={values} />
          </React.Suspense>
        </Flex>
      )}
    />
  );
}
