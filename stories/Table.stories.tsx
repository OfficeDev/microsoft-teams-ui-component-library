import React from "react";
import { object, boolean } from "@storybook/addon-knobs";
import { actions } from "@storybook/addon-actions";

import { EButtonVariants, Table, TSortable, ICellButtonContent } from "../src";

export default {
  title: "Components/Table",
  component: Table,
};

const eventsFromNames = actions("onInteraction");

const tableKnobGroupID = "Table";

export const KitchenSink = () => {
  const tableConfig = {
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
      c4: {
        title: "",
        hideable: false,
        hidePriority: 1,
      },
    },
    rows: {
      r4: {
        c1: "Babak Shammas (no delete)",
        c2: "Seattle, WA",
        c3: "Senior analyst",
        c4: {
          type: "button",
          actionId: "open",
          content: "Open",
          icon: "ArrowRight",
          iconPosition: "after",
          variant: EButtonVariants.primary,
        } as ICellButtonContent,
        actions: {
          share: { title: "Share", icon: "ShareGeneric" },
          manage: { title: "Edit", icon: "Edit" },
        },
      },
      r1: {
        c1: "Aadi Kapoor",
        c2: "Seattle, WA",
        c3: "Security associate",
        c4: {
          type: "button",
          actionId: "open",
          content: "Open",
          icon: "ArrowRight",
          iconPosition: "after",
        } as ICellButtonContent,
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
        c4: {
          type: "button",
          actionId: "open",
          content: "Open",
          icon: "ArrowRight",
          iconPosition: "after",
          variant: EButtonVariants.tinted,
        } as ICellButtonContent,
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
        c4: {
          type: "button",
          actionId: "open",
          content: "Open",
          variant: EButtonVariants.text,
        } as ICellButtonContent,
      },
      r5: {
        c1: "Beth Davies",
        c2: "Seattle, WA",
        c3: "Senior engineer",
        c4: {
          type: "button",
          actionId: "open",
          content: "Open",
          icon: "ArrowRight",
          iconPosition: "after",
          variant: EButtonVariants.text,
          iconOnly: true,
        } as ICellButtonContent,
        actions: {
          share: { title: "Share", icon: "ShareGeneric" },
          manage: { title: "Edit", icon: "Edit" },
          delete: { title: "Delete", icon: "TrashCan", multi: true },
        },
      },
    },
  };
  return (
    <Table
      truncate={boolean("Truncate", false, tableKnobGroupID)}
      selectable={boolean("Selectable", false, tableKnobGroupID)}
      {...object("Configuration", tableConfig, tableKnobGroupID)}
      {...eventsFromNames}
    />
  );
};
