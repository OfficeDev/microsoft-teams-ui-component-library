import React from "react";
import { object } from "@storybook/addon-knobs";
import fakerEN from "faker/locale/en_US";
import fakerFA from "faker/locale/fa";

import { Wizard } from "../src";
import range from "lodash/range";
import { TInputWidth } from "../src/components/Form/Form";
import uniqueId from "lodash/uniqueId";

const fake = (template: string) => {
  return { "en-US": fakerEN.fake(template), fa: fakerFA.fake(template) };
};

export default {
  title: "UI Templates/Wizard",
  component: Wizard,
};

const wizardKnobGroupID = "Wizard";
const kitchenSinkConfig = {
  stepTitles: range(8).map((_) => fake("{{commerce.product}}")),
  activeStepIndex: 2,
  activeStep: {
    submit: {
      en: "Next",
      fa: "بعد",
    },
    back: {
      en: "Back",
      fa: "قبلی",
    },
    cancel: {
      en: "Cancel",
      fa: "لغو",
    },
    headerSection: {
      title: fake("{{company.catchPhrase}}"),
      preface: fake("{{lorem.sentences}}"),
    },
    sections: [
      {
        title: fake("{{company.catchPhrase}}"),
        preface: fake("{{lorem.sentence}}"),
        inputGroups: [
          {
            type: "text-inputs" as "text-inputs",
            fields: range(2).map((_) => ({
              type: "text" as "text",
              title: fake("{{commerce.productAdjective}} {{commerce.product}}"),
              width: "split" as TInputWidth,
              inputId: uniqueId("f"),
              placeholder: fake("{{commerce.productMaterial}}"),
            })),
          },
          {
            type: "text-inputs" as "text-inputs",
            fields: [
              {
                type: "dropdown" as "dropdown",
                title: fake(
                  "{{commerce.productAdjective}} {{commerce.product}}"
                ),
                width: "split" as TInputWidth,
                inputId: uniqueId("f"),
                multiple: false,
                options: range(2 + Math.random() * 5).map(() => ({
                  title: fake("{{commerce.productMaterial}}"),
                  value: uniqueId("option__"),
                })),
              },
              {
                type: "text" as "text",
                title: fake("{{commerce.product}}"),
                width: "split" as TInputWidth,
                inputId: uniqueId("f"),
                ...(Math.random() > 0.5
                  ? { placeholder: fake("{{commerce.productMaterial}}") }
                  : {}),
              },
              {
                type: "text" as "text",
                title: fake(
                  "{{commerce.productAdjective}} {{commerce.product}}"
                ),
                width: "split" as TInputWidth,
                inputId: uniqueId("f"),
                ...(Math.random() > 0.5
                  ? { placeholder: fake("{{commerce.productMaterial}}") }
                  : {}),
              },
            ],
          },
          {
            type: "checkboxes" as "checkboxes",
            title: fake("{{commerce.productAdjective}} {{commerce.product}}"),
            inputId: uniqueId("f"),
            options: range(2 + Math.random() * 5).map(() => ({
              title: fake("{{commerce.productMaterial}}"),
              value: uniqueId("option__"),
            })),
          },
          {
            type: "text-inputs" as "text-inputs",
            fields: range(1).map((_) => ({
              type: "text" as "text",
              title: fake("{{commerce.productAdjective}} {{commerce.product}}"),
              width: "full" as TInputWidth,
              inputId: uniqueId("f"),
              ...(Math.random() > 0.5
                ? { placeholder: fake("{{commerce.productMaterial}}") }
                : {}),
            })),
          },
          {
            type: "radio-buttons" as "radio-buttons",
            title: fake("{{commerce.productAdjective}} {{commerce.product}}"),
            inputId: uniqueId("f"),
            options: range(2 + Math.random() * 5).map(() => ({
              title: fake("{{commerce.productMaterial}}"),
              value: uniqueId("option__"),
            })),
          },
          {
            type: "dropdown" as "dropdown",
            title: fake("{{commerce.productAdjective}} {{commerce.product}}"),
            inputId: uniqueId("f"),
            multiple: true,
            options: range(2 + Math.random() * 5).map(() => ({
              title: fake("{{commerce.productMaterial}}"),
              value: uniqueId("option__"),
            })),
          },
        ],
      },
    ],
  },
};

export const KitchenSink = () => {
  return (
    <Wizard
      {...object("Configuration", kitchenSinkConfig, wizardKnobGroupID)}
    />
  );
};

KitchenSink.parameters = {
  design: {
    type: "figma",
    url:
      "https://www.figma.com/file/EOsbapNvZgEwcA1mShswfh/Microsoft-Teams-UI-Kit-Community?node-id=388%3A8",
  },
};
