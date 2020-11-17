import React from "react";
import { Flex, FlexItem, Button, Text } from "@fluentui/react-northstar";
import { Illustration } from "../Illustration";

export interface ILayout {
  title?: string;
  desc?: string;
  image?: React.ReactNode;
  actions?: ILayoutActions;
}

export interface ILayoutActions {
  primary?: ILayoutAction;
  secondary?: ILayoutAction;
  tertiary?: ILayoutAction;
}

export interface ILayoutAction {
  label: string;
  action: () => void;
}

export const Layout = ({ title, desc, image, actions }: ILayout) => (
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
    {image && <Illustration image={image} />}
    {(title || desc) && (
      <FlexItem>
        <Flex hAlign="center" column>
          {title && (
            <Text
              content={title}
              size="large"
              align="center"
              weight="bold"
              as="h1"
              styles={{ marginTop: 0, marginBottom: ".5rem" }}
            />
          )}
          {desc && (
            <Text
              content={desc}
              align="center"
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
              onClick={actions.primary.action}
              aria-label={actions.primary.label}
              styles={{ width: "100%" }}
              primary
            />
          )}
          {actions.secondary && (
            <Button
              content={actions.secondary.label}
              onClick={actions.secondary.action}
              aria-label={actions.secondary.label}
              styles={{ width: "100%" }}
            />
          )}
          {actions.tertiary && (
            <Button text primary>
              <Text
                content={actions.tertiary.label}
                onClick={actions.tertiary.action}
                weight="light"
              />
            </Button>
          )}
        </Flex>
      </FlexItem>
    )}
  </Flex>
);
