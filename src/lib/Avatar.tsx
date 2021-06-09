import {
  Avatar as FluentUIAvatar,
  AvatarProps,
} from "@fluentui/react-northstar";
import React from "react";

import Icon, { IIconProps } from "./Icon";

import { EAvatarVariant } from "../types/types";

export interface IAvatarProps
  extends Pick<
      AvatarProps,
      "image" | "styles" | "variables" | "size" | "getInitials"
    >,
    Pick<IIconProps, "icon"> {
  name: string;
  variant?: EAvatarVariant;
}

const extendStyles = (variant: EAvatarVariant, size: string, styles = {}) => {
  let borderRadius;
  let clipPath;
  let dims;
  switch (variant) {
    case EAvatarVariant.entity:
      borderRadius = "0.1875rem";
      break;
    case EAvatarVariant.bot:
      borderRadius = "0";
      switch (size) {
        case "large":
          clipPath = `url('#avatar-clip-path--hex--large')`;
          dims = { width: "2.875rem", height: "2.625rem" };
          break;
        case "medium":
          clipPath = `url('#avatar-clip-path--hex--medium')`;
          dims = { width: "2.25rem", height: "2rem" };
          break;
        default:
          clipPath = `url('#avatar-clip-path--hex--small')`;
          dims = { width: "2rem", height: "1.875rem" };
          break;
      }
      break;
  }
  return {
    styles: {
      ...styles,
      ...(borderRadius && { "--avatar__border-radius": borderRadius }),
      ...(clipPath && { "--avatar__clip-path": clipPath }),
      ...dims,
    },
  };
};

const Avatar = ({
  name,
  image,
  icon,
  styles,
  variables,
  size = "small",
  variant = EAvatarVariant.human,
}: IAvatarProps) => {
  return (
    <FluentUIAvatar
      {...(image && { image })}
      {...(icon && { icon: <Icon icon={icon} /> })}
      {...{ name, size, variables }}
      {...extendStyles(variant, size, styles)}
    />
  );
};

export default Avatar;
