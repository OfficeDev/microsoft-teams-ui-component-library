export interface IChartData {
  labels: string[];
  datasets: IChartDataSet[];
}

export interface IChartDataSet {
  label: string;
  data: number[];
  isSelected?: boolean;
}
