import React, { useState, useEffect } from "react";
import {
  Box,
  SiteVariablesPrepared,
  Toolbar as Legend,
  Button as LegendItem,
  BoldIcon,
  Flex,
} from "@fluentui/react-northstar";
import { IChartData, IChartPatterns, IDraw } from "../ChartTypes";
import { TeamsTheme } from "../../../themes";
import { legendLabels } from "../ChartPatterns";

interface ILegendItem {
  key: number;
  kind: string;
  content: JSX.Element;
  fitted: string;
}

const LabelColorValue = ({
  index,
  siteVariables,
  dataPointColor,
  patterns,
}: {
  index: number;
  siteVariables: SiteVariablesPrepared;
  dataPointColor: string;
  patterns?: IChartPatterns;
}) => {
  const { borderRadius, theme, colorScheme, colors } = siteVariables;
  const labelColorValueRef = React.useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    if (!labelColorValueRef.current) return;
    const canvasRef: HTMLCanvasElement = labelColorValueRef.current;
    legendLabels({
      canvasRef,
      theme,
      colorScheme,
      patterns,
      dataPointColor,
      index,
    });
  }, [theme]);
  return (
    <Box
      styles={{
        marginBottom: "-1px",
        marginRight: ".4rem",
      }}
    >
      <canvas
        ref={labelColorValueRef}
        tabIndex={0}
        style={{
          width: theme === TeamsTheme.HighContrast ? "1.25rem" : "0.6rem", // .6rem
          height: theme === TeamsTheme.HighContrast ? "1rem" : "0.6rem",
          userSelect: "none",
          border: patterns ? `1px solid ${colors.white}` : "none",
          borderRadius: borderRadius,
        }}
      />
    </Box>
  );
};

const LegendItems = (
  data: IChartData,
  siteVariables: SiteVariablesPrepared,
  chartDataPointColors: any,
  patterns?: IChartPatterns
): ILegendItem[] =>
  Array.from(data.datasets, (dataset, i) => {
    return {
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
            margin: "2px 0",
          }}
          text
        >
          <LabelColorValue
            index={i}
            siteVariables={siteVariables}
            dataPointColor={chartDataPointColors[i]}
            patterns={patterns}
          />
          {dataset.label}
        </LegendItem>
      ),
      fitted: "horizontally",
    };
  });

export const ChartContainer = ({
  data,
  children,
  siteVariables,
  chartDataPointColors,
  patterns,
}: {
  data: IChartData;
  children: React.ReactNode;
  siteVariables: SiteVariablesPrepared;
  chartDataPointColors: any;
  patterns?: IChartPatterns;
}) => {
  const [overflowOpen, setOverflowOpen] = useState(false);
  const [overflowItems, setOverflowItems] = useState<number>(0);
  const { theme, colorScheme } = siteVariables;
  let legendItems: ILegendItem[] = LegendItems(
    data,
    siteVariables,
    chartDataPointColors,
    patterns
  );

  useEffect(() => {
    legendItems = LegendItems(
      data,
      siteVariables,
      chartDataPointColors,
      patterns
    );
  }, [theme]);

  return (
    <Flex
      column
      style={{
        height: "100%",
        minHeight: "14rem",
        margin: "0 -1rem 0 0",
        paddingBottom: ".5rem",
        width: "100%",
      }}
    >
      <Box
        styles={{
          flexGrow: 1,
          backgroundColor: colorScheme.grey.background,
        }}
      >
        {children}
      </Box>
      {/* Legend should be in differen container to avoid FluentUI window resize issue */}
      <Box>
        <Legend
          aria-label="Toolbar overflow menu"
          items={legendItems}
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
                    color: colorScheme.brand.foreground,
                  },
                }}
              />
            ),
          }}
          onOverflowOpenChange={(e, props) => {
            setOverflowOpen(!!props?.overflowOpen);
          }}
          onOverflow={(items) => setOverflowItems(legendItems.length - items)}
          getOverflowItems={(startIndex) => legendItems.slice(startIndex)}
          styles={{
            width: "100%",
            backgroundColor: colorScheme.grey.background,
          }}
        />
      </Box>
    </Flex>
  );
};
