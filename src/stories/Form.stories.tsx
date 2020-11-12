import React from "react";
import fakerEN from "faker/locale/en_US";
import fakerFA from "faker/locale/fa";

const fake = (template: string) => {
  return { "en-US": fakerEN.fake(template), fa: fakerFA.fake(template) };
};

import { object } from "@storybook/addon-knobs";

import Form from "../components/Form";

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
      title: (() => {
        const title = fake("{{company.bs}}");
        title["en-US"] =
          title["en-US"].charAt(0).toUpperCase() + title["en-US"].slice(1);
        return title;
      })(),
      ...(Math.random() > 0.5 && { preface: fake("{{lorem.sentence}}") }),
    },
  ],
};

export const KitchenSink = () => {
  return <Form {...object("Configuration", formConfig, formKnobGroupID)} />;
};
