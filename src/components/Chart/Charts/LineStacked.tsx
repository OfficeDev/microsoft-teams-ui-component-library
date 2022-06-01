import React, { useEffect, useMemo, useRef } from "react";
import Chart from "chart.js";
import { Box, SiteVariablesPrepared } from "@fluentui/react-northstar";
import { TeamsTheme } from "../../../themes";
import { IChartData } from "../ChartTypes";
import {
  tooltipTrigger,
  tooltipAxisYLine,
  chartConfig,
  axesConfig,
  setTooltipColorScheme,
  usNumberFormat,
} from "../ChartUtils";
import { ChartContainer } from "./ChartContainer";
import {
  buildPattern,
  chartLineStackedDataPointPatterns,
  lineChartPatterns,
} from "../ChartPatterns";
import { getText } from "../../../translations";
import { visuallyHidden } from "../../../lib/visuallyHidden";
import flatten from "lodash/flatten";
import get from "lodash/get";

export const LineStackedChart = ({
  title,
  data,
  siteVariables,
}: {
  title: string;
  data: IChartData;
  siteVariables: SiteVariablesPrepared;
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
        borderWidth: 1,
        borderColor: colorScheme.default.background,
        hoverBorderColor: chartDataPointColors[i],
        backgroundColor: chartDataPointColors[i],
        hoverBorderWidth: 2,
        hoverBackgroundColor: chartDataPointColors[i],
        pointBorderColor: colorScheme.default.background,
        pointBackgroundColor: colorScheme.default.foreground3,
        pointHoverBackgroundColor: colorScheme.default.foreground3,
        pointHoverBorderColor: chartDataPointColors[i],
        pointHoverBorderWidth: 2,
        borderCapStyle: "round",
        borderJoinStyle: "round",
        pointBorderWidth: 0,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointStyle: "circle",
        borderDash: [],
      };
      if (theme === TeamsTheme.HighContrast) {
        dataPointConfig = {
          ...dataPointConfig,
          borderWidth: 3,
          hoverBorderColor: colorScheme.default.borderHover,
          hoverBorderWidth: 4,
          pointBorderColor: colorScheme.default.border,
          pointHoverBorderColor: colorScheme.default.borderHover,
          pointHoverRadius: 5,
          pointStyle: lineChartPatterns[i].pointStyle,
          borderColor: colorScheme.brand.background,
          backgroundColor: buildPattern({
            ...chartLineStackedDataPointPatterns(colorScheme)[i],
            backgroundColor: colorScheme.default.background,
            patternColor: colorScheme.brand.background,
          }),
          hoverBackgroundColor: buildPattern({
            ...chartLineStackedDataPointPatterns(colorScheme)[i],
            backgroundColor: colorScheme.default.background,
            patternColor: colorScheme.default.borderHover,
          }),
        };
      }
      return dataPointConfig as Chart.ChartDataSets;
    });

  useEffect(() => {
    let selectedIndex = -1;
    let selectedDataSet = 0;

    if (!(canvasRef.current && containerRef.current)) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
    const config: any = chartConfig({ type: "line" });

    // Stacked chart custom settings
    config.options.tooltips.callbacks.title = (tooltipItems: any) => {
      let total = 0;
      data.datasets.map((dataset) => {
        const value = dataset.data[tooltipItems[0].index];
        if (typeof value === "number") {
          return (total += value);
        }
      });
      return `${((tooltipItems[0].yLabel / total) * 100).toPrecision(
        2
      )}% (${usNumberFormat(tooltipItems[0].yLabel)})`;
    };
    config.options.scales.yAxes[0].stacked = true;

    chartRef.current = new Chart(ctx, {
      ...config,
      data: {
        labels: Array.isArray(data.labels)
          ? data.labels.map((label) => getText(t.locale, label))
          : getText(t.locale, data.labels),
        datasets: [],
      },
      plugins: [
        {
          afterDatasetsDraw: ({ ctx, tooltip, chart }: any) => {
            tooltipAxisYLine({
              chart,
              ctx,
              tooltip,
            });
          },
        },
      ],
    });
    const chart: any = chartRef.current;

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
              ...chartLineStackedDataPointPatterns(colorScheme)[i],
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
        case "ArrowRight":
          e.preventDefault();
          selectedIndex = (selectedIndex + 1) % datasetMeta.data.length;
          break;
        case "ArrowLeft":
          e.preventDefault();
          selectedIndex = (selectedIndex || datasetMeta.data.length) - 1;
          break;
        case "ArrowUp":
          e.preventDefault();
          if (data.datasets.length > 1) {
            selectedDataSet += 1;
            if (selectedDataSet === data.datasets.length) {
              selectedDataSet = 0;
            }
          }
          break;
        case "ArrowDown":
          e.preventDefault();
          if (data.datasets.length > 1) {
            selectedDataSet -= 1;
            if (selectedDataSet < 0) {
              selectedDataSet = data.datasets.length - 1;
            }
          }
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
      patterns: chartLineStackedDataPointPatterns,
    });
    // Update axeses
    axesConfig({ chart: chartRef.current, ctx, colorScheme });

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
      patterns={chartLineStackedDataPointPatterns}
      onLegendClick={onLegendClick}
      tooltipAnnouncements={flatten(
        data.datasets.map((set, setKey) =>
          (set.data as number[]).map((item: number, itemKey: number) => (
            // Generated tooltips for screen readers
            <Box
              role="none"
              data-tooltip={true}
              tabIndex={-1}
              styles={visuallyHidden}
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
