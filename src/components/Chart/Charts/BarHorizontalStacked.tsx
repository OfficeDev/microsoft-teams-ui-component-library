import React from "react";
import { SiteVariablesPrepared } from "@fluentui/react-northstar";
import { IChartData } from "../ChartTypes";
import { BarHorizontalChart } from "./BarHorizontal";

export const BarHorizontalStackedChart = ({
  title,
  data,
  siteVariables,
}: {
  title: string;
  data: IChartData;
  siteVariables: SiteVariablesPrepared;
}) => (
  <BarHorizontalChart
    {...{
      title,
      data,
      siteVariables,
      stacked: true,
    }}
  />
);
