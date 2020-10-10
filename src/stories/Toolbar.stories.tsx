import React from "react";
import { withKnobs, object } from "@storybook/addon-knobs";
import Toolbar from "../components/Toolbar";
import { withA11y } from "@storybook/addon-a11y";

import { StorybookThemeProvider } from "../lib/withTheme";

export default {
  title: "Components/Toolbar",
  component: Toolbar,
  decorators: [withKnobs, withA11y],
};

const toolbarKnobGroupID = "Toolbar";

export const KitchenSink = () => {
  const toolbarConfig = {
    actionGroups: {
      g1: {
        a1: { title: "Ginger", icon: "GalleryNew" },
        a2: { title: "Carrot", icon: "GalleryNewLarge" },
        a3: { title: "Parsnip", icon: "GalleryNew" },
        a4: { title: "Potato", icon: "GalleryNewLarge" },
        a5: { title: "Radish", icon: "GalleryNew" },
        a6: { title: "Yam", icon: "GalleryNewLarge" },
      },
      g2: {
        a1: { title: "Cucumber", icon: "GalleryNew" },
        a2: { title: "Avocado", icon: "GalleryNewLarge" },
        a3: { title: "Pumpkin", icon: "GalleryNew" },
        a4: { title: "Squash", icon: "GalleryNewLarge" },
        a5: { title: "Tomato", icon: "GalleryNew" },
        a6: { title: "Watermelon", icon: "GalleryNewLarge" },
      },
    },
    filters: [
      {
        id: "f1",
        title:
          "Fruits (any sweet, edible part of a plant that resembles fruit, even if it does not develop from a floral ovary)",
        items: [
          { id: "f1f1", title: "Pomes" },
          { id: "f1f2", title: "Drupes" },
          { id: "f1f3", title: "Citruses" },
          { id: "f1f4", title: "Berries" },
          { id: "f1f5", title: "Melons" },
        ],
      },
      {
        id: "f3",
        title: "Cacti",
      },
      {
        id: "f2",
        title: "Roots and tubers",
        items: [
          { id: "f2f1", title: "True roots" },
          {
            id: "f2f2",
            title: "Modified stems",
            items: [
              { id: "f2f2f1", title: "Tubers" },
              { id: "f2f3f2", title: "Corms" },
              { id: "f2f4f3", title: "Rhizomes" },
            ],
          },
        ],
      },
    ],
    find: true,
  };
  return (
    <StorybookThemeProvider>
      <Toolbar
        {...object("Configuration", toolbarConfig, toolbarKnobGroupID)}
      />
    </StorybookThemeProvider>
  );
};

export const OnlyAFewActions = () => {
  const toolbarConfig = {
    actionGroups: {
      h1: {
        b1: { title: "Arugula", icon: "GalleryNewLarge" },
        b2: { title: "Cabbage", icon: "GalleryNew" },
      },
    },
    filters: [],
    find: false,
  };
  return (
    <StorybookThemeProvider>
      <Toolbar
        {...object("Configuration", toolbarConfig, toolbarKnobGroupID)}
      />
    </StorybookThemeProvider>
  );
};

export const SingleSelectFilterAndFind = () => {
  const toolbarConfig = {
    actionGroups: {},
    filters: [
      {
        id: "i1",
        title: "Edible flowers",
        items: [
          { id: "i1i1", title: "Dianthus" },
          { id: "i1i2", title: "Mentha" },
          { id: "i1i3", title: "Passiflora" },
        ],
      },
      { id: "i2", title: "Podded vegetables" },
    ],
    filtersSingleSelect: true,
    find: true,
  };
  return (
    <StorybookThemeProvider>
      <Toolbar
        {...object("Configuration", toolbarConfig, toolbarKnobGroupID)}
      />
    </StorybookThemeProvider>
  );
};
