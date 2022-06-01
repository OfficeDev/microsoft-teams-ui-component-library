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
  usNumberFormat,
} from "../ChartUtils";
import { ChartContainer } from "./ChartContainer";
import { buildPattern, chartBarDataPointPatterns } from "../ChartPatterns";
import { getText } from "../../../translations";
import { visuallyHidden } from "../../../lib/visuallyHidden";
import get from "lodash/get";
import flatten from "lodash/flatten";

export const PieChart = ({
  title,
  data,
  siteVariables,
  cutoutPercentage,
}: {
  title: string;
  data: IChartData;
  siteVariables: SiteVariablesPrepared;
  cutoutPercentage?: number;
}) => {
  if (data && data.datasets && data.datasets[0].data.length > 6) {
    data.datasets[0].data = data.datasets[0].data.slice(0, 6);
    console.warn(
      "Please follow design guidence and apply 6 or less data points per one chart."
    );
  }
  const { colorScheme, theme, colors, t } = siteVariables;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<Chart | undefined>();
  const chartId = useMemo(() => Math.random().toString(36).substr(2, 9), []);
  const chartDataPointColors = useMemo(
    () => [
      colorScheme.brand.backgroundFocus2,
      colorScheme.brand.foreground3,
      colorScheme.brand.background,
      colorScheme.default.borderHover,
      colorScheme.default.foreground2,
      colorScheme.default.foreground,
    ],
    [theme]
  );

  const pieChartPatterns = Array.from({ length: 6 }, (v, i) =>
    buildPattern({
      ...chartBarDataPointPatterns(colorScheme)[i],
      backgroundColor: colorScheme.default.background,
      patternColor: colorScheme.brand.background,
    })
  );

  const pieChartHoverPatterns = Array.from({ length: 6 }, (v, i) =>
    buildPattern({
      ...chartBarDataPointPatterns(colorScheme)[i],
      backgroundColor: colorScheme.default.background,
      patternColor: colorScheme.default.borderHover,
    })
  );

  const createDataPoints = (): Chart.ChartDataSets[] => {
    let dataPointConfig = {
      label: getText(t.locale, data.datasets[0].label),
      data: data.datasets[0].data,
      borderWidth: 2,
      borderColor: colorScheme.default.background,
      hoverBorderColor: colorScheme.default.background,
      backgroundColor: chartDataPointColors,
      hoverBackgroundColor: chartDataPointColors,
    };
    if (theme === TeamsTheme.HighContrast) {
      dataPointConfig = {
        ...dataPointConfig,
        borderWidth: 3,
        hoverBorderColor: colorScheme.default.borderHover,
        borderColor: colorScheme.brand.background,
        backgroundColor: pieChartPatterns,
        hoverBackgroundColor: pieChartHoverPatterns,
      };
    }
    return [dataPointConfig] as any;
  };

  useEffect(() => {
    let selectedIndex = -1;
    let selectedDataSet = 0;

    if (!(canvasRef.current && containerRef.current)) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
    const config: any = chartConfig({ type: "pie" });
    config.options.hover.mode = "point";

    config.options.layout.padding.top = 32;
    config.options.layout.padding.left = -16;
    config.options.layout.padding.right = 32;
    config.options.layout.padding.bottom = 32;

    config.options.scales.xAxes[0].ticks.display = false;
    config.options.scales.xAxes[0].gridLines.display = false;

    config.options.scales.yAxes[0].ticks.display = false;
    config.options.scales.yAxes[0].gridLines.display = false;

    if (cutoutPercentage) {
      config.options.cutoutPercentage = cutoutPercentage;
    }
    // Pie chart custom settings
    config.options.tooltips.callbacks.label = (tooltipItem: any, data: any) =>
      getText(t.locale, data.labels[tooltipItem.index]);
    config.options.tooltips.callbacks.labelColor = (tooltipItem: any) => ({
      backgroundColor: chartDataPointColors[tooltipItem.index],
    });

    config.options.tooltips.callbacks.title = (tooltipItems: any) => {
      return `${(
        (Number(data.datasets[0].data[tooltipItems[0].index]) /
          (data.datasets[0].data as number[]).reduce((a, b) => a + b)) *
        100
      ).toPrecision(2)}% (${usNumberFormat(
        Number(data.datasets[0].data[tooltipItems[0].index])
      )})`;
    };

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
        case "ArrowRight":
        case "ArrowUp":
          e.preventDefault();
          selectedIndex = (selectedIndex + 1) % datasetMeta.data.length;
          break;
        case "ArrowLeft":
        case "ArrowDown":
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
      verticalDataAlignment: true,
    });
    // Update axeses
    axesConfig({ chart: chartRef.current, ctx, colorScheme });

    chartRef.current.update();
  }, [theme]);

  function onLegendClick(datasetIndex: number) {
    if (!chartRef.current) return;
    // chartRef.current.data.datasets![0].data![datasetIndex].hidden = !chartRef
    //   .current.data.datasets![0].data![datasetIndex].hidden;
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
      verticalDataAlignment
      tooltipAnnouncements={flatten(
        data.datasets.map((set, setKey) =>
          (set.data as number[]).map((item: number, itemKey: number) => (
            // Generated tooltips for screen readers
            <Box
              data-tooltip={true}
              tabIndex={-1}
              key={itemKey}
              id={`${chartId}-tooltip-${setKey}-${itemKey}`}
              styles={visuallyHidden}
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
