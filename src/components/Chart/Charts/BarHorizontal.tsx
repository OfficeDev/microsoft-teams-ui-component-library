import React, { useEffect, useMemo, useRef } from "react";
import Chart from "chart.js";
import { Box, SiteVariablesPrepared } from "@fluentui/react-northstar";
import { TeamsTheme } from "../../../themes";
import { IChartData } from "../ChartTypes";
import {
  tooltipTrigger,
  chartConfig,
  axesConfig,
  setTooltipColorScheme,
  horizontalBarValue,
  usNumberFormat,
} from "../ChartUtils";
import { ChartContainer } from "./ChartContainer";
import { buildPattern, chartBarDataPointPatterns } from "../ChartPatterns";
import { getText } from "../../../translations";
import { visuallyHidden } from "../../../lib/visuallyHidden";
import flatten from "lodash/flatten";
import get from "lodash/get";

export const BarHorizontalChart = ({
  title,
  data,
  siteVariables,
  stacked,
}: {
  title: string;
  data: IChartData;
  siteVariables: SiteVariablesPrepared;
  stacked?: boolean;
}) => {
  const { colorScheme, theme, colors, t } = siteVariables;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<Chart | undefined>();
  const chartId = useMemo(() => Math.random().toString(36).substr(2, 9), []);
  const chartDataPointColors = useMemo(
    () => [
      colors.brand["600"],
      colors.brand["200"],
      colors.brand["800"],
      colors.grey["400"],
      colors.grey["500"],
      colorScheme.default.borderHover,
    ],
    [theme]
  );

  const createDataPoints = (): Chart.ChartDataSets[] =>
    Array.from(data.datasets, (set, i) => {
      let dataPointConfig = {
        label: getText(t.locale, set.label),
        data: set.data,
        borderWidth: 0,
        barPercentage: 0.5,
        borderSkipped: false,
        borderColor: colorScheme.default.background,
        hoverBorderColor: chartDataPointColors[i],
        backgroundColor: chartDataPointColors[i],
        hoverBorderWidth: 0,
        hoverBackgroundColor: chartDataPointColors[i],
        pointBorderColor: colorScheme.default.background,
        pointBackgroundColor: colorScheme.default.foreground3,
        pointHoverBackgroundColor: colorScheme.default.foreground3,
        pointHoverBorderColor: chartDataPointColors[i],
        pointHoverBorderWidth: 0,
        borderCapStyle: "round",
        borderJoinStyle: "round",
        pointBorderWidth: 0,
        pointRadius: 0,
        pointHoverRadius: 0,
      };
      if (theme === TeamsTheme.HighContrast) {
        dataPointConfig = {
          ...dataPointConfig,
          borderWidth: 1,
          hoverBorderColor: colorScheme.default.borderHover,
          hoverBorderWidth: 3,
          pointBorderColor: colorScheme.default.border,
          pointHoverBorderColor: colorScheme.default.borderHover,
          pointHoverRadius: 0,
          borderColor: colorScheme.brand.background,
          backgroundColor: buildPattern({
            ...chartBarDataPointPatterns(colorScheme)[i],
            backgroundColor: colorScheme.default.background,
            patternColor: colorScheme.brand.background,
          }),
          hoverBackgroundColor: buildPattern({
            ...chartBarDataPointPatterns(colorScheme)[i],
            backgroundColor: colorScheme.default.background,
            patternColor: colorScheme.default.borderHover,
          }),
        };
      }
      return dataPointConfig as any;
    });

  useEffect(() => {
    let selectedIndex = -1;
    let selectedDataSet = 0;

    if (!(canvasRef.current && containerRef.current)) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
    const config: any = chartConfig({ type: "horizontalBar" });
    config.options.layout.padding.top = -6;
    config.options.layout.padding.left = -32;

    config.options.hover.mode = "index";

    config.options.scales.xAxes[0].ticks.display = false;
    config.options.scales.xAxes[0].gridLines.display = false;

    config.options.scales.yAxes[0].ticks.callback = (v: string) => v;
    config.options.scales.yAxes[0].ticks.mirror = true;
    config.options.scales.yAxes[0].ticks.padding = 0;
    config.options.scales.yAxes[0].gridLines.display = false;

    config.options.tooltips.position = "nearest";

    if (stacked) {
      config.options.hover.mode = "point";

      config.options.scales.yAxes[0].stacked = true;
      config.options.scales.xAxes[0].stacked = true;
      config.options.tooltips.mode = "nearest";
      config.options.tooltips.axis = "y";
      config.options.tooltips.callbacks.title = (tooltipItems: any) => {
        let total = 0;
        data.datasets.map((dataset) => {
          const value = dataset.data[tooltipItems[0].index];
          if (typeof value === "number") {
            return (total += value);
          }
        });
        return `${((tooltipItems[0].xLabel / total) * 100).toPrecision(
          2
        )}% (${usNumberFormat(tooltipItems[0].xLabel)})`;
      };
    }

    chartRef.current = new Chart(ctx, {
      ...(config as any),
      data: {
        labels: Array.isArray(data.labels)
          ? data.labels.map((label) => getText(t.locale, label))
          : getText(t.locale, data.labels),
        datasets: [],
      },
      plugins: [
        {
          afterDatasetsDraw: ({ ctx, tooltip, chart }: any) => {
            horizontalBarValue({
              chart,
              ctx,
              stacked,
            });
          },
        },
      ],
    });

    const chart: any = chartRef.current;

    chart.config.options.scales.yAxes[0].ticks.labelOffset =
      chart.chartArea.bottom / data.datasets[0].data.length / 2 - 2;
    /**
     * Keyboard manipulations
     */
    function meta() {
      return chart.getDatasetMeta(selectedDataSet);
    }

    function removeFocusStyleOnClick() {
      // Remove focus state style if selected by mouse
      if (canvasRef.current) {
        canvasRef.current.style.boxShadow = "none";
      }
    }

    function removeDataPointsHoverStates() {
      const datasetMeta = meta();
      if (selectedIndex > -1 && datasetMeta.data[selectedIndex]) {
        const tooltipAnnoucement = document.getElementById(
          `${chartId}-tooltip-${selectedDataSet}-${selectedIndex}`
        );
        if (tooltipAnnoucement) {
          tooltipAnnoucement.style.setProperty("display", "none");
        }
        datasetMeta.controller.removeHoverStyle(
          datasetMeta.data[selectedIndex],
          0,
          selectedIndex
        );
      }
    }

    function hoverDataPoint(pointID: number) {
      const datasetMeta = meta();
      if (datasetMeta.data[pointID])
        datasetMeta.controller.setHoverStyle(
          datasetMeta.data[pointID],
          selectedDataSet,
          pointID
        );
    }

    function showFocusedDataPoint() {
      hoverDataPoint(selectedIndex);
      tooltipTrigger({
        chart: chartRef.current as any,
        data,
        set: selectedDataSet,
        index: selectedIndex,
        siteVariables,
      });
      const tooltipAnnoucement = document.getElementById(
        `${chartId}-tooltip-${selectedDataSet}-${selectedIndex}`
      );
      if (tooltipAnnoucement) {
        tooltipAnnoucement.style.setProperty("display", "block");
        tooltipAnnoucement.focus();
      }
    }

    function resetChartStates(e: FocusEvent) {
      if (get(e, ["relatedTarget", "dataset", "tooltip"], false)) {
        return;
      }
      removeDataPointsHoverStates();
      const activeElements = chart.tooltip._active;
      const requestedElem =
        chart.getDatasetMeta(selectedDataSet).data[selectedIndex];
      activeElements.find((v: any, i: number) => {
        if (requestedElem._index === v._index) {
          activeElements.splice(i, 1);
          return true;
        }
      });

      for (let i = 0; i < activeElements.length; i++) {
        if (requestedElem._index === activeElements[i]._index) {
          activeElements.splice(i, 1);
          break;
        }
      }
      if (siteVariables.theme === TeamsTheme.HighContrast) {
        (chartRef.current as any).data.datasets.map(
          (dataset: any, i: number) => {
            dataset.borderColor = siteVariables.colorScheme.default.border;
            dataset.borderWidth = 2;
            dataset.backgroundColor = buildPattern({
              ...chartBarDataPointPatterns(colorScheme)[i],
              backgroundColor: colorScheme.default.background,
              patternColor: colorScheme.brand.background,
            });
          }
        );
        chart.update();
      }
      chart.tooltip._active = activeElements;
      chart.tooltip.update(true);
      chart.draw();
    }

    function changeFocus(e: KeyboardEvent) {
      removeDataPointsHoverStates();
      const datasetMeta = meta();
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          selectedIndex = (selectedIndex + 1) % datasetMeta.data.length;
          break;
        case "ArrowUp":
          e.preventDefault();
          selectedIndex = (selectedIndex || datasetMeta.data.length) - 1;
          break;
      }

      showFocusedDataPoint();
    }

    containerRef.current.addEventListener("click", removeFocusStyleOnClick);
    containerRef.current.addEventListener("keyup", changeFocus);
    containerRef.current.addEventListener("focusout", resetChartStates);
    return () => {
      if (!chartRef.current) return;
      if (containerRef.current) {
        containerRef.current.removeEventListener(
          "click",
          removeFocusStyleOnClick
        );
        containerRef.current.removeEventListener("keyup", changeFocus);
        containerRef.current.removeEventListener("focusout", resetChartStates);
      }
      chartRef.current.destroy();
    };
  }, []);

  /**
   * Theme updates
   */
  useEffect(() => {
    if (!chartRef.current) return;
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
    // Apply new colors scheme for data points
    chartRef.current.data.datasets = createDataPoints();
    // Update tooltip colors scheme
    setTooltipColorScheme({
      chart: chartRef.current,
      siteVariables,
      chartDataPointColors,
      patterns: chartBarDataPointPatterns,
    });
    // Update axeses
    axesConfig({ chart: chartRef.current, ctx, colorScheme });
    chartRef.current.options.defaultColor = colorScheme.default.foreground;
    chartRef.current.update();
  }, [theme]);

  function onLegendClick(datasetIndex: number) {
    if (!chartRef.current) return;
    chartRef.current.data.datasets![datasetIndex].hidden =
      !chartRef.current.data.datasets![datasetIndex].hidden;
    chartRef.current.update();
  }

  return (
    <ChartContainer
      siteVariables={siteVariables}
      data={data}
      chartId={chartId}
      chartLabel={title}
      canvasRef={canvasRef}
      containerRef={containerRef}
      chartDataPointColors={chartDataPointColors}
      patterns={chartBarDataPointPatterns}
      onLegendClick={onLegendClick}
      tooltipAnnouncements={flatten(
        stacked
          ? data.datasets[0].data.map((_item, dataIndex) => {
              const sum = data.datasets.reduce(
                (sum, dataset) => sum + (dataset.data[dataIndex] as number),
                0
              );
              return data.datasets.map((dataset, setIndex: number) => {
                const item = dataset.data[dataIndex] as number;
                return (
                  // Generated tooltips for screen readers
                  <Box
                    data-tooltip={true}
                    tabIndex={-1}
                    key={dataIndex}
                    id={`${chartId}-tooltip-${setIndex}-${dataIndex}`}
                    styles={{ ...visuallyHidden, display: "none" }}
                  >
                    {`${getText(t.locale, dataset.label)} ${
                      data.labels && Array.isArray(data.labels)
                        ? getText(t.locale, data.labels[dataIndex])
                        : getText(t.locale, data.labels)
                    }: ${((100 * item) / sum).toFixed(
                      item / sum >= 0.1 ? 0 : 1
                    )}% (${item})`}
                  </Box>
                );
              });
            })
          : data.datasets.map((set, setKey) =>
              (set.data as number[]).map((item: number, itemKey: number) => (
                // Generated tooltips for screen readers
                <Box
                  data-tooltip={true}
                  tabIndex={-1}
                  styles={{ ...visuallyHidden, display: "none" }}
                  key={itemKey}
                  id={`${chartId}-tooltip-${setKey}-${itemKey}`}
                >
                  {`${getText(t.locale, set.label)} ${
                    data.labels && Array.isArray(data.labels)
                      ? getText(t.locale, data.labels[itemKey])
                      : getText(t.locale, data.labels)
                  }: ${set.data[itemKey]}`}
                </Box>
              ))
            )
      )}
    />
  );
};
