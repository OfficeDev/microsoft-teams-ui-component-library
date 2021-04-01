import React from "react";
import { Dialog } from "@fluentui/react-northstar";
import { TTranslations } from "../../translations";

interface ISidebarProps {
  open: boolean;
  onClose: () => void;
  t: TTranslations;
}

/**
 * @internal
 */
export const Sidebar = ({ t, open, onClose }: ISidebarProps) => {
  return (
    <Dialog
      content={"hello"}
      onCancel={onClose}
      onConfirm={onClose}
      {...{ open }}
    />
  );
};
