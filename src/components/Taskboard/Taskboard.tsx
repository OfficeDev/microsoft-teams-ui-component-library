import React from "react";
import {
  Box,
  Button,
  Card,
  Flex,
  ProviderConsumer as FluentUIThemeConsumer,
  SiteVariablesPrepared,
  Text,
} from "@fluentui/react-northstar";

import range from "lodash/range";

import { AddIcon } from "@fluentui/react-icons-northstar";
import { ICSSInJSStyle } from "@fluentui/styles";

import { TaskboardTheme } from "./TaskboardTheme";

import { TUsers, TTranslations } from "../../types/types";
import { Toolbar } from "../Toolbar/Toolbar";

export interface ITaskboardProps {
  users: TUsers;
  lanes: {
    [laneKey: string]: {
      title: string;
    };
  };
  tasks: {
    lane: string;
    title: string;
    subtitle?: string;
    body?: string;
    users?: string[];
    badges?: {
      attachments?: number;
    };
  }[];
}

interface ITaskboardPropsAndTranslations extends ITaskboardProps {
  t: TTranslations;
}

const separatorStyles: ICSSInJSStyle = {
  position: "relative",
  "&::after": {
    content: '""',
    display: "block",
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    width: "1px",
  },
};

const TaskboardStandalone = (props: ITaskboardPropsAndTranslations) => {
  const { users, lanes, tasks, t } = props;
  return (
    <Box styles={{ overflowX: "auto", flex: "1 0 0" }}>
      <Flex styles={{ height: "100%" }}>
        {Object.keys(lanes).map((laneKey, l, laneKeys) => {
          const lane = lanes[laneKey];
          return (
            <Flex
              column
              key={`TaskboardLane__${laneKey}`}
              styles={{
                minWidth: "15rem",
                maxWidth: "22.5rem",
                borderRight: "1px solid transparent",
                flex: "1 0 0",
              }}
            >
              <Text
                size="large"
                weight="bold"
                content={lane.title}
                style={{
                  flex: "0 0 auto",
                  padding: ".375rem 1.25rem .75rem 1.25rem",
                }}
              />
              <Box
                variables={({ colorScheme }: SiteVariablesPrepared) => ({
                  backgroundColor: colorScheme.default.background2,
                  separatorColor: colorScheme.default.border2,
                })}
                styles={{
                  flex: "0 0 auto",
                  padding: "0 1.25rem .75rem 1.25rem",
                  ...(l === laneKeys.length - 1 ? {} : separatorStyles),
                }}
              >
                <Button
                  icon={<AddIcon outline />}
                  iconOnly
                  fluid
                  title={t["add task"]}
                  aria-label={t["add task"]}
                />
              </Box>
              <Box
                variables={({ colorScheme }: SiteVariablesPrepared) => ({
                  separatorColor: colorScheme.default.border2,
                })}
                styles={{
                  flex: "1 0 0",
                  overflow: "hidden",
                  ...(l === laneKeys.length - 1 ? {} : separatorStyles),
                }}
              >
                <Box styles={{ height: "100%", overflowY: "auto" }}>
                  {range(l * 2).map(() => (
                    // todo: account for scrollbar width; it appears there is no CSS-only solution to this problem
                    <Card
                      elevated
                      styles={{
                        margin: "0 .25rem 1.25rem 1.25rem",
                        width: "auto",
                        height: "16rem",
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </Flex>
          );
        })}
      </Flex>
    </Box>
  );
};

export const Taskboard = (props: ITaskboardProps) => {
  return (
    <FluentUIThemeConsumer
      render={(globalTheme) => {
        const t = globalTheme.siteVariables.t;
        return (
          <TaskboardTheme globalTheme={globalTheme} style={{ height: "100%" }}>
            <Flex
              column
              variables={({ colorScheme }: SiteVariablesPrepared) => ({
                backgroundColor: colorScheme.default.background2,
              })}
              styles={{ height: "100%" }}
            >
              <Toolbar
                actionGroups={{
                  g1: {
                    a1: {
                      icon: "Add",
                      title: t["add category"],
                    },
                  },
                }}
              />
              <TaskboardStandalone {...props} t={t} />
            </Flex>
          </TaskboardTheme>
        );
      }}
    />
  );
};
