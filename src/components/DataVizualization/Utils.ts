const suffixes = ["K", "M", "G", "T", "P", "E"];

const chartAxis = (value: number): string => {
  if (value < 1000) {
    return String(value);
  }
  const exp = Math.floor(Math.log(value) / Math.log(1000));
  return value / Math.pow(1000, exp) + suffixes[exp - 1] + " ";
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
        tension: 0.4, // disables bezier curves
      },
    },
    scales: {
      xAxes: [
        {
          ticks: {
            fontSize: 10,
            fontColor: "#717070",
            padding: 0,
            labelOffset: 4, // Padding label X
            maxRotation: 0,
            minRotation: 0,
          },
          gridLines: {
            display: false,
            offsetGridLines: true,
            zeroLineWidth: 10,
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            userCallback: (v: any) => chartAxis(v),
            fontSize: 10,
            fontColor: "#717070",
            padding: -24,
            labelOffset: 10,
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
