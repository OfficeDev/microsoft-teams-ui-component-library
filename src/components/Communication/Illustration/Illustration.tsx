import React from "react";
import { Flex } from "@fluentui/react-northstar";

export const Illustration = ({ image }: { image: React.ReactNode }) => (
  <Flex className="illustration-container" vAlign="center" hAlign="center">
    {image}
  </Flex>
);
