import React from "react";
import { object } from "@storybook/addon-knobs";

import States, { StatesOptions } from "../components/States";

export default {
  title: "Components/States",
  component: States,
};

const statesKnobGroupID = "States";

/*
  Default
*/
const defaultConfig = { option: StatesOptions.Default };
export const Default = () => {
  return (
    <States {...object("Configuration", defaultConfig, statesKnobGroupID)} />
  );
};

/*
  Welcome
*/
const welcomeConfig = { option: StatesOptions.Welcome };
export const Welcome = () => {
  return (
    <States {...object("Configuration", welcomeConfig, statesKnobGroupID)} />
  );
};

/*
  Hello
*/
const helloConfig = { option: StatesOptions.Hello };
export const Hello = () => {
  return (
    <States {...object("Configuration", helloConfig, statesKnobGroupID)} />
  );
};

/*
  Empty
*/
const emptyConfig = { option: StatesOptions.Empty };
export const Empty = () => {
  return (
    <States {...object("Configuration", emptyConfig, statesKnobGroupID)} />
  );
};

/*
  Error
*/
const errorConfig = { option: StatesOptions.Error };
export const Error = () => {
  return (
    <States {...object("Configuration", errorConfig, statesKnobGroupID)} />
  );
};

/*
  Thanks
*/
const thanksConfig = { option: StatesOptions.Thanks };
export const Thanks = () => {
  return (
    <States {...object("Configuration", thanksConfig, statesKnobGroupID)} />
  );
};

/*
  Custom
*/
const Logo = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2228.8 2073.3">
    <defs>
      <path
        id="reuse-0"
        d="M1192.2 561.4v111.4c-17.5-1.2-34.9-4-51.9-8.3a337 337 0 01-233.2-198h190.2a95.2 95.2 0 0194.9 94.9z"
        opacity=".2"
      />
    </defs>
    <path
      fill="#5059C9"
      d="M1554.6 777.5h575.8c54.3 0 98.4 44 98.4 98.5v524.4a362 362 0 01-362 362h-1.6a362 362 0 01-362-362V829c0-28.5 23-51.5 51.4-51.5z"
    />
    <circle cx="1943.8" cy="440.6" r="233.3" fill="#5059C9" />
    <circle cx="1218.1" cy="336.9" r="336.9" fill="#7B83EB" />
    <path
      fill="#7B83EB"
      d="M1667.3 777.5H717a97.4 97.4 0 00-95 99.7v598a584.6 584.6 0 00570.2 598.1 584.6 584.6 0 00570.1-598V877.2a97.4 97.4 0 00-95-99.7z"
    />
    <path
      d="M1244 777.5v838.1a95.4 95.4 0 01-94.9 94.9H667.6a631.3 631.3 0 01-45.6-235.3V877a97.3 97.3 0 0194.9-99.5H1244z"
      opacity=".1"
    />
    <path
      d="M1192.2 777.5v890a95.4 95.4 0 01-94.9 94.9H692a672 672 0 01-24.4-51.9 631.3 631.3 0 01-45.6-235.3V877a97.3 97.3 0 0194.9-99.5h475.3z"
      opacity=".2"
    />
    <path
      d="M1192.2 777.5v786.3a95.6 95.6 0 01-94.9 94.9H649.5a631.3 631.3 0 01-27.5-183.5V877a97.3 97.3 0 0194.9-99.5h475.3z"
      opacity=".2"
    />
    <path
      d="M1140.3 777.5v786.3a95.6 95.6 0 01-94.8 94.9h-396a631.3 631.3 0 01-27.5-183.5V877a97.3 97.3 0 0194.9-99.5h423.4z"
      opacity=".2"
    />
    <path
      d="M1244 509.5v163.3c-8.8.5-17.1 1-26 1-8.7 0-17-.5-25.8-1-17.5-1.2-34.9-4-51.9-8.3a337 337 0 01-233.2-198 288 288 0 01-16.6-51.8h258.6a95.2 95.2 0 0194.9 94.8z"
      opacity=".1"
    />
    <use opacity=".2" xlinkHref="#reuse-0" />
    <use opacity=".2" xlinkHref="#reuse-0" />
    <path
      d="M1140.3 561.4v103.1a337 337 0 01-233.2-198h138.4a95.2 95.2 0 0194.8 94.9z"
      opacity=".2"
    />
    <linearGradient
      id="a"
      x1="198.1"
      x2="942.2"
      y1="1683.1"
      y2="394.3"
      gradientTransform="matrix(1 0 0 -1 0 2075.3)"
      gradientUnits="userSpaceOnUse"
    >
      <stop offset="0" stop-color="#5a62c3" />
      <stop offset=".5" stop-color="#4d55bd" />
      <stop offset="1" stop-color="#3940ab" />
    </linearGradient>
    <path
      fill="url(#a)"
      d="M95 466.5h950.3a95 95 0 0195 95v950.3a95 95 0 01-95 95H95a95 95 0 01-95-95V561.5a95 95 0 0195-95z"
    />
    <path
      fill="#FFF"
      d="M820.2 828.2h-190v517.3h-121V828.2h-189V727.8h500v100.4z"
    />
  </svg>
);
const customConfig = {
  values: {
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
    <States {...object("Configuration", customConfig, statesKnobGroupID)} />
  );
};
