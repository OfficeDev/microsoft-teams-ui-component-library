import React from "react";
import { Flex } from "@fluentui/react-northstar";
import "./illustration.css";

export const Illustration = ({ option }: { option: React.ReactNode }) => (
  <Flex
    className="illustration-container"
    styles={{
      width: "100%",
      maxWidth: "20rem",
      height: "12.5rem",
      maxHeight: "12.5rem",
    }}
    vAlign="center"
    hAlign="center"
  >
    {option}
  </Flex>
);
