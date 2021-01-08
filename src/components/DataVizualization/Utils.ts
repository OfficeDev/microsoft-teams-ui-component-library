// TODO: Localization
const suffixes = ["K", "M", "G", "T", "P", "E"];

const chartAxis = (value: number | string): string => {
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

export const lineChartSettings = {
  type: "line",
  aspectRatio: 1.875,
  options: {
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
    responsive: true,
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

export const customTooltips = (
  { current: chart }: React.RefObject<HTMLCanvasElement>,
  { current: tooltipContainer }: React.RefObject<HTMLDivElement>,
  tooltip: any
) => {
  if (chart && tooltip && tooltipContainer) {
    // Tooltip Element
    const chartRect = chart.getBoundingClientRect();
    // Calculate position
    const positionY = chartRect.top + tooltip.yPadding;
    const positionX = chartRect.left + tooltip.xPadding;
    tooltipContainer.style.position = "fixed";
    tooltipContainer.style.left = positionX + tooltip.caretX + "px";
    tooltipContainer.style.top = positionY + tooltip.caretY + "px";
  }
};
