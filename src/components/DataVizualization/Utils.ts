const suffixes = ["K", "M", "G", "T", "P", "E"];

const chartAxis = (value: number): string => {
  if (value < 1000) {
    return String(value);
  }
  const exp = Math.floor(Math.log(value) / Math.log(1000));
  return value / Math.pow(1000, exp) + suffixes[exp - 1] + " ";
};

export const random = (min: number, max: number): number =>
  Math.round(Math.random() * (max - min) + min);

export const randomNumber = (
  count?: number,
  startPoint?: number,
  gap?: number
) => {
  if (!startPoint) {
    startPoint = 150;
  }
  if (!gap) {
    gap = Math.round(startPoint * 0.0);
  }
  if (!count) {
    count = 0;
  }
  const min = Math.round(startPoint - gap);
  const max = Math.round(startPoint + gap);
  return count
    ? Array.from({ length: count }, () => random(min, max))
    : random(min, max);
};

export const lineChartSettings = {
  type: "line",
  options: {
    animation: {
      duration: 1000,
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
            display: false,
            offsetGridLines: true,
            zeroLineWidth: 0,
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            callback: (v: number) => chartAxis(v),
            fontSize: 10,
            padding: -24,
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
