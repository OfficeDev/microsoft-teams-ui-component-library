import {
  Avatar as FluentUIAvatar,
  AvatarProps,
} from "@fluentui/react-northstar";
import React from "react";

import { EAvatarVariant } from "../types/types";

export interface IAvatarProps
  extends Pick<
    AvatarProps,
    "image" | "styles" | "variables" | "size" | "getInitials"
  > {
  name: string;
  variant?: EAvatarVariant;
}

const extendStyles = (variant: EAvatarVariant, size: string, styles = {}) => {
  let borderRadius;
  let clipPath;
  switch (variant) {
    case EAvatarVariant.entity:
      borderRadius = "0.1875rem";
      break;
    case EAvatarVariant.bot:
      borderRadius = "0";
      switch (size) {
        case "large":
          clipPath = `url('#avatar-clip-path--hex--large')`;
          break;
        case "medium":
          clipPath = `url('#avatar-clip-path--hex--medium')`;
          break;
        default:
          clipPath = `url('#avatar-clip-path--hex--small')`;
          break;
      }
      break;
  }
  return {
    styles: {
      ...styles,
      ...(borderRadius && { "--avatar__border-radius": borderRadius }),
      ...(clipPath && { "--avatar__clip-path": clipPath }),
    },
  };
};

const Avatar = ({
  name,
  image,
  styles,
  variables,
  size = "small",
  variant = EAvatarVariant.human,
}: IAvatarProps) => {
  return (
    <FluentUIAvatar
      {...(image && { image })}
      {...{ name, size, variables }}
      {...extendStyles(variant, size, styles)}
    />
  );
};

export default Avatar;
