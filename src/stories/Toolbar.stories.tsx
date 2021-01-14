import React from "react";
import { object } from "@storybook/addon-knobs";
import { actions } from "@storybook/addon-actions";
import { Toolbar } from "..";

export default {
  title: "Components/Toolbar",
  component: Toolbar,
};

const eventsFromNames = actions("onInteraction");

const toolbarKnobGroupID = "Toolbar";

export const KitchenSink = () => {
  const toolbarConfig = {
    actionGroups: {
      g1: {
        a1: { title: "Ginger", icon: "GalleryNew", subject: "ginger" },
        a2: { title: "Carrot", icon: "GalleryNewLarge", subject: "carrot" },
        a3: { title: "Parsnip", icon: "GalleryNew", subject: "parsnip" },
        a4: { title: "Potato", icon: "GalleryNewLarge", subject: "potato" },
        a5: { title: "Radish", icon: "GalleryNew", subject: "radish" },
        a6: { title: "Yam", icon: "GalleryNewLarge", subject: "yam" },
      },
      g2: {
        a1: { title: "Cucumber", icon: "GalleryNew", subject: "cucumber" },
        a2: { title: "Avocado", icon: "GalleryNewLarge", subject: "avocado" },
        a3: { title: "Pumpkin", icon: "GalleryNew", subject: "pumpkin" },
        a4: { title: "Squash", icon: "GalleryNewLarge", subject: "squash" },
        a5: { title: "Tomato", icon: "GalleryNew", subject: "tomato" },
        a6: {
          title: "Watermelon",
          icon: "GalleryNewLarge",
          subject: "watermelon",
        },
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
    <Toolbar
      {...object("Configuration", toolbarConfig, toolbarKnobGroupID)}
      {...eventsFromNames}
    />
  );
};

export const OnlyAFewActions = () => {
  const toolbarConfig = {
    actionGroups: {
      h1: {
        b1: { title: "Arugula", icon: "GalleryNewLarge", subject: "arugula" },
        b2: { title: "Cabbage", icon: "GalleryNew", subject: "cabbage" },
      },
    },
    filters: [],
    find: false,
  };
  return (
    <Toolbar
      {...object("Configuration", toolbarConfig, toolbarKnobGroupID)}
      {...eventsFromNames}
    />
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
    <Toolbar
      {...object("Configuration", toolbarConfig, toolbarKnobGroupID)}
      {...eventsFromNames}
    />
  );
};
