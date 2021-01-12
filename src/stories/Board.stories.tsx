import React from "react";
import { object } from "@storybook/addon-knobs";
import fakerEN from "faker/locale/en_US";
import fakerFA from "faker/locale/fa";
import range from "lodash/range";
import shuffle from "lodash/shuffle";
import { withDesign } from "storybook-addon-designs";

import { Board, IBoardItem, IBoardItemCardLayout, TUsers } from "..";

export default {
  title: "UI Templates/Task boards",
  component: Board,
  decorators: [withDesign],
};

const boardKnobGroupID = "Task boards";

const fake = (template: string) => {
  return { "en-US": fakerEN.fake(template), fa: fakerFA.fake(template) };
};

const usersRange = range(1, 25);

const users = () =>
  shuffle(usersRange.filter(() => Math.random() > 0.67).map((ui) => `u${ui}`));

export const KitchenSink = () => {
  const boardContent = {
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
            ...(Math.random() > 0.33 ? { preview: fakerEN.image.image() } : {}),
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

  const boardItemCardLayout: IBoardItemCardLayout = {
    previewPosition: "top",
    overflowPosition: "footer",
  };

  return (
    <Board
      {...object("Content", boardContent, boardKnobGroupID)}
      boardItemCardLayout={object(
        "Board item card layout",
        boardItemCardLayout,
        boardKnobGroupID
      )}
    />
  );
};

KitchenSink.parameters = {
  design: {
    type: "figma",
    url: "https://www.figma.com/file/EOsbapNvZgEwcA1mShswfh/?node-id=1%3A33",
  },
};
