import React, { PropsWithChildren } from "react";
import get from "lodash/get";

import {
  Alert,
  Box,
  Button,
  Checkbox,
  Dropdown,
  Flex,
  Form as FluentUIForm,
  Input,
  InputProps,
  ProviderConsumer as FluentUIThemeConsumer,
  RadioGroup,
  SiteVariablesPrepared,
  Text,
  selectableListBehavior,
} from "@fluentui/react-northstar";

import { getText, TTextObject, TTranslations } from "../../translations";
import {
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
} from "@fluentui/react-icons-northstar";

interface IInputGroupBase {
  errors?: TFormErrors;
  t?: TTranslations;
}

interface IEnumerableInputOption {
  title: TTextObject;
  value: string;
}

interface IEnumerableInputBase {
  title: TTextObject;
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
  errors?: TFormErrors;
}

export type TField = IDropdownInput | IDropdownMultipleInput | ITextField;

interface ITextInputs extends IInputGroupBase {
  type: "text-inputs";
  fields: TField[];
}

interface IDropdownInput extends IEnumerableSingletonInputBase {
  type: "dropdown";
  multiple?: false;
  width?: TInputWidth;
}

interface IDropdownMultipleInput extends IEnumerableMultipleInputBase {
  type: "dropdown";
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

export type TFormErrors = { [inputId: string]: TTextObject };

export interface IFormProps {
  headerSection?: ISection;
  sections: ISection[];
  errors?: TFormErrors;
  topError?: TTextObject;
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

interface IErrorMessageProps {
  excludeIcon?: boolean;
  message: TTextObject;
  t?: TTranslations;
}

const errorId = (describesId: string) => `${describesId}__error`;
const labelId = (describesId: string) => `${describesId}__label`;
const fullInputId = (inputId: string) => `input_${inputId}`;

const ErrorMessage = ({ excludeIcon, message, t }: IErrorMessageProps) => (
  <Box
    variables={({ colorScheme }: SiteVariablesPrepared) => ({
      color: colorScheme.red.foreground,
    })}
  >
    {!excludeIcon && (
      <ExclamationCircleIcon
        outline
        size="small"
        styles={{ marginRight: ".25rem" }}
      />
    )}
    <Text size="small" content={getText(t?.locale, message)} />
  </Box>
);

const DropdownField = (props: IDropdownInput | IDropdownMultipleInput) => {
  const { options, t, inputId, title, errors } = props;
  const id = fullInputId(inputId);
  const error = get(errors, inputId, false);
  const selectedValues = get(
    props,
    "initialValues",
    props.hasOwnProperty("initialValue") ? [get(props, "initialValue")] : []
  );
  return (
    <FluentUIForm.Dropdown
      fluid
      id={id}
      label={getText(t?.locale, title)}
      onChange={(_e, props) => {
        console.log("[dropdown value]", get(props, "value.data-value", null));
      }}
      items={options.map(({ title, value }) => ({
        selected: selectedValues.includes(value),
        header: getText(t?.locale, title),
        "data-value": value,
      }))}
      {...(props.multiple && { multiple: true })}
      {...(error && {
        error: true,
        errorMessage: <ErrorMessage message={error} t={t} />,
      })}
    />
  );
};

const TextField = ({ placeholder, t, title, errors, inputId }: ITextField) => {
  const inputProps: InputProps = { label: getText(t?.locale, title) };
  if (placeholder) inputProps.placeholder = getText(t?.locale, placeholder);
  const id = fullInputId(inputId);
  const error = get(errors, inputId, false);
  return (
    <FluentUIForm.Input
      fluid
      id={id}
      {...inputProps}
      {...(error && {
        error: true,
        errorMessage: <ErrorMessage excludeIcon message={error} t={t} />,
      })}
    />
  );
};

const TextInputsGroup = ({ fields, t, errors }: ITextInputs) => {
  return (
    <Box
      styles={{ display: "flex", flexFlow: "row wrap", marginRight: "-.75rem" }}
    >
      {fields.map((field) => {
        const key = `Form__Field-${field.inputId}`;
        return (
          <Box
            key={key}
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
                  return <DropdownField {...field} {...{ t, errors }} />;
                case "text":
                  return <TextField {...field} {...{ t, errors }} />;
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

const CheckboxesGroup = ({
  initialValues,
  options,
  title,
  t,
  inputId,
  errors,
}: ICheckboxesInput) => {
  const id = fullInputId(inputId);
  const error = get(errors, inputId, false);
  return (
    <Box styles={{ marginBottom: ".75rem" }}>
      <Input.Label htmlFor={id} id={labelId(id)}>
        {getText(t?.locale, title)}
      </Input.Label>
      <Box
        id={id}
        accessibility={selectableListBehavior}
        aria-labelledby={[labelId(id)]
          .concat(error ? errorId(id) : [])
          .join(" ")}
      >
        {options.map(({ title, value }) => (
          <Box key={`${id}__${value}`}>
            <Checkbox
              variables={{ layout: "radio-like" }}
              label={getText(t?.locale, title)}
              data-value={value}
              checked={initialValues?.includes(value)}
            />
          </Box>
        ))}
      </Box>
      {error && <ErrorMessage message={error} t={t} />}
    </Box>
  );
};

const RadioButtonsGroup = ({
  initialValue,
  options,
  t,
  inputId,
  title,
  errors,
}: IRadioButtonsInput) => {
  const id = fullInputId(inputId);
  const error = get(errors, inputId, false);
  return (
    <FluentUIForm.RadioGroup
      id={id}
      vertical
      styles={{ marginBottom: ".75rem" }}
      label={getText(t?.locale, title)}
      {...(error && { errorMessage: <ErrorMessage message={error} t={t} /> })}
      defaultCheckedValue={initialValue}
      items={options.map(({ title, value }) => {
        const label = getText(t?.locale, title);
        const key = `${inputId}__${value}`;
        const name = label;
        return { key, value, label, name };
      })}
    />
  );
};

const FormInputGroup = (props: TInputGroup) => {
  switch (props.type) {
    case "text-inputs":
      return <TextInputsGroup {...props} />;
    case "dropdown":
      return <DropdownField {...props} />;
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
  topError,
}: IFormProps) => {
  return (
    <FluentUIThemeConsumer
      render={(globalTheme) => {
        const { t } = globalTheme.siteVariables;
        return (
          <FluentUIForm styles={{ display: "block" }}>
            <MaxWidth>
              {topError && (
                <Alert
                  danger
                  visible
                  dismissible
                  content={
                    <Flex vAlign="center">
                      <ExclamationTriangleIcon
                        outline
                        styles={{ marginRight: ".25rem" }}
                      />
                      <Text content={getText(t.locale, topError)} />
                    </Flex>
                  }
                />
              )}
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
                  <Button
                    content={getText(t.locale, cancel)}
                    styles={{ marginRight: ".5rem" }}
                  />
                )}
                <Button primary content={getText(t.locale, submit)} />
              </MaxWidth>
            </Box>
          </FluentUIForm>
        );
      }}
    />
  );
};
