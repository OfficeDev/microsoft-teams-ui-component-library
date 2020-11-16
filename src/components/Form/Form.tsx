import React, { PropsWithChildren } from "react";

import {
  Box,
  Button,
  Input,
  InputProps,
  ProviderConsumer as FluentUIThemeConsumer,
  SiteVariablesPrepared,
  Text,
} from "@fluentui/react-northstar";

import { getText, TTextObject, TTranslations } from "../../translations";

export interface IInputGroupBase {
  title?: TTextObject;
  errors?: TFormErrors;
  t?: TTranslations;
}

export interface IEnumerableInputOption {
  title: TTextObject;
  value: string;
}

interface IEnumerableInputGroupBase extends IInputGroupBase {
  options: IEnumerableInputOption[];
  inputId: string;
  t?: TTranslations;
}

export interface IEnumerableSingletonInputGroupBase
  extends IEnumerableInputGroupBase {
  initialValue?: string;
}

export interface IEnumerableMultipleInputGroupBase
  extends IEnumerableInputGroupBase {
  initialValues?: string[];
}

export type TInputWidth = "split" | "full";

export interface ITextField {
  type: "text";
  title: TTextObject;
  inputId: string;
  placeholder?: TTextObject;
  width?: TInputWidth;
  initialValue?: string;
  t?: TTranslations;
}

export type TField = ISelectInput | ITextField;

export interface ITextInputs extends IInputGroupBase {
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
  | ITextInputs
  | ISelectInput
  | IRadioButtonsInput
  | ICheckboxesInput;

export interface ISection {
  title?: TTextObject;
  preface?: TTextObject;
  inputGroups?: TInputGroup[];
}

export type TFormErrors = { [inputId: string]: TTextObject };

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
  keyPrefix: string;
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

const SelectField = (props: ISelectInput) => {
  return <div />;
};

const TextField = ({ placeholder, t, width, title }: ITextField) => {
  const inputProps: InputProps = { label: getText(t?.locale, title) };
  if (placeholder) inputProps.placeholder = getText(t?.locale, placeholder);
  return (
    <Box
      styles={{
        flex: "1 1 0",
        minWidth: width === "split" ? "7.5rem" : "100%",
        paddingRight: ".75rem",
        marginBottom: ".75rem",
      }}
    >
      <Input fluid {...inputProps} />
    </Box>
  );
};

const TextInputsGroup = ({ fields, t }: ITextInputs) => {
  console.log("[fields]", fields);
  return (
    <Box
      styles={{ display: "flex", flexFlow: "row wrap", marginRight: "-.75rem" }}
    >
      {fields.map((field, fi) => {
        const key = `Form__Field-${field.inputId}`;
        const last = fi === fields.length - 1;
        switch (field.type) {
          case "select":
            return <SelectField {...field} {...{ key, t, last }} />;
          case "text":
            return <TextField {...field} {...{ key, t, last }} />;
          default:
            return null;
        }
      })}
    </Box>
  );
};

const SelectGroup = (props: ISelectInput) => {
  return <div />;
};

const CheckboxesGroup = (props: ICheckboxesInput) => {
  return <div />;
};

const RadioButtonsGroup = (props: IRadioButtonsInput) => {
  return <div />;
};

const FormInputGroup = (props: TInputGroup) => {
  console.log("[FormInputGroup]", props);
  switch (props.type) {
    case "text-inputs":
      return <TextInputsGroup {...props} />;
    case "select":
      return <SelectGroup {...props} />;
    case "checkboxes":
      return <CheckboxesGroup {...props} />;
    case "radio-buttons":
      return <RadioButtonsGroup {...props} />;
    default:
      return null;
  }
};

const FormSection = (props: IFormSectionProps | IFormHeaderSectionProps) => {
  const { errors, header, section, t } = props;
  return (
    <>
      {section.title && (
        <Text
          as={header ? "h1" : "h2"}
          weight={header ? "bold" : "semibold"}
          size={header ? "large" : "medium"}
        >
          {getText(t.locale, section.title)}
        </Text>
      )}
      {section.preface && (
        <Text as="p">{getText(t.locale, section.preface)}</Text>
      )}
      {section.inputGroups?.length &&
        section.inputGroups.map((inputGroup, gi) => (
          <FormInputGroup
            {...inputGroup}
            {...{ t, errors }}
            key={`${(props as IFormSectionProps).keyPrefix}__Group-${gi}`}
          />
        ))}
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
                const key = `Form__Section-${si}`;
                return (
                  <FormSection
                    {...{ section, t, key, keyPrefix: key, errors }}
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
