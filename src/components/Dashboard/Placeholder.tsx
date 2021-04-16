import { Flex, Text } from "@fluentui/react-northstar";
import React from "react";

/**
 * @internal
 */
const Placeholder = ({ message }: { message: string }) => {
  return (
    <Flex
      vAlign="center"
      hAlign="center"
      styles={{ height: "100%", border: "1px dashed rgb(179, 176, 173)" }}
    >
      <Text size="large" weight="semibold">
        {message}
      </Text>
    </Flex>
  );
};

export { Placeholder };
