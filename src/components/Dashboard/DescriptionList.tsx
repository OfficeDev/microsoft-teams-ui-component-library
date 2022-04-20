import React from "react";
import { Box, Text, SiteVariablesPrepared } from "@fluentui/react-northstar";
import { getText, TTextObject, TTranslations } from "../../translations";

/**
 * A description list item
 * @public
 */
export interface IDescription {
  label: TTextObject;
  value: TTextObject;
}

export type IDescriptionListProps = {
  list: IDescription[];
  t: TTranslations;
};

export const DescriptionList = ({ list, t }: IDescriptionListProps) => {
  return (
    <Box as="dl" styles={{ margin: 0 }}>
      {list.map(({ label, value }) => {
        return (
          <Box
            styles={{
              display: "flex",
              flexFlow: "column nowrap",
              marginBottom: "1.75rem",
            }}
          >
            <Text
              as="dt"
              styles={{ order: 1, fontSize: ".75rem", lineHeight: 4 / 3 }}
            >
              {getText(t.locale, label)}
            </Text>
            <Text
              as="dd"
              styles={{
                order: 0,
                fontSize: "1.5rem",
                lineHeight: 4 / 3,
                marginLeft: 0,
              }}
              variables={({ colorScheme }: SiteVariablesPrepared) => ({
                color: colorScheme.default.foreground1,
              })}
            >
              {getText(t.locale, value)}
            </Text>
          </Box>
        );
      })}
    </Box>
  );
};
