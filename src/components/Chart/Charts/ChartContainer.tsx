import React, { useState, useEffect } from "react";
import {
  Box,
  SiteVariablesPrepared,
  Toolbar as Legend,
  Button as LegendItem,
  BoldIcon,
  Flex,
} from "@fluentui/react-northstar";
import { IChartData, PointStyles } from "../ChartTypes";
import { TeamsTheme } from "../../../themes";
import {
  buildPattern,
  chartDataPointPatterns,
  lineChartPatterns,
} from "../ChartPatterns";
import { chartAxis } from "../ChartUtils";

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
  patterns: boolean;
}) => {
  const { borderRadius, theme, colorScheme, colors } = siteVariables;
  const labelColorValueRef = React.useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    if (!labelColorValueRef.current) {
      return;
    }
    const ctx: any = labelColorValueRef.current.getContext("2d");
    if (ctx) {
      if (theme === TeamsTheme.HighContrast) {
        if (patterns) {
          ctx.setTransform(1.4, 0, 0, 1, 0, 0);
          ctx.scale(12, 10);
          ctx.fillStyle = buildPattern(
            chartDataPointPatterns(colorScheme)[index]
          );
          ctx.fillRect(
            -15,
            -15,
            labelColorValueRef.current.width,
            labelColorValueRef.current.height
          );
        } else {
          ctx.scale(15, 15);
          ctx.fillStyle = colors.black;
          ctx.fillRect(
            -15,
            -15,
            labelColorValueRef.current.width,
            labelColorValueRef.current.height
          );
          ctx.fillStyle = colors.white;
          switch (lineChartPatterns[index].pointStyle) {
            case PointStyles.Triangle:
              ctx.moveTo(9.5, 2.5);
              ctx.lineTo(5.5, 7.5);
              ctx.lineTo(13.5, 7.5);
              break;
            case PointStyles.Rectangle:
              ctx.rect(6.5, 2.5, 8, 5);
              break;
            case PointStyles.RectangleRotated:
              ctx.moveTo(10, 2);
              ctx.lineTo(14.5, 5);
              ctx.lineTo(10, 8);
              ctx.lineTo(5.5, 5);
              break;
            case PointStyles.Circle:
            default:
              ctx.ellipse(10, 5, 3.5, 2.5, 0, 0, 2 * Math.PI);
              break;
          }
          ctx.fill();

          // Line Style
          ctx.strokeStyle = colors.white;
          ctx.beginPath();
          ctx.setLineDash(
            lineChartPatterns[index].lineBorderDash.length ? [2, 2] : []
          );
          ctx.moveTo(-1.5, 5);
          ctx.lineTo(20, 5);
          ctx.stroke();
        }
      } else {
        ctx.fillStyle = dataPointColor;
        ctx.fillRect(
          0,
          0,
          labelColorValueRef.current.width,
          labelColorValueRef.current.height
        );
      }
    }
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
          // border: `1px solid ${colors.white}`,
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
  patterns: boolean
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
            border: data.datasets[i].isSelected ? "1px solid red" : "none",
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
  patterns = false,
}: {
  data: IChartData;
  children: React.ReactNode;
  siteVariables: SiteVariablesPrepared;
  chartDataPointColors: any;
  patterns?: boolean;
}) => {
  const [overflowOpen, setOverflowOpen] = useState(false);
  const [overflowItems, setOverflowItems] = useState<number>(0);
  const { theme, colorScheme } = siteVariables;
  let legendItems: ILegendItem[];

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
        margin: "0 -1rem",
        paddingBottom: ".5rem",
        width: "calc(100% + 1rem)",
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
      <Box styles={{ margin: "0 1rem" }}>
        <Legend
          aria-label="Toolbar overflow menu"
          items={LegendItems(
            data,
            siteVariables,
            chartDataPointColors,
            patterns
          )}
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
