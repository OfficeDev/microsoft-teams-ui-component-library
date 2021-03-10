import React from "react";
import {
  Flex,
  InfoIcon,
  SiteVariablesPrepared,
} from "@fluentui/react-northstar";
import { TeamsTheme } from "../../../themes";

export function ChartErrorState({
  siteVariables,
}: {
  siteVariables: SiteVariablesPrepared;
}) {
  let textColor;
  switch (siteVariables.theme) {
    case TeamsTheme.Dark:
      textColor = siteVariables.colors.red["300"];
      break;
    case TeamsTheme.HighContrast:
      textColor = siteVariables.colors.white;
      break;
    case TeamsTheme.Default:
    default:
      textColor = siteVariables.colors.red["400"];
      break;
  }
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
      <InfoIcon outline styles={{ marginRight: ".5rem" }} /> Could not load
      data.
    </Flex>
  );
}
