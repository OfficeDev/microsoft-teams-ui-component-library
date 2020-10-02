import React, { useLayoutEffect, useRef, useState } from "react";
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

export type TTaskboardLane = {
  title: string;
};

export interface ITaskboardProps {
  users: TUsers;
  lanes: {
    [laneKey: string]: TTaskboardLane;
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

interface ITaskboardLaneProps extends ITaskboardPropsAndTranslations {
  laneKey: string;
  last: boolean;
  // todo: `children` is just for development purposes; remove for PR
  l: number;
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

const TaskboardLane = (props: ITaskboardLaneProps) => {
  const { users, lanes, tasks, t, laneKey, last, l } = props;
  const lane = lanes[laneKey];

  const [layoutState, setLayoutState] = useState<number>(0);
  const [scrollbarWidth, setScrollbarWidth] = useState<number>(16);
  const $laneContent = useRef<HTMLDivElement | null>(null);
  const laneContentWidth = useRef<number | null>(null);

  useLayoutEffect(() => {
    // [v-wishow] The lane is rendered 3 times in order to measure the scrollbar and account for
    // its width, since it varies by the user agent and input situation:
    //
    // • 0: no content is rendered, in order to measure the lane width; entire lane is transparent
    // • 1: content is rendered in order to measure the width with scrollbar; lane is still transparent
    // • 2: content with adjusted scrollbar-side margin is rendered; lane is made visible.
    //
    // There is a possibility the adjusted scrollbar-side margin will change the overflow state due
    // to wrapping text. How to handle this case is to-be-designed.

    switch (layoutState) {
      case 0:
        if ($laneContent.current)
          laneContentWidth.current = $laneContent.current!.clientWidth;
        setLayoutState(1);
        break;
      case 1:
        if ($laneContent.current && laneContentWidth.current)
          setScrollbarWidth(
            laneContentWidth.current - $laneContent.current!.clientWidth
          );
        setLayoutState(2);
        break;
    }
  });

  return (
    <Flex
      column
      key={`TaskboardLane__${laneKey}`}
      styles={{
        minWidth: "15rem",
        maxWidth: "22.5rem",
        borderRight: "1px solid transparent",
        flex: "1 0 0",
        opacity: layoutState === 2 ? 1 : 0,
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
          ...(last ? {} : separatorStyles),
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
          ...(last ? {} : separatorStyles),
        }}
      >
        <Box styles={{ height: "100%", overflowY: "auto" }} ref={$laneContent}>
          {layoutState > 0
            ? range(l * 2).map(() => (
                <Card
                  elevated
                  variables={({ colorScheme }: SiteVariablesPrepared) => ({
                    elevation: colorScheme.elevations[8],
                  })}
                  styles={{
                    margin: `0 ${((20 - scrollbarWidth) / 16).toFixed(
                      4
                    )}rem 1.25rem 1.25rem`,
                    width: "auto",
                    height: "16rem",
                  }}
                />
              ))
            : null}
        </Box>
      </Box>
    </Flex>
  );
};

const TaskboardStandalone = (props: ITaskboardPropsAndTranslations) => {
  const { users, lanes, tasks, t } = props;
  return (
    <Box styles={{ overflowX: "auto", flex: "1 0 0" }}>
      <Flex styles={{ height: "100%" }}>
        {Object.keys(lanes).map((laneKey, l, laneKeys) => {
          const last = l === laneKeys.length - 1;
          return (
            <TaskboardLane last={last} laneKey={laneKey} l={l} {...props} />
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
