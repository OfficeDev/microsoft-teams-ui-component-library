import React from "react";
import { Flex, Text } from "@fluentui/react-northstar";
import { SvgIconProps } from "@fluentui/react-icons-northstar";
import Icon, { FocusableIcon, IFocusableIconProps, IIconProps } from "./Icon";
import { getText, getAllText, TLocale, TTextObject } from "../translations";
import get from "lodash/get";

/**
 * An ordered collection of elements that render inline as content.
 * @public
 */
export type TPhrasingContent = TPhrasingProps[] | TTextObject;

export type TPhrasingProps = IIconProps | IFocusableIconProps | TTextObject;

export interface IPhrasingProps {
  content: TPhrasingContent;
  locale: TLocale;
  truncate?: boolean;
  textSelectable?: boolean;
}

interface IPhrasingComponentProps extends IPhrasingProps {
  iconStyles?: Pick<SvgIconProps, "styles">;
}

export const phrasingHasFocusableElements = (
  phrasingItems: TPhrasingContent
) => {
  return (
    Array.isArray(phrasingItems) &&
    phrasingItems.findIndex(
      (phrasingItem: TPhrasingProps) =>
        phrasingItem && phrasingItem.hasOwnProperty("tooltip")
    ) >= 0
  );
};

export const getAllPhrasingTextContent = (
  phrasingItems: TPhrasingContent
): string =>
  Array.isArray(phrasingItems)
    ? phrasingItems.reduce((acc: string, phrasingItem) => {
        if (!phrasingItem) return acc;
        if (get(phrasingItem, "icon")) return acc;
        return acc + getAllText(phrasingItem as TTextObject);
      }, "")
    : getAllText(phrasingItems as TTextObject);

export const getPhrasingTextContent = (
  locale: TLocale,
  phrasingItems: TPhrasingContent
): string =>
  Array.isArray(phrasingItems)
    ? phrasingItems.reduce((acc: string, phrasingItem) => {
        if (!phrasingItem) return acc;
        if (get(phrasingItem, "icon")) return acc;
        return acc + getText(locale, phrasingItem as TTextObject);
      }, "")
    : getText(locale, phrasingItems as TTextObject);

const defaultIconStyles = (truncate: boolean) => ({
  ...(truncate ? { flex: "0 0 auto" } : { transform: "translateY(-0.1em)" }),
});

const defaultTextStyles = (truncate: boolean, textSelectable: boolean) => ({
  ...(truncate && {
    flex: "0 1 auto",
    overflow: "hidden",
    textOverflow: "ellipsis",
  }),
  ...(textSelectable && { pointerEvents: "all" as "all", cursor: "text" }),
});

const PhrasingGroup = ({
  content: phrasingItems,
  locale,
  iconStyles,
  truncate = false,
  textSelectable = false,
}: IPhrasingComponentProps) => {
  const phrasingElements = Array.isArray(phrasingItems) ? (
    phrasingItems.map((phrasingItem, i) => {
      const styles = i === 0 ? {} : { marginLeft: ".5rem" };
      if (!phrasingItem) return null;
      if (get(phrasingItem, "icon")) {
        const finalStyles = {
          ...defaultIconStyles(truncate),
          ...iconStyles,
          ...styles,
        };
        if (phrasingItem.hasOwnProperty("tooltip")) {
          return (
            <FocusableIcon
              {...(phrasingItem as IFocusableIconProps)}
              {...{ locale, styles: finalStyles }}
            />
          );
        } else {
          return (
            <Icon
              {...(phrasingItem as IIconProps)}
              {...{ styles: finalStyles }}
            />
          );
        }
      } else {
        return (
          <Text
            {...{
              content: getText(locale, phrasingItem as TTextObject),
              styles: {
                ...defaultTextStyles(truncate, textSelectable),
                ...styles,
              },
            }}
          />
        );
      }
    })
  ) : (
    <Text
      {...{
        content: getText(locale, phrasingItems as TTextObject),
        styles: defaultTextStyles(truncate, textSelectable),
      }}
    />
  );

  return truncate ? (
    <Flex
      vAlign="center"
      wrap={false}
      children={phrasingElements}
      styles={{ whiteSpace: "nowrap" }}
    />
  ) : (
    <React.Fragment children={phrasingElements} />
  );
};

export default PhrasingGroup;
