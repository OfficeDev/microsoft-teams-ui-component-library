import React from "react";
import ChartJS from "chart.js";
import {
  ProviderConsumer as FluentUIThemeConsumer,
  Loader,
} from "@fluentui/react-northstar";
import { ChartTheme } from "./ChartTheme";
import { IChartData, ChartOptions } from "./ChartTypes";
import {
  BarChart,
  PieChart,
  LineChart,
  LineAreaChart,
  LineStackedChart,
  BarStackedChart,
  ChartEmptyState,
  ChartErrorState,
  BarHorizontalChart,
  BarHorizontalStackedChart,
} from "./Charts";

(ChartJS as any).defaults.global.legend.display = false;
(ChartJS as any).defaults.global.defaultFontFamily = `Segoe UI, system-ui, sans-serif`;
const CHARTS = {
  [ChartOptions.Line]: LineChart,
  [ChartOptions.LineArea]: LineAreaChart,
  [ChartOptions.LineStacked]: LineStackedChart,
  [ChartOptions.Bar]: BarChart,
  [ChartOptions.BarStacked]: BarStackedChart,
  [ChartOptions.BarHorizontal]: BarHorizontalChart,
  [ChartOptions.BarHorizontalStacked]: BarHorizontalStackedChart,
  [ChartOptions.Pie]: PieChart,
};

/**
 * TODO:
 *    [ ] Legend behavior
 *    [ ] Storybook chart container
 */

export function Chart({
  title,
  type,
  data,
}: {
  title: string;
  type: ChartOptions;
  data?: IChartData;
}) {
  if (data && data.datasets && data.datasets.length > 6) {
    data.datasets = data.datasets.slice(0, 6);
    console.warn(
      "Please follow design guidence and apply 6 or less data points per one chart."
    );
  }
  const ChartContainer = CHARTS[type];
  return (
    <FluentUIThemeConsumer
      render={(globalTheme) => (
        <ChartTheme globalTheme={globalTheme}>
          <React.Suspense fallback={<Loader />}>
            {data ? (
              data?.datasets.length || data?.labels.length ? (
                <ChartContainer
                  title={title}
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
        </ChartTheme>
      )}
    />
  );
}
