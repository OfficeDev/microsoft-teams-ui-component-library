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
(ChartJS as any).defaults.global.defaultFontFamily = `Segoe UI, system-ui, sans-serif`;
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
  title,
  type,
  data,
}: {
  title: string;
  type: ChartOptions;
  data?: IChartData;
}) {
  const ChartContainer = CHARTS[type];
  return (
    <FluentUIThemeConsumer
      render={(globalTheme) => (
        <ChartTheme globalTheme={globalTheme}>
          <React.Suspense fallback={<Loader />}>
            {data ? (
              <ChartContainer
                title={title}
                data={data}
                siteVariables={globalTheme.siteVariables}
              />
            ) : (
              <ChartEmptyState />
            )}
          </React.Suspense>
        </ChartTheme>
      )}
    />
  );
}

function ChartEmptyState() {
  return <div>Empty State</div>;
}
