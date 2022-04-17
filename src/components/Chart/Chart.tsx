import React from "react";
import ChartJS from "chart.js";
import {
  ProviderConsumer as FluentUIThemeConsumer,
  Loader,
} from "@fluentui/react-northstar";
import { IChartData, EChartTypes } from "./ChartTypes";
import {
  BarChart,
  PieChart,
  LineChart,
  LineAreaChart,
  DoughnutChart,
  LineStackedChart,
  BarStackedChart,
  ChartEmptyState,
  ChartErrorState,
  BarHorizontalChart,
  BarHorizontalStackedChart,
  BubbleChart,
} from "./Charts";

import { getText, TTextObject } from "../../translations";

(ChartJS as any).defaults.global.legend.display = false;
(ChartJS as any).defaults.global.defaultFontFamily = `Segoe UI, system-ui, sans-serif`;
const CHARTS = {
  [EChartTypes.Line]: LineChart,
  [EChartTypes.LineArea]: LineAreaChart,
  [EChartTypes.LineStacked]: LineStackedChart,
  [EChartTypes.Bar]: BarChart,
  [EChartTypes.BarStacked]: BarStackedChart,
  [EChartTypes.BarHorizontal]: BarHorizontalChart,
  [EChartTypes.BarHorizontalStacked]: BarHorizontalStackedChart,
  [EChartTypes.Pie]: PieChart,
  [EChartTypes.Doughnut]: DoughnutChart,
  [EChartTypes.Bubble]: BubbleChart,
};

/*
 * TODO:
 *    [ ] Legend behavior
 *    [ ] Storybook chart container
 */

/**
 * The Chart component can be used to render data visualizations. Designs for this component are
 * available in the [Data visualizations page of the Microsoft Teams UI Kit](https://www.figma.com/file/EOsbapNvZgEwcA1mShswfh/Microsoft-Teams-UI-Kit-Community?node-id=3789%3A4091).
 * @public
 */
export interface IChartProps {
  /**
   * The chart’s title, displayed above the chart.
   */
  title: TTextObject;
  /**
   * Which type of visualization to use to display the Chart’s data.
   */
  type: EChartTypes;
  /**
   * The Chart’s data.
   */
  data?: IChartData;
}

/**
 * @public
 */
export function Chart({ title, type, data }: IChartProps) {
  if (data && data.datasets && data.datasets.length > 6) {
    data.datasets = data.datasets.slice(0, 6);
    console.warn(
      "Please follow design guidance and apply 6 or fewer data points per one chart."
    );
  }
  const ChartContainer = CHARTS[type];
  return (
    <FluentUIThemeConsumer
      render={(globalTheme) => {
        const { t } = globalTheme.siteVariables;
        return (
          <React.Suspense fallback={<Loader />}>
            {data ? (
              data?.datasets.length || data?.labels?.length ? (
                <ChartContainer
                  title={getText(t.locale, title)}
                  data={data}
                  siteVariables={globalTheme.siteVariables}
                />
              ) : (
                <ChartEmptyState siteVariables={globalTheme.siteVariables} />
              )
            ) : (
              <ChartErrorState siteVariables={globalTheme.siteVariables} />
            )}
          </React.Suspense>
        );
      }}
    />
  );
}
