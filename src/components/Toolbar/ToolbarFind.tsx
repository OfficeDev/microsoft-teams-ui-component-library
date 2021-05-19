import React, { Dispatch, SetStateAction } from "react";

import {
  Button,
  Input,
  Tooltip,
  tooltipAsLabelBehavior,
} from "@fluentui/react-northstar";
import { SearchIcon } from "@fluentui/react-icons-northstar";

import { TToolbarLayout } from "./Toolbar";
import { TTranslations } from "../../translations";
import { Surface } from "../../types/types";

export interface IToolbarFindProps {
  layout: TToolbarLayout;
  toolbarButtonStyles: any;
  findActive: boolean;
  setFindActive: Dispatch<SetStateAction<boolean>>;
  onFindQueryChange?: (findQuery: string) => string;
  t: TTranslations;
}

export const ToolbarFind = ({
  layout,
  onFindQueryChange,
  findActive,
  setFindActive,
  toolbarButtonStyles,
  t,
}: IToolbarFindProps) => {
  switch (layout) {
    case "verbose":
      return (
        <Input
          clearable
          placeholder={t["find"]}
          aria-label={t["find"]}
          icon={<SearchIcon outline />}
          styles={{
            flexShrink: 1,
            width: "13.125rem",
          }}
          onChange={(e, inputProps) => {
            if (onFindQueryChange && inputProps)
              onFindQueryChange(inputProps.value);
          }}
          variables={{ surface: Surface.base }}
        />
      );
    default:
    case "compact":
      return findActive ? (
        <>
          <Input
            autoFocus
            clearable
            placeholder={t["find"]}
            aria-label={t["find"]}
            icon={<SearchIcon outline />}
            styles={{
              flexShrink: 1,
              flexGrow: 1,
              width: "13.125rem",
            }}
            onChange={(e, inputProps) => {
              if (onFindQueryChange && inputProps)
                onFindQueryChange(inputProps.value);
            }}
            variables={{ surface: Surface.base }}
          />
          <Button
            text
            title={t["cancel"]}
            content={t["cancel"]}
            className="extended-toolbar__find-cancel"
            styles={{
              marginLeft: "1px",
              marginRight: "1px",
              ...toolbarButtonStyles,
            }}
            onClick={(_e) => {
              onFindQueryChange && onFindQueryChange("");
              setFindActive(false);
            }}
          />
        </>
      ) : (
        <Tooltip
          trigger={
            <Button
              text
              title={t["find"]}
              content=""
              className="extended-toolbar__find-invoker"
              icon={<SearchIcon outline />}
              styles={{
                ...toolbarButtonStyles,
                marginRight: ".5rem",
                flex: "0 0 auto",
              }}
              onClick={(_e) => setFindActive(true)}
            />
          }
          content={t["find"]}
          accessibility={tooltipAsLabelBehavior}
        />
      );
  }
};
