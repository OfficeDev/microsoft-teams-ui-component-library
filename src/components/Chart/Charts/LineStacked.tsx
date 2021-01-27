import React, { useEffect } from "react";
import Chart from "chart.js";
import { SiteVariablesPrepared } from "@fluentui/react-northstar";
import { TeamsTheme } from "../../../themes";
import { IChartData } from "../ChartTypes";
import {
  tooltipTrigger,
  tooltipAxesYLine,
  lineChartConfig,
} from "../ChartUtils";
import { ChartContainer } from "./ChartContainer";
import {
  buildPattern,
  chartDataPointPatterns,
  lineChartPatterns,
} from "../ChartPatterns";

export const LineStackedChart = ({
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
  const chartId = React.useMemo(
    () => Math.random().toString(36).substr(2, 9),
    []
  );
  const chartDataPointColors = React.useMemo(
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

  const createDataPoints = (
    ctx: CanvasRenderingContext2D | null
  ): Chart.ChartDataSets[] =>
    Array.from(data.datasets, (set, i) => {
      const dataColor =
        theme === TeamsTheme.HighContrast
          ? colorScheme.default.border
          : colorScheme.default.background;
      const backgroundColor =
        theme === TeamsTheme.HighContrast
          ? buildPattern(chartDataPointPatterns(colorScheme)[i])
          : chartDataPointColors[i];
      const hoverBackgroundColor =
        theme === TeamsTheme.HighContrast
          ? buildPattern({
              shapeType: chartDataPointPatterns(colorScheme)[i].shapeType,
              backgroundColor: chartDataPointPatterns(
                siteVariables.colorScheme
              )[i].backgroundColor,
              patternColor: colorScheme.default.borderHover,
              size: chartDataPointPatterns(colorScheme)[i].size,
            })
          : backgroundColor;

      return {
        label: set.label,
        data: set.data,
        borderWidth: theme === TeamsTheme.HighContrast ? 3 : 1,
        borderColor: dataColor,
        hoverBorderColor:
          theme === TeamsTheme.HighContrast
            ? colorScheme.default.borderHover
            : backgroundColor,
        backgroundColor,
        hoverBorderWidth:
          siteVariables.theme === TeamsTheme.HighContrast ? 4 : 2,
        hoverBackgroundColor,
        pointBorderColor: dataColor,
        pointBackgroundColor: dataColor,
        pointHoverBackgroundColor: dataColor,
        pointHoverBorderColor:
          theme === TeamsTheme.HighContrast
            ? colorScheme.default.borderHover
            : backgroundColor,
        pointHoverBorderWidth: 2,
        borderCapStyle: "round",
        borderJoinStyle: "round",
        pointBorderWidth: 0,
        pointRadius: 0,
        pointHoverRadius:
          siteVariables.theme === TeamsTheme.HighContrast ? 4 : 3,
        pointStyle:
          siteVariables.theme === TeamsTheme.HighContrast
            ? lineChartPatterns[i].pointStyle
            : "circle",
        borderDash: [],
      };
    });

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
      if (siteVariables.theme === TeamsTheme.HighContrast) {
        chart.data.datasets.map((dataset: any, i: number) => {
          dataset.borderColor = siteVariables.colorScheme.default.border;
          dataset.borderWidth = 2;
          dataset.backgroundColor = buildPattern(
            chartDataPointPatterns(colorScheme)[i]
          );
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

    const ctx = canvasRef.current.getContext("2d");

    const chartConfig = lineChartConfig(siteVariables, chartDataPointColors);
    chartConfig.options.scales.yAxes[0].stacked = true;
    chartConfig.options.tooltips.callbacks.title = (tooltipItems: any) => {
      let total = 0;
      data.datasets.map(
        (dataset) => (total += dataset.data[tooltipItems[0].index])
      );
      return `${((tooltipItems[0].yLabel / total) * 100).toPrecision(2)}% (${
        tooltipItems[0].yLabel
      })`;
    };
    if (theme === TeamsTheme.HighContrast) {
      (chartConfig as any).options.tooltips.callbacks.labelColor = (
        tooltipItem: any
      ) => {
        return {
          borderColor: "transparent",
          backgroundColor: buildPattern({
            shapeType: chartDataPointPatterns(colorScheme)[
              tooltipItem.datasetIndex
            ].shapeType,
            backgroundColor: chartDataPointPatterns(colorScheme)[
              tooltipItem.datasetIndex
            ].backgroundColor,
            patternColor: colorScheme.default.borderHover,
            size: chartDataPointPatterns(colorScheme)[tooltipItem.datasetIndex]
              .size,
          }),
        };
      };
    }
    chartConfig.options.tooltips.callbacks;
    chart = new Chart(ctx!, {
      ...(chartConfig as any),
      data: {
        labels: data.labels,
        datasets: createDataPoints(ctx),
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
    /**
     * Color scheme updates
     */
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
      patterns
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
