import React from "react";
import { SiteVariablesPrepared } from "@fluentui/react-northstar";
import { IChartData } from "../ChartTypes";
import { PieChart } from "./Pie";

export const DoughnutChart = ({
  title,
  data,
  siteVariables,
}: {
  title: string;
  data: IChartData;
  siteVariables: SiteVariablesPrepared;
}) => (
  <PieChart
    {...{
      title,
      data,
      siteVariables,
      cutoutPercentage: 70,
    }}
  />
);
