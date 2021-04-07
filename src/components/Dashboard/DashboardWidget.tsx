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
  ArrowRightIcon,
} from "@fluentui/react-northstar";
import { DashboardCallout, IWidgetAction } from "./DashboardCallout";

/**
 * The widget’s target size in the Dashboard’s grid layout.
 * @public
 */
export enum EWidgetSize {
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
 * @public
 */
export interface IWidget {
  size: EWidgetSize;
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
  size: EWidgetSize;
}) => {
  const cardStyle = {
    gridColumnEnd: "auto",
    gridRowEnd: "auto",
    "@media (max-width: 842px)": {
      gridColumnEnd: "span 3",
    },
  };
  if (size === EWidgetSize.Double) {
    cardStyle.gridColumnEnd = "span 2";
  }
  if (size === EWidgetSize.Box) {
    cardStyle.gridColumnEnd = "span 2";
    cardStyle.gridRowEnd = "span 2";
  }
  if (size === EWidgetSize.Triple) {
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
 * @public
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

/**
 * @public
 */
export interface IWidgetLink {
  href: string;
}

export const WidgetFooter = ({
  link,
  siteVariables,
}: {
  link: IWidgetLink;
  siteVariables: SiteVariablesPrepared;
}) => (
  <Card.Footer fitted>
    <Flex space="between" vAlign="center">
      <Text
        as="a"
        href={link.href}
        target="_blank"
        size="small"
        color="brand"
        styles={{
          textDecoration: "none",
          "&:focus": {
            outlineColor: siteVariables.colorScheme.default.foregroundActive,
          },
        }}
      >
        View more
        <ArrowRightIcon size="small" styles={{ margin: "0 .4rem" }} />
      </Text>
    </Flex>
  </Card.Footer>
);
