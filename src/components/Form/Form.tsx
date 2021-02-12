import React, { SetStateAction, useState } from "react";
import CustomScrollArea from "react-perfect-scrollbar";
import clone from "lodash/clone";

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

import { WithOptionalInternalCallbacks, Surface } from "../../types/types";

import { FormTheme } from "./FormTheme";
import {
  FormContent,
  MaxWidth,
  ISection,
  ITextInputs,
  setInitialValue,
} from "./FormContent";

export interface IFormState {
  [inputId: string]: string | string[];
}

export type TFormErrors = { [inputId: string]: TTextObject };

export type TFormInteraction = {
  event: "submit" | "cancel" | "back";
  target: "form";
  formState: IFormState;
};

export interface IFormProps extends WithOptionalInternalCallbacks<IFormState> {
  headerSection?: ISection;
  sections: ISection[];
  errors?: TFormErrors;
  topError?: TTextObject;
  submit: TTextObject;
  cancel?: TTextObject;
  onInteraction?: (interaction: TFormInteraction) => void;
}

export interface IFormDialogProps extends IFormProps {
  trigger: JSX.Element;
}

export interface IFormWizardStepProps extends IFormProps {
  back?: TTextObject;
}

export interface IFormWizardStepDialogProps extends IFormWizardStepProps {
  trigger: JSX.Element;
}

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

export const Form = ({
  cancel,
  errors,
  headerSection,
  sections,
  submit,
  topError,
  onInteraction,
}: IFormProps) => {
  const [formState, setUnclonedFormState] = useState<IFormState>(() =>
    initialFormState(sections)
  );

  const setFormState = (formState: SetStateAction<IFormState>) =>
    setUnclonedFormState(clone(formState));

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
                styles={{
                  backgroundColor: "var(--surface-background)",
                  height: "1px",
                  position: "absolute",
                  left: 0,
                  right: 0,
                  zIndex: 1,
                }}
              />
              <Box
                styles={{
                  backgroundColor: "var(--shadow-background)",
                  height: "1px",
                  position: "sticky",
                  bottom: "4.5rem",
                }}
              />
              <Box
                styles={{
                  backgroundColor: "var(--surface-background)",
                  position: "sticky",
                  bottom: 0,
                  height: "4.5rem",
                  zIndex: 2,
                }}
              >
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
              </Box>
            </FluentUIForm>
          </FormTheme>
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
  onInteraction,
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
          <Dialog
            trigger={trigger}
            trapFocus
            content={
              <FormTheme globalTheme={globalTheme} surface={Surface.raised}>
                <CustomScrollArea>
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
          />
        );
      }}
    />
  );
};
