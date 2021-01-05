import React, { useEffect, useState } from "react";
import Chart from "chart.js";
import {
  ProviderConsumer as FluentUIThemeConsumer,
  Box,
  SiteVariablesPrepared,
  Toolbar as Legend,
  BoldIcon,
  ItalicIcon,
  Button,
  UnderlineIcon,
} from "@fluentui/react-northstar";
import { DataVizualizationTheme } from "./DataVizualizationTheme";
import { IChartData } from "./DataVisualizationTypes";
import { lineChartSettings, randomNumber } from "./Utils";

//--Chart Global Options--//
(Chart as any).defaults.global.defaultFontFamily = "'Segoe UI', sans-serif";
(Chart as any).defaults.global.legend.display = false;
//--Chart Global Options--//

export function DataVizualization({ config }: any) {
  // console.clear();
  return (
    <FluentUIThemeConsumer
      render={(globalTheme) => (
        <DataVizualizationTheme globalTheme={globalTheme}>
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
                    data: randomNumber(5) as number[],
                  },
                  {
                    label: "Bookings",
                    data: randomNumber(5) as number[],
                  },
                  {
                    label: "Bookings1",
                    data: randomNumber(5) as number[],
                  },
                  {
                    label: "Bookings2",
                    data: randomNumber(5) as number[],
                  },
                  {
                    label: "Bookings3",
                    data: randomNumber(5) as number[],
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

const LineChart = ({
  data,
  siteVariables,
}: {
  data: IChartData;
  siteVariables: SiteVariablesPrepared;
}) => {
  const [overflowOpen, setOverflowOpen] = useState(false);

  let chart: any;
  const chartRef = React.createRef<HTMLCanvasElement>();
  const chartId = Math.random().toString(36).substr(2, 9);

  /**
   * Tooltip keyboard manipulations
   */
  let selectedIndex = -1;
  let selectedDataSet = 0;
  let meta: any;

  function activate() {
    meta!.controller.setHoverStyle(meta!.data[selectedIndex], 0, selectedIndex);
    showTooltip(chart, selectedDataSet, selectedIndex);
    document
      .getElementById(`${chartId}-tooltip-${selectedDataSet}-${selectedIndex}`)
      ?.focus();
  }
  function activateNext() {
    selectedIndex = (selectedIndex + 1) % meta!.data.length;
    activate();
  }
  function activatePrev() {
    selectedIndex = (selectedIndex || meta!.data.length) - 1;
    activate();
  }

  function clearFocusState() {
    const activeElements = chart.tooltip._active;
    const requestedElem = chart.getDatasetMeta(selectedDataSet).data[
      selectedIndex
    ];
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
    /**
     * TODO:
     * 1. Focus styles
     * 2. Show focus just on Tab
     */

    switch (e.key) {
      case "ArrowRight":
        activateNext();
        break;
      case "ArrowLeft":
        activatePrev();
        break;
      case "ArrowUp":
        if (data.datasets.length > 1) {
          selectedIndex -= 1;
          selectedDataSet += 1;
          if (selectedDataSet === data.datasets.length) {
            selectedDataSet = 0;
          }
          meta = chart.getDatasetMeta(selectedDataSet);
          activateNext();
        }
        break;
      case "ArrowDown":
        if (data.datasets.length > 1) {
          selectedIndex -= 1;
          selectedDataSet -= 1;
          if (selectedDataSet < 0) {
            selectedDataSet = data.datasets.length - 1;
          }
          meta = chart.getDatasetMeta(selectedDataSet);
          activateNext();
        }
        break;
    }
  }

  /**
   * Color palette
   */
  const chartColorPalette = [
    siteVariables.colorScheme.brand.background,
    siteVariables.colorScheme.brand.background2,
    siteVariables.colorScheme.brand.background4,
    siteVariables.colorScheme.brand.foregroundDisabled,
  ];

  console.log(siteVariables.colorScheme);

  /**
   * Chart initialization
   */
  useEffect(() => {
    if (chartRef && chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      chart = new Chart(ctx!, {
        ...lineChartSettings,
        data: {
          labels: data.labels,
          datasets: Array.from(data.datasets, (set, index) => ({
            label: set.label,
            data: set.data,
            borderColor: chartColorPalette[index],
            backgroundColor: "transparent",
            borderWidth: 2,
            pointBorderColor: chartColorPalette[index],
            pointBackgroundColor: chartColorPalette[index],
            pointHoverBackgroundColor: chartColorPalette[index],
            pointHoverBorderColor: chartColorPalette[index],
            borderCapStyle: "round",
            borderJoinStyle: "round",
            pointBorderWidth: 0,
            pointRadius: 2,
          })),
        },
      });
      /**
       * Color scheme updates
       */
      chart.config.options.scales.xAxes.forEach((xAxes: any, index: number) => {
        xAxes.ticks.fontColor = siteVariables.colorScheme.default.foreground2;
        if (index < 1) {
          xAxes.gridLines.color = siteVariables.colorScheme.grey.border;
          xAxes.gridLines.zeroLineColor = siteVariables.colorScheme.grey.border;
        } else {
          xAxes.gridLines.color = "transparent";
        }
      });
      chart.config.options.scales.yAxes.forEach((yAxes: any, index: number) => {
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
      chartRef.current.addEventListener("keydown", changeFocus);
      chartRef.current.addEventListener("focusout", clearFocusState);
    }
    return () => {
      if (chartRef && chartRef.current) {
        chartRef.current.removeEventListener("focusout", clearFocusState);
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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "0 1rem",
          fontSize: ".75rem",
        }}
      >
        <div
          style={{
            width: ".6rem",
            height: ".6rem",
            backgroundColor: chartColorPalette[i],
            margin: "0 .4rem",
          }}
        ></div>{" "}
        {dataset.label}
      </div>
    ),
    fitted: "horizontally",
  }));

  const toolbarItems = legendItems;

  return (
    <>
      <canvas
        id={chartId}
        width="600"
        height="320"
        ref={chartRef}
        tabIndex={0}
        style={{ userSelect: "none" }}
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
          title: "More",
        }}
        onOverflowOpenChange={(e, props) => {
          setOverflowOpen(!!props?.overflowOpen);
        }}
        getOverflowItems={(startIndex) => legendItems.slice(startIndex)}
      />
    </>
  );
};

function showTooltip(chart: any, set: number, index: number) {
  const segment = chart.getDatasetMeta(set).data[index];
  chart.tooltip._active = [segment];
  // console.log("chart.tooltip ", chart.tooltip);
  chart.tooltip.update();
  chart.draw();
}
