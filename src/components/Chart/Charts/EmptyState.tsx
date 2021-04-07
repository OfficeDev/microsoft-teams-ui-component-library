import React from "react";
import {
  Flex,
  InfoIcon,
  SiteVariablesPrepared,
} from "@fluentui/react-northstar";
import { TeamsTheme } from "../../../themes";

export function ChartEmptyState({
  siteVariables,
}: {
  siteVariables: SiteVariablesPrepared;
}) {
  let textColor;
  switch (siteVariables.theme) {
    case TeamsTheme.Dark:
      textColor = siteVariables.colors.grey["400"];
      break;
    case TeamsTheme.HighContrast:
      textColor = siteVariables.colors.white;
      break;
    case TeamsTheme.Default:
    default:
      textColor = siteVariables.colors.grey["400"];
      break;
  }
  const { t } = siteVariables;
  return (
    <Flex
      styles={{
        height: "100%",
        minHeight: "14rem",
        backgroundColor: siteVariables.colorScheme.grey.background,
        color: textColor,
      }}
      vAlign="center"
      hAlign="center"
    >
      <InfoIcon outline styles={{ marginRight: ".5rem" }} /> {t["no data"]}
    </Flex>
  );
}
