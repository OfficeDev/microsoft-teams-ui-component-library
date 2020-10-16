import React from "react";
import { Flex, FlexItem, Button, Text } from "@fluentui/react-northstar";
import { TeamsTheme } from "../../../../lib/withTheme";
import { Illustration } from "../Illustration/Illustration";
import { States } from "../../States";

interface IState {
  title?: string;
  desc?: string;
  image?: React.ReactNode;
  actions?: IStateActions;
}

interface IStateActions {
  primary?: IStateAction;
  secondary?: IStateAction;
  tertiary?: IStateAction;
}

interface IStateAction {
  label: string;
}

export const State = ({ title, desc, image, actions }: IState) => (
  <Flex
    hAlign="center"
    gap="gap.large"
    column
    style={{
      width: "100%",
      maxWidth: "33.5rem",
      margin: "3rem 1.25rem",
    }}
  >
    {image}
    {(title || desc) && (
      <FlexItem>
        <Flex hAlign="center" column>
          {title && (
            <Text
              content={title}
              size="large"
              weight="bold"
              as="h1"
              styles={{ marginTop: 0, marginBottom: ".5rem" }}
            />
          )}
          {desc && (
            <Text
              content={desc}
              as="p"
              styles={{ textAlign: "center", margin: 0 }}
            />
          )}
        </Flex>
      </FlexItem>
    )}
    {actions && (
      <FlexItem>
        <Flex
          gap="gap.small"
          column
          styles={{
            width: "100%",
            maxWidth: "17.5rem",
          }}
        >
          {actions.primary && (
            <Button
              content={actions.primary.label}
              styles={{ width: "100%" }}
              primary
            />
          )}
          {actions.secondary && (
            <Button
              content={actions.secondary.label}
              styles={{ width: "100%" }}
            />
          )}
          {actions.tertiary && (
            <Button text primary>
              <Text content={actions.tertiary.label} weight="light" />
            </Button>
          )}
        </Flex>
      </FlexItem>
    )}
  </Flex>
);
