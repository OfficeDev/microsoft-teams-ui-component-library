import React, { useState } from "react";
import {
  Flex,
  Card,
  Text,
  Box,
  SiteVariablesPrepared,
  tabListBehavior,
  Menu,
  ArrowRightIcon,
  ArrowLeftIcon,
  Button,
  ProviderConsumer as FluentUIThemeConsumer,
} from "@fluentui/react-northstar";
import { DashboardCallout, IWidgetAction } from "./DashboardCallout";
import { Chart, IChartProps } from "../Chart/Chart";
import { Placeholder } from "./Placeholder";
import { TDashboardInteraction } from "./Dashboard";
import { getText, TTextObject } from "../../translations";
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
   * A collection of filters available in the widget’s filter menu. This must be paired with `bodyByFilter` to display.
   */
  widgetFilterGroup?: Omit<IWidgetAction, "icon">[];
  /**
   * The initial filter’s id to apply. If this is not specified, and both `widgetFilterGroup` and `bodyByFilter` are, then the initial filter resolves to the first in `widgetFilterGroup`.
   */
  initialFilter?: string;
  /**
   * The content to make available in the widget.
   */
  body?: IWidgetBodyContent[];
  /**
   * The content to make available in the widget based on which filter is active, by id. This must be paired with `widgetFilterGroup` to display, otherwise `body` is used. `body` is also displayed when `bodyByFilter` does not have a value for a given filter id.
   */
  bodyByFilter?: Record<string, IWidgetBodyContent[]>;
  /**
   * A link to render at the end of the widget’s content.
   */
  link?: IWidgetLink | IWidgetButton;
  /**
   * @internal
   */
  onInteraction?: (interaction: TDashboardInteraction) => void;
  /**
   * @internal
   */
  hideWidget?: (widgetId: string) => void;
}

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

export const Widget = ({
  id,
  size,
  body,
  bodyByFilter,
  link,
  title,
  desc,
  widgetActionGroup,
  widgetFilterGroup,
  initialFilter,
  hideWidget,
  onInteraction,
}: IWidget) => {
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

  const [activeTabId, setActiveTabId] = useState(0);
  const [activeFilter, setActiveFilter] = useState(
    widgetFilterGroup && bodyByFilter
      ? initialFilter || widgetFilterGroup[0].id
      : null
  );

  const activeBody =
    (activeFilter && bodyByFilter && bodyByFilter[activeFilter]) || body;

  debugger;

  return (
    <Card styles={cardStyle} fluid>
      <FluentUIThemeConsumer
        render={(globalTheme) => {
          const { t, rtl } = globalTheme.siteVariables;
          return (
            <>
              <Card.Header>
                <Flex gap="gap.small" style={{ minHeight: "2rem" }}>
                  <Flex gap="gap.small" column>
                    <Text
                      content={getText(t.locale, title)}
                      style={{ margin: 0 }}
                      weight="bold"
                    />
                    {desc && (
                      <Text content={getText(t.locale, desc)} size="small" />
                    )}
                  </Flex>
                  <Box role="none" styles={{ flex: "1 0 0" }} />
                  {activeFilter && (
                    <DashboardCallout
                      {...{
                        widgetId: id,
                        globalTheme,
                        calloutType: "filter",
                        widgetCalloutGroup: widgetFilterGroup,
                        setActiveFilter,
                        activeFilter,
                        t,
                        onInteraction,
                      }}
                    />
                  )}
                  <DashboardCallout
                    {...{
                      widgetId: id,
                      globalTheme,
                      widgetCalloutGroup: widgetActionGroup,
                      hideWidget,
                      t,
                      onInteraction,
                    }}
                  />
                </Flex>
              </Card.Header>
              <Card.Body
                style={{
                  marginBottom: "0.75rem",
                  height: "100%",
                  overflow: "hidden",
                }}
                fitted
              >
                {activeBody ? (
                  <>
                    {activeBody.length > 1 && (
                      <Menu
                        style={{
                          border: "none",
                          background: "none",
                          marginBottom: "1.25rem",
                        }}
                        items={Array.from(activeBody, ({ id, title }) =>
                          Object.assign({
                            key: id,
                            content: getText(t.locale, title),
                          })
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
                    {activeBody.map(({ id, content }, i) => (
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
                                <Chart
                                  key={`widget-chart__${
                                    activeFilter || ""
                                  }__${i}`}
                                  {...(content as IChartWidgetContent).chart}
                                />
                              );
                            case "dl":
                              return (
                                <DescriptionList
                                  t={t}
                                  list={
                                    (content as IDescriptionListWidgetContent)
                                      .list
                                  }
                                />
                              );
                            case "placeholder":
                              return (
                                <Placeholder
                                  message={
                                    (content as IPlaceholderWidgetContent)
                                      .message
                                  }
                                />
                              );
                          }
                        })()}
                      </Flex>
                    ))}
                  </>
                ) : (
                  <EmptyState
                    borderColor={globalTheme.siteVariables.colors.grey["300"]}
                  />
                )}
              </Card.Body>
              {link && (
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
                            outlineColor:
                              globalTheme.siteVariables.colorScheme.default
                                .foregroundActive,
                          },
                        }}
                      >
                        {link.title
                          ? getText(t.locale, link.title)
                          : t["view more"]}
                        {rtl ? (
                          <ArrowLeftIcon
                            size="small"
                            styles={{ margin: "0 .4rem" }}
                          />
                        ) : (
                          <ArrowRightIcon
                            size="small"
                            styles={{ margin: "0 .4rem" }}
                          />
                        )}
                      </Text>
                    ) : link.hasOwnProperty("actionId") ? (
                      <>
                        <Button
                          text
                          size="small"
                          content={
                            <Text color="brand">
                              {link.title
                                ? getText(t.locale, link.title)
                                : t["view more"]}
                              {rtl ? (
                                <ArrowLeftIcon
                                  size="small"
                                  styles={{ margin: "0 .4rem" }}
                                />
                              ) : (
                                <ArrowRightIcon
                                  size="small"
                                  styles={{ margin: "0 .4rem" }}
                                />
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
                          variables={({
                            colorScheme,
                          }: SiteVariablesPrepared) => ({
                            color: colorScheme.brand.foreground,
                          })}
                        />
                      </>
                    ) : null}
                  </Flex>
                </Card.Footer>
              )}
            </>
          );
        }}
      />
    </Card>
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
