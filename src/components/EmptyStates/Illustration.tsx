import React from "react";
import { Flex } from "@fluentui/react-northstar";
import { StateOptions } from "./EmptyStates";
import "./illustration.css";

const Default = React.lazy(() => import("./Illustrations/Default"));
const Empty = React.lazy(() => import("./Illustrations/Empty"));
const Error = React.lazy(() => import("./Illustrations/Error"));
const Files = React.lazy(() => import("./Illustrations/Files"));
const Thanks = React.lazy(() => import("./Illustrations/Thanks"));
const Welcome = React.lazy(() => import("./Illustrations/Welcome"));
const WentWrong = React.lazy(() => import("./Illustrations/WentWrong"));

const IMAGES = {
  default: Default,
  error: Error,
  thanks: Thanks,
  empty: Empty,
  welcome: Welcome,
  wentWrong: WentWrong,
  files: Files,
};

export const Illustration = ({ option }: { option: StateOptions }) => {
  let Image = IMAGES[option];
  if (!Image) {
    Image = IMAGES.default;
  }
  return (
    <Flex className="illustration-container" vAlign="center" hAlign="center">
      <React.Suspense fallback={<></>}>
        <Image />
      </React.Suspense>
    </Flex>
  );
};
