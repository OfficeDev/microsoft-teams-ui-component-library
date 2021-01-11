import React from "react";
import { object, boolean } from "@storybook/addon-knobs";
import { withDesign } from "storybook-addon-designs";

import { List, TSortable } from "..";

export default {
  title: "UI Templates/List",
  component: List,
  decorators: [withDesign],
};

const listKnobGroupID = "List";

export const KitchenSink = () => {
  const listConfig = {
    find: true,
    filters: ["c2", "c3"],
    emptySelectionActionGroups: {
      g1: {
        a1: { title: "Add", icon: "Add" },
      },
    },
    columns: {
      c1: {
        title: "Member name",
        sortable: "alphabetical" as TSortable,
      },
      c2: {
        title: "Location",
        hideable: true,
        minWidth: 100,
      },
      c3: {
        title: "Role",
        hideable: true,
        hidePriority: 1,
      },
    },
    rows: {
      r4: {
        c1: "Babak Shammas (no delete)",
        c2: "Seattle, WA",
        c3: "Senior analyst",
        actions: {
          share: { title: "Share", icon: "ShareGeneric" },
          manage: { title: "Edit", icon: "Edit" },
        },
      },
      r1: {
        c1: "Aadi Kapoor",
        c2: "Seattle, WA",
        c3: "Security associate",
        actions: {
          share: { title: "Share", icon: "ShareGeneric" },
          manage: { title: "Edit", icon: "Edit" },
          delete: { title: "Delete", icon: "TrashCan", multi: true },
        },
      },
      r2: {
        c1: "Aaron Buxton",
        c2: "Seattle, WA",
        c3:
          "Security engineer: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in ultricies mi. Sed aliquet odio et magna maximus, et aliquam ipsum faucibus. Sed pulvinar vel nibh eget scelerisque. Vestibulum ornare id felis ut feugiat. Ut vulputate ante non odio condimentum, eget dignissim erat tincidunt. Etiam sodales lobortis viverra. Sed gravida nisi at nisi ornare, non maximus nisi elementum.",
        actions: {
          share: { title: "Share", icon: "ShareGeneric" },
          manage: { title: "Edit", icon: "Edit" },
          delete: { title: "Delete", icon: "TrashCan", multi: true },
        },
      },
      r3: {
        c1: "Alvin Tao (no actions)",
        c2: "Seattle, WA",
        c3: "Marketing analyst",
      },
      r5: {
        c1: "Beth Davies",
        c2: "Seattle, WA",
        c3: "Senior engineer",
        actions: {
          share: { title: "Share", icon: "ShareGeneric" },
          manage: { title: "Edit", icon: "Edit" },
          delete: { title: "Delete", icon: "TrashCan", multi: true },
        },
      },
    },
  };
  return (
    <List
      truncate={boolean("Truncate", false, listKnobGroupID)}
      selectable={boolean("Selectable", true, listKnobGroupID)}
      {...object("Configuration", listConfig, listKnobGroupID)}
    />
  );
};

KitchenSink.parameters = {
  design: {
    type: "figma",
    url: "https://www.figma.com/file/EOsbapNvZgEwcA1mShswfh/?node-id=1%3A31",
  },
};
