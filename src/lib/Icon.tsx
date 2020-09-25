import React from "react";

import {
  AddIcon,
  EditIcon,
  GalleryNewIcon,
  GalleryNewLargeIcon,
  ShareGenericIcon,
  TrashCanIcon,
} from "@fluentui/react-icons-northstar";

export interface IIconProps {
  icon?: string;
}

export default ({ icon }: IIconProps) => {
  let iconElement = null;
  switch (icon) {
    case "Add":
      iconElement = <AddIcon />;
      break;
    case "Edit":
      iconElement = <EditIcon />;
      break;
    case "GalleryNew":
      iconElement = <GalleryNewIcon />;
      break;
    case "GalleryNewLarge":
      iconElement = <GalleryNewLargeIcon />;
      break;
    case "ShareGeneric":
      iconElement = <ShareGenericIcon />;
      break;
    case "TrashCan":
      iconElement = <TrashCanIcon />;
      break;
  }
  return iconElement;
};
