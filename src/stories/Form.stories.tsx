import React from "react";
import range from "lodash/range";
import uniqueId from "lodash/uniqueId";
import fakerEN from "faker/locale/en_US";
import fakerFA from "faker/locale/fa";

const fake = (template: string) => {
  return { "en-US": fakerEN.fake(template), fa: fakerFA.fake(template) };
};

import { object } from "@storybook/addon-knobs";

import { Form, TInputWidth, TField } from "../components/Form/Form";

export default {
  title: "Composites/Form",
  component: Form,
};

const formKnobGroupID = "Form";

const formConfig = {
  submit: {
    en: "Okay",
    fa: "تایید",
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
            inputId: uniqueId(),
            placeholder: fake("{{commerce.productMaterial}}"),
          })),
        },
        {
          type: "text-inputs" as "text-inputs",
          fields: [
            {
              type: "dropdown" as "dropdown",
              title: fake("{{commerce.productAdjective}} {{commerce.product}}"),
              width: "split" as TInputWidth,
              inputId: uniqueId(),
              multiple: false,
              options: range(4).map(() => ({
                title: fake("{{commerce.productMaterial}}"),
                value: uniqueId("option__"),
              })),
            },
            {
              type: "text" as "text",
              title: fake("{{commerce.product}}"),
              width: "split" as TInputWidth,
              inputId: uniqueId(),
              ...(Math.random() > 0.5
                ? { placeholder: fake("{{commerce.productMaterial}}") }
                : {}),
            },
            {
              type: "text" as "text",
              title: fake("{{commerce.productAdjective}} {{commerce.product}}"),
              width: "split" as TInputWidth,
              inputId: uniqueId(),
              ...(Math.random() > 0.5
                ? { placeholder: fake("{{commerce.productMaterial}}") }
                : {}),
            },
          ],
        },
        {
          type: "text-inputs" as "text-inputs",
          fields: range(1).map((_) => ({
            type: "text" as "text",
            title: fake("{{commerce.productAdjective}} {{commerce.product}}"),
            width: "full" as TInputWidth,
            inputId: uniqueId(),
            ...(Math.random() > 0.5
              ? { placeholder: fake("{{commerce.productMaterial}}") }
              : {}),
          })),
        },
      ],
    },
  ],
};

export const KitchenSink = () => {
  return <Form {...object("Configuration", formConfig, formKnobGroupID)} />;
};
