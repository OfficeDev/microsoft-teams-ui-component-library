import React, { useState } from "react";
import get from "lodash/get";
import set from "lodash/set";
import produce from "immer";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  Flex,
  Input,
  Text,
} from "@fluentui/react-northstar";
import { TTranslations } from "../../translations";

import { CloseIcon, SearchIcon } from "@fluentui/react-icons-northstar";
import { IWidget } from "./DashboardWidget";
import { IDashboardPreferences } from "./Dashboard";
import { Surface, DialogVariant } from "../../types/types";

interface ISidebarProps {
  open: boolean;
  onClose: () => void;
  widgets: IWidget[];
  t: TTranslations;
  preferencesState: IDashboardPreferences;
  updatePreferences: (preferences: IDashboardPreferences) => void;
}

const matchesFind = (findQuery: string, title: string) => {
  return (
    findQuery.length < 3 ||
    title.toLowerCase().includes(findQuery.toLowerCase())
  );
};

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
  const [findQuery, setFindQuery] = useState<string>("");

  return (
    <Dialog
      trapFocus
      header={
        <Flex>
          <Text styles={{ flex: "1 0 0", marginTop: ".25rem" }}>
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
          <Text as="p" styles={{ marginBottom: "2.5rem" }}>
            {t["edit dashboard coaching"]}
          </Text>
          <Input
            clearable
            fluid
            placeholder={t["find"]}
            aria-label={t["find"]}
            value={findQuery}
            icon={<SearchIcon outline />}
            onChange={(e, inputProps) => {
              setFindQuery(get(inputProps, "value", ""));
            }}
            variables={{ surface: Surface.base }}
            styles={{ marginBottom: "2.5rem" }}
          />
          <Box styles={{ marginBottom: "2.5rem" }}>
            {widgets.map(({ id, title }: IWidget) => {
              return (
                matchesFind(findQuery, title) && (
                  <Checkbox
                    toggle
                    key={`widgetDisplayToggle-${id}`}
                    checked={get(
                      preferencesState,
                      `widgetSettings.${id}.display`
                    )}
                    label={title}
                    labelPosition="start"
                    styles={{
                      display: "flex",
                      margin: ".5rem 0",
                      paddingLeft: 0,
                      paddingRight: 0,
                    }}
                    variables={{ labelFlex: "1 0 0" }}
                    onChange={(_e, props) => {
                      updatePreferences(
                        produce(preferencesState, (draft) => {
                          set(
                            draft,
                            `widgetSettings.${id}.display`,
                            !!props?.checked
                          );
                        })
                      );
                    }}
                  />
                )
              );
            })}
          </Box>
        </>
      }
      onCancel={onClose}
      onConfirm={onClose}
      confirmButton={t["ok"]}
      {...{ open }}
      variables={{ variant: DialogVariant.sidebar }}
      styles={{
        width: "20rem",
        display: "block",
      }}
    />
  );
};
