import React from "react";
import { Flex } from "@fluentui/react-northstar";

export const Illustration = ({ option }: { option: React.ReactNode }) => (
  <Flex
    styles={{
      width: "100%",
      maxWidth: "20rem",
      height: "12.5rem",
      maxHeight: "12.5rem",
    }}
    vAlign="center"
    hAlign="center"
  >
    {React.cloneElement(option as any, {
      style: { width: "100%", height: "100%" },
    })}
  </Flex>
);
