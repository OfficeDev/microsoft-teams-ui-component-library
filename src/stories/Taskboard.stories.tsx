import React from "react";
import { withKnobs, object } from "@storybook/addon-knobs";
import Taskboard from "../components/Taskboard";
import { withA11y } from "@storybook/addon-a11y";

import { StorybookThemeProvider } from "../lib/withTheme";

export default {
  title: "Taskboard",
  component: Taskboard,
  decorators: [withKnobs, withA11y],
};

const taskboardKnobGroupID = "Taskboard";

export const KitchenSink = () => {
  const taskboardConfig = {
    users: {
      u1: {
        image:
          "https://images.unsplash.com/photo-1557274426-7a739b45d09a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=64&h=64&q=80",
        name: "Braidy Cruz",
      },
      u2: {
        image:
          "https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=64&h=64&q=80",
        name: "Oyibo Dor",
      },
      u3: {
        image:
          "https://images.unsplash.com/photo-1482532683166-0075236133bd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=64&h=64&q=80",
        name: "Andile Georgie",
      },
    },
    lanes: {
      l1: {
        title: "To do",
      },
      l2: {
        title: "Designing",
      },
      l3: {
        title: "Developing",
      },
      l4: {
        title: "QA",
      },
      l5: {
        title: "Done",
      },
    },
    tasks: [
      {
        lane: "l1",
        title: "Taskboard",
        subtitle: "HVC v1",
        body:
          "Duis aute irure dolor in reprehenderit in volupt velit esse cillum dolore eu fugiat nulla.",
        users: ["u1", "u2", "u3"],
        badges: {
          attachments: 4,
        },
      },
    ],
  };

  return (
    <StorybookThemeProvider>
      <Taskboard
        {...object("Configuration", taskboardConfig, taskboardKnobGroupID)}
      />
    </StorybookThemeProvider>
  );
};
