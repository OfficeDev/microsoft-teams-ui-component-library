import React, { useEffect } from "react";
import Chart from "chart.js";
import {
  ProviderConsumer as FluentUIThemeConsumer,
  Box,
} from "@fluentui/react-northstar";
import { DataVizualizationTheme } from "./DataVizualizationTheme";
import Toolbar from "../Toolbar";

const toolbarConfig = {
  actionGroups: {
    h1: {
      b1: { title: "Edit dashboard", icon: "Edit" },
    },
  },
  filters: [],
  find: false,
};

export function DataVizualization({ config }: any) {
  return (
    <FluentUIThemeConsumer
      render={(globalTheme) => (
        <DataVizualizationTheme globalTheme={globalTheme}>
          <Toolbar {...toolbarConfig} />
          <Box
            styles={{
              backgroundColor: "white",
              display: "grid",
              gridGap: ".5rem",
              gridTemplate:
                "repeat(auto-fill, 26rem) / repeat(auto-fill, minmax(18.75rem, 1fr))",
              gridAutoFlow: "dense",
              gridAutoRows: "26rem",
              padding: " 1rem 1rem 1.25rem",
              minWidth: "20rem",
              "@media (max-width: 986px)": {
                gridTemplate:
                  "repeat(auto-fill, 25rem) / repeat(auto-fill, minmax(15.75rem, 1fr))",
              },
            }}
          >
            <ChartContainer />
          </Box>
        </DataVizualizationTheme>
      )}
    />
  );
}

//--Chart Style Options--//
(Chart as any).defaults.global.defaultFontFamily = "'Segoe UI', sans-serif";
(Chart as any).defaults.global.legend.display = false;
(Chart as any).defaults.global.elements.line.tension = 0;
//--Chart Style Options--//

const useInitialfocus = (ref: any) => {
  useEffect(() => {
    ref.current.focus();
  }, [ref]);
};
export default useInitialfocus;

function ChartContainer() {
  console.clear();

  let chart: Chart;
  const chartRef = React.createRef<HTMLCanvasElement>();
  const chartData = {
    type: "line",
    data: {
      //Bring in data
      labels: ["Jan", "Feb", "March"],
      datasets: [
        {
          label: "Sales",
          data: [86, 67, 91],
        },
      ],
    },
    options: {
      tooltips: {},
    },
  };

  let meta: any;
  useEffect(() => {
    if (chartRef && chartRef.current) {
      const myChartRef = chartRef.current.getContext("2d");
      chart = new Chart(myChartRef!, chartData);
      meta = chart.getDatasetMeta(0);
    }
  }, []);

  /* Help ScreenReaders read canvas info*/
  const tooltips = [];

  /* Keyboard manipulation */

  let selectedIndex = -1;
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
    meta!.controller.setHoverStyle(meta!.data[selectedIndex], 0, selectedIndex);
    showTooltip(chart, selectedIndex);
    // TODO:
    document.getElementById(`tooltip-${selectedIndex}`)?.focus();
  }

  function activateNext() {
    clearActive();
    selectedIndex = (selectedIndex + 1) % meta!.data.length;
    activate();
  }

  function activatePrev() {
    clearActive();
    selectedIndex = (selectedIndex || meta!.data.length) - 1;
    activate();
  }

  React.useEffect(() => {
    const initFocusState = () => {
      if (selectedIndex === -1) {
        activateNext();
      } else {
        activate();
      }
    };
    const clearFocusState = () => {
      clearActive();
      chart.render();
    };

    const changeFocus = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        activateNext();
      } else if (e.key === "ArrowLeft") {
        activatePrev();
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
    };
  }, []);

  return (
    <div style={{ width: 600 }}>
      <canvas
        width="600"
        height="320"
        ref={chartRef}
        tabIndex={0}
        style={{ userSelect: "none" }}
        aria-label="Sales chart"
      >
        <title></title>
        {
          // TODO: All chart objects should be represented heres
        }
        {chartData.data.labels.map((item, key) => (
          // Should be unique ID
          <div key={key} id={`tooltip-${key}`} tabIndex={0}>
            <p>{item}</p>
            <ul>
              {chartData.data.datasets.map((dataset, i) => (
                <li key={i}>
                  {dataset.label}: {dataset.data[key]}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </canvas>
    </div>
  );
}

function showTooltip(chart: any, index: number) {
  var segment = chart.getDatasetMeta(0).data[index];
  chart.tooltip._active = [segment];
  chart.tooltip.update();
  chart.draw();
  console.log(chart.getDatasetMeta(0), chart, chart.tooltip);
}
