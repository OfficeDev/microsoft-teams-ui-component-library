import React from "react";
import {
  Flex,
  mergeThemes,
  ProviderConsumer as FluentUIThemeConsumer,
  Provider as FluentUIThemeProvider,
} from "@fluentui/react-northstar";
import { TeamsTheme } from "../../themes";
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
  | { option?: CommunicationOptions; fields: ILayout }
  | { option: CommunicationOptions; fields?: ILayout };

export function Communication({ option, fields }: TCommunication) {
  const Message: React.LazyExoticComponent<({
    theme,
    fields,
  }: {
    theme: TeamsTheme;
    fields?: ILayout;
  }) => JSX.Element> =
    COMMUNICATION_COMPONENTS[option ? option : CommunicationOptions.Default];
  return (
    <FluentUIThemeConsumer
      render={(globalTheme) => {
        const theme = mergeThemes(globalTheme, {
          staticStyles: [
            `.illustration-container {
  width: 100%;
  max-width: 20rem;
  height: 12.5rem;
  max-height: 12.5rem;
}`,
            `.illustration-container svg {
  width: 100%;
  height: 100%;
}`,
          ],
        });
        return (
          <FluentUIThemeProvider theme={theme}>
            <Flex
              vAlign="center"
              hAlign="center"
              styles={{
                width: "100%",
                height: "100%",
              }}
            >
              <React.Suspense fallback={<></>}>
                <Message
                  theme={globalTheme.siteVariables.theme}
                  fields={fields}
                />
              </React.Suspense>
            </Flex>
          </FluentUIThemeProvider>
        );
      }}
    />
  );
}
