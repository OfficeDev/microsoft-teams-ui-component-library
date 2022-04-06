import React, {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  SyntheticEvent,
} from "react";

import produce from "immer";

import get from "lodash/get";
import chunk from "lodash/chunk";

import {
  Alert,
  Accessibility,
  Box,
  Checkbox,
  Dropdown,
  DropdownItemProps,
  Flex,
  FormDropdown as FluentUIFormDropdown,
  FormRadioGroup as FluentUIFormRadioGroup,
  Input,
  RadioGroupItemProps,
  selectableListBehavior,
  SiteVariablesPrepared,
  Text,
  TextArea,
  AccessibilityDefinition,
} from "@fluentui/react-northstar";
import { ICSSInJSStyle } from "@fluentui/styles";
import {
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
} from "@fluentui/react-icons-northstar";

import { getText, TTextObject, TTranslations } from "../../translations";
import { IFormProps, IFormState, TFormErrors } from "./Form";
import Phrasing, { TPhrasingContent } from "../../lib/Phrasing";

/**
 * Properties for each option for Enumerable inputs (radio buttons, checkboxes, dropdowns).
 * @public
 */
export interface IEnumerableInputOption {
  /**
   * The option’s text content to display.
   */
  title: TTextObject;
  /**
   * The option’s value, which should be unique for the input in which it’s available.
   */
  value: string;
}

/**
 * Properties shared by all enumerable inputs (radio buttons, checkboxes, dropdowns).
 * @public
 */
export interface IEnumerableInputBase {
  /**
   * The input’s label.
   */
  title: TTextObject;
  /**
   * The input’s options.
   */
  options: IEnumerableInputOption[];
  /**
   * The input’s unique ID.
   */
  inputId: string;
}

/**
 * Properties shared by singleton enumerable inputs (radio buttons, single-select dropdowns).
 * @public
 */
export interface IEnumerableSingletonInputBase extends IEnumerableInputBase {
  /**
   * The input’s initial value.
   */
  initialValue?: string;
}

/**
 * Properties shared by enumerable inputs supporting multiple selections (checkboxes,
 * multiple-select dropdowns).
 * @public
 */
export interface IEnumerableMultipleInputBase extends IEnumerableInputBase {
  /**
   * The input’s initial values.
   */
  initialValues?: string[];
}

/**
 * Properties shared by text inputs (single- and multi-line).
 * @public
 */
export interface ITextInputBase {
  /**
   * The input’s label.
   */
  title: TTextObject;
  /**
   * The input’s unique ID
   */
  inputId: string;
  /**
   * The input’s placeholder content.
   */
  placeholder?: TTextObject;
  /**
   * The input’s initial value.
   */
  initialValue?: string;
}

/**
 * An inline input’s width.
 * @public
 */
export enum EInputWidth {
  /**
   * The input should share the width with the other inline inputs.
   */
  split = "split",
  /**
   * The input should occupy the full width of the Form
   */
  full = "full",
}

interface IPreparedInput {
  formState: IFormState;
  setFormState: Dispatch<SetStateAction<IFormState>>;
  t: TTranslations;
  errors?: TFormErrors;
  breakpointOffset?: number;
}

/**
 * The types of inline inputs.
 * @public
 */
export enum EInlineInputType {
  text = "text",
  dropdown = "dropdown",
}

/**
 * The types of input blocks.
 * @public
 */
export enum EInputBlockType {
  inlineInputs = "inline-inputs",
  dropdown = "dropdown",
  multilineText = "multiline-text",
  radioButtons = "radio-buttons",
  checkboxes = "checkboxes",
}

/**
 * A single-line text field.
 * @public
 */
export interface ITextField extends ITextInputBase {
  type: EInlineInputType.text;
  width?: EInputWidth;
}

/**
 * A multi-line text field.
 * @public
 */
export interface IMultilineTextInput extends ITextInputBase {
  type: EInputBlockType.multilineText;
}

interface IPreparedMultilineTextInput
  extends IMultilineTextInput,
    IPreparedInput {}

/**
 * @public
 */
export type TInlineField = IDropdownInput | IDropdownMultipleInput | ITextField;

/**
 * A block containing a set of one or more text inputs or dropdowns.
 * @public
 */
export interface IInlineInputsBlock {
  type: EInputBlockType.inlineInputs;
  fields: TInlineField[];
}

interface IPreparedInlineInputs extends IInlineInputsBlock, IPreparedInput {}

/**
 * A single-select dropdown.
 * @public
 */
export interface IDropdownInput extends IEnumerableSingletonInputBase {
  type: EInlineInputType.dropdown | EInputBlockType.dropdown;
  multiple?: false;
  width?: EInputWidth;
}

interface IPreparedDropdownInput extends IDropdownInput, IPreparedInput {}

/**
 * A multiple-select dropdown.
 * @public
 */
export interface IDropdownMultipleInput extends IEnumerableMultipleInputBase {
  type: EInlineInputType.dropdown | EInputBlockType.dropdown;
  multiple: true;
  width?: EInputWidth;
}

interface IPreparedDropdownMultipleInput
  extends IDropdownMultipleInput,
    IPreparedInput {}

/**
 * A set of radio buttons (from which only one can be selected).
 * @public
 */
export interface IRadioButtonsInput extends IEnumerableSingletonInputBase {
  type: EInputBlockType.radioButtons;
}

interface IPreparedRadioButtonsInput
  extends IRadioButtonsInput,
    IPreparedInput {}

/**
 * A set of checkboxes.
 * @public
 */
export interface ICheckboxesInput extends IEnumerableMultipleInputBase {
  type: EInputBlockType.checkboxes;
}

interface IPreparedCheckboxesInput extends ICheckboxesInput, IPreparedInput {}

/**
 * A block with a single input which occupies the full width of the form.
 * @public
 */
export type TInputBlock =
  | IMultilineTextInput
  | IDropdownInput
  | IDropdownMultipleInput
  | IRadioButtonsInput
  | ICheckboxesInput;

type TPreparedInputBlock =
  | IPreparedInlineInputs
  | IPreparedMultilineTextInput
  | IPreparedDropdownInput
  | IPreparedDropdownMultipleInput
  | IPreparedRadioButtonsInput
  | IPreparedCheckboxesInput;

/**
 * @public
 */
export interface ISection {
  /**
   * The title of the section, rendered as an `h#` element.
   */
  title?: TPhrasingContent;
  /**
   * Text content of the section rendered before the input groups as a `p` element.
   */
  preface?: TTextObject;
  /**
   * The input blocks to render in this section, which can either be a block with an individual
   * input, or a block with a set of inline inputs.
   */
  inputBlocks?: (TInputBlock | IInlineInputsBlock)[];
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

const DropdownBlock = (
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
    <FluentUIFormDropdown
      fluid
      id={id}
      label={getText(t?.locale, title)}
      styles={{ marginBottom: ".75rem" }}
      onChange={(_e, props) => {
        setFormState(
          produce(formState, (draft) => {
            if (props.multiple) {
              const values = (
                get(props, "value", []) as DropdownItemProps[]
              ).map((selectedItemProps: DropdownItemProps) =>
                get(selectedItemProps, "data-value")
              );
              values.length ? (draft[inputId] = values) : delete draft[inputId];
            } else {
              draft[inputId] = get(props, ["value", "data-value"]);
            }
          })
        );
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

const splitQuery = (rowSize: number, breakpointOffset: number) =>
  `@media (min-width: ${16 * 8.25 * rowSize + 16 * breakpointOffset}px)`;

const textInputStyles = (
  rowSize: number,
  group: number,
  breakpointOffset = 0
) => ({
  flex: "1 0 auto",
  marginRight: ".75rem",
  marginBottom: group === 0 ? ".25rem" : ".75rem",
  width: "100%",
  [splitQuery(rowSize, breakpointOffset)]: {
    order: group,
    width: `calc(${(100 / rowSize).toFixed(1)}% - .75rem)`,
  },
  ...(group === 0 && { alignSelf: "flex-end" }),
});

const InlineInputsBlock = ({
  fields,
  t,
  errors,
  formState,
  setFormState,
  breakpointOffset,
}: IPreparedInlineInputs) => {
  const rows: TInlineField[][] = [];
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
              [splitQuery(rowFields.length, breakpointOffset || 0)]: {
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
                    styles={textInputStyles(
                      rowFields.length,
                      0,
                      breakpointOffset
                    )}
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
                              ...textInputStyles(
                                rowFields.length,
                                1,
                                breakpointOffset
                              ),
                              ...(error && { marginBottom: 0 }),
                            }}
                            onChange={(_e, props) => {
                              setFormState(
                                produce(formState, (draft) => {
                                  if (props.multiple) {
                                    const values = (
                                      get(
                                        props,
                                        "value",
                                        []
                                      ) as DropdownItemProps[]
                                    ).map(
                                      (selectedItemProps: DropdownItemProps) =>
                                        get(selectedItemProps, "data-value")
                                    );
                                    values.length
                                      ? (draft[inputId] = values)
                                      : delete draft[inputId];
                                  } else {
                                    draft[inputId] = get(props, [
                                      "value",
                                      "data-value",
                                    ]);
                                  }
                                })
                              );
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
                              ...textInputStyles(
                                rowFields.length,
                                1,
                                breakpointOffset
                              ),
                              ...(error && { marginBottom: 0 }),
                            }}
                            aria-labelledby={[labelId(id)]
                              .concat(error ? errorId(id) : [])
                              .join(" ")}
                            value={formState[inputId] as string}
                            onChange={(_e, props) => {
                              if (props && "value" in props) {
                                setFormState(
                                  produce(formState, (draft) => {
                                    draft[inputId] = props.value.toString();
                                  })
                                );
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
                      styles={textInputStyles(
                        rowFields.length,
                        2,
                        breakpointOffset
                      )}
                    />
                  ) : (
                    <Box
                      styles={{
                        ...textInputStyles(
                          rowFields.length,
                          2,
                          breakpointOffset
                        ),
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

const CheckboxesBlock = ({
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
        accessibility={selectableListBehavior as () => AccessibilityDefinition}
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
                  setFormState(
                    produce(formState, (draft) => {
                      const value = get(props, "data-value");
                      if (props?.checked) {
                        Array.isArray(draft[inputId])
                          ? (draft[inputId] as string[]).push(value)
                          : (draft[inputId] = [value]);
                      } else {
                        const next_values = (draft[inputId] as string[]).filter(
                          (v) => v !== value
                        );
                        next_values.length > 0
                          ? (draft[inputId] = next_values)
                          : delete draft[inputId];
                      }
                    })
                  );
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

const MultilineTextBlock = ({
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
          setFormState(
            produce(formState, (draft) => {
              props && props.value
                ? (draft[inputId] = props.value)
                : delete draft[inputId];
            })
          );
        }}
      />
      {error && <ErrorMessage message={error} t={t} />}
    </Box>
  );
};

const RadioButtonsBlock = ({
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
    <FluentUIFormRadioGroup
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
            setFormState(
              produce(formState, (draft) => {
                draft[inputId] = props.value!.toString();
              })
            );
        };
        return { key, value, label, name, checked, onChange };
      })}
    />
  );
};

const FormInputBlock = (props: TPreparedInputBlock) => {
  switch (props.type) {
    case "inline-inputs":
      return <InlineInputsBlock {...props} />;
    case "multiline-text":
      return <MultilineTextBlock {...props} />;
    case "dropdown":
      return <DropdownBlock {...props} />;
    case "checkboxes":
      return <CheckboxesBlock {...props} />;
    case "radio-buttons":
      return <RadioButtonsBlock {...props} />;
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
          <Phrasing content={section.title} locale={t.locale} />
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
      {section.inputBlocks?.length &&
        section.inputBlocks.map((inputBlock, gi) => (
          <FormInputBlock
            {...inputBlock}
            {...{
              t,
              errors,
              formState: (props as IFormSectionProps).formState,
              setFormState: (props as IFormSectionProps).setFormState,
              breakpointOffset: (props as IFormSectionProps).breakpointOffset,
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
  breakpointOffset?: number;
}

export const setInitialValue = (
  acc: IFormState,
  field:
    | TInlineField
    | IMultilineTextInput
    | IDropdownInput
    | IDropdownMultipleInput
    | IRadioButtonsInput
    | ICheckboxesInput
) => {
  if (
    field.hasOwnProperty("initialValue") &&
    (
      field as
        | ITextField
        | IMultilineTextInput
        | IDropdownInput
        | IRadioButtonsInput
    ).initialValue
  )
    acc[field.inputId] = (
      field as ITextField | IDropdownInput | IRadioButtonsInput
    ).initialValue!;
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
    breakpointOffset,
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
                breakpointOffset,
              }}
            />
          );
        })}
      </MaxWidth>
    );
  }
);
