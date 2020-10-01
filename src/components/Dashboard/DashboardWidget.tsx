import React, { ReactNode } from "react";
import {
  Flex,
  Card,
  Text,
  Box,
  ThemePrepared,
  SiteVariablesPrepared,
  tabListBehavior,
  Menu,
} from "@fluentui/react-northstar";
import { DashboardCallout, IWidgetActionKey } from "./DashboardCallout";

export enum WidgetSize {
  Single = "single",
  Double = "double",
  Triple = "triple",
  Box = "box",
}

export interface IWidget {
  size: WidgetSize;
  title: string;
  desc?: string;
  widgetActionGroup?: IWidgetActionKey[];
  body?: IWidgetBodyContent[];
  link?: IWidgetLink;
}

export const Widget = ({
  children,
  size,
}: {
  children: ReactNode;
  size: WidgetSize;
}) => {
  const cardStyle = {
    gridColumnEnd: "auto",
    gridRowEnd: "auto",
    "@media (max-width: 842px)": {
      gridColumnEnd: "span 3",
    },
  };
  if (size === WidgetSize.Double) {
    cardStyle.gridColumnEnd = "span 2";
  }
  if (size === WidgetSize.Box) {
    cardStyle.gridColumnEnd = "span 2";
    cardStyle.gridRowEnd = "span 2";
  }
  if (size === WidgetSize.Triple) {
    cardStyle.gridColumnEnd = "span 3";
  }
  return (
    <Card styles={cardStyle} fluid>
      {children}
    </Card>
  );
};

export const WidgetTitle = ({
  title,
  desc,
  globalTheme,
  widgetActionGroup,
}: {
  title: string;
  desc?: string;
  globalTheme: ThemePrepared;
  widgetActionGroup?: IWidgetActionKey[];
}) => {
  const [calloutOpen, setCalloutOpen] = React.useState(false);
  return (
    <Card.Header>
      <Flex gap="gap.small" space="between" style={{ minHeight: "2rem" }}>
        <Flex gap="gap.small" column>
          <Text content={title} style={{ margin: 0 }} weight="bold" />
          {desc && <Text content={desc} size="small" />}
        </Flex>
        <DashboardCallout
          open={calloutOpen}
          globalTheme={globalTheme}
          onOpenChange={({ currentTarget }, props) => {
            const open = !!props?.open;
            setCalloutOpen(open);
          }}
          menuProps={{
            offset: [0, 0],
            position: "below",
          }}
          widgetActionGroup={widgetActionGroup}
        />
      </Flex>
    </Card.Header>
  );
};

const EmptyState = ({ borderColor }: { borderColor: string }) => {
  return (
    <Box
      styles={{
        height: "100%",
        border: `1px dashed ${borderColor}`,
      }}
    />
  );
};

export interface IWidgetBodyContent {
  id: string;
  title: string;
  content: ReactNode;
}

export const WidgetBody = ({
  body,
  siteVariables,
}: {
  body?: IWidgetBodyContent[];
  siteVariables: SiteVariablesPrepared;
}) => {
  const [activeTabId, setActiveTabId] = React.useState(0);
  return (
    <Card.Body
      style={{
        marginBottom: "0.75rem",
        height: "100%",
        overflow: "hidden",
      }}
      fitted
    >
      {body ? (
        <>
          {body.length > 1 && (
            <Menu
              style={{
                border: "none",
                background: "none",
                marginBottom: "1.25rem",
              }}
              items={Array.from(body, ({ id, title }) =>
                Object.assign({ key: id, content: title })
              )}
              activeIndex={activeTabId}
              onItemClick={({ currentTarget }, props) =>
                setActiveTabId(props && props.index ? props.index : 0)
              }
              accessibility={tabListBehavior}
              underlined
              primary
            />
          )}
          {body.map(({ id, content }, i) => (
            <Flex
              key={id}
              styles={{
                height: "100%",
                display: activeTabId === i ? "flex" : "none",
              }}
              column
            >
              {content}
            </Flex>
          ))}
        </>
      ) : (
        <EmptyState borderColor={siteVariables.colors.grey["300"]} />
      )}
    </Card.Body>
  );
};

export interface IWidgetLink {
  href: string;
}

export const WidgetFooter = ({ link }: { link: IWidgetLink }) => (
  <Card.Footer fitted>
    <Flex space="between" vAlign="center">
      <Text
        as="a"
        href={link.href}
        target="_blank"
        content="View more"
        size="small"
        color="brand"
        style={{ textDecoration: "none" }}
      />
    </Flex>
  </Card.Footer>
);
