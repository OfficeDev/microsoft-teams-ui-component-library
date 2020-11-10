import React from "react";
import { TTextObject } from "../../translations";

export interface IInputGroupBase {
  title?: TTextObject;
  groupId?: string;
}

export interface IEnumerableInputOption {
  title: TTextObject;
  value: string;
}

interface IEnumerableInputGroupBase extends IInputGroupBase {
  options: IEnumerableInputOption[];
}

export interface IEnumerableSingletonInputGroupBase
  extends IEnumerableInputGroupBase {
  initialOption: IEnumerableInputOption;
}

export interface IEnumerableMultipleInputGroupBase
  extends IEnumerableInputGroupBase {
  initialOptions: IEnumerableInputOption[];
}

type TInputWidth = "flex" | "split" | "full";

export interface ITextField {
  title: TTextObject;
  placeholder: TTextObject;
  width?: TInputWidth;
}

export type TField = ISelectInput | ITextField;

export interface ITextInputsGroup extends IInputGroupBase {
  type: "text-inputs";
  fields: TField[];
}

export interface ISelectInput extends IEnumerableSingletonInputGroupBase {
  type: "select";
  width?: TInputWidth;
}

export interface IRadioButtonsInput extends IEnumerableSingletonInputGroupBase {
  type: "radio-buttons";
}

export interface ICheckboxesInput extends IEnumerableMultipleInputGroupBase {
  type: "checkboxes";
}

export type TInputGroup =
  | ITextInputsGroup
  | ISelectInput
  | IRadioButtonsInput
  | ICheckboxesInput;

export interface ISection {
  title?: TTextObject;
  preface?: TTextObject;
  inputGroups: TInputGroup[];
}

export type TFormErrors = { [groupId: string]: TTextObject };

export interface IFormProps {
  headerSection?: ISection;
  sections: ISection[];
  errors?: TFormErrors;
}

export const Form = (props: IFormProps) => {
  return <span>Hello.</span>;
};
