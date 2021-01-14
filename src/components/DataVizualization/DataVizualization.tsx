import React, { useEffect, useState } from "react";
import Chart from "chart.js";
import _ from "lodash";
import {
  ProviderConsumer as FluentUIThemeConsumer,
  Box,
  SiteVariablesPrepared,
  Toolbar as Legend,
  Button as LegendItem,
  BoldIcon,
  Flex,
} from "@fluentui/react-northstar";
import { DataVizualizationTheme } from "./DataVizualizationTheme";
import { IChartData, IChartDataSet, ChartType } from "./DataVisualizationTypes";
import { hexToRgb, lineChartSettings } from "./Utils";
import { TeamsTheme } from "../../themes";

export function DataVizualization({
  chartType,
  data,
}: {
  chartType: ChartType;
  data: IChartData;
}) {
  console.clear();
  let chartSettings = {
    settings: lineChartSettings,
    stacked: false,
    area: false,
  };
  switch (chartType) {
    case ChartType.Line:
    default:
      break;
    case ChartType.LineStacked:
      chartSettings.stacked = true;
      break;
    case ChartType.LineArea:
      chartSettings.area = true;
      break;
  }
  return (
    <FluentUIThemeConsumer
      render={(globalTheme) => (
        <DataVizualizationTheme globalTheme={globalTheme}>
          <LineChart
            data={data}
            siteVariables={globalTheme.siteVariables}
            {...chartSettings}
          />
        </DataVizualizationTheme>
      )}
    />
  );
}

/**
 * TODO:
 * (x). Test keyboard access with a few charts at the page
 * 2. Colors
 * (x). Max/Min value to define steps
 */

(Chart as any).defaults.global.legend.display = false;
(Chart as any).defaults.global.defaultFontFamily = `"Segoe UI", system-ui, "Apple Color Emoji", "Segoe UI Emoji", sans-serif`;

const LineChart = ({
  data,
  siteVariables,
  settings,
  stacked,
  area,
}: {
  data: IChartData;
  siteVariables: SiteVariablesPrepared;
  settings: any;
  stacked: boolean;
  area: boolean;
}) => {
  const [overflowOpen, setOverflowOpen] = useState(false);
  const [overflowItems, setOverflowItems] = useState<number>(0);
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const chartId = React.useMemo(
    () => Math.random().toString(36).substr(2, 9),
    []
  );
  const colors = React.useMemo(
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
      showTooltip(chart, data, selectedDataSet, selectedIndex);
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

    const chartPattern = [
      { line: [], point: "circle" },
      { line: [], point: "rect" },
      { line: [], point: "triangle" },
      { line: [5, 5], point: "cross" },
      { line: [5, 5], point: "rectRot" },
      { line: [5, 5], point: "crossRot" },
    ];

    const ctx = canvasRef.current.getContext("2d");
    const config = _.merge(settings, {
      options: {
        tooltips: {
          backgroundColor:
            siteVariables.theme === TeamsTheme.Dark
              ? siteVariables.colorScheme.default.border2
              : siteVariables.colorScheme.default.foregroundFocus,

          yPadding: 12,
          xPadding: 20,
          caretPadding: 10,
          borderColor: siteVariables.colorScheme.onyx.border,
          borderWidth: siteVariables.theme === TeamsTheme.HighContrast ? 1 : 0,
          multiKeyBackground: siteVariables.colorScheme.white.foreground,

          // Tooltip Title
          titleFontFamily: siteVariables.bodyFontFamily,
          titleFontStyle: "200",
          titleFontSize: 20,
          titleFontColor: siteVariables.colorScheme.default.foreground3,
          // Tooltip Body
          bodyFontFamily: siteVariables.bodyFontFamily,
          bodySpacing: 4,
          bodyFontSize: 11.5,
          bodyFontStyle: "400",
          bodyFontColor: siteVariables.colorScheme.default.foreground3,
          // Tooltip Footer
          footerFontFamily: siteVariables.bodyFontFamily,
          footerFontStyle: "300",
          footerFontSize: 10,
          footerFontColor: siteVariables.colorScheme.default.foreground3,

          callbacks: {
            title: (tooltipItems: any) => {
              return tooltipItems[0].yLabel;
            },
            label: (tooltipItem: any, data: any) => {
              return data.datasets[tooltipItem.datasetIndex].label;
            },
            labelColor: (tooltipItem: any) => {
              return {
                borderColor: "transparent",
                backgroundColor: colors[tooltipItem.datasetIndex],
              };
            },
            footer: (tooltipItems: any, data: any) => {
              return tooltipItems[0].xLabel;
            },
          },
        },
      },
    });

    let pointRadius = 2;
    if (stacked) {
      pointRadius = 0;
    } else if (siteVariables.theme === TeamsTheme.HighContrast) {
      pointRadius = 4;
    }
    chart = new Chart(ctx!, {
      ...config,
      data: {
        labels: data.labels,
        datasets: Array.from(data.datasets, (set, index) => {
          const dataColor =
            siteVariables.theme === TeamsTheme.HighContrast
              ? siteVariables.colorScheme.default.borderHover
              : colors[index];
          let backgroundColor = "transparent";
          if (stacked) {
            backgroundColor = dataColor;
          }
          if (area) {
            const gradientStroke = ctx!.createLinearGradient(0, 0, 0, 160); // Chart height
            const colorRGB = hexToRgb(dataColor);
            const colorRGBString = `${colorRGB!.r}, ${colorRGB!.g}, ${
              colorRGB!.b
            }`;
            console.log(colorRGBString);
            gradientStroke.addColorStop(0, `rgba(${colorRGBString}, .55)`);
            gradientStroke.addColorStop(1, `rgba(${colorRGBString}, .0)`);
            backgroundColor = gradientStroke as any;
          }
          return {
            label: set.label,
            data: set.data,
            borderColor: dataColor,
            backgroundColor,
            borderWidth: 2,
            pointBorderColor: dataColor,
            pointBackgroundColor: dataColor,
            pointHoverBackgroundColor: dataColor,
            pointHoverBorderColor: dataColor,
            pointHoverBorderWidth: 0,
            borderCapStyle: "round",
            borderJoinStyle: "round",
            pointBorderWidth: 0,
            pointRadius,
            pointHoverRadius: pointRadius,
            pointStyle:
              siteVariables.theme === TeamsTheme.HighContrast
                ? (chartPattern[index].point as any)
                : "circle",
            borderDash:
              siteVariables.theme === TeamsTheme.HighContrast
                ? chartPattern[index].line
                : [],
          };
        }),
      },
      plugins: [
        {
          afterDatasetsDraw: ({ ctx, tooltip }: any) => {
            if (tooltip._active && tooltip._active.length) {
              const activePoint = tooltip._active[0],
                y = activePoint.tooltipPosition().y,
                x = activePoint.tooltipPosition().x,
                y_axis = chart.scales["y-axis-0"],
                topY = y_axis.top,
                bottomY = y_axis.bottom;

              ctx.save();
              // Line
              ctx.beginPath();
              ctx.moveTo(x, topY);
              ctx.lineTo(x, bottomY);
              ctx.setLineDash([5, 5]);
              ctx.lineWidth = 0.75;
              ctx.strokeStyle = siteVariables.colorScheme.default.border;
              ctx.stroke();
              // Point
              ctx.beginPath();
              ctx.setLineDash([]);
              ctx.arc(x, y, 5, 0, 2 * Math.PI, true);
              ctx.lineWidth = 2;
              ctx.fillStyle = siteVariables.colorScheme.white.foreground;
              ctx.strokeStyle = colors[activePoint._datasetIndex];
              ctx.closePath();
              ctx.fill();
              ctx.stroke();

              ctx.restore();
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
        yAxes.stacked = stacked;
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

  /**
   * Legend
   */

  const legendItems = data.datasets.map((dataset, i) => ({
    key: i,
    kind: "custom",
    content: (
      <LegendItem
        styles={{
          display: "flex",
          alignItems: "center",
          fontSize: ".75rem",
          minWidth: "30px",
          color: siteVariables.colorScheme.default.foreground2,
          border: data.datasets[i].isSelected ? "1px solid red" : "none",
        }}
        onClick={() => {
          data.datasets[i].isSelected = !data.datasets[i].isSelected;
          data.datasets.map((dataset, index) => {
            if (!dataset.isSelected) {
              console.log(index);
            }
          });
        }}
        text
      >
        <Box
          styles={{
            width: ".6rem",
            height: ".6rem",
            backgroundColor: colors[i],
            margin: "0 0 -1px",
            marginRight: ".4rem",
            borderRadius: siteVariables.borderRadius,
          }}
        />
        {dataset.label}
      </LegendItem>
    ),
    fitted: "horizontally",
  }));

  const toolbarItems = legendItems;

  return (
    <Flex column style={{ height: "100%" }}>
      <Box
        styles={{
          flexGrow: 1,
          backgroundColor: siteVariables.colorScheme.grey.background,
        }}
      >
        <canvas
          id={chartId}
          ref={canvasRef}
          tabIndex={0}
          style={{
            userSelect: "none",
          }}
          aria-label="[TODO]"
        >
          <title>[TODO]</title>
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
      </Box>
      <Box>
        <Legend
          aria-label="Toolbar overflow menu"
          items={toolbarItems}
          overflow
          overflowOpen={overflowOpen}
          overflowItem={{
            icon: (
              <BoldIcon
                styles={{
                  position: "relative",
                  width: "3.5rem",
                  height: "1rem",
                  borderRadius: "4px",
                  "& svg": {
                    display: "none",
                  },
                  "&::after": {
                    content: `"${overflowItems} more"`,
                    display: "block",
                    position: "absolute",
                    top: 0,
                    left: ".5rem",
                    minWidth: "3rem",
                    textAlign: "left",
                    fontSize: ".75rem",
                    color: siteVariables.colorScheme.brand.foreground,
                  },
                }}
              />
            ),
          }}
          onOverflowOpenChange={(e, props) => {
            setOverflowOpen(!!props?.overflowOpen);
          }}
          onOverflow={(items) => setOverflowItems(toolbarItems.length - items)}
          getOverflowItems={(startIndex) => legendItems.slice(startIndex)}
          styles={{
            width: "calc(100% + .8rem)",
            backgroundColor: siteVariables.colorScheme.grey.background,
          }}
        />
      </Box>
    </Flex>
  );
};

function showTooltip(chart: any, data: IChartData, set: number, index: number) {
  const duplicates: number[] = [];
  const segments: any[] = [];
  // Check fro equal data points
  data.datasets.filter((dataset: IChartDataSet, i: number) => {
    if (dataset.data[index] === data.datasets[set].data[index]) {
      duplicates.push(i);
    }
  });
  duplicates.forEach((segmentId) => {
    segments.push(chart.getDatasetMeta(segmentId).data[index]);
  });
  chart.tooltip._active = segments;
  chart.tooltip.update();
  chart.draw();
}
