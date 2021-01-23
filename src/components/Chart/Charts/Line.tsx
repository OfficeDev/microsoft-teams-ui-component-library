import React, { useEffect } from "react";
import Chart from "chart.js";
import { SiteVariablesPrepared } from "@fluentui/react-northstar";
import { IChartData } from "../ChartTypes";
import {
  tooltipTrigger,
  tooltipAxesYLine,
  lineChartPatterns,
  lineChartConfig,
} from "../ChartUtils";
import { TeamsTheme } from "../../../themes";
import { ChartContainer } from "./ChartContainer";

export const LineChart = ({
  title,
  data,
  siteVariables,
}: {
  title: string;
  data: IChartData;
  siteVariables: SiteVariablesPrepared;
}) => {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const chartId = React.useMemo(
    () => Math.random().toString(36).substr(2, 9),
    []
  );
  const chartDataPointColors = React.useMemo(
    () => [
      siteVariables.colorScheme.brand.background,
      siteVariables.colorScheme.brand.borderHover,
      siteVariables.colorScheme.brand.background4,
      siteVariables.colorScheme.default.borderHover,
      siteVariables.colorScheme.default.foreground2,
      siteVariables.colorScheme.default.foreground,
    ],
    [siteVariables]
  );

  const createDataPoints = (): Chart.ChartDataSets[] =>
    Array.from(data.datasets, (set, i) => {
      const dataColor =
        siteVariables.theme === TeamsTheme.HighContrast
          ? siteVariables.colorScheme.brand.background
          : chartDataPointColors[i];
      return {
        label: set.label,
        data: set.data,
        borderColor: dataColor,
        hoverBorderColor:
          siteVariables.theme === TeamsTheme.HighContrast
            ? siteVariables.colorScheme.default.borderHover
            : dataColor,
        hoverBorderWidth:
          siteVariables.theme === TeamsTheme.HighContrast ? 4 : 2,
        backgroundColor: "transparent",
        hoverBackgroundColor: "transparent",
        borderWidth: 2,
        pointBorderColor: dataColor,
        pointBackgroundColor: dataColor,
        pointHoverBackgroundColor: dataColor,
        pointHoverBorderColor: dataColor,
        pointHoverBorderWidth: 0,
        borderCapStyle: "round",
        borderJoinStyle: "round",
        pointBorderWidth: 0,
        pointRadius: siteVariables.theme === TeamsTheme.HighContrast ? 4 : 2,
        pointHoverRadius:
          siteVariables.theme === TeamsTheme.HighContrast ? 4 : 2,
        pointStyle:
          siteVariables.theme === TeamsTheme.HighContrast
            ? (lineChartPatterns[i].point as any)
            : "circle",
        borderDash:
          siteVariables.theme === TeamsTheme.HighContrast
            ? lineChartPatterns[i].line
            : [],
      };
    });

  /**
   * Chart initialization
   *
   * Alex: I fixed the stale variable issues by moving all chart state into
   * a single scope. This is a _temporary_ fix to fix the theming bug. Note
   * that you will lose _all chart state_ (selected index, etc.) when the
   * theme changes, since those variables are local to the chart instance.
   * This was the case before, but now it should be more obvious.
   *
   * What you probably want to do is the following:
   * 1. Setup variables (e.g. useState) to track current selection/data set.
   * These variables should be reset whenever the input dataset changes!
   * 2. When the canvas is created, initialize the chart.
   * 3. When the theme changes, _do not recreate the entire chart_. Instead,
   * see if it's possible to just apply the new theme.
   * 4. When this component unmounts (e.g. useEffect callback from #2) only
   * then should you destroy the chart instance.
   */
  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    let chart: any;
    let chartId = Math.random().toString(36).substr(2, 9);
    let selectedIndex = -1;
    let selectedDataSet = 0;

    function meta() {
      return chart.getDatasetMeta(selectedDataSet);
    }

    function removeFocusStyleOnClick() {
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
        chart,
        data,
        selectedDataSet,
        selectedIndex,
        siteVariables,
        true
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
      if (siteVariables.theme === TeamsTheme.HighContrast) {
        chart.data.datasets.map((dataset: any) => {
          dataset.borderColor = siteVariables.colorScheme.default.border;
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

    const ctx = canvasRef.current.getContext("2d");

    chart = new Chart(ctx!, {
      ...(lineChartConfig(siteVariables, chartDataPointColors) as any),
      data: {
        labels: data.labels,
        datasets: createDataPoints(),
      },
      plugins: [
        {
          afterDatasetsDraw: ({ ctx, tooltip }: any) => {
            if (tooltip._active && tooltip._active.length) {
              tooltipAxesYLine({
                chart,
                ctx,
                tooltip,
                siteVariables,
                chartDataPointColors,
              });
            }
          },
        },
      ],
    });

    /**
     * Color scheme updates
     *
     * "axesXGridLines" gradient to hide top part of the line, hidden gap applied by "borderDash"
     */
    const axesXGridLines = ctx!.createLinearGradient(100, 100, 100, 0);
    axesXGridLines.addColorStop(0.01, siteVariables.colorScheme.grey.border);
    axesXGridLines.addColorStop(0.01, "transparent");

    chart.options.scales.xAxes.forEach((xAxes: any, index: number) => {
      xAxes.ticks.fontColor = siteVariables.colorScheme.default.foreground2;
      if (index < 1) {
        xAxes.gridLines.color = axesXGridLines;
        xAxes.gridLines.zeroLineColor = axesXGridLines;
      } else {
        xAxes.gridLines.color = "transparent";
      }
      console.log({ xAxes });
    });
    chart.options.scales.yAxes.forEach((yAxes: any, index: number) => {
      yAxes.ticks.fontColor = siteVariables.colorScheme.default.foreground2;
      if (index < 1) {
        yAxes.gridLines.color = siteVariables.colorScheme.grey.border;
        yAxes.gridLines.zeroLineColor = siteVariables.colorScheme.grey.border;
      } else {
        yAxes.gridLines.color = "transparent";
      }
    });

    canvasRef.current.addEventListener("click", removeFocusStyleOnClick);
    canvasRef.current.addEventListener("keydown", changeFocus);
    canvasRef.current.addEventListener("focusout", resetChartStates);
    return () => {
      if (canvasRef.current) {
        canvasRef.current.removeEventListener("click", removeFocusStyleOnClick);
        canvasRef.current.removeEventListener("keydown", changeFocus);
        canvasRef.current.removeEventListener("focusout", resetChartStates);
      }
      chart.destroy();
    };
  }, [siteVariables]);

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
              <ul>
                <li>
                  {set.label}: {set.data[itemKey]}
                </li>
              </ul>
            </div>
          ))
        )}
      </canvas>
    </ChartContainer>
  );
};
