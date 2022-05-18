import React, { useState } from "react";
import CustomScrollArea from "../../lib/CustomScrollArea";

import {
  Box,
  Button,
  Dialog,
  Flex,
  Form as FluentUIForm,
  ProviderConsumer as FluentUIThemeConsumer,
  SiteVariablesPrepared,
} from "@fluentui/react-northstar";

import { getText, TTextObject } from "../../translations";
import { TeamsTheme } from "../../themes";

import { Surface } from "../../types/types";

import { SignifiedOverflow } from "../../lib/SignifiedOverflow";

import { FormTheme } from "./FormTheme";
import {
  FormContent,
  MaxWidth,
  ISection,
  IInlineInputsBlock,
  setInitialValue,
  TInputBlock,
} from "./FormContent";

/**
 * A collection of input values, keyed by input ID. If the input is a block of checkboxes or a
 * dropdown with multiple selection, the value will be an array of option IDs.
 * @public
 */
export interface IFormState {
  [inputId: string]: string | string[];
}

/**
 * A collection of error messages associated with inputs, keyed by input ID.
 * @public
 */
export type TFormErrors = { [inputId: string]: TTextObject };

/**
 * An interaction event emitted by the Form component. The payload always contains the Form’s state,
 * which contains the values of all the Form’s inputs.
 * @public
 */
export type TFormInteraction = {
  event: "submit" | "cancel" | "back";
  target: "form";
  formState: IFormState;
};

/**
 * The Form component can be used to render an interactive Form. Designs for this component are
 * available in the [Forms page of the Microsoft Teams UI Kit](https://www.figma.com/file/EOsbapNvZgEwcA1mShswfh/Microsoft-Teams-UI-Kit-Community?node-id=5271%3A221958).
 * @public
 */
export interface IFormProps {
  /**
   * A section rendered at the top of the Form, which uses an `h1` for the section’s title. Any
   * input groups are ignored.
   */
  headerSection?: ISection;
  /**
   * Form section, each of which can have a title (rendered as an `h2`) and a preface for any
   * descriptions or coaching text, which is rendered before any inputs or input groups.
   */
  sections: ISection[];
  /**
   * A collection of error messages associated with inputs, keyed by input ID.
   */
  errors?: TFormErrors;
  /**
   * An error to render at the top of the Form, in case it isn’t relevant to a specific input.
   */
  topError?: TTextObject;
  /**
   * The text content of the submit button.
   */
  submit: TTextObject;
  /**
   * The text content of the cancel button, if relevant. The button is not rendered if this is
   * absent.
   */
  cancel?: TTextObject;
  /**
   * An interaction handler for the Form. Interactions are triggered when the user clicks 'submit',
   * 'cancel', or 'back' (only in Wizard components).
   */
  onInteraction?: (interaction: TFormInteraction) => void;
}

export interface IFormDialogProps extends IFormProps {
  /**
   * A trigger element for a form dialog.
   * @internal
   */
  trigger: JSX.Element;
}

/**
 * A Form which is a step in a Wizard has the same inputs as Form with an additional option to
 * override the text of the Wizard’s back button for the current step.
 * @public
 */
export interface IFormWizardStepProps extends IFormProps {
  back?: TTextObject;
}

/**
 * @internal
 */
export interface IFormWizardStepDialogProps extends IFormWizardStepProps {
  trigger: JSX.Element;
}

const dialogStyles = {
  minWidth: "320px",
};

const initialFormState = (sections: ISection[]) => {
  return sections.reduce(
    (acc_i: IFormState, { inputBlocks }) =>
      inputBlocks
        ? inputBlocks.reduce((acc_j: IFormState, inputGroup) => {
            if (!inputGroup) return acc_j;
            switch (inputGroup.type) {
              case "inline-inputs":
                return (inputGroup as IInlineInputsBlock).fields.reduce(
                  setInitialValue,
                  acc_j
                );
              default:
                return setInitialValue(acc_j, inputGroup as TInputBlock);
            }
          }, acc_i)
        : acc_i,
    {}
  );
};

/**
 * @public
 */
export const Form = ({
  cancel,
  errors,
  headerSection,
  sections,
  submit,
  topError,
  onInteraction,
}: IFormProps) => {
  const [formState, setFormState] = useState<IFormState>(() =>
    initialFormState(sections)
  );

  return (
    <FluentUIThemeConsumer
      render={(globalTheme) => {
        const { t } = globalTheme.siteVariables;
        return (
          <FormTheme globalTheme={globalTheme} surface={Surface.base}>
            <FluentUIForm
              styles={{
                display: "block",
                "& > *:not(:last-child)": { marginBottom: 0 },
                "& > :last-child": { marginTop: 0 },
                backgroundColor: "var(--surface-background)",
              }}
              {...(onInteraction && {
                onSubmit: () =>
                  onInteraction({
                    event: "submit",
                    target: "form",
                    formState,
                  }),
              })}
            >
              <SignifiedOverflow
                body={
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
                }
                footer={
                  <MaxWidth
                    styles={{
                      display: "flex",
                      justifyContent: "flex-end",
                      padding: "1.25rem 2rem",
                    }}
                  >
                    {cancel && (
                      <Button
                        content={getText(t.locale, cancel)}
                        styles={{ marginRight: ".5rem" }}
                        {...(onInteraction && {
                          onClick: (e) => {
                            e.preventDefault();
                            onInteraction({
                              event: "cancel",
                              target: "form",
                              formState,
                            });
                          },
                        })}
                      />
                    )}
                    <Button
                      primary
                      type="submit"
                      content={getText(t.locale, submit)}
                    />
                  </MaxWidth>
                }
              />
            </FluentUIForm>
          </FormTheme>
        );
      }}
    />
  );
};

/**
 * @internal
 */
export const FormDialog = ({
  cancel,
  errors,
  headerSection,
  sections,
  submit,
  topError,
  trigger,
  onInteraction,
}: IFormDialogProps) => {
  const [formState, setFormState] = useState<IFormState>(
    initialFormState(sections)
  );

  return (
    <Dialog
      trigger={trigger}
      trapFocus
      content={
        <FluentUIThemeConsumer
          render={(globalTheme) => {
            const { t } = globalTheme.siteVariables;
            return (
              <FormTheme globalTheme={globalTheme} surface={Surface.raised}>
                <FluentUIForm
                  styles={{
                    display: "block",
                    backgroundColor: "var(--surface-background)",
                  }}
                >
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
                      breakpointOffset: 28,
                    }}
                  />
                </FluentUIForm>
              </FormTheme>
            );
          }}
        />
      }
      confirmButton={{
        content: submit,
        ...(onInteraction && {
          onClick: () =>
            onInteraction({
              event: "submit",
              target: "form",
              formState,
            }),
        }),
      }}
      cancelButton={{
        content: cancel,
        ...(onInteraction && {
          onClick: (e) => {
            e.preventDefault();
            onInteraction({
              event: "cancel",
              target: "form",
              formState,
            });
          },
        }),
      }}
      styles={dialogStyles}
    />
  );
};

export const FormWizardStep = ({
  headerSection,
  sections,
  topError,
  errors,
  cancel,
  submit,
  back,
  onInteraction,
}: IFormWizardStepProps) => {
  const [formState, setFormState] = useState<IFormState>(
    initialFormState(sections)
  );

  return (
    <FluentUIThemeConsumer
      render={(globalTheme) => {
        const { t } = globalTheme.siteVariables;
        return (
          <CustomScrollArea style={{ height: "calc(100% - 6rem)" }}>
            <FormTheme globalTheme={globalTheme} surface={Surface.base}>
              <FluentUIForm
                styles={{
                  display: "block",
                  "& > *:not(:last-child)": { marginBottom: 0 },
                  "& > :last-child": { marginTop: 0 },
                  backgroundColor: "var(--surface-background)",
                  "@media screen and (min-width: 34rem)": {
                    paddingLeft: "14rem",
                  },
                }}
                {...(onInteraction && {
                  onSubmit: () =>
                    onInteraction({
                      event: "submit",
                      target: "form",
                      formState,
                    }),
                })}
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
                    align: "left",
                    breakpointOffset: 14,
                  }}
                />

                <Box
                  styles={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "flex-end",
                    backgroundColor: "var(--overlay-background)",
                    position: "fixed",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "1.5rem 2rem 2rem 2.5rem",
                    zIndex: 2,
                    "@media screen and (min-width: 34rem)": {
                      left: "14rem",
                    },
                    borderTopStyle: "solid",
                  }}
                  variables={({
                    colorScheme,
                    theme,
                  }: SiteVariablesPrepared) => ({
                    elevation: colorScheme.elevations[16],
                    borderColor: colorScheme.default.foreground,
                    borderWidth: `${
                      theme === TeamsTheme.HighContrast ? "1px" : 0
                    } 0 0 0`,
                  })}
                >
                  {cancel && (
                    <Button
                      content={getText(t.locale, cancel)}
                      styles={{ marginRight: ".5rem", marginTop: ".5rem" }}
                      {...(onInteraction && {
                        onClick: (e) => {
                          e.preventDefault();
                          onInteraction({
                            event: "cancel",
                            target: "form",
                            formState,
                          });
                        },
                      })}
                    />
                  )}
                  <Box role="none" styles={{ flex: "1 0 0", height: "1px" }} />
                  {back && (
                    <Button
                      content={getText(t.locale, back)}
                      styles={{ marginRight: ".5rem", marginTop: ".5rem" }}
                      {...(onInteraction && {
                        onClick: (e) => {
                          e.preventDefault();
                          onInteraction({
                            event: "back",
                            target: "form",
                            formState,
                          });
                        },
                      })}
                    />
                  )}
                  <Button
                    primary
                    type="submit"
                    content={getText(t.locale, submit)}
                    styles={{ marginRight: ".5rem", marginTop: ".5rem" }}
                  />
                </Box>
              </FluentUIForm>
            </FormTheme>
          </CustomScrollArea>
        );
      }}
    />
  );
};

export const FormWizardStepDialog = ({
  cancel,
  back,
  errors,
  headerSection,
  sections,
  submit,
  topError,
  trigger,
  onInteraction,
}: IFormWizardStepDialogProps) => {
  const [formState, setFormState] = useState<IFormState>(
    initialFormState(sections)
  );

  return (
    <FluentUIThemeConsumer
      render={(globalTheme) => {
        const { t } = globalTheme.siteVariables;
        return (
          <Dialog
            trigger={trigger}
            trapFocus
            content={
              <FormTheme
                globalTheme={globalTheme}
                surface={Surface.raised}
                styles={{ marginRight: "-1rem" }}
              >
                <CustomScrollArea
                  options={{ suppressScrollX: true }}
                  style={{ maxHeight: "74vh" }}
                >
                  <FluentUIForm
                    styles={{
                      display: "block",
                      backgroundColor: "var(--surface-background)",
                      paddingRight: "1rem",
                    }}
                  >
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
                        breakpointOffset: 28,
                      }}
                    />
                  </FluentUIForm>
                </CustomScrollArea>
              </FormTheme>
            }
            footer={{
              children: (Component, { styles, ...props }) => {
                return (
                  <Flex {...{ styles }}>
                    <Button
                      content={getText(t.locale, cancel)}
                      {...(onInteraction && {
                        onClick: () => {
                          onInteraction({
                            event: "cancel",
                            target: "form",
                            formState,
                          });
                        },
                      })}
                    />
                    <Box styles={{ flex: "1 0 0" }} />
                    {back && (
                      <Button
                        content={getText(t.locale, back)}
                        {...(onInteraction && {
                          onClick: () => {
                            onInteraction({
                              event: "back",
                              target: "form",
                              formState,
                            });
                          },
                          styles: { marginRight: ".5rem" },
                        })}
                      />
                    )}
                    <Button
                      primary
                      content={getText(t.locale, submit)}
                      {...(onInteraction && {
                        onClick: () => {
                          onInteraction({
                            event: "submit",
                            target: "form",
                            formState,
                          });
                        },
                        styles: { marginRight: ".5rem" },
                      })}
                    />
                  </Flex>
                );
              },
            }}
            styles={dialogStyles}
          />
        );
      }}
    />
  );
};
