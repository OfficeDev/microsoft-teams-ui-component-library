import React from "react";
import { withKnobs, object } from "@storybook/addon-knobs";
import { Board, IBoardItem } from "../components/Board/Board";
import { withA11y } from "@storybook/addon-a11y";
import fakerEN from "faker/locale/en_US";
import fakerFA from "faker/locale/fa";
import range from "lodash/range";
import shuffle from "lodash/shuffle";

import { StorybookThemeProvider } from "../lib/withTheme";
import { TUsers } from "../types/types";

export default {
  title: "Board",
  component: Board,
  decorators: [withKnobs, withA11y],
};

const boardKnobGroupID = "Board";

const fake = (template: string) => {
  return { "en-US": fakerEN.fake(template), fa: fakerFA.fake(template) };
};

const usersRange = range(1, 25);

const users = () =>
  shuffle(usersRange.filter(() => Math.random() > 0.67).map((ui) => `u${ui}`));

export const KitchenSink = () => {
  const boardConfig = {
    // [v-wishow] todo: developer-users can define how board item data maps to card content/layout.
    users: usersRange.reduce((acc: TUsers, i) => {
      acc[`u${i}`] = {
        name: fake("{{name.findName}}"),
        ...(Math.random() > 0.33 ? { image: fakerEN.internet.avatar() } : {}),
      };
      return acc;
    }, {}),
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
    items: range(2, 6).reduce(
      (
        acc: { ii: number; items: { [itemKey: string]: IBoardItem } },
        li: number
      ) => {
        for (let lo = 0; lo < (li - 1) * 2; lo++) {
          acc.items[`t${acc.ii + lo}`] = {
            lane: `l${li}`,
            order: lo,
            title: fake(
              "{{commerce.productAdjective}} {{commerce.productMaterial}} {{commerce.product}}"
            ),
            ...(Math.random() > 0.33
              ? { subtitle: fake("{{company.catchPhrase}}") }
              : {}),
            ...(Math.random() > 0.33
              ? { body: fake("{{lorem.sentence}}") }
              : {}),
            ...(Math.random() > 0.33 ? { users: users() } : {}),
            ...(Math.random() > 0.5
              ? {
                  badges: {
                    attachments: Math.max(1, Math.floor(999 * Math.random())),
                  },
                }
              : {}),
          };
        }
        acc.ii += (li - 1) * 2;
        return acc;
      },
      { ii: 0, items: {} }
    ).items,
  };

  return (
    <StorybookThemeProvider>
      <Board {...object("Configuration", boardConfig, boardKnobGroupID)} />
    </StorybookThemeProvider>
  );
};
