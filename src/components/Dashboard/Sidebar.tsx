import React from "react";
import get from "lodash/get";
import set from "lodash/set";
import {
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
import { IDashboardPreferences } from "./Dashboard";

interface ISidebarProps {
  open: boolean;
  onClose: () => void;
  widgets: IWidget[];
  t: TTranslations;
  preferencesState: IDashboardPreferences;
  updatePreferences: (preferences: IDashboardPreferences) => void;
}

/**
 * @internal
 */
export const Sidebar = ({
  t,
  open,
  onClose,
  widgets,
  preferencesState,
  updatePreferences,
}: ISidebarProps) => {
  return (
    <Dialog
      trapFocus
      header={
        <Flex>
          <Text styles={{ flex: "1 0 0", marginTop: ".5rem" }}>
            {t["edit dashboard"]}
          </Text>
          <Button
            text
            iconOnly
            icon={<CloseIcon />}
            title={t["close"]}
            onClick={onClose}
          />
        </Flex>
      }
      content={
        <>
          {widgets.map(({ id, title }: IWidget) => {
            return (
              <Checkbox
                toggle
                key={`widgetDisplayToggle-${id}`}
                checked={get(preferencesState, `widgetSettings.${id}.display`)}
                label={title}
                labelPosition="start"
                styles={{ display: "flex", margin: ".5rem 0" }}
                variables={{ labelFlex: "1 0 0" }}
                onChange={(_e, props) => {
                  updatePreferences(
                    set(
                      preferencesState,
                      `widgetSettings.${id}.display`,
                      !!props?.checked
                    )
                  );
                }}
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
