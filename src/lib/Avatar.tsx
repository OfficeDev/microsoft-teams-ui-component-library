import {
  Avatar as FluentUIAvatar,
  AvatarProps,
} from "@fluentui/react-northstar";
import { TUser } from "../types/types";
import React from "react";

export interface IAvatarProps
  extends TUser,
    Pick<AvatarProps, "styles" | "variables" | "size" | "getInitials"> {
  name: string;
}

const Avatar = ({
  name,
  image,
  styles,
  variables,
  size = "small",
}: IAvatarProps) => {
  return (
    <FluentUIAvatar
      {...(image && { image })}
      {...{ name, size, styles, variables }}
    />
  );
};

export default Avatar;
