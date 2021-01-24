import React, { useState, useEffect } from "react";
import {
  Box,
  SiteVariablesPrepared,
  Toolbar as Legend,
  Button as LegendItem,
  BoldIcon,
  Flex,
} from "@fluentui/react-northstar";
import { IChartData } from "../ChartTypes";

const legendItems = (
  data: IChartData,
  siteVariables: SiteVariablesPrepared,
  chartDataPointColors: any
) =>
  Array.from(data.datasets, (dataset, i) => ({
    key: i,
    kind: "custom",
    content: (
      <LegendItem
        styles={{
          display: "flex",
          alignItems: "center",
          fontSize: ".75rem",
          minWidth: "30px",
          color: siteVariables.colorScheme.default.foreground2,
          border: data.datasets[i].isSelected ? "1px solid red" : "none",
        }}
        text
      >
        <Box
          styles={{
            width: ".6rem",
            height: ".6rem",
            backgroundColor: chartDataPointColors[i],
            margin: "0 0 -1px",
            marginRight: ".4rem",
            borderRadius: siteVariables.borderRadius,
          }}
        />
        {dataset.label}
      </LegendItem>
    ),
    fitted: "horizontally",
  }));

export const ChartContainer = ({
  data,
  children,
  siteVariables,
  chartDataPointColors,
  chartDataPointPatterns,
}: {
  data: IChartData;
  children: React.ReactNode;
  siteVariables: SiteVariablesPrepared;
  chartDataPointColors: any;
  chartDataPointPatterns?: any;
}) => {
  const [overflowOpen, setOverflowOpen] = useState(false);
  const [overflowItems, setOverflowItems] = useState<number>(0);

  let _legendItems = legendItems(data, siteVariables, chartDataPointColors);

  useEffect(() => {
    _legendItems = legendItems(data, siteVariables, chartDataPointColors);
  }, [siteVariables.theme]);

  return (
    <Flex
      column
      style={{
        height: "100%",
        minHeight: "14rem",
        margin: "0 -1rem",
        width: "calc(100% + 1rem)",
      }}
    >
      <Box
        styles={{
          flexGrow: 1,
          backgroundColor: siteVariables.colorScheme.grey.background,
        }}
      >
        {children}
      </Box>
      <Box styles={{ margin: "0 1rem" }}>
        <Legend
          aria-label="Toolbar overflow menu"
          items={legendItems(data, siteVariables, chartDataPointColors)}
          overflow
          overflowOpen={overflowOpen}
          overflowItem={{
            icon: (
              <BoldIcon
                styles={{
                  position: "relative",
                  width: "3.5rem",
                  height: "1rem",
                  borderRadius: "4px",
                  "& svg": {
                    display: "none",
                  },
                  "&::after": {
                    content: `"${overflowItems} more"`,
                    display: "block",
                    position: "absolute",
                    top: 0,
                    left: ".5rem",
                    minWidth: "3rem",
                    textAlign: "left",
                    fontSize: ".75rem",
                    color: siteVariables.colorScheme.brand.foreground,
                  },
                }}
              />
            ),
          }}
          onOverflowOpenChange={(e, props) => {
            setOverflowOpen(!!props?.overflowOpen);
          }}
          onOverflow={(items) => setOverflowItems(_legendItems.length - items)}
          getOverflowItems={(startIndex) => _legendItems.slice(startIndex)}
          styles={{
            width: "100%",
            backgroundColor: siteVariables.colorScheme.grey.background,
          }}
        />
      </Box>
    </Flex>
  );
};
