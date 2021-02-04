export interface IChartData {
  labels: string[];
  datasets: IChartDataSet[];
}

export interface IChartDataSet {
  label: string;
  data: number[];
  isSelected?: boolean;
}

export enum ChartOptions {
  Line = "line",
  LineStacked = "lineStacked",
  LineArea = "lineArea",
  Bar = "bar",
  BarStacked = "barStacked",
  BarHorizontal = "barHorizontal",
}

export enum PointStyles {
  Circle = "circle",
  Rectangle = "rect",
  Triangle = "triangle",
  RectangleRotated = "rectRot",
}

export interface ILineChartPatterns {
  lineBorderDash: number[];
  pointStyle: PointStyles;
}
