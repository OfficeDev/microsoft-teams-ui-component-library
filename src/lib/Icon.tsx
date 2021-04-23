import React, { FunctionComponent, HTMLAttributes } from "react";

import * as FluentUIIcons from "@fluentui/react-icons-northstar";
import { SvgIconProps } from "@fluentui/react-icons-northstar";

const Icons = (FluentUIIcons as unknown) as {
  [iconName: string]: FunctionComponent<
    HTMLAttributes<HTMLSpanElement> & SvgIconProps
  >;
};

export interface IIconProps {
  icon?: string;
}

export default ({ icon }: IIconProps) => {
  const componentName = `${icon}Icon`;
  if (Icons.hasOwnProperty(componentName)) {
    const IconComponent = Icons[componentName];
    return <IconComponent outline />;
  } else {
    if (process.env.NODE_ENV === "development")
      console.warn("No such icon available:", icon);
    return null;
  }
};
