import React, { useEffect } from "react";
import Chart from "chart.js";
import { SiteVariablesPrepared } from "@fluentui/react-northstar";
import { TeamsTheme } from "../../../themes";
import { IBubbleChartData, IChartData } from "../ChartTypes";
import {
  tooltipTrigger,
  chartConfig,
  axesConfig,
  setTooltipColorScheme,
} from "../ChartUtils";
import { ChartContainer } from "./ChartContainer";
import { buildPattern, chartBubbleDataPointPatterns } from "../ChartPatterns";
import { getText } from "../../../translations";

export const BubbleChart = ({
  title,
  data,
  siteVariables,
}: {
  title: string;
  data: IChartData;
  siteVariables: SiteVariablesPrepared;
}) => {
  const { colorScheme, theme, t } = siteVariables;
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const chartRef = React.useRef<Chart | undefined>();
  const chartId = React.useMemo(
    () => Math.random().toString(36).substr(2, 9),
    []
  );
  const chartDataPointColors = React.useMemo(
    () => [
      colorScheme.brand.background,
      colorScheme.default.borderHover,
      colorScheme.brand.borderHover,
      colorScheme.default.foreground2,
      colorScheme.brand.background4,
      colorScheme.default.foreground,
    ],
    [theme]
  );

  // Sort for kayboard access
  data.datasets.map((dataset) => {
    dataset.data.sort((a: any, b: any) => a.x - b.x);
  });

  const createDataPoints = (): Chart.ChartDataSets[] =>
    Array.from(data.datasets, (set, i) => {
      let dataPointConfig = {
        label: getText(t.locale, set.label),
        data: set.data,
        borderWidth: 0,
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
            ...chartBubbleDataPointPatterns(colorScheme)[i],
            backgroundColor: colorScheme.default.background,
            patternColor: colorScheme.brand.background,
          }),
          hoverBackgroundColor: buildPattern({
            ...chartBubbleDataPointPatterns(colorScheme)[i],
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

    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
    const config: any = chartConfig({ type: "bubble" });
    config.options.hover.mode = "nearest";

    chartRef.current = new Chart(ctx, {
      ...(config as any),
      data: {
        labels: Array.isArray(data.labels)
          ? data.labels.map((label) => getText(t.locale, label))
          : getText(t.locale, data.labels),
        datasets: [],
      },
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
      document
        .getElementById(
          `${chartId}-tooltip-${selectedDataSet}-${selectedIndex}`
        )
        ?.focus();
    }

    function resetChartStates() {
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
              ...chartBubbleDataPointPatterns(colorScheme)[i],
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
        case "ArrowDown":
          e.preventDefault();
          if (data.datasets.length > 1) {
            // Get all values for the current data point
            const values = data.datasets.map(
              (dataset) => dataset.data[selectedIndex]
            );
            // Sort an array to define next available number
            const sorted = (
              [...Array.from(new Set(values))] as IBubbleChartData[]
            ).sort((a: IBubbleChartData, b: IBubbleChartData) => a.y - b.y);
            let nextValue =
              sorted[
                sorted.findIndex((v) => v === values[selectedDataSet]) +
                  (e.key === "ArrowUp" ? 1 : -1)
              ];

            // Find dataset ID by the next higher number after current
            let nextDataSet = values.findIndex((v) => v === nextValue);

            // If there is no next number that could selected, get number from oposite side
            if (nextDataSet < 0) {
              nextDataSet = values.findIndex(
                (v) =>
                  v ===
                  sorted[e.key === "ArrowUp" ? 0 : data.datasets.length - 1]
              );
            }
            selectedDataSet = nextDataSet;
            selectedIndex = selectedIndex % datasetMeta.data.length;
          }
          break;
      }

      showFocusedDataPoint();
    }

    canvasRef.current.addEventListener("click", removeFocusStyleOnClick);
    canvasRef.current.addEventListener("keydown", changeFocus);
    canvasRef.current.addEventListener("focusout", resetChartStates);
    return () => {
      if (!chartRef.current) return;
      if (canvasRef.current) {
        canvasRef.current.removeEventListener("click", removeFocusStyleOnClick);
        canvasRef.current.removeEventListener("keydown", changeFocus);
        canvasRef.current.removeEventListener("focusout", resetChartStates);
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
      patterns: chartBubbleDataPointPatterns,
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
      chartDataPointColors={chartDataPointColors}
      patterns={chartBubbleDataPointPatterns}
      onLegendClick={onLegendClick}
    >
      <canvas
        id={chartId}
        ref={canvasRef}
        tabIndex={0}
        style={{
          userSelect: "none",
        }}
        aria-label={title}
      >
        {data.datasets.map((set, setKey) =>
          (set.data as IBubbleChartData[]).forEach(
            (item: IBubbleChartData, itemKey: number) => (
              // Generated tooltips for screen readers
              <div key={itemKey} id={`${chartId}-tooltip-${setKey}-${itemKey}`}>
                <p>{item.x}</p>
                <span>
                  {getText(t.locale, set.label)}:{" "}
                  {(set.data as IBubbleChartData[])[itemKey].y}
                </span>
              </div>
            )
          )
        )}
      </canvas>
    </ChartContainer>
  );
};
