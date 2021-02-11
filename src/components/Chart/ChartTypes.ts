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
  BarHorizontalStacked = "barHorizontalStacked",
  Pie = "pie",
  Doughnut = "doughnut",
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

export enum Shapes {
  Square = "square",
  DiagonalRightLeft = "diagonalRightLeft",
  Grid = "grid",
  Diagonal = "diagonal",
  VerticalLine = "verticalLine",
  GridRightLeft = "gridRightLeft",
}

export interface IDraw {
  shapeType: Shapes;
  size: number;
}

export type IChartPatterns = (colorScheme: any) => IDraw[];

export interface ILegendItem {
  key: number;
  kind: string;
  content: JSX.Element;
  fitted: string;
}
