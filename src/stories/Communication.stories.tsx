import React from "react";
import { withKnobs, object } from "@storybook/addon-knobs";
import { withA11y } from "@storybook/addon-a11y";
import { withDesign } from "storybook-addon-designs";

import {
  Communication,
  CommunicationOptions,
  ICommunicationImage,
  ICommunicationThemedImage,
} from "../components/Communication";
import { TeamsTheme } from "../themes";

export default {
  title: "Components/Communication",
  component: Communication,
  decorators: [withDesign],
};

const communicationKnobGroupID = "Communication";

/*
  Default
*/
const defaultConfig = { option: CommunicationOptions.Default };
export const Default = () => {
  return (
    <Communication
      {...object("Configuration", defaultConfig, communicationKnobGroupID)}
    />
  );
};

Default.parameters = {
  design: {
    type: "figma",
    url: "https://www.figma.com/file/EOsbapNvZgEwcA1mShswfh/?node-id=1%3A39",
  },
};

/*
  Welcome
*/
const welcomeConfig = { option: CommunicationOptions.Welcome };
export const Welcome = () => {
  return (
    <Communication
      {...object("Configuration", welcomeConfig, communicationKnobGroupID)}
    />
  );
};

Welcome.parameters = {
  design: {
    type: "figma",
    url: "https://www.figma.com/file/EOsbapNvZgEwcA1mShswfh/?node-id=1%3A39",
  },
};

/*
  Hello
*/
const helloConfig = { option: CommunicationOptions.Hello };
export const Hello = () => {
  return (
    <Communication
      {...object("Configuration", helloConfig, communicationKnobGroupID)}
    />
  );
};

Hello.parameters = {
  design: {
    type: "figma",
    url: "https://www.figma.com/file/EOsbapNvZgEwcA1mShswfh/?node-id=1%3A39",
  },
};

/*
  Empty
*/
const emptyConfig = { option: CommunicationOptions.Empty };
export const Empty = () => {
  return (
    <Communication
      {...object("Configuration", emptyConfig, communicationKnobGroupID)}
    />
  );
};

Empty.parameters = {
  design: {
    type: "figma",
    url: "https://www.figma.com/file/EOsbapNvZgEwcA1mShswfh/?node-id=1%3A39",
  },
};

/*
  Error
*/
const errorConfig = { option: CommunicationOptions.Error };
export const Error = () => {
  return (
    <Communication
      {...object("Configuration", errorConfig, communicationKnobGroupID)}
    />
  );
};

Error.parameters = {
  design: {
    type: "figma",
    url: "https://www.figma.com/file/EOsbapNvZgEwcA1mShswfh/?node-id=1%3A39",
  },
};

/*
  Thanks
*/
const thanksConfig = { option: CommunicationOptions.Thanks };
export const Thanks = () => {
  return (
    <Communication
      {...object("Configuration", thanksConfig, communicationKnobGroupID)}
    />
  );
};

Thanks.parameters = {
  design: {
    type: "figma",
    url: "https://www.figma.com/file/EOsbapNvZgEwcA1mShswfh/?node-id=1%3A39",
  },
};

/*
  Custom
*/
const Logo: ICommunicationImage = {
  src:
    "https://upload.wikimedia.org/wikipedia/commons/c/c9/Microsoft_Office_Teams_%282018%E2%80%93present%29.svg",
  ariaLabel: "Microsoft Teams Logo",
};

const customConfig = {
  fields: {
    title: `Getting Started with HVC Library`,
    desc: `This guide explains how to setup your HVC Library in your project. It includes information on prerequisites, installation process, and HVC component usage in your application to verify your setup.`,
    image: Logo,
    actions: {
      primary: {
        label: "Documentation",
        action: () => alert("Documentation button clicked"),
      },
      secondary: {
        label: "Samples",
        action: () => alert("Samples button clicked"),
      },
    },
  },
};
export const Custom = () => {
  return (
    <Communication
      {...object("Configuration", customConfig, communicationKnobGroupID)}
    />
  );
};

Custom.parameters = {
  design: {
    type: "figma",
    url: "https://www.figma.com/file/EOsbapNvZgEwcA1mShswfh/?node-id=1%3A39",
  },
};

/*
  Themed Image
*/
const themedImage: ICommunicationThemedImage = {
  [TeamsTheme.Default]:
    "http://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE2qVsJ.jpeg",
  [TeamsTheme.Dark]:
    "http://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE2r0Th.jpeg",
  [TeamsTheme.HighContrast]:
    "http://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE2r0Th.jpeg",
  ariaLabel: "Microsoft Logo",
};
const customThemedImageConfig = {
  fields: {
    title: `Apply images by your own way`,
    desc: `This guide explains how to setup your HVC Library in your project. It includes information on prerequisites, installation process, and HVC component usage in your application to verify your setup.`,
    themedImage,
    actions: {
      primary: {
        label: "Documentation",
        action: () => alert("Documentation button clicked"),
      },
      secondary: {
        label: "Samples",
        action: () => alert("Samples button clicked"),
      },
    },
  },
};
export const CustomImageThemeSupport = () => {
  return (
    <Communication
      {...object(
        "Configuration",
        customThemedImageConfig,
        communicationKnobGroupID
      )}
    />
  );
};

CustomImageThemeSupport.parameters = {
  design: {
    type: "figma",
    url: "https://www.figma.com/file/EOsbapNvZgEwcA1mShswfh/?node-id=1%3A39",
  },
};
