import React, { PropsWithChildren } from "react";
import get from "lodash/get";

import {
  Box,
  Button,
  Dropdown,
  DropdownItemProps,
  Input,
  InputProps,
  ProviderConsumer as FluentUIThemeConsumer,
  SiteVariablesPrepared,
  Text,
} from "@fluentui/react-northstar";

import { getText, TTextObject, TTranslations } from "../../translations";

interface IInputGroupBase {
  errors?: TFormErrors;
  t?: TTranslations;
}

interface IEnumerableInputOption {
  title: TTextObject;
  value: string;
}

interface IEnumerableInputBase {
  options: IEnumerableInputOption[];
  inputId: string;
  errors?: TFormErrors;
  t?: TTranslations;
}

interface IEnumerableSingletonInputBase extends IEnumerableInputBase {
  initialValue?: string;
}

interface IEnumerableMultipleInputBase extends IEnumerableInputBase {
  initialValues?: string[];
}

export type TInputWidth = "split" | "full";

interface ITextField {
  type: "text";
  title: TTextObject;
  inputId: string;
  placeholder?: TTextObject;
  width?: TInputWidth;
  initialValue?: string;
  t?: TTranslations;
}

export type TField = IDropdownInput | IDropdownMultipleInput | ITextField;

interface ITextInputs extends IInputGroupBase {
  type: "text-inputs";
  fields: TField[];
}

interface IDropdownInput extends IEnumerableSingletonInputBase {
  type: "dropdown";
  title: TTextObject;
  multiple?: false;
  width?: TInputWidth;
}

interface IDropdownMultipleInput extends IEnumerableMultipleInputBase {
  type: "dropdown";
  title: TTextObject;
  multiple: true;
  width?: TInputWidth;
}

interface IRadioButtonsInput extends IEnumerableSingletonInputBase {
  type: "radio-buttons";
}

interface ICheckboxesInput extends IEnumerableMultipleInputBase {
  type: "checkboxes";
}

type TInputGroup =
  | ITextInputs
  | IDropdownInput
  | IDropdownMultipleInput
  | IRadioButtonsInput
  | ICheckboxesInput;

interface ISection {
  title?: TTextObject;
  preface?: TTextObject;
  inputGroups?: TInputGroup[];
}

type TFormErrors = { [inputId: string]: TTextObject };

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

interface DropdownFieldItem extends DropdownItemProps {
  "data-value": string;
}

const DropdownField = (props: IDropdownInput | IDropdownMultipleInput) => {
  const { options, t, inputId, title } = props;
  const id = `input__${inputId}`;
  const selectedValues = get(
    props,
    "initialValues",
    props.hasOwnProperty("initialValue") ? [get(props, "initialValue")] : []
  );
  return (
    <>
      <Input.Label htmlFor={id}>{getText(t?.locale, title)}</Input.Label>
      <Dropdown
        fluid
        id={id}
        items={options.map(({ title, value }) => ({
          selected: selectedValues.includes(value),
          header: getText(t?.locale, title),
          "data-value": value,
        }))}
        {...(props.multiple && { multiple: true })}
      />
    </>
  );
};

const TextField = ({ placeholder, t, title }: ITextField) => {
  const inputProps: InputProps = { label: getText(t?.locale, title) };
  if (placeholder) inputProps.placeholder = getText(t?.locale, placeholder);
  return <Input fluid {...inputProps} />;
};

const TextInputsGroup = ({ fields, t }: ITextInputs) => {
  console.log("[fields]", fields);
  return (
    <Box
      styles={{ display: "flex", flexFlow: "row wrap", marginRight: "-.75rem" }}
    >
      {fields.map((field, fi) => {
        const key = `Form__Field-${field.inputId}`;
        return (
          <Box
            styles={{
              flex: "1 1 0",
              minWidth: field.width === "split" ? "7.5rem" : "100%",
              paddingRight: ".75rem",
              marginBottom: ".75rem",
            }}
          >
            {(() => {
              switch (field.type) {
                case "dropdown":
                  return <DropdownField {...field} {...{ key, t }} />;
                case "text":
                  return <TextField {...field} {...{ key, t }} />;
                default:
                  return null;
              }
            })()}
          </Box>
        );
      })}
    </Box>
  );
};

const DropdownGroup = (props: IDropdownInput) => {
  return <div />;
};

const DropdownMultipleGroup = (props: IDropdownMultipleInput) => {
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
    case "dropdown":
      return props.multiple ? (
        <DropdownMultipleGroup {...props} />
      ) : (
        <DropdownGroup {...props} />
      );
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
