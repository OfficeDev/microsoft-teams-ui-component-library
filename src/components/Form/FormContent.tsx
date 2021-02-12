import React, {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  SyntheticEvent,
} from "react";
import {
  Alert,
  Box,
  Checkbox,
  Dropdown,
  DropdownItemProps,
  Flex,
  Form as FluentUIForm,
  Input,
  RadioGroupItemProps,
  selectableListBehavior,
  SiteVariablesPrepared,
  Text,
  TextArea,
} from "@fluentui/react-northstar";
import { getText, TTextObject, TTranslations } from "../../translations";
import { ICSSInJSStyle } from "@fluentui/styles";
import {
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
} from "@fluentui/react-icons-northstar";
import get from "lodash/get";
import chunk from "lodash/chunk";
import uniqueId from "lodash/uniqueId";

import { IFormProps, IFormState, TFormErrors } from "./Form";

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

interface IMultilineTextInput extends ITextInputBase {
  type: "multiline-text";
}

interface IPreparedMultilineTextInput
  extends IMultilineTextInput,
    IPreparedInput {}

export type TField = IDropdownInput | IDropdownMultipleInput | ITextField;

export interface ITextInputs {
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

export interface ISection {
  title?: TTextObject;
  preface?: TTextObject;
  inputGroups?: TInputGroup[];
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

export const MaxWidth = ({
  children,
  styles,
  flush,
  align = "center",
}: PropsWithChildren<any>) => (
  <Box
    styles={{
      margin: (function () {
        switch (align) {
          case "left":
            return "0 auto 0 0";
          default:
            return "0 auto";
        }
      })(),
      maxWidth: flush ? "none" : "29.75rem",
      padding: flush ? 0 : "2rem",
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
  styles?: ICSSInJSStyle;
}

const errorId = (describesId: string) => `${describesId}__error`;
const labelId = (describesId: string) => `${describesId}__label`;
const fullInputId = (inputId: string) => `input_${inputId}`;

const ErrorMessage = ({
  excludeIcon,
  message,
  id,
  t,
  styles,
}: IErrorMessageProps) => (
  <Box
    variables={({ colorScheme }: SiteVariablesPrepared) => ({
      color: colorScheme.red.foreground,
    })}
    {...(id && { id })}
    styles={{ paddingLeft: ".375rem", ...styles }}
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

const splitQuery = (rowSize: number) =>
  `@media (min-width: ${16 * 8.25 * rowSize}px)`;

const textInputStyles = (rowSize: number, group: number) => ({
  flex: "1 0 auto",
  marginRight: ".75rem",
  marginBottom: group === 0 ? ".25rem" : ".75rem",
  width: "100%",
  [splitQuery(rowSize)]: {
    order: group,
    width: `calc(${(100 / rowSize).toFixed(1)}% - .75rem)`,
  },
  ...(group === 0 && { alignSelf: "flex-end" }),
});

const TextInputsGroup = ({
  fields,
  t,
  errors,
  formState,
  setFormState,
}: IPreparedTextInputs) => {
  const rows: TField[][] = [];
  let i = 0;
  while (i < fields.length) {
    switch (fields[i]?.width) {
      case "split":
        let j = i + 1;
        while (fields[j]?.width === "split") {
          j += 1;
        }
        Array.prototype.push.apply(rows, chunk(fields.slice(i, j + 1), 3));
        i = j;
        break;
      default:
        rows.push([fields[i]]);
        i += 1;
        break;
    }
  }

  return (
    <>
      {rows.map((rowFields, r) => {
        // TODO: row should have a stable field to use as the key, since the key
        // will be incorrect if the rows are shuffled. I've used the index for
        // now since it's more (but not totally) correct than the previous
        // behavior of using a generated id that changed on each render.
        return (
          <Box
            key={`form-content__row-${r}`}
            styles={{
              display: "flex",
              flexFlow: "row wrap",
              [splitQuery(rowFields.length)]: {
                marginRight: "-.75rem",
              },
            }}
          >
            {rowFields.map((field) => {
              const { inputId, title, type } = field;
              const id = fullInputId(inputId);
              const error = get(errors, inputId, false);
              return (
                <React.Fragment key={`form-content__${inputId}`}>
                  <Input.Label
                    htmlFor={id}
                    id={labelId(id)}
                    styles={textInputStyles(rowFields.length, 0)}
                  >
                    {getText(t?.locale, title)}
                  </Input.Label>
                  {(() => {
                    switch (type) {
                      case "dropdown":
                        const { options, multiple } = field as IDropdownInput;
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
                          <Dropdown
                            fluid
                            id={id}
                            label={getText(t?.locale, title)}
                            styles={{
                              ...textInputStyles(rowFields.length, 1),
                              ...(error && { marginBottom: 0 }),
                            }}
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
                                formState[inputId] = get(props, [
                                  "value",
                                  "data-value",
                                ]);
                              }
                              setFormState(formState);
                            }}
                            defaultValue={
                              multiple
                                ? items.filter(({ "data-value": value }) =>
                                    selectedValues.includes(value)
                                  )
                                : items.find(({ "data-value": value }) =>
                                    selectedValues.includes(value)
                                  )
                            }
                            items={items}
                            {...(multiple && { multiple: true })}
                            {...(error && { error: true })}
                          />
                        );
                      case "text":
                        const { placeholder } = field as ITextField;
                        return (
                          <Input
                            fluid
                            id={id}
                            {...(placeholder && {
                              placeholder: getText(t.locale, placeholder),
                            })}
                            {...(error && { error: true })}
                            styles={{
                              ...textInputStyles(rowFields.length, 1),
                              ...(error && { marginBottom: 0 }),
                            }}
                            aria-labelledby={[labelId(id)]
                              .concat(error ? errorId(id) : [])
                              .join(" ")}
                            value={formState[inputId] as string}
                            onChange={(e, props) => {
                              if (props && "value" in props) {
                                formState[inputId] = props.value.toString();
                                setFormState(formState);
                              }
                            }}
                          />
                        );
                      default:
                        return null;
                    }
                  })()}
                  {error ? (
                    <ErrorMessage
                      message={error}
                      t={t}
                      id={errorId(id)}
                      styles={textInputStyles(rowFields.length, 2)}
                    />
                  ) : (
                    <Box
                      styles={{
                        ...textInputStyles(rowFields.length, 2),
                        marginBottom: 0,
                      }}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </Box>
        );
      })}
    </>
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
      {error && <ErrorMessage message={error} t={t} id={errorId(id)} />}
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
        fluid={true}
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
        <Text
          as="p"
          variables={({ colorScheme }: SiteVariablesPrepared) => ({
            color: colorScheme.default.foreground2,
          })}
        >
          {getText(t.locale, section.preface)}
        </Text>
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

interface IFormContentProps extends Omit<IFormProps, "submit"> {
  formState: IFormState;
  setFormState: Dispatch<SetStateAction<IFormState>>;
  t: TTranslations;
  flush?: boolean;
  align?: string;
}

export const setInitialValue = (
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

export const FormContent = React.memo(
  ({
    topError,
    flush,
    t,
    headerSection,
    sections,
    errors,
    formState,
    setFormState,
    align,
  }: IFormContentProps) => {
    return (
      <MaxWidth {...{ flush, align }}>
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
  }
);
