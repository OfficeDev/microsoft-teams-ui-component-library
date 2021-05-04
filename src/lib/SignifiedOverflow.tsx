import React from "react";
import { Box } from "@fluentui/react-northstar";
import CustomScrollArea from "react-perfect-scrollbar";

interface ISignifiedOverflow {
  body: JSX.Element;
  footer: JSX.Element;
  useCustomScrollbar?: boolean;
}

export const SignifiedOverflow = ({
  body,
  footer,
  useCustomScrollbar,
}: ISignifiedOverflow) => {
  const Wrapper = useCustomScrollbar ? CustomScrollArea : React.Fragment;
  return (
    <Wrapper>
      {body}
      <Box
        styles={{
          backgroundColor: "var(--surface-background)",
          height: "1px",
          position: "absolute",
          left: 0,
          right: 0,
          zIndex: 1,
        }}
      />
      <Box
        styles={{
          backgroundColor: "var(--shadow-background)",
          height: "1px",
          position: "sticky",
          bottom: "4.5rem",
        }}
      />
      <Box
        styles={{
          backgroundColor: "var(--surface-background)",
          position: "sticky",
          bottom: 0,
          height: "4.5rem",
          zIndex: 2,
        }}
      >
        {footer}
      </Box>
    </Wrapper>
  );
};
