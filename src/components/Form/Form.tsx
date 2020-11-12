import React, { PropsWithChildren } from "react";

import {
  Box,
  Button,
  ProviderConsumer as FluentUIThemeConsumer,
  SiteVariablesPrepared,
  Text,
} from "@fluentui/react-northstar";

import { getText, TTextObject, TTranslations } from "../../translations";

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
  inputGroups?: TInputGroup[];
}

export type TFormErrors = { [groupId: string]: TTextObject };

export interface IFormProps {
  headerSection?: ISection;
  sections: ISection[];
  errors?: TFormErrors;
  submit: TTextObject;
  cancel?: TTextObject;
}

interface IFormSectionProps {
  section: ISection;
  header?: false;
  errors?: TFormErrors;
  t: TTranslations;
}

interface IFormHeaderSectionProps {
  section: ISection;
  header: true;
  errors?: TFormErrors;
  t: TTranslations;
}

const MaxWidth = ({ children, styles }: PropsWithChildren<any>) => (
  <Box
    styles={{
      margin: "0 auto",
      maxWidth: "29.75rem",
      padding: "1.25rem",
      ...styles,
    }}
  >
    {children}
  </Box>
);

const FormSection = ({
  errors,
  header,
  section,
  t,
}: IFormSectionProps | IFormHeaderSectionProps) => {
  return (
    <>
      {section.title && (
        <Text
          as="p"
          weight={header ? "bold" : "semibold"}
          {...(header ? { size: "large" } : {})}
        >
          {getText(t.locale, section.title)}
        </Text>
      )}
      {section.preface && (
        <Text as="p">{getText(t.locale, section.preface)}</Text>
      )}
    </>
  );
};

export const Form = ({
  cancel,
  errors,
  headerSection,
  sections,
  submit,
}: IFormProps) => {
  return (
    <FluentUIThemeConsumer
      render={(globalTheme) => {
        const { t } = globalTheme.siteVariables;
        return (
          <>
            <MaxWidth>
              {headerSection && (
                <FormSection
                  header
                  section={headerSection}
                  {...{ t, errors }}
                />
              )}
              {sections.map((section, si) => {
                return (
                  <FormSection
                    {...{ section, t, errors }}
                    key={`Form__Section_${si}`}
                  />
                );
              })}
            </MaxWidth>
            <Box
              variables={({ colorScheme }: SiteVariablesPrepared) => ({
                backgroundColor: colorScheme.default.background,
              })}
              styles={{
                height: "1px",
                position: "absolute",
                width: "100%",
                zIndex: 1,
              }}
            />
            <Box
              variables={({ colorScheme }: SiteVariablesPrepared) => ({
                backgroundColor: colorScheme.default.border1,
              })}
              styles={{ height: "1px", position: "sticky", bottom: "4.5rem" }}
            />
            <Box
              variables={({ colorScheme }: SiteVariablesPrepared) => ({
                backgroundColor: colorScheme.default.background,
              })}
              styles={{
                position: "sticky",
                bottom: 0,
                height: "4.5rem",
                zIndex: 2,
              }}
            >
              <MaxWidth
                styles={{ display: "flex", justifyContent: "flex-end" }}
              >
                {cancel && (
                  <Button styles={{ marginRight: ".5rem" }}>
                    {getText(t.locale, cancel)}
                  </Button>
                )}
                <Button primary>{getText(t.locale, submit)}</Button>
              </MaxWidth>
            </Box>
          </>
        );
      }}
    />
  );
};
