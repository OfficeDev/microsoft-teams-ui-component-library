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
}
