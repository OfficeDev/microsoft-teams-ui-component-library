import { SiteVariablesPrepared } from "@fluentui/react-northstar";
import Chart from "chart.js";
import { IChartData, IChartDataSet } from ".";
import { TeamsTheme } from "../../themes";
import { buildPattern, chartDataPointPatterns } from "./ChartPatterns";

// TODO: Localization
const suffixes = ["K", "M", "G", "T", "P", "E"];

export const chartAxis = (value: number | string): string => {
  if (value < 1000) {
    return String(value);
  }
  const exp = Math.floor(Math.log(Number(value)) / Math.log(1000));
  value = `${Number(value) / Math.pow(1000, exp)}${suffixes[exp - 1]}`;
  // There is no support for label aligment in Chart.js,
  // to be able align axis labels by left (right is by default)
  // add an additional spaces depends on label length
  switch (value.length) {
    case 2:
      return value + "  ";
    case 1:
      return value + "   ";
    case 3:
    default:
      return value;
  }
};

export const hexToRgb = (hex: string) => {
  if (hex.length < 6) {
    hex = `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`;
  }
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(
        result[3],
        16
      )}`
    : null;
};

export function tooltipTrigger(
  chart: any,
  data: IChartData,
  set: number,
  index: number,
  siteVariables: SiteVariablesPrepared,
  mergeDuplicates?: boolean
) {
  if (mergeDuplicates) {
    const duplicates: number[] = [];
    const segments: any[] = [];
    // Check for equal data points
    data.datasets.filter((dataset: IChartDataSet, i: number) => {
      if (dataset.data[index] === data.datasets[set].data[index]) {
        duplicates.push(i);
      }
      if (siteVariables.theme === TeamsTheme.HighContrast) {
        chart.data.datasets[i].borderColor =
          siteVariables.colorScheme.default.border;
        chart.data.datasets[i].borderWidth = 2;
      }
    });
    duplicates.forEach((segmentId) => {
      segments.push(chart.getDatasetMeta(segmentId).data[index]);
      if (siteVariables.theme === TeamsTheme.HighContrast) {
        chart.data.datasets[segmentId].borderColor =
          siteVariables.colorScheme.default.borderHover;
        chart.data.datasets[segmentId].borderWidth = 4;
      }
    });
    if (siteVariables.theme === TeamsTheme.HighContrast) {
      chart.update();
    }
    chart.tooltip._active = segments;
  } else {
    const segment = chart.getDatasetMeta(set).data[index];
    chart.tooltip._active = [segment];
    if (siteVariables.theme === TeamsTheme.HighContrast) {
      chart.data.datasets.map((dataset: any, i: number) => {
        dataset.borderColor = siteVariables.colorScheme.default.border;
        dataset.borderWidth = 2;
        dataset.backgroundColor = buildPattern(
          chartDataPointPatterns(siteVariables.colorScheme)[i]
        );
      });
      chart.data.datasets[set].borderColor =
        siteVariables.colorScheme.default.borderHover;
      chart.data.datasets[set].borderWidth = 4;
      chart.data.datasets[set].backgroundColor = buildPattern({
        shapeType: chartDataPointPatterns(siteVariables.colorScheme)[set]
          .shapeType,
        backgroundColor: chartDataPointPatterns(siteVariables.colorScheme)[set]
          .backgroundColor,
        patternColor: siteVariables.colorScheme.default.borderHover,
        size: chartDataPointPatterns(siteVariables.colorScheme)[set].size,
      });
      chart.update();
    }
  }
  chart.tooltip.update();
  chart.draw();
}

export const tooltipAxisYLine = ({ chart, ctx, tooltip }: any) => {
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
    ctx.lineWidth = 1;
    ctx.strokeStyle = chart.options.scales.yAxes[0].gridLines.color;
    ctx.stroke();
    // Point
    ctx.beginPath();
    ctx.setLineDash([]);
    ctx.arc(x, y, 5, 0, 2 * Math.PI, true);
    ctx.lineWidth = 2;
    ctx.fillStyle = "white";
    ctx.strokeStyle =
      chart.data.datasets[activePoint._datasetIndex].hoverBorderColor;
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }
};

export const tooltipAxisXLine = ({ chart, ctx, tooltip }: any) => {
  if (tooltip._active && tooltip._active.length) {
    const activePoint = tooltip._active[0],
      y = activePoint.tooltipPosition().y,
      x = activePoint.tooltipPosition().x,
      x_axis = chart.scales["x-axis-0"],
      leftX = x_axis.left,
      rightX = x_axis.right;

    ctx.save();
    // Line
    ctx.beginPath();
    ctx.moveTo(leftX - 20, y);
    ctx.lineTo(rightX, y);
    ctx.setLineDash([5, 5]);
    ctx.lineWidth = 1;
    ctx.strokeStyle = chart.options.scales.yAxes[0].gridLines.color;
    ctx.stroke();
    ctx.restore();
  }
};

export const horizontalBarValue = ({ chart, ctx }: any) => {
  ctx.font = "bold 11px Segoe UI";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillStyle = chart.options.scales.xAxes[0].ticks.fontColor;
  chart.data.datasets.forEach((dataset: any, i: number) => {
    const meta = chart.controller.getDatasetMeta(i);
    meta.data.forEach((bar: any, index: number) => {
      const data = dataset.data[index];
      ctx.fillText(data, bar._model.x + 8, bar._model.y);
    });
  });
};

export const chartConfig = ({
  type,
}: {
  type: "line" | "bar" | "horizontalBar";
}) => ({
  type,
  options: {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1000,
    },
    layout: {
      padding: {
        left: 0,
        right: 16,
        top: 0,
        bottom: 0,
      },
    },
    scaleLabel: {
      display: false,
    },
    elements: {
      line: {
        tension: 0.4,
      },
    },
    hover: {
      mode: "dataset",
      intersect: false,
    },
    tooltips: tooltipConfig(),
    scales: {
      xAxes: [
        {
          ticks: {
            fontSize: 10,
            padding: 0,
            labelOffset: 4,
            maxRotation: 0,
            minRotation: 0,
          },
          gridLines: {
            borderDash: [5, 9999],
            zeroLineBorderDash: [5, 9999],
          },
        },
      ],
      yAxes: [
        {
          stacked: false,
          ticks: {
            callback: (v: number) => chartAxis(v),
            fontSize: 10,
            padding: -16,
            labelOffset: 10,
            maxTicksLimit: 5,
          },
          gridLines: {
            lineWidth: 1,
            drawBorder: false,
            drawTicks: true,
            tickMarkLength: 44,
          },
        },
      ],
    },
  },
});

export const axesConfig = ({
  chart,
  ctx,
  colorScheme,
}: {
  chart: any;
  ctx: CanvasRenderingContext2D;
  colorScheme: any;
}) => {
  const axesXGridLines = ctx!.createLinearGradient(100, 100, 100, 0);
  axesXGridLines.addColorStop(0.01, colorScheme.grey.border);
  axesXGridLines.addColorStop(0.01, "transparent");

  chart.options.scales.xAxes.forEach((xAxes: any, index: number) => {
    xAxes.ticks.fontColor = colorScheme.default.foreground2;
    if (index < 1) {
      xAxes.gridLines.color = axesXGridLines;
      xAxes.gridLines.zeroLineColor = axesXGridLines;
    } else {
      xAxes.gridLines.color = "transparent";
    }
  });
  chart.options.scales.yAxes.forEach((yAxes: any, index: number) => {
    yAxes.ticks.fontColor = colorScheme.default.foreground2;
    if (index < 1) {
      yAxes.gridLines.color = colorScheme.grey.border;
      yAxes.gridLines.zeroLineColor = colorScheme.grey.border;
    } else {
      yAxes.gridLines.color = "transparent";
    }
  });
};

export const setTooltipColorScheme = ({
  chart,
  siteVariables,
  chartDataPointColors,
  usingPatterns = false,
}: {
  chart: Chart;
  siteVariables: SiteVariablesPrepared;
  chartDataPointColors: string[];
  usingPatterns?: boolean;
}) => {
  const { colorScheme, theme } = siteVariables;
  chart.options.tooltips = {
    ...chart.options.tooltips,
    backgroundColor:
      theme === TeamsTheme.Dark
        ? colorScheme.default.border2
        : colorScheme.default.foregroundFocus,
    borderColor: colorScheme.default.borderHover,
    multiKeyBackground: colorScheme.white.foreground,
    titleFontColor: colorScheme.default.foreground3,
    bodyFontColor: colorScheme.default.foreground3,
    footerFontColor: colorScheme.default.foreground3,
    borderWidth: theme === TeamsTheme.HighContrast ? 2 : 0,
    callbacks: {
      ...chart.options.tooltips?.callbacks,
      labelColor:
        usingPatterns && theme === TeamsTheme.HighContrast
          ? (tooltipItem: any) => ({
              borderColor: "transparent",
              backgroundColor: buildPattern({
                shapeType: chartDataPointPatterns(colorScheme)[
                  tooltipItem.datasetIndex
                ].shapeType,
                backgroundColor: chartDataPointPatterns(colorScheme)[
                  tooltipItem.datasetIndex
                ].backgroundColor,
                patternColor: colorScheme.default.borderHover,
                size: chartDataPointPatterns(colorScheme)[
                  tooltipItem.datasetIndex
                ].size,
              }) as any,
            })
          : (tooltipItem: any) => ({
              borderColor: "transparent",
              backgroundColor: chartDataPointColors[tooltipItem.datasetIndex],
            }),
    },
  };
  if (siteVariables.theme === TeamsTheme.HighContrast) {
    (chart as any).options.scales.yAxes[0].gridLines.lineWidth = 0.25;
  } else {
    (chart as any).options.scales.yAxes[0].gridLines.lineWidth = 1;
  }
};

export const tooltipConfig = () => ({
  yPadding: 12,
  xPadding: 20,
  caretPadding: 10,
  // Tooltip Title
  titleFontStyle: "200",
  titleFontSize: 20,
  // Tooltip Body
  bodySpacing: 4,
  bodyFontSize: 11.5,
  bodyFontStyle: "400",
  // Tooltip Footer
  footerFontStyle: "300",
  footerFontSize: 10,

  callbacks: {
    title: (tooltipItems: any) => {
      return tooltipItems[0].yLabel;
    },
    afterTitle: (tooltipItems: any) => {
      return "";
    },
    label: (tooltipItem: any, data: any) => {
      return data.datasets[tooltipItem.datasetIndex].label;
    },
    footer: (tooltipItems: any) => {
      return tooltipItems[0].xLabel;
    },
  },
});
