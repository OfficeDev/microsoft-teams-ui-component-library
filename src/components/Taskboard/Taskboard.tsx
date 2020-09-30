import React from "react";
import {
  Box,
  Flex,
  ProviderConsumer as FluentUIThemeConsumer,
  Text,
} from "@fluentui/react-northstar";

import { TaskboardTheme } from "./TaskboardTheme";

import { TUsers } from "../../types/types";

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

export const Taskboard = (props: ITaskboardProps) => {
  const { users, lanes, tasks } = props;
  return (
    <FluentUIThemeConsumer
      render={(globalTheme) => {
        const t = globalTheme.siteVariables.t;
        return (
          <TaskboardTheme
            globalTheme={globalTheme}
            style={{
              overflowX: "auto",
            }}
          >
            <Flex style={{ background: "blue" }}>
              {Object.keys(lanes).map((laneKey) => {
                const lane = lanes[laneKey];
                return (
                  <Box
                    style={{
                      minWidth: "240px",
                      maxWidth: "360px",
                      flex: "1 0 auto",
                    }}
                  >
                    <Text content={lane.title} />
                  </Box>
                );
              })}
            </Flex>
          </TaskboardTheme>
        );
      }}
    />
  );
};
