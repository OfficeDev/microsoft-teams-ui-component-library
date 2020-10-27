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
      iconElement = <AddIcon outline />;
      break;
    case "Edit":
      iconElement = <EditIcon outline />;
      break;
    case "GalleryNew":
      iconElement = <GalleryNewIcon outline />;
      break;
    case "GalleryNewLarge":
      iconElement = <GalleryNewLargeIcon outline />;
      break;
    case "ShareGeneric":
      iconElement = <ShareGenericIcon outline />;
      break;
    case "TrashCan":
      iconElement = <TrashCanIcon outline />;
      break;
  }
  return iconElement;
};
