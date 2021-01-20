import React from "react";
import ChartJS from "chart.js";
import {
  ProviderConsumer as FluentUIThemeConsumer,
  Loader,
} from "@fluentui/react-northstar";
import { ChartTheme } from "./ChartTheme";
import { IChartData, ChartOptions } from "./ChartTypes";
import { LineChart, LineAreaChart, LineStackedChart } from "./Charts";

(ChartJS as any).defaults.global.legend.display = false;
(ChartJS as any).defaults.global.defaultFontFamily = `"Segoe UI", system-ui, "Apple Color Emoji", "Segoe UI Emoji", sans-serif`;
const CHARTS = {
  [ChartOptions.Line]: LineChart,
  [ChartOptions.LineArea]: LineAreaChart,
  [ChartOptions.LineStacked]: LineStackedChart,
};

/**
 * TODO:
 *    [ ] Chart Empty state
 *    [ ] Error message
 *    [ ] Patterns
 *    [ ] Legend
 *    [ ] Legend patterns
 *    [ ] Dashboard integration
 */

export function Chart({
  type,
  data,
}: {
  type: ChartOptions;
  data?: IChartData;
}) {
  const ChartContainer = CHARTS[type];
  return (
    <FluentUIThemeConsumer
      render={(globalTheme) => (
        <ChartTheme globalTheme={globalTheme}>
          {data ? (
            <ChartContainer
              data={data}
              siteVariables={globalTheme.siteVariables}
            />
          ) : (
            <ChartEmptyState />
          )}
          <React.Suspense fallback={<Loader />}></React.Suspense>
        </ChartTheme>
      )}
    />
  );
}

function ChartEmptyState() {
  return <div>Empty State</div>;
}
