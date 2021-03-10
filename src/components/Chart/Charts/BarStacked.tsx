import React from "react";
import { SiteVariablesPrepared } from "@fluentui/react-northstar";
import { IChartData } from "../ChartTypes";
import { BarChart } from "./Bar";

export const BarStackedChart = ({
  title,
  data,
  siteVariables,
}: {
  title: string;
  data: IChartData;
  siteVariables: SiteVariablesPrepared;
}) => (
  <BarChart
    {...{
      title,
      data,
      siteVariables,
      stacked: true,
    }}
  />
);
