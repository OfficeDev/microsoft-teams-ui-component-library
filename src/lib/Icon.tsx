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
  icon?: string | React.ReactElement;
}

export default ({ icon }: IIconProps) => {
  if (React.isValidElement(icon)) {
    return icon;
  }
  switch (icon) {
    case "Add":
      return <AddIcon outline />;
    case "Edit":
      return <EditIcon outline />;
    case "GalleryNew":
      return <GalleryNewIcon outline />;
    case "GalleryNewLarge":
      return <GalleryNewLargeIcon outline />;
    case "ShareGeneric":
      return <ShareGenericIcon outline />;
    case "TrashCan":
      return <TrashCanIcon outline />;
    default:
      return null;
  }
};
