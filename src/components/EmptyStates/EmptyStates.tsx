import React from "react";
import {
  Flex,
  FlexItem,
  Button,
  Text,
  ProviderConsumer as FluentUIThemeConsumer,
} from "@fluentui/react-northstar";
import { Illustration } from "./Illustration";

export function EmptyStates({ hello }: { hello: string }) {
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
          <StatesConteiner title={hello} />
        </Flex>
      )}
    />
  );
}

const StatesConteiner = ({
  title,
  desc,
}: {
  title?: string;
  desc?: string;
}) => (
  <Flex
    hAlign="center"
    gap="gap.large"
    column
    style={{
      width: "100%",
      maxWidth: "33.5rem",
    }}
  >
    <Illustration />
    {(title || desc) && (
      <FlexItem>
        <div>
          {title && (
            <Text
              content={title}
              size="large"
              weight="bold"
              as="h1"
              styles={{ marginTop: 0 }}
            />
          )}
          {desc && <Text content={desc} as="p" />}
        </div>
      </FlexItem>
    )}
  </Flex>
);
