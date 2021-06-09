import React from "react";
import { Text } from "@fluentui/react-northstar";
import Icon, { IIconProps } from "./Icon";
import { getText, getAllText, TLocale, TTextObject } from "../translations";
import get from "lodash/get";

export type TPhrasingContent = TPhrasingProps[];

export type TPhrasingProps = IIconProps | TTextObject;

export interface IPhrasingProps {
  content: TPhrasingContent;
  locale: TLocale;
  iconStyles: Pick<IIconProps, "styles">;
}

export const phrasingHasFocusableElements = (
  phrasingItems: TPhrasingContent
) => {
  return false;
};

export const getPhrasingTextContent = (
  phrasingItems: TPhrasingContent
): string =>
  phrasingItems.reduce((acc: string, phrasingItem) => {
    if (!phrasingItem) return acc;
    if (get(phrasingItem, "icon")) return acc;
    return acc + getAllText(phrasingItem as TTextObject);
  }, "");

const PhrasingGroup = ({
  content: phrasingItems,
  locale,
  iconStyles,
}: IPhrasingProps) => {
  return (
    <>
      {phrasingItems.map((phrasingItem, i) => {
        const styles = i === 0 ? {} : { marginLeft: ".5rem" };
        if (!phrasingItem) return null;
        if (get(phrasingItem, "icon")) {
          return (
            <Icon
              {...(phrasingItem as IIconProps)}
              styles={{ ...iconStyles, ...styles }}
            />
          );
        } else {
          return (
            <Text
              {...{
                content: getText(locale, phrasingItem as TTextObject),
                styles,
              }}
            />
          );
        }
      })}
    </>
  );
};

export default PhrasingGroup;
