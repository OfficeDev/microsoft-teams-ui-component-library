import React, {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  SyntheticEvent,
  useState,
} from "react";
import get from "lodash/get";
import clone from "lodash/clone";

import {
  Alert,
  Box,
  Button,
  Checkbox,
  Dialog,
  DropdownItemProps,
  Flex,
  Form as FluentUIForm,
  Input,
  InputProps,
  ProviderConsumer as FluentUIThemeConsumer,
  RadioGroupItemProps,
  SiteVariablesPrepared,
  Text,
  TextArea,
  selectableListBehavior,
} from "@fluentui/react-northstar";

import { getText, TTextObject, TTranslations } from "../../translations";

import { WithOptionalInternalCallbacks } from "../../types/types";

import {
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
} from "@fluentui/react-icons-northstar";

export interface IFormState {
  [inputId: string]: string | string[];
}

interface IEnumerableInputOption {
  title: TTextObject;
  value: string;
}

interface IEnumerableInputBase {
  title: TTextObject;
  options: IEnumerableInputOption[];
  inputId: string;
  optional?: boolean;
}

interface IEnumerableSingletonInputBase extends IEnumerableInputBase {
  initialValue?: string;
}

interface IEnumerableMultipleInputBase extends IEnumerableInputBase {
  initialValues?: string[];
}

interface ITextInputBase {
  title: TTextObject;
  inputId: string;
  optional?: boolean;
  placeholder?: TTextObject;
  initialValue?: string;
}

export type TInputWidth = "split" | "full";

interface IPreparedInput {
  formState: IFormState;
  setFormState: Dispatch<SetStateAction<IFormState>>;
  t: TTranslations;
  errors?: TFormErrors;
}

interface ITextField extends ITextInputBase {
  type: "text";
  width?: TInputWidth;
}

interface IPreparedTextField extends ITextField, IPreparedInput {}

interface IMultilineTextInput extends ITextInputBase {
  type: "multiline-text";
}

interface IPreparedMultilineTextInput
  extends IMultilineTextInput,
    IPreparedInput {}

export type TField = IDropdownInput | IDropdownMultipleInput | ITextField;

interface ITextInputs {
  type: "text-inputs";
  fields: TField[];
}

interface IPreparedTextInputs extends ITextInputs, IPreparedInput {}

interface IDropdownInput extends IEnumerableSingletonInputBase {
  type: "dropdown";
  multiple?: false;
  width?: TInputWidth;
}

interface IPreparedDropdownInput extends IDropdownInput, IPreparedInput {}

interface IDropdownMultipleInput extends IEnumerableMultipleInputBase {
  type: "dropdown";
  multiple: true;
  width?: TInputWidth;
}

interface IPreparedDropdownMultipleInput
  extends IDropdownMultipleInput,
    IPreparedInput {}

interface IRadioButtonsInput extends IEnumerableSingletonInputBase {
  type: "radio-buttons";
}

interface IPreparedRadioButtonsInput
  extends IRadioButtonsInput,
    IPreparedInput {}

interface ICheckboxesInput extends IEnumerableMultipleInputBase {
  type: "checkboxes";
}

interface IPreparedCheckboxesInput extends ICheckboxesInput, IPreparedInput {}

type TInputGroup =
  | ITextInputs
  | IMultilineTextInput
  | IDropdownInput
  | IDropdownMultipleInput
  | IRadioButtonsInput
  | ICheckboxesInput;

type TPreparedInputGroup =
  | IPreparedTextInputs
  | IPreparedMultilineTextInput
  | IPreparedDropdownInput
  | IPreparedDropdownMultipleInput
  | IPreparedRadioButtonsInput
  | IPreparedCheckboxesInput;

interface ISection {
  title?: TTextObject;
  preface?: TTextObject;
  inputGroups?: TInputGroup[];
}

export type TFormErrors = { [inputId: string]: TTextObject };

export interface IFormProps extends WithOptionalInternalCallbacks<IFormState> {
  headerSection?: ISection;
  sections: ISection[];
  errors?: TFormErrors;
  topError?: TTextObject;
  submit: TTextObject;
  cancel?: TTextObject;
}

export interface IFormDialogProps extends IFormProps {
  trigger: JSX.Element;
}

interface IFormSectionProps extends IPreparedInput {
  section: ISection;
  header?: false;
  keyPrefix: string;
}

interface IFormHeaderSectionProps {
  section: ISection;
  header: true;
  errors?: TFormErrors;
  t: TTranslations;
}

const MaxWidth = ({ children, styles, flush }: PropsWithChildren<any>) => (
  <Box
    styles={{
      margin: "0 auto",
      maxWidth: flush ? "none" : "29.75rem",
      padding: flush ? 0 : "1.25rem",
      ...styles,
    }}
  >
    {children}
  </Box>
);

interface IErrorMessageProps {
  excludeIcon?: boolean;
  message: TTextObject;
  id?: string;
  t?: TTranslations;
}

const errorId = (describesId: string) => `${describesId}__error`;
const labelId = (describesId: string) => `${describesId}__label`;
const fullInputId = (inputId: string) => `input_${inputId}`;

const ErrorMessage = ({ excludeIcon, message, id, t }: IErrorMessageProps) => (
  <Box
    variables={({ colorScheme }: SiteVariablesPrepared) => ({
      color: colorScheme.red.foreground,
    })}
    {...(id && { id })}
    styles={{ paddingLeft: ".375rem" }}
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

const DropdownField = (
  props: IPreparedDropdownInput | IPreparedDropdownMultipleInput
) => {
  const { options, t, inputId, title, errors, formState, setFormState } = props;
  const id = fullInputId(inputId);
  const error = get(errors, inputId, false);
  const selectedValues = Array.isArray(formState[inputId])
    ? formState[inputId]
    : formState[inputId]
    ? [formState[inputId]]
    : [];
  const items = options.map(({ title, value }) => ({
    key: `${inputId}__${value}`,
    selected: selectedValues.includes(value),
    header: getText(t?.locale, title),
    "data-value": value,
  }));
  return (
    <FluentUIForm.Dropdown
      fluid
      id={id}
      label={getText(t?.locale, title)}
      styles={{ marginBottom: ".75rem" }}
      onChange={(_e, props) => {
        if (props.multiple) {
          const values = (get(
            props,
            "value",
            []
          ) as DropdownItemProps[]).map(
            (selectedItemProps: DropdownItemProps) =>
              get(selectedItemProps, "data-value")
          );
          values.length
            ? (formState[inputId] = values)
            : delete formState[inputId];
        } else {
          formState[inputId] = get(props, ["value", "data-value"]);
        }
        setFormState(formState);
      }}
      defaultValue={
        props.multiple
          ? items.filter(({ "data-value": value }) =>
              selectedValues.includes(value)
            )
          : items.find(({ "data-value": value }) =>
              selectedValues.includes(value)
            )
      }
      items={items}
      {...(props.multiple && { multiple: true })}
      {...(error && {
        error: true,
        errorMessage: <ErrorMessage message={error} t={t} />,
      })}
    />
  );
};

const TextField = ({
  placeholder,
  t,
  title,
  errors,
  inputId,
  formState,
  setFormState,
}: IPreparedTextField) => {
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
      value={formState[inputId] as string}
      onChange={(e, props) => {
        if (props?.value) formState[inputId] = props.value.toString();
        setFormState(formState);
      }}
    />
  );
};

const TextInputsGroup = ({
  fields,
  t,
  errors,
  formState,
  setFormState,
}: IPreparedTextInputs) => {
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
                  return (
                    <DropdownField
                      {...field}
                      {...{ t, errors, formState, setFormState }}
                    />
                  );
                case "text":
                  return (
                    <TextField
                      {...field}
                      {...{ t, errors, formState, setFormState }}
                    />
                  );
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
  options,
  title,
  t,
  inputId,
  errors,
  formState,
  setFormState,
}: IPreparedCheckboxesInput) => {
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
        aria-multiselectable="true"
      >
        {options.map(({ title, value }) => {
          const selected = formState[inputId]?.includes(value);
          return (
            <Box key={`${id}__${value}`}>
              <Checkbox
                role="option"
                aria-selected={selected ? "true" : "false"}
                checked={selected}
                variables={{ layout: "radio-like" }}
                label={getText(t?.locale, title)}
                data-value={value}
                onChange={(e, props) => {
                  const value = get(props, "data-value");
                  if (props?.checked) {
                    Array.isArray(formState[inputId])
                      ? (formState[inputId] as string[]).push(value)
                      : (formState[inputId] = [value]);
                  } else {
                    const next_values = (formState[inputId] as string[]).filter(
                      (v) => v !== value
                    );
                    next_values.length > 0
                      ? (formState[inputId] = next_values)
                      : delete formState[inputId];
                  }
                  setFormState(formState);
                }}
              />
            </Box>
          );
        })}
      </Box>
      {error && <ErrorMessage message={error} t={t} />}
    </Box>
  );
};

const MultilineTextGroup = ({
  title,
  placeholder,
  t,
  inputId,
  errors,
  formState,
  setFormState,
}: IPreparedMultilineTextInput) => {
  const id = fullInputId(inputId);
  const error = get(errors, inputId, false);
  return (
    <Box styles={{ marginBottom: ".75rem" }}>
      <Input.Label htmlFor={id} id={labelId(id)}>
        {getText(t?.locale, title)}
      </Input.Label>
      <TextArea
        fluid
        resize="vertical"
        id={id}
        value={(formState[inputId] as string) || ""}
        {...(placeholder && { placeholder: getText(t?.locale, placeholder) })}
        onChange={(e, props) => {
          props && props.value
            ? (formState[inputId] = props.value)
            : delete formState[inputId];
          setFormState(formState);
        }}
      />
      {error && <ErrorMessage message={error} t={t} />}
    </Box>
  );
};

const RadioButtonsGroup = ({
  options,
  t,
  inputId,
  title,
  errors,
  formState,
  setFormState,
}: IPreparedRadioButtonsInput) => {
  const id = fullInputId(inputId);
  const error = get(errors, inputId, false);
  return (
    <FluentUIForm.RadioGroup
      id={id}
      vertical
      styles={{ marginBottom: ".75rem" }}
      label={getText(t?.locale, title)}
      {...(error && { errorMessage: <ErrorMessage message={error} t={t} /> })}
      items={options.map(({ title, value }) => {
        const label = getText(t?.locale, title);
        const key = `${inputId}__${value}`;
        const name = label;
        const checked = formState[inputId] === value;
        const onChange = (
          _e: SyntheticEvent<HTMLElement, Event>,
          props: RadioGroupItemProps | undefined
        ) => {
          if (props && props.checked && props.value)
            formState[inputId] = props.value.toString();
          setFormState(formState);
        };
        return { key, value, label, name, checked, onChange };
      })}
    />
  );
};

const FormInputGroup = (props: TPreparedInputGroup) => {
  switch (props.type) {
    case "text-inputs":
      return <TextInputsGroup {...props} />;
    case "multiline-text":
      return <MultilineTextGroup {...props} />;
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
            {...{
              t,
              errors,
              formState: (props as IFormSectionProps).formState,
              setFormState: (props as IFormSectionProps).setFormState,
            }}
            key={`${(props as IFormSectionProps).keyPrefix}__Group-${gi}`}
          />
        ))}
    </>
  );
};

const setInitialValue = (
  acc: IFormState,
  field:
    | TField
    | IMultilineTextInput
    | IDropdownInput
    | IDropdownMultipleInput
    | IRadioButtonsInput
    | ICheckboxesInput
) => {
  if (
    field.hasOwnProperty("initialValue") &&
    (field as
      | ITextField
      | IMultilineTextInput
      | IDropdownInput
      | IRadioButtonsInput).initialValue
  )
    acc[field.inputId] = (field as
      | ITextField
      | IDropdownInput
      | IRadioButtonsInput).initialValue!;
  else if (field.hasOwnProperty("initialValues"))
    acc[field.inputId] =
      (field as IDropdownMultipleInput | ICheckboxesInput).initialValues || [];
  return acc;
};

const initialFormState = (sections: ISection[]) => {
  return sections.reduce(
    (acc_i: IFormState, { inputGroups }) =>
      inputGroups
        ? inputGroups.reduce((acc_j: IFormState, inputGroup) => {
            if (!inputGroup) return acc_j;
            switch (inputGroup.type) {
              case "text-inputs":
                return (inputGroup as ITextInputs).fields.reduce(
                  setInitialValue,
                  acc_j
                );
              default:
                return setInitialValue(acc_j, inputGroup);
            }
          }, acc_i)
        : acc_i,
    {}
  );
};

interface IFormContentProps extends Omit<IFormProps, "submit"> {
  formState: IFormState;
  setFormState: Dispatch<SetStateAction<IFormState>>;
  t: TTranslations;
  flush?: boolean;
}

const FormContent = ({
  topError,
  flush,
  t,
  headerSection,
  sections,
  errors,
  formState,
  setFormState,
}: IFormContentProps) => {
  return (
    <MaxWidth flush={flush}>
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
              <Text
                styles={{ margin: ".25rem 0" }}
                content={getText(t.locale, topError)}
              />
            </Flex>
          }
        />
      )}
      {headerSection && (
        <FormSection header section={headerSection} {...{ t, errors }} />
      )}
      {sections.map((section, si) => {
        const key = `Form__Section-${si}`;
        return (
          <FormSection
            {...{
              section,
              t,
              key,
              keyPrefix: key,
              errors,
              formState,
              setFormState,
            }}
          />
        );
      })}
    </MaxWidth>
  );
};

export const Form = ({
  cancel,
  errors,
  headerSection,
  sections,
  submit,
  topError,
  __internal_callbacks__,
}: IFormProps) => {
  const [formState, setUnclonedFormState] = useState<IFormState>(
    initialFormState(sections)
  );

  const setFormState = (formState: SetStateAction<IFormState>) =>
    setUnclonedFormState(clone(formState));

  return (
    <FluentUIThemeConsumer
      render={(globalTheme) => {
        const { t } = globalTheme.siteVariables;
        return (
          <FluentUIForm
            styles={{
              display: "block",
              "& > *:not(:last-child)": { marginBottom: 0 },
              "& > :last-child": { marginTop: 0 },
            }}
            onSubmit={(e) => {
              __internal_callbacks__ &&
                __internal_callbacks__["submit"] &&
                __internal_callbacks__["submit"](e, formState);
            }}
          >
            <FormContent
              {...{
                headerSection,
                sections,
                topError,
                errors,
                t,
                formState,
                setFormState,
              }}
            />
            <Box
              variables={({ colorScheme }: SiteVariablesPrepared) => ({
                backgroundColor: colorScheme.default.background,
              })}
              styles={{
                height: "1px",
                position: "absolute",
                left: 0,
                right: 0,
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
                <Button
                  primary
                  type="submit"
                  content={getText(t.locale, submit)}
                />
              </MaxWidth>
            </Box>
          </FluentUIForm>
        );
      }}
    />
  );
};

export const FormDialog = ({
  cancel,
  errors,
  headerSection,
  sections,
  submit,
  topError,
  trigger,
  __internal_callbacks__,
}: IFormDialogProps) => {
  const [formState, setUnclonedFormState] = useState<IFormState>(
    initialFormState(sections)
  );

  const setFormState = (formState: SetStateAction<IFormState>) =>
    setUnclonedFormState(clone(formState));

  return (
    <Dialog
      trigger={trigger}
      trapFocus
      content={
        <FluentUIThemeConsumer
          render={(globalTheme) => {
            const { t } = globalTheme.siteVariables;
            return (
              <FluentUIForm styles={{ display: "block" }}>
                <FormContent
                  flush
                  {...{
                    headerSection,
                    sections,
                    topError,
                    errors,
                    t,
                    formState,
                    setFormState,
                  }}
                />
              </FluentUIForm>
            );
          }}
        />
      }
      confirmButton={{
        content: submit,
        onClick: (e) => {
          __internal_callbacks__ &&
            __internal_callbacks__["submit"] &&
            __internal_callbacks__["submit"](e, formState);
        },
      }}
      cancelButton={{
        content: cancel,
      }}
    />
  );
};
