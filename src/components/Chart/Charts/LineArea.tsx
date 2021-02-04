import React, { useEffect } from "react";
import Chart from "chart.js";
import { SiteVariablesPrepared } from "@fluentui/react-northstar";
import { TeamsTheme } from "../../../themes";
import { IChartData } from "../ChartTypes";
import {
  tooltipTrigger,
  tooltipAxisYLine,
  chartConfig,
  hexToRgb,
  axesConfig,
  setTooltipColorScheme,
} from "../ChartUtils";
import { ChartContainer } from "./ChartContainer";
import { lineChartPatterns } from "../ChartPatterns";

export const LineAreaChart = ({
  title,
  data,
  siteVariables,
}: {
  title: string;
  data: IChartData;
  siteVariables: SiteVariablesPrepared;
}) => {
  const { colorScheme, theme, colors } = siteVariables;
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

  const createDataPoints = (
    ctx: CanvasRenderingContext2D
  ): Chart.ChartDataSets[] =>
    Array.from(data.datasets, (set, i) => {
      const gradientStroke = ctx.createLinearGradient(
        0,
        0,
        0,
        ctx.canvas.clientHeight * 0.8
      );
      const hoverGradientStroke = ctx.createLinearGradient(
        0,
        0,
        0,
        ctx.canvas.clientHeight * 0.8
      );
      if (theme === TeamsTheme.HighContrast) {
        const colorRGB = hexToRgb(colorScheme.brand.background);
        const hoverColorRGB = hexToRgb(colorScheme.default.borderHover);
        gradientStroke.addColorStop(0, `rgba(${colorRGB}, .2)`);
        gradientStroke.addColorStop(1, `rgba(${colorRGB}, .0)`);
        hoverGradientStroke.addColorStop(0, `rgba(${hoverColorRGB}, .4)`);
        hoverGradientStroke.addColorStop(1, `rgba(${hoverColorRGB}, .0)`);
      } else {
        const colorRGB = hexToRgb(chartDataPointColors[i]);
        gradientStroke.addColorStop(0, `rgba(${colorRGB}, .4)`);
        gradientStroke.addColorStop(1, `rgba(${colorRGB}, .0)`);
        hoverGradientStroke.addColorStop(0, `rgba(${colorRGB}, .6)`);
        hoverGradientStroke.addColorStop(1, `rgba(${colorRGB}, .0)`);
      }

      let dataPointConfig = {
        label: set.label,
        data: set.data,
        borderColor: chartDataPointColors[i],
        hoverBorderColor: chartDataPointColors[i],
        hoverBorderWidth: 2,
        backgroundColor: gradientStroke as any,
        hoverBackgroundColor: hoverGradientStroke as any,
        borderWidth: 2,
        pointBorderColor: chartDataPointColors[i],
        pointBackgroundColor: chartDataPointColors[i],
        pointHoverBackgroundColor: chartDataPointColors[i],
        pointHoverBorderColor: chartDataPointColors[i],
        pointHoverBorderWidth: 0,
        borderCapStyle: "round",
        borderJoinStyle: "round",
        pointBorderWidth: 0,
        pointRadius: 2,
        pointHoverRadius: 2,
        pointStyle: "circle",
        borderDash: [],
      };
      if (theme === TeamsTheme.HighContrast) {
        dataPointConfig = {
          ...dataPointConfig,
          borderColor: colorScheme.brand.background,
          hoverBorderColor: colorScheme.default.borderHover,
          pointBorderColor: colorScheme.brand.background,
          pointBackgroundColor: colorScheme.brand.background,
          pointHoverBackgroundColor: colorScheme.brand.background,
          pointHoverBorderColor: colorScheme.brand.background,
          hoverBorderWidth: 4,
          pointRadius: 4,
          pointHoverRadius: 4,
          pointStyle: lineChartPatterns[i].pointStyle,
          borderDash: lineChartPatterns[i].lineBorderDash,
        } as any;
      }
      return dataPointConfig as Chart.ChartDataSets;
    });

  useEffect(() => {
    let selectedIndex = -1;
    let selectedDataSet = 0;

    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
    const config: any = chartConfig({ type: "line" });

    chartRef.current = new Chart(ctx, {
      ...config,
      data: {
        labels: data.labels,
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
      tooltipTrigger(
        chartRef.current as any,
        data,
        selectedDataSet,
        selectedIndex,
        siteVariables
      );
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
      if (theme === TeamsTheme.HighContrast) {
        chart.data.datasets.map((dataset: any) => {
          dataset.borderColor = colorScheme.default.border;
          dataset.borderWidth = 2;
        });
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
          e.preventDefault();
          selectedIndex = (selectedIndex + 1) % meta().data.length;
          break;
        case "ArrowLeft":
          e.preventDefault();
          selectedIndex = (selectedIndex || meta().data.length) - 1;
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
            const sorted = [...Array.from(new Set(values))].sort(
              (a, b) => a - b
            );
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
            selectedIndex = selectedIndex % meta().data.length;
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
    chartRef.current.data.datasets = createDataPoints(ctx);
    // Update tooltip colors scheme
    setTooltipColorScheme({
      chart: chartRef.current,
      siteVariables,
      chartDataPointColors,
    });
    // Update axeses
    axesConfig({ chart: chartRef.current, ctx, colorScheme });
    // Show style changes
    chartRef.current.update();
  }, [theme]);

  return (
    <ChartContainer
      siteVariables={siteVariables}
      data={data}
      chartDataPointColors={chartDataPointColors}
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
          set.data.map((item, itemKey) => (
            // Generated tooltips for screen readers
            <div key={itemKey} id={`${chartId}-tooltip-${setKey}-${itemKey}`}>
              <p>{item}</p>
              <span>
                {set.label}: {set.data[itemKey]}
              </span>
            </div>
          ))
        )}
      </canvas>
    </ChartContainer>
  );
};
