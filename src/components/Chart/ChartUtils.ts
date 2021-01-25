import { SiteVariablesPrepared } from "@fluentui/react-northstar";
import { IChartData, IChartDataSet } from ".";
import { TeamsTheme } from "../../themes";
import { Shapes, buildPattern, chartDataPointPatterns } from "./ChartPatterns";

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

export const random = (min: number, max: number): number =>
  Math.round(Math.random() * (max - min) + min);

export const hexToRgb = (hex: string) => {
  if (hex.length < 6) {
    hex = `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`;
  }
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

// export const customTooltips = (
//   { current: chart }: React.RefObject<HTMLCanvasElement>,
//   { current: tooltipContainer }: React.RefObject<HTMLDivElement>,
//   tooltip: any
// ) => {
//   if (chart && tooltip && tooltipContainer) {
//     // Tooltip Element
//     const chartRect = chart.getBoundingClientRect();
//     // Calculate position
//     const positionY = chartRect.top + tooltip.yPadding;
//     const positionX = chartRect.left + tooltip.xPadding;
//     tooltipContainer.style.position = "fixed";
//     tooltipContainer.style.left = positionX + tooltip.caretX + "px";
//     tooltipContainer.style.top = positionY + tooltip.caretY + "px";
//   }
// };

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

export const tooltipAxesYLine = ({
  chart,
  ctx,
  tooltip,
  siteVariables,
  chartDataPointColors,
}: any) => {
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
  ctx.strokeStyle =
    siteVariables.theme === TeamsTheme.HighContrast
      ? siteVariables.colorScheme.default.borderHover
      : chartDataPointColors[activePoint._datasetIndex];
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.restore();
};

export const lineChartConfig = (
  siteVariables: SiteVariablesPrepared,
  chartDataPointColors: string[]
) => ({
  type: "line",
  options: {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1000,
    },
    layout: {
      padding: {
        left: 16,
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
    tooltips: tooltipConfig(siteVariables, chartDataPointColors),
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
            lineWidth:
              siteVariables.theme === TeamsTheme.HighContrast ? 0.25 : 1,
            drawBorder: false,
            drawTicks: true,
            tickMarkLength: 44,
          },
        },
      ],
    },
  },
});

const tooltipConfig = (
  siteVariables: SiteVariablesPrepared,
  chartDataPointColors: string[]
) => ({
  backgroundColor:
    siteVariables.theme === TeamsTheme.Dark
      ? siteVariables.colorScheme.default.border2
      : siteVariables.colorScheme.default.foregroundFocus,

  yPadding: 12,
  xPadding: 20,
  caretPadding: 10,
  borderColor: siteVariables.colorScheme.default.borderHover,
  borderWidth: siteVariables.theme === TeamsTheme.HighContrast ? 2 : 0,
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
    afterTitle: (tooltipItems: any) => {
      return "";
    },
    label: (tooltipItem: any, data: any) => {
      return data.datasets[tooltipItem.datasetIndex].label;
    },
    labelColor: (tooltipItem: any) => {
      return {
        borderColor: "transparent",
        backgroundColor: chartDataPointColors[tooltipItem.datasetIndex],
      };
    },
    footer: (tooltipItems: any) => {
      return tooltipItems[0].xLabel;
    },
  },
});
