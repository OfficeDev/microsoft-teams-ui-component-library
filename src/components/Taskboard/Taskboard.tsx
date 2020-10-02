import React from "react";
import {
  Box,
  Flex,
  ProviderConsumer as FluentUIThemeConsumer,
  SiteVariablesPrepared,
  Text,
} from "@fluentui/react-northstar";

import { TaskboardTheme } from "./TaskboardTheme";

import { TUsers } from "../../types/types";
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

const TaskboardStandalone = (props: ITaskboardProps) => {
  const { users, lanes, tasks } = props;
  return (
    <Box styles={{ overflowX: "auto", flex: "1 0 0" }}>
      <Flex>
        {Object.keys(lanes).map((laneKey) => {
          const lane = lanes[laneKey];
          return (
            <Box
              key={`TaskboardLane__${laneKey}`}
              styles={{
                minWidth: "15rem",
                maxWidth: "22.5rem",
                padding: "1.25rem",
                flex: "1 0 0",
              }}
            >
              <Text size="large" weight="bold" content={lane.title} />
            </Box>
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
              <TaskboardStandalone {...props} />
            </Flex>
          </TaskboardTheme>
        );
      }}
    />
  );
};
