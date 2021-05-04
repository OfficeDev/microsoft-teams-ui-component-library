import React from "react";
import { Box } from "@fluentui/react-northstar";

interface ISignifiedOverflow {
  body: JSX.Element;
  footer: JSX.Element;
}

export const SignifiedOverflow = ({ body, footer }: ISignifiedOverflow) => {
  return (
    <>
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
    </>
  );
};
