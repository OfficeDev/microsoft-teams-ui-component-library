import React, {
  useState,
  useEffect,
  useMemo,
  MutableRefObject,
  ReactElement,
} from "react";
import {
  Box,
  SiteVariablesPrepared,
  Toolbar as Legend,
  Button as LegendItem,
  BoldIcon,
  Flex,
} from "@fluentui/react-northstar";
import { TeamsTheme } from "../../../themes";
import { IChartData, IChartPatterns, ILegendItem } from "../ChartTypes";
import { legendLabels } from "../ChartPatterns";
import { getText } from "../../../translations";

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
      styles={
        theme === TeamsTheme.HighContrast
          ? {
              width: "1.25rem",
              minWidth: "1.25rem",
              height: "1rem",
              minHeight: "1rem",
              marginBottom: "-1px",
              marginRight: ".4rem",
            }
          : {
              width: ".75rem",
              minWidth: ".75rem",
              height: ".75rem",
              minHeight: ".75rem",
              marginBottom: "-1px",
              marginRight: ".4rem",
            }
      }
    >
      <canvas
        ref={labelColorValueRef}
        tabIndex={0}
        style={{
          width: "100%",
          height: "100%",
          userSelect: "none",
          border:
            patterns && theme === TeamsTheme.HighContrast
              ? `1px solid ${colors.white}`
              : "none",
          borderRadius: borderRadius,
        }}
      />
    </Box>
  );
};

const legendItem = ({
  key,
  value,
  chartLabel,
  siteVariables,
  chartDataPointColors,
  onLegendClick,
  patterns,
}: {
  key: number;
  value: string;
  chartLabel: string;
  siteVariables: SiteVariablesPrepared;
  chartDataPointColors: any;
  onLegendClick: (key: number) => void;
  patterns?: IChartPatterns;
}): ILegendItem => {
  const { t } = siteVariables;
  return {
    key,
    kind: "custom",
    onClick: () => {
      onLegendClick(key);
    },
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
        aria-label={getText(t.locale, t["legend item"], {
          label: getText(t.locale, value),
          chart: chartLabel,
        })}
        text
      >
        <LabelColorValue
          index={key}
          siteVariables={siteVariables}
          dataPointColor={chartDataPointColors[key]}
          patterns={patterns}
        />
        {getText(t.locale, value)}
      </LegendItem>
    ),
    fitted: "horizontally",
  };
};

const LegendItems = (
  data: any,
  siteVariables: SiteVariablesPrepared,
  chartDataPointColors: any,
  chartLabel: string,
  onLegendClick: (index: number) => void,
  verticalDataAlignment?: boolean,
  patterns?: IChartPatterns
): ILegendItem[] =>
  verticalDataAlignment
    ? Array.from(data.labels, (label: any, key) =>
        legendItem({
          key,
          value: label,
          siteVariables,
          chartDataPointColors,
          chartLabel,
          onLegendClick,
          patterns,
        })
      )
    : Array.from(data.datasets, (dataset: any, key) =>
        legendItem({
          key,
          value: dataset.label,
          siteVariables,
          chartDataPointColors,
          chartLabel,
          onLegendClick,
          patterns,
        })
      );

export const ChartContainer = ({
  data,
  chartId,
  chartLabel,
  canvasRef,
  containerRef,
  tooltipAnnouncements,
  siteVariables,
  chartDataPointColors,
  onLegendClick,
  verticalDataAlignment,
  patterns,
}: {
  data: IChartData;
  chartId: string;
  chartLabel: string;
  canvasRef: MutableRefObject<HTMLCanvasElement | null>;
  containerRef: MutableRefObject<HTMLDivElement | null>;
  tooltipAnnouncements: ReactElement[];
  siteVariables: SiteVariablesPrepared;
  chartDataPointColors: any;
  onLegendClick: (index: number) => void;
  verticalDataAlignment?: boolean;
  patterns?: IChartPatterns;
}) => {
  const [overflowOpen, setOverflowOpen] = useState(false);
  const [overflowItems, setOverflowItems] = useState<number>(0);
  const { theme, colorScheme, t } = siteVariables;

  const legendItems: ILegendItem[] = useMemo(
    () =>
      LegendItems(
        data,
        siteVariables,
        chartDataPointColors,
        chartLabel,
        onLegendClick,
        verticalDataAlignment,
        patterns
      ),
    [theme, t]
  );

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
        tabIndex={0}
        ref={containerRef}
      >
        <canvas
          id={chartId}
          ref={canvasRef}
          tabIndex={-1}
          style={{
            userSelect: "none",
          }}
          aria-label={chartLabel}
        />
        {tooltipAnnouncements}
      </Box>
      <Box>
        <Legend
          aria-label={t["toolbar overflow menu"]}
          items={legendItems as any}
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
