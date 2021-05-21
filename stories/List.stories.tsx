import React from "react";
import { object, boolean } from "@storybook/addon-knobs";
import { withDesign } from "storybook-addon-designs";
import { actions } from "@storybook/addon-actions";

import { List, TSortable } from "../src";
import { CommunicationOptions } from "../src";
import fakerEN from "faker/locale/en_US";
import fakerFA from "faker/locale/fa";

export default {
  title: "UI Templates/Lists",
  component: List,
  decorators: [withDesign],
};

const eventsFromNames = actions("onInteraction");

const listKnobGroupID = "List";

const fake = (template: string) => {
  return { "en-US": fakerEN.fake(template), fa: fakerFA.fake(template) };
};

const listConfig = {
  find: true,
  filters: ["c2", "c3"],
  emptySelectionActionGroups: {
    g1: {
      a1: { title: "Add", icon: "Add", subject: ["list", "add"] },
    },
  },
  columns: {
    c1: {
      title: "Member name",
      sortable: "alphabetical" as TSortable,
      icon: "ContactCard",
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
      c1: (() => {
        const name = fake("{{name.findName}}");
        return {
          before: {
            type: "avatar" as "avatar",
            ...{
              name,
              image: fakerEN.internet.avatar(),
            },
          },
          content: name,
        };
      })(),
      c2: {
        after: { type: "icon" as "icon", icon: "Location" },
        content: fake("{{address.city}}"),
      },
      c3: "Senior analyst",
      actions: {
        share: { title: "Share", icon: "ShareGeneric" },
        manage: { title: "Edit", icon: "Edit" },
      },
    },
    r1: {
      c1: (() => {
        const name = fake("{{name.findName}}");
        return {
          before: {
            type: "avatar" as "avatar",
            ...{
              name,
              image: fakerEN.internet.avatar(),
            },
          },
          content: name,
        };
      })(),
      c2: {
        after: { type: "icon" as "icon", icon: "Location" },
        content: fake("{{address.city}}"),
      },
      c3: "Security associate",
      actions: {
        share: { title: "Share", icon: "ShareGeneric" },
        manage: { title: "Edit", icon: "Edit" },
        delete: { title: "Delete", icon: "TrashCan", multi: true },
      },
    },
    r2: {
      c1: (() => {
        const name = fake("{{name.findName}}");
        return {
          before: {
            type: "avatar" as "avatar",
            ...{
              name,
              image: fakerEN.internet.avatar(),
            },
          },
          content: name,
        };
      })(),
      c2: {
        after: { type: "icon" as "icon", icon: "Location" },
        content: fake("{{address.city}}"),
      },
      c3:
        "Security engineer: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in ultricies mi. Sed aliquet odio et magna maximus, et aliquam ipsum faucibus. Sed pulvinar vel nibh eget scelerisque. Vestibulum ornare id felis ut feugiat. Ut vulputate ante non odio condimentum, eget dignissim erat tincidunt. Etiam sodales lobortis viverra. Sed gravida nisi at nisi ornare, non maximus nisi elementum.",
      actions: {
        share: { title: "Share", icon: "ShareGeneric" },
        manage: { title: "Edit", icon: "Edit" },
        delete: { title: "Delete", icon: "TrashCan", multi: true },
      },
    },
    r3: {
      c1: (() => {
        const name = fake("{{name.findName}}");
        return {
          before: {
            type: "avatar" as "avatar",
            ...{
              name,
              image: fakerEN.internet.avatar(),
            },
          },
          content: name,
        };
      })(),
      c2: {
        after: { type: "icon" as "icon", icon: "Location" },
        content: fake("{{address.city}}"),
      },
      c3: "Marketing analyst",
    },
    r5: {
      c1: (() => {
        const name = fake("{{name.findName}}");
        return {
          before: {
            type: "avatar" as "avatar",
            ...{
              name,
              image: fakerEN.internet.avatar(),
            },
          },
          content: name,
        };
      })(),
      c2: {
        after: { type: "icon" as "icon", icon: "Location" },
        content: fake("{{address.city}}"),
      },
      c3: "Senior engineer",
      actions: {
        share: { title: "Share", icon: "ShareGeneric" },
        manage: { title: "Edit", icon: "Edit" },
        delete: { title: "Delete", icon: "TrashCan", multi: true },
      },
    },
  },
};

export const KitchenSink = () => {
  return (
    <List
      truncate={boolean("Truncate", false, listKnobGroupID)}
      selectable={boolean("Selectable", true, listKnobGroupID)}
      {...object("Configuration", listConfig, listKnobGroupID)}
      {...eventsFromNames}
    />
  );
};

KitchenSink.parameters = {
  design: {
    type: "figma",
    url: "https://www.figma.com/file/EOsbapNvZgEwcA1mShswfh/?node-id=1%3A31",
  },
};

export const Empty = () => {
  return (
    <List
      {...object("Configuration", { ...listConfig, rows: {} }, listKnobGroupID)}
      {...eventsFromNames}
    />
  );
};

export const CustomEmpty = () => {
  return (
    <List
      {...object("Configuration", { ...listConfig, rows: {} }, listKnobGroupID)}
      {...object(
        "Empty state",
        {
          emptyState: {
            option: CommunicationOptions.Empty,
            fields: {
              title: fake("{{lorem.sentence}}"),
              desc: fake("{{lorem.sentences}}"),
              actions: {
                primary: {
                  label: fake("{{hacker.verb}}"),
                  target: "action_1",
                },
                secondary: {
                  label: fake("{{hacker.verb}}"),
                  target: "action_2",
                },
              },
            },
          },
        },
        listKnobGroupID
      )}
      {...eventsFromNames}
    />
  );
};
