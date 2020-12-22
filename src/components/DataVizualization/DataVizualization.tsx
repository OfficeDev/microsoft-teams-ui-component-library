import React, { useEffect } from "react";
import {
  Chart,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Tooltip,
  CategoryScale,
} from "chart.js";
import {
  ProviderConsumer as FluentUIThemeConsumer,
  Box,
} from "@fluentui/react-northstar";
import { DataVizualizationTheme } from "./DataVizualizationTheme";
import { IChartData } from "./DataVisualizationTypes";
import { lineChartSettings } from "./Utils";

export function DataVizualization({ config }: any) {
  return (
    <FluentUIThemeConsumer
      render={(globalTheme) => (
        <DataVizualizationTheme globalTheme={globalTheme}>
          <Box
            styles={{
              width: "600px",
              margin: "1rem",
              padding: "1rem",
              borderRadius: "3px",
              background: "white",
            }}
          >
            <LineChart
              data={{
                labels: [
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                ],
                datasets: [
                  {
                    label: "My First dataset",
                    backgroundColor: "rgb(255, 99, 132)",
                    borderColor: "rgb(255, 99, 132)",
                    data: [0, 10, 5, 2, 20, 30, 45],
                  },
                ],
              }}
            />
          </Box>
        </DataVizualizationTheme>
      )}
    />
  );
}

/**
 * TODO:
 * 1. Test keyboard access with a few charts at the page
 * 2. Colors
 * 3. Max/Min value to define steps
 */

//--Chart Style Options--//
// (Chart as any).defaults.global.defaultFontFamily = "'Segoe UI', sans-serif";
// (Chart as any).defaults.global.legend.display = false;
//--Chart Style Options--//

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Tooltip,
  CategoryScale
);

function LineChart({ data }: { data: IChartData }) {
  console.clear();

  let chart: Chart;
  const chartRef = React.createRef<HTMLCanvasElement>();

  let selectedIndex = -1;
  let selectedDataSet = 0;
  let meta: any;

  /* Keyboard manipulation */
  function clearActive() {
    if (selectedIndex > -1) {
      meta!.controller.removeHoverStyle(
        meta!.data[selectedIndex],
        0,
        selectedIndex
      );
    }
  }
  function activate() {
    console.log(meta);
    // meta!.controller.setHoverStyle(
    //   meta!.data[selectedIndex],
    //   null,
    //   selectedIndex
    // );
    showTooltip(chart, selectedDataSet, selectedIndex);
    document
      .getElementById(`tooltip-${selectedDataSet}-${selectedIndex}`)
      ?.focus();
  }

  function activateNext() {
    // clearActive();
    // selectedIndex = (selectedIndex + 1) % meta!.data.length;
    // activate();
  }

  function activatePrev() {
    clearActive();
    selectedIndex = (selectedIndex || meta!.data.length) - 1;
    activate();
  }

  useEffect(() => {
    if (chartRef && chartRef.current) {
      const myChartRef = chartRef.current.getContext("2d");
      chart = new Chart(myChartRef!, {
        type: "line",
        data,
      });

      meta = chart.getDatasetMeta(selectedDataSet);
    }

    const initFocusState = () => {
      // if (selectedIndex === -1) {
      //   activateNext();
      // } else {
      //   activate();
      // }
    };
    const clearFocusState = () => {
      // clearActive();
      // chart.render();
    };

    const changeFocus = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowRight":
          activateNext();
          break;
        case "ArrowLeft":
          activatePrev();
          break;
        // case "ArrowUp":
        //   if (data.datasets.length > 1) {
        //     selectedIndex -= 1;
        //     selectedDataSet += 1;
        //     if (selectedDataSet === data.datasets.length) {
        //       selectedDataSet = 0;
        //     }
        //     meta = chart.getDatasetMeta(selectedDataSet);
        //     activateNext();
        //   }
        //   break;
        // case "ArrowDown":
        //   if (data.datasets.length > 1) {
        //     selectedIndex -= 1;
        //     selectedDataSet -= 1;
        //     if (selectedDataSet < 0) {
        //       selectedDataSet = data.datasets.length - 1;
        //     }
        //     meta = chart.getDatasetMeta(selectedDataSet);
        //     activateNext();
        //   }
        //   break;
      }
    };

    if (chartRef && chartRef.current) {
      chartRef.current.addEventListener("focus", initFocusState);
      chartRef.current.addEventListener("blur", clearFocusState);
      chartRef.current.addEventListener("keydown", changeFocus);
    }

    return () => {
      if (chartRef && chartRef.current) {
        chartRef.current.removeEventListener("focus", initFocusState);
        chartRef.current.removeEventListener("blur", clearFocusState);
        chartRef.current.removeEventListener("keydown", changeFocus);
      }
      chart.destroy();
    };
  }, []);

  return (
    <canvas
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
          // Should be unique ID
          <div key={itemKey} id={`tooltip-${setKey}-${itemKey}`} tabIndex={0}>
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
  );
}

function showTooltip(chart: any, set: number, index: number) {
  const segment = chart.getDatasetMeta(set).data[index];
  console.log(segment);
  chart.tooltip._active = [segment];
  chart.tooltip.update();
  chart.draw();
}
