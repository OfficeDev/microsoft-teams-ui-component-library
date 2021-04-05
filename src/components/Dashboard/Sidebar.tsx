import React from "react";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  Flex,
  Text,
} from "@fluentui/react-northstar";
import { TTranslations } from "../../translations";

import { CloseIcon } from "@fluentui/react-icons-northstar";
import { IWidget } from "./DashboardWidget";
import { SiteVariablesPrepared } from "@fluentui/styles";

interface ISidebarProps {
  open: boolean;
  onClose: () => void;
  widgets: IWidget[];
  t: TTranslations;
}

/**
 * @internal
 */
export const Sidebar = ({ t, open, onClose, widgets }: ISidebarProps) => {
  return (
    <Dialog
      header={
        <Flex>
          <Text styles={{ flex: "1 0 0" }}>{t["edit dashboard"]}</Text>
          <Button
            text
            iconOnly
            icon={<CloseIcon />}
            title={t["close"]}
            onClick={onClose}
            styles={{ transform: "translateY(-.4rem)" }}
          />
        </Flex>
      }
      content={
        <>
          {widgets.map(({ title }: IWidget) => {
            return (
              <Checkbox
                toggle
                checked={true}
                label={title}
                labelPosition="start"
                styles={{ display: "flex" }}
                variables={{ labelFlex: "1 0 0" }}
              />
            );
          })}
        </>
      }
      onCancel={onClose}
      onConfirm={onClose}
      {...{ open }}
      variables={({ colorScheme }: SiteVariablesPrepared) => ({
        overlayBackground: "transparent",
        dialogBackground: colorScheme.default.background2,
        dialogLayoutFlexDirection: "column",
        dialogLayoutFlex: "1 0 0",
        dialogLayoutJustifyContent: "stretch",
        dialogLayoutAlignItems: "flex-end",
        dialogElevation: colorScheme.elevations[8],
      })}
      styles={{
        width: "20rem",
        display: "block",
      }}
    />
  );
};
