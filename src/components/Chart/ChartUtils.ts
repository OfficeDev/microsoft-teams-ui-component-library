import { IChartData, IChartDataSet } from ".";

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

export const stackedChartSettings = {
  type: "line",
  // aspectRatio: 1.875,
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
    tooltips: {
      intersect: false,
    },
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
          stacked: true,
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
};

export const hexToRgb = (hex: string) => {
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
  index: number
) {
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

export const tooltipAxesYLine = ({
  chart,
  ctx,
  tooltip,
  colorScheme,
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
  ctx.strokeStyle = colorScheme.default.border;
  ctx.stroke();
  // Point
  ctx.beginPath();
  ctx.setLineDash([]);
  ctx.arc(x, y, 5, 0, 2 * Math.PI, true);
  ctx.lineWidth = 2;
  ctx.fillStyle = colorScheme.white.foreground;
  ctx.strokeStyle = chartDataPointColors[activePoint._datasetIndex];
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.restore();
};
