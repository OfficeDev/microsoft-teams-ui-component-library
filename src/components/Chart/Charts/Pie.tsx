import React, { useEffect } from "react";
import Chart from "chart.js";
import { SiteVariablesPrepared } from "@fluentui/react-northstar";
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
  const { colorScheme, theme, colors } = siteVariables;
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const chartRef = React.useRef<Chart | undefined>();
  const chartId = React.useMemo(
    () => Math.random().toString(36).substr(2, 9),
    []
  );
  const chartDataPointColors = React.useMemo(
    () => [
      colorScheme.brand.backgroundFocus2,
      colorScheme.brand.foreground3,
      colorScheme.brand.background,
      colorScheme.default.foreground2,
      colorScheme.default.borderHover,
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
      label: data.datasets[0].label,
      data: data.datasets[0].data,
      borderWidth: 0,
      borderSkipped: false,
      borderColor: colorScheme.default.background,
      hoverBorderColor: chartDataPointColors,
      backgroundColor: chartDataPointColors,
      hoverBorderWidth: 0,
      hoverBackgroundColor: chartDataPointColors,
      pointBorderColor: colorScheme.default.background,
      pointBackgroundColor: colorScheme.default.foreground3,
      pointHoverBackgroundColor: colorScheme.default.foreground3,
      pointHoverBorderColor: chartDataPointColors,
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
        backgroundColor: pieChartPatterns,
        hoverBackgroundColor: pieChartHoverPatterns,
      };
    }
    return [dataPointConfig] as any;
  };

  useEffect(() => {
    let selectedIndex = -1;
    let selectedDataSet = 0;

    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
    const config: any = chartConfig({ type: "pie" });
    config.options.hover.mode = "index";

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
      data.labels[tooltipItem.index];
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
        labels: data.labels,
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
      if (selectedIndex > -1) {
        meta().controller.removeHoverStyle(
          meta().data[selectedIndex],
          0,
          selectedIndex
        );
      }
    }

    function hoverDataPoint(pointID: number) {
      meta().controller.setHoverStyle(
        meta().data[pointID],
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
      const requestedElem = chart.getDatasetMeta(selectedDataSet).data[
        selectedIndex
      ];
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
      switch (e.key) {
        case "ArrowRight":
        case "ArrowUp":
          e.preventDefault();
          selectedIndex = (selectedIndex + 1) % meta().data.length;
          break;
        case "ArrowLeft":
        case "ArrowDown":
          e.preventDefault();
          selectedIndex = (selectedIndex || meta().data.length) - 1;
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
      chartDataPointColors={chartDataPointColors}
      patterns={chartBarDataPointPatterns}
      onLegendClick={onLegendClick}
      verticalDataAlignment
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
          (set.data as number[]).forEach((item: number, itemKey: number) => (
            // Generated tooltips for screen readers
            <div key={itemKey} id={`${chartId}-tooltip-${setKey}-${itemKey}`}>
              <p>{item}</p>
              <span>
                {data.labels[setKey]}: {set.data[itemKey]}
              </span>
            </div>
          ))
        )}
      </canvas>
    </ChartContainer>
  );
};
