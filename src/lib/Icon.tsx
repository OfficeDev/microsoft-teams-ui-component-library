import React, { FunctionComponent, HTMLAttributes } from "react";

import * as FluentUIIcons from "@fluentui/react-icons-northstar";
import { SvgIconProps } from "@fluentui/react-icons-northstar";
import {
  Button,
  Tooltip,
  tooltipAsLabelBehavior,
} from "@fluentui/react-northstar";
import { getText, TLocale, TTextObject } from "../translations";

const Icons = FluentUIIcons as unknown as {
  [iconName: string]: FunctionComponent<
    HTMLAttributes<HTMLSpanElement> & SvgIconProps
  >;
};

export interface ITooltipProps {
  content: TTextObject;
}

/**
 * An icon.
 * @public
 */
export interface IIconProps {
  icon?: string;
}

interface IIconComponentProps
  extends IIconProps,
    Pick<SvgIconProps, "styles"> {}

/**
 * An icon which invokes a tooltip when focused.
 * @public
 */
export interface IFocusableIconProps extends IIconProps {
  tooltip: ITooltipProps;
}

interface IFocusableIconComponentProps
  extends IFocusableIconProps,
    Pick<SvgIconProps, "styles"> {
  locale: TLocale;
}

export const FocusableIcon = ({
  tooltip: { content },
  locale,
  styles,
  ...iconProps
}: IFocusableIconComponentProps) => {
  return (
    <Tooltip
      content={getText(locale, content)}
      accessibility={tooltipAsLabelBehavior}
      trigger={
        <Button
          text
          styles={{ ...styles, padding: "0.0625rem", height: "auto" }}
        >
          <Icon {...iconProps} />
        </Button>
      }
    />
  );
};

const Icon = ({ icon, styles }: IIconComponentProps) => {
  const componentName = `${icon}Icon`;
  if (Icons.hasOwnProperty(componentName)) {
    const IconComponent = Icons[componentName];
    return <IconComponent outline styles={styles} />;
  } else {
    if (process.env.NODE_ENV === "development")
      console.warn("No such icon available: ", icon);
    return null;
  }
};

export default Icon;
