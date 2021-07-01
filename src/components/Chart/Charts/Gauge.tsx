import React from "react";
import { SiteVariablesPrepared } from "@fluentui/react-northstar";
import { IChartData } from "../ChartTypes";
import { PieChart } from "./Pie";

export const GaugeChart = ({
  title,
  data,
  siteVariables,
  cutoutPercentage = 70,
  rotation = Math.PI,
  circumference = Math.PI,
}: {
  title: string;
  data: IChartData;
  siteVariables: SiteVariablesPrepared;
  cutoutPercentage?: number;
  rotation?: number;
  circumference?: number;
}) => (
  <PieChart
    {...{
      title,
      data,
      siteVariables,
      cutoutPercentage,
      rotation,
      circumference,
    }}
  />
);
