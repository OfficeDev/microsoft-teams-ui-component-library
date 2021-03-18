import { TTextObject } from "../../translations";

/**
 * The data to display in this Chart.
 */
export interface IChartData {
  /**
   * How the x-axis or pie slices should be labeled on the chart, if relevant. Some chart types will
   * not render this label.
   */
  labels: TTextObject | TTextObject[];
  /**
   * The Chart’s data, grouped into sets.
   */
  datasets: IChartDataSet[];
}

/**
 * A vector datum for bubble charts and related types.
 */
export interface IBubbleChartData {
  x: number;
  y: number;
  r: number;
}

/**
 * One set of the Chart’s data.
 */
export interface IChartDataSet {
  /**
   * The label for this set.
   */
  label: TTextObject;
  /**
   * The scalar values of the set’s data.
   */
  data: number[] | IBubbleChartData[];
  /**
   * Whether this set should be ignored by the Chart.
   */
  hidden?: boolean;
}

/**
 * Each chart type can be previewed in the [Data visualizations page of the Microsoft Teams UI Kit](https://www.figma.com/file/EOsbapNvZgEwcA1mShswfh/Microsoft-Teams-UI-Kit-Community?node-id=3789%3A4091),
 * or in [this library’s Storybook](https://dev-int.teams.microsoft.com/storybook/main/index.html?path=/story/components-charts--line-chart).
 */
export enum EChartTypes {
  Line = "line",
  LineStacked = "lineStacked",
  LineArea = "lineArea",
  Bar = "bar",
  BarStacked = "barStacked",
  BarHorizontal = "barHorizontal",
  BarHorizontalStacked = "barHorizontalStacked",
  Pie = "pie",
  Doughnut = "doughnut",
  Bubble = "bubble",
}

export enum EPointStyles {
  Circle = "circle",
  Rectangle = "rect",
  Triangle = "triangle",
  RectangleRotated = "rectRot",
}

export interface ILineChartPatterns {
  lineBorderDash: number[];
  pointStyle: EPointStyles;
}

export enum EShapes {
  Square = "square",
  DiagonalRightLeft = "diagonalRightLeft",
  Grid = "grid",
  Diagonal = "diagonal",
  VerticalLine = "verticalLine",
  GridRightLeft = "gridRightLeft",
}

export interface IDraw {
  shapeType: EShapes;
  size: number;
}

export type IChartPatterns = (colorScheme: any) => IDraw[];

export interface ILegendItem {
  key: number;
  kind: string;
  content: JSX.Element;
  fitted: string;
  onClick: (index: number) => void;
}
