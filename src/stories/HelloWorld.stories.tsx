import React from "react";
import { withKnobs, text } from "@storybook/addon-knobs";
import { HelloWorld } from "../components/HelloWorld";
import { withA11y } from "@storybook/addon-a11y";

export default {
  title: "Examples/HelloWorld",
  component: HelloWorld,
  decorators: [withKnobs, withA11y],
};

export const HelloWorldStory = () => (
  <HelloWorld name={text("Name", "Human")} />
);
