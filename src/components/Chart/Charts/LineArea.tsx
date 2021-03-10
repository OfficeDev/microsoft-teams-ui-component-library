import React from "react";
import { SiteVariablesPrepared } from "@fluentui/react-northstar";
import { IChartData } from "../ChartTypes";
import { LineChart } from "./Line";

export const LineAreaChart = ({
  title,
  data,
  siteVariables,
}: {
  title: string;
  data: IChartData;
  siteVariables: SiteVariablesPrepared;
}) => (
  <LineChart
    {...{
      title,
      data,
      siteVariables,
      gradients: true,
    }}
  />
);
