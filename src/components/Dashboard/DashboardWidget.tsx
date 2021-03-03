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
import { DashboardCallout, IWidgetAction } from "./DashboardCallout";

/**
 * The widget’s size relative to other widgets.
 */
export enum WidgetSize {
  /**
   * The widget will occupy 1×1 grid cells.
   */
  Single = "single",
  /**
   * The widget will occupy 2×1 grid cells.
   */
  Double = "double",
  /**
   * The widget will occupy 3×1 grid cells.
   */
  Triple = "triple",
  /**
   * The widget will occupy 2×2 grid cells.
   */
  Box = "box",
}

/**
 * A Dashboard widget is rendered as a card of a certain size, containing the content specified.
 */
export interface IWidget {
  size: WidgetSize;
  /**
   * The title of the widget, rendered in a header style.
   */
  title: string;
  /**
   * Text rendered in boxy test style below the title.
   */
  desc?: string;
  /**
   * A collection of actions available in the widget’s overflow menu.
   */
  widgetActionGroup?: IWidgetAction[];
  /**
   * The content to make available in the widget.
   */
  body?: IWidgetBodyContent[];
  /**
   * A link to render at the end of the widget’s content.
   */
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
  widgetActionGroup?: IWidgetAction[];
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

/**
 * A piece of content to make available in the widget.
 */
export interface IWidgetBodyContent {
  /**
   * An ID unique to the piece of content.
   */
  id: string;
  /**
   * A title which will appear as a tab’s label in the Dashboard widget. This will only appear if
   * the widget hosts multiple body content objects.
   */
  title: string;
  /**
   * The content, as a React Node.
   *
   * @deprecated This library aims to use only props that can be serialized into JSON, so an
   * alternative way to specify widget content will appear in subsequent versions.
   */
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
