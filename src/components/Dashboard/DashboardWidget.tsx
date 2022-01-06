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
  ArrowLeftIcon,
  Button,
} from "@fluentui/react-northstar";
import { DashboardCallout, IWidgetAction } from "./DashboardCallout";
import { Chart, IChartProps } from "../Chart/Chart";
import { Placeholder } from "./Placeholder";
import { TDashboardInteraction } from "./Dashboard";
import { getText, TTextObject, TTranslations } from "../../translations";
import { DescriptionList, IDescriptionListProps } from "./DescriptionList";

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
  /**
   * A unique ID for the widget.
   */
  id: string;
  /**
   * The widget’s target size.
   */
  size: EWidgetSize;
  /**
   * The title of the widget, rendered in a header style.
   */
  title: TTextObject;
  /**
   * Text rendered in boxy test style below the title.
   */
  desc?: TTextObject;
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
  link?: IWidgetLink | IWidgetButton;
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
  widgetId,
  title,
  desc,
  globalTheme,
  widgetActionGroup,
  hideWidget,
  t,
  onInteraction,
}: {
  widgetId: string;
  title: TTextObject;
  desc?: TTextObject;
  globalTheme: ThemePrepared;
  widgetActionGroup?: IWidgetAction[];
  hideWidget: null | ((widgetId: string) => void);
  t: TTranslations;
  onInteraction?: (interaction: TDashboardInteraction) => void;
}) => {
  const [calloutOpen, setCalloutOpen] = React.useState(false);
  return (
    <Card.Header>
      <Flex gap="gap.small" space="between" style={{ minHeight: "2rem" }}>
        <Flex gap="gap.small" column>
          <Text
            content={getText(t.locale, title)}
            style={{ margin: 0 }}
            weight="bold"
          />
          {desc && <Text content={getText(t.locale, desc)} size="small" />}
        </Flex>
        <DashboardCallout
          open={calloutOpen}
          onOpenChange={({ currentTarget }, props) => {
            const open = !!props?.open;
            setCalloutOpen(open);
          }}
          menuProps={{
            offset: [0, 0],
            position: "below",
          }}
          {...{
            widgetId,
            globalTheme,
            widgetActionGroup,
            hideWidget,
            t,
            onInteraction,
          }}
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
 * A chart widget
 * @public
 */
export interface IChartWidgetContent {
  type: "chart" | string;
  chart: IChartProps;
}

/**
 * A description list widget
 * @public
 */
export interface IDescriptionListWidgetContent
  extends Omit<IDescriptionListProps, "t"> {
  type: "dl" | string;
}

/**
 * A placeholder widget
 * @internal
 */
interface IPlaceholderWidgetContent {
  type: "placeholder" | string;
  message: string;
}

/**
 * Widget content specifies a type, then a payload with a special key depending on the type of widget.
 * @public
 */
export type TWidgetContent =
  | IChartWidgetContent
  | IDescriptionListWidgetContent
  | IPlaceholderWidgetContent;

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
  title: TTextObject;
  /**
   * The content, as a React Node.
   */
  content: TWidgetContent;
}

export const WidgetBody = ({
  body,
  siteVariables,
  t,
}: {
  body?: IWidgetBodyContent[];
  siteVariables: SiteVariablesPrepared;
  t: TTranslations;
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
                Object.assign({ key: id, content: getText(t.locale, title) })
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
              {(() => {
                switch (content.type) {
                  case "chart":
                    return (
                      <Chart {...(content as IChartWidgetContent).chart} />
                    );
                  case "dl":
                    return (
                      <DescriptionList
                        t={t}
                        list={(content as IDescriptionListWidgetContent).list}
                      />
                    );
                  case "placeholder":
                    return (
                      <Placeholder
                        message={(content as IPlaceholderWidgetContent).message}
                      />
                    );
                }
              })()}
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
  title?: TTextObject;
  href: string;
}

/**
 * @public
 */
export interface IWidgetButton {
  title?: TTextObject;
  actionId: string;
}

/**
 * @public
 */
export interface IDashboardInteractionWidgetButton {
  event: "click";
  target: "widget";
  widget: string;
  subject: string;
}

export const WidgetFooter = ({
  id,
  link,
  siteVariables,
  t,
  rtl,
  onInteraction,
}: {
  id: string;
  link: IWidgetLink | IWidgetButton;
  siteVariables: SiteVariablesPrepared;
  t: TTranslations;
  rtl: boolean;
  onInteraction?: (interaction: TDashboardInteraction) => void;
}) => (
  <Card.Footer fitted>
    <Flex space="between" vAlign="center">
      {link.hasOwnProperty("href") ? (
        <Text
          as="a"
          href={(link as IWidgetLink).href}
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
          {link.title ? getText(t.locale, link.title) : t["view more"]}
          {rtl ? (
            <ArrowLeftIcon size="small" styles={{ margin: "0 .4rem" }} />
          ) : (
            <ArrowRightIcon size="small" styles={{ margin: "0 .4rem" }} />
          )}
        </Text>
      ) : link.hasOwnProperty("actionId") ? (
        <>
          <Button
            text
            size="small"
            content={
              <Text color="brand">
                {link.title ? getText(t.locale, link.title) : t["view more"]}
                {rtl ? (
                  <ArrowLeftIcon size="small" styles={{ margin: "0 .4rem" }} />
                ) : (
                  <ArrowRightIcon size="small" styles={{ margin: "0 .4rem" }} />
                )}
              </Text>
            }
            onClick={() =>
              onInteraction &&
              onInteraction({
                event: "click",
                target: "widget",
                widget: id,
                subject: (link as IWidgetButton).actionId,
              })
            }
            variables={({ colorScheme }: SiteVariablesPrepared) => ({
              color: colorScheme.brand.foreground,
            })}
          />
        </>
      ) : null}
    </Flex>
  </Card.Footer>
);
