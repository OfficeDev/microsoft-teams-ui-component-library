import React from "react";
import { Dialog } from "@fluentui/react-northstar";
import { TTranslations } from "../../translations";

import { CloseIcon } from "@fluentui/react-icons-northstar";

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
      header={t["edit dashboard"]}
      headerAction={{
        icon: <CloseIcon />,
        title: t["close"],
        onClick: onClose,
      }}
      content={<></>}
      onCancel={onClose}
      onConfirm={onClose}
      {...{ open }}
    />
  );
};
