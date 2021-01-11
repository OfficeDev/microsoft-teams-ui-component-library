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
} from "@fluentui/react-northstar";
import { DataVizualizationTheme } from "./DataVizualizationTheme";
import { IChartData, IChartDataSet } from "./DataVisualizationTypes";
import { lineChartSettings } from "./Utils";
import { TeamsTheme } from "../../themes";

export function DataVizualization({}: any) {
  console.clear();
  return (
    <FluentUIThemeConsumer
      render={(globalTheme) => (
        <DataVizualizationTheme globalTheme={globalTheme}>
          <Box
            styles={{
              margin: "1rem",
              padding: "1rem",
              borderRadius: "3px",
              maxWidth: "30rem",
              background:
                globalTheme.siteVariables.colorScheme.default.background,
            }}
          >
            <LineChart
              data={{
                labels: ["Jan", "Feb", "March", "April", "May"],
                datasets: [
                  {
                    label: "Tablets",
                    data: [860, 6700, 3100, 2012, 1930],
                  },
                  {
                    label: "Phones",
                    data: [100, 1600, 180, 3049, 3596],
                  },
                  {
                    label: "Laptops",
                    data: [1860, 7700, 4100, 3012, 2930],
                  },
                  {
                    label: "Watches",
                    data: [200, 3600, 480, 5049, 4596],
                  },
                  {
                    label: "TV",
                    data: [960, 8700, 5100, 5012, 3930],
                  },
                  {
                    label: "Displayes",
                    data: [1000, 4600, 480, 4049, 3596],
                  },
                ],
              }}
              siteVariables={globalTheme.siteVariables}
            />
          </Box>
          <Box
            styles={{
              margin: "1rem",
              padding: "1rem",
              borderRadius: "3px",
              background:
                globalTheme.siteVariables.colorScheme.default.background,
            }}
          >
            <LineChart
              data={{
                labels: ["Jan", "Feb", "March", "April", "May"],
                datasets: [
                  {
                    label: "Sales",
                    data: [860, 6700, 3100, 2012, 1930],
                  },
                  {
                    label: "Bookings",
                    data: [100, 1600, 180, 3049, 3596],
                  },
                ],
              }}
              siteVariables={globalTheme.siteVariables}
            />
          </Box>
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
}: {
  data: IChartData;
  siteVariables: SiteVariablesPrepared;
}) => {
  const [overflowOpen, setOverflowOpen] = useState(false);
  const [overflowItems, setOverflowItems] = useState<number>(0);

  let chart: any;
  const chartRef = React.createRef<HTMLCanvasElement>();
  const chartId = Math.random().toString(36).substr(2, 9);

  /**
   * Tooltip keyboard manipulations
   */
  let selectedIndex = -1;
  let selectedDataSet = 0;
  let meta: any;

  function removeFocusStyleOnClick() {
    if (chartRef && chartRef.current) {
      chartRef.current.style.boxShadow = "none";
    }
  }

  function removeDataPointsHoverStates() {
    if (selectedIndex > -1) {
      meta!.controller.removeHoverStyle(
        meta!.data[selectedIndex],
        0,
        selectedIndex
      );
    }
  }

  function hoverDataPoint(pointID: number) {
    meta!.controller.setHoverStyle(
      meta!.data[pointID],
      selectedDataSet,
      pointID
    );
  }

  function showFocusedDataPoint() {
    hoverDataPoint(selectedIndex);
    showTooltip(chart, data, selectedDataSet, selectedIndex);
    document
      .getElementById(`${chartId}-tooltip-${selectedDataSet}-${selectedIndex}`)
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
        selectedIndex = (selectedIndex + 1) % meta!.data.length;
        break;
      case "ArrowLeft":
        e.preventDefault();
        selectedIndex = (selectedIndex || meta!.data.length) - 1;
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
          const sorted = [...Array.from(new Set(values))].sort((a, b) => a - b);
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
                v === sorted[e.key === "ArrowUp" ? 0 : data.datasets.length - 1]
            );
          }
          selectedDataSet = nextDataSet;

          meta = chart.getDatasetMeta(selectedDataSet);
          selectedIndex = selectedIndex % meta!.data.length;
        }
        break;
    }

    showFocusedDataPoint();
  }

  /**
   * Color palette
   */
  const chartColorPalette = [
    siteVariables.colorScheme.brand.background,
    siteVariables.colorScheme.brand.borderHover,
    siteVariables.colorScheme.brand.background4,
    siteVariables.colorScheme.default.background4,
    siteVariables.colorScheme.default.foreground2,
    siteVariables.colorScheme.default.foreground,
  ];
  const chartPattern = [
    { line: [], point: "circle" },
    { line: [], point: "rect" },
    { line: [], point: "triangle" },
    { line: [5, 5], point: "cross" },
    { line: [5, 5], point: "rectRot" },
    { line: [5, 5], point: "crossRot" },
  ];

  /**
   * Chart initialization
   */
  useEffect(() => {
    if (chartRef && chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      const config = _.merge(lineChartSettings, {
        options: {
          tooltips: {
            backgroundColor:
              siteVariables.theme === TeamsTheme.Dark
                ? siteVariables.colorScheme.default.border2
                : siteVariables.colorScheme.default.foregroundFocus,
            bodySpacing: 4,
            bodyFontSize: 10,
            bodyFontStyle: "100",
            yPadding: 12,
            xPadding: 20,
            caretPadding: 10,
            multiKeyBackground: siteVariables.colorScheme.white.foreground,

            titleFontFamily: siteVariables.bodyFontFamily,
            titleFontStyle: "100",
            titleFontSize: 20,
            bodyFontFamily: siteVariables.bodyFontFamily,

            footerFontFamily: siteVariables.bodyFontFamily,
            footerFontStyle: "100",
            footerFontSize: 10,

            footerFontColor:
              siteVariables.colorScheme.default.foregroundDisabled1,
            bodyFontColor: siteVariables.colorScheme.default.foreground3,
            titleFontColor: siteVariables.colorScheme.default.foreground3,

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
                  backgroundColor: chartColorPalette[tooltipItem.datasetIndex],
                };
              },
              footer: (tooltipItems: any, data: any) => {
                return tooltipItems[0].xLabel;
              },
            },
          },
        },
      });
      chart = new Chart(ctx!, {
        ...config,
        data: {
          labels: data.labels,
          datasets: Array.from(data.datasets, (set, index) => {
            const dataColor =
              siteVariables.theme === TeamsTheme.HighContrast
                ? siteVariables.colorScheme.default.borderHover
                : chartColorPalette[index];
            return {
              label: set.label,
              data: set.data,
              borderColor: dataColor,
              backgroundColor: "transparent",
              borderWidth: 2,
              pointBorderColor: dataColor,
              pointBackgroundColor: dataColor,
              pointHoverBackgroundColor: dataColor,
              pointHoverBorderColor: dataColor,
              pointHoverBorderWidth: 0,
              borderCapStyle: "round",
              borderJoinStyle: "round",
              pointBorderWidth: 0,
              pointRadius:
                siteVariables.theme === TeamsTheme.HighContrast ? 4 : 2,
              pointHoverRadius:
                siteVariables.theme === TeamsTheme.HighContrast ? 4 : 2,
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
                ctx.strokeStyle = chartColorPalette[activePoint._datasetIndex];
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
      meta = chart.getDatasetMeta(selectedDataSet);
      chartRef.current.addEventListener("click", removeFocusStyleOnClick);
      chartRef.current.addEventListener("keydown", changeFocus);
      chartRef.current.addEventListener("focusout", resetChartStates);
    }
    return () => {
      if (chartRef && chartRef.current) {
        chartRef.current.addEventListener("click", removeFocusStyleOnClick);
        chartRef.current.removeEventListener("focusout", resetChartStates);
        chartRef.current.removeEventListener("keydown", changeFocus);
        chart.destroy();
      }
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
        }}
        text
      >
        <Box
          styles={{
            width: ".6rem",
            height: ".6rem",
            backgroundColor: chartColorPalette[i],
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
    <Box
      styles={{
        margin: "0 -1rem",
        width: "calc(100% + 1rem)",
      }}
    >
      <canvas
        id={chartId}
        ref={chartRef}
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
          content: <div>21134</div>,
        }}
        onOverflowOpenChange={(e, props) => {
          setOverflowOpen(!!props?.overflowOpen);
        }}
        onOverflow={(items) => setOverflowItems(toolbarItems.length - items)}
        getOverflowItems={(startIndex) => legendItems.slice(startIndex)}
        styles={{
          margin: "0 .8rem",
        }}
      />
    </Box>
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
