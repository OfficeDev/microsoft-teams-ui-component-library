import React from "react";
import { withKnobs, object } from "@storybook/addon-knobs";
import { Taskboard, ITaskboardTask } from "../components/Taskboard/Taskboard";
import { withA11y } from "@storybook/addon-a11y";
import fakerEN from "faker/locale/en_US";
import fakerFA from "faker/locale/fa";
import range from "lodash/range";

import { StorybookThemeProvider } from "../lib/withTheme";

export default {
  title: "Taskboard",
  component: Taskboard,
  decorators: [withKnobs, withA11y],
};

const taskboardKnobGroupID = "Taskboard";

const fake = (template: string) => {
  return { "en-US": fakerEN.fake(template), fa: fakerFA.fake(template) };
};

export const KitchenSink = () => {
  const taskboardConfig = {
    users: {
      u1: {
        image: fakerEN.internet.avatar(),
        name: fake("{{name.findName}}"),
      },
      u2: {
        image: fakerEN.internet.avatar(),
        name: fake("{{name.findName}}"),
      },
      u3: {
        image: fakerEN.internet.avatar(),
        name: fake("{{name.findName}}"),
      },
    },
    lanes: {
      l1: {
        title: fake("{{commerce.department}}"),
      },
      l2: {
        title: fake("{{commerce.department}}"),
      },
      l3: {
        title: fake("{{commerce.department}}"),
      },
      l4: {
        title: fake("{{commerce.department}}"),
      },
      l5: {
        title: fake("{{commerce.department}}"),
      },
    },
    tasks: range(2, 6).reduce(
      (
        acc: { ti: number; tasks: { [taskKey: string]: ITaskboardTask } },
        li: number
      ) => {
        for (let lo = 0; lo < (li - 1) * 2; lo++) {
          acc.tasks[`t${acc.ti + lo}`] = {
            lane: `l${li}`,
            order: lo,
            title: fake(
              "{{commerce.productAdjective}} {{commerce.productMaterial}} {{commerce.product}}"
            ),
            subtitle: fake("{{company.catchPhrase}}"),
            body: fake("{{lorem.sentence}}"),
            users: ["u1", "u2", "u3"],
            badges: {
              attachments: 4,
            },
          };
        }
        acc.ti += (li - 1) * 2;
        return acc;
      },
      { ti: 0, tasks: {} }
    ).tasks,
  };

  return (
    <StorybookThemeProvider>
      <Taskboard
        {...object("Configuration", taskboardConfig, taskboardKnobGroupID)}
      />
    </StorybookThemeProvider>
  );
};
