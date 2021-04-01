import React from "react";
import CustomScrollArea from "react-perfect-scrollbar";
import omit from "lodash/omit";

import {
  Box,
  List,
  ProviderConsumer as FluentUIThemeConsumer,
  SiteVariablesPrepared,
} from "@fluentui/react-northstar";
import { AcceptIcon } from "@fluentui/react-icons-northstar";

import {
  IFormWizardStepProps,
  FormWizardStep,
  FormWizardStepDialog,
  TFormInteraction,
} from "../Form/Form";
import { getText, TTextObject } from "../../translations";
import { TeamsTheme } from "../../themes";

interface IWizardSidebarInteraction {
  event: "click";
  target: "wizard-sidebar";
  subject: string;
}

export type TWizardInteraction = TFormInteraction | IWizardSidebarInteraction;

export interface IWizardProps {
  stepTitles: TTextObject[];
  activeStepIndex: number;
  activeStep: IFormWizardStepProps;
  onInteraction?: (interaction: TWizardInteraction) => void;
}

export interface IWizardDialogProps extends IWizardProps {
  trigger: JSX.Element;
}

const WizardSidebar = ({
  stepTitles,
  activeStepIndex,
  onInteraction,
}: Pick<IWizardProps, "stepTitles" | "activeStepIndex" | "onInteraction">) => {
  return (
    <FluentUIThemeConsumer
      render={(globalTheme) => {
        const { t } = globalTheme.siteVariables;
        return (
          <Box
            styles={{
              display: "none",
              position: "fixed",
              top: 0,
              bottom: 0,
              left: 0,
              width: "14rem",
              overflowY: "auto",
              borderRightWidth: "1px",
              borderRightStyle: "solid",
              zIndex: 3,
              "@media screen and (min-width: 34rem)": {
                display: "block",
              },
            }}
            variables={({ colorScheme }: SiteVariablesPrepared) => ({
              borderColor: colorScheme.default.border2,
              backgroundColor: colorScheme.default.background2,
            })}
          >
            <CustomScrollArea>
              <List
                navigable
                items={stepTitles.map((stepTitle, si) => ({
                  key: `wizard-step__${si}`,
                  content: (
                    <>
                      {
                        <Box
                          styles={{
                            display: "inline-block",
                            marginRight: ".5rem",
                          }}
                          variables={({
                            colorScheme,
                            theme,
                          }: SiteVariablesPrepared) =>
                            theme === TeamsTheme.HighContrast
                              ? {}
                              : {
                                  color: colorScheme.green.foreground,
                                }
                          }
                        >
                          <AcceptIcon
                            styles={{
                              fill: "currentcolor",
                              ...(si >= activeStepIndex && {
                                visibility: "hidden",
                              }),
                            }}
                            outline
                          />
                        </Box>
                      }
                      {getText(t.locale, stepTitle)}
                    </>
                  ),
                  variables: ({
                    colorScheme,
                    theme,
                  }: SiteVariablesPrepared) => ({
                    color:
                      si > activeStepIndex
                        ? theme === TeamsTheme.HighContrast
                          ? colorScheme.default.foregroundDisabled1
                          : colorScheme.default.foregroundDisabled
                        : theme === TeamsTheme.HighContrast &&
                          si === activeStepIndex
                        ? colorScheme.default.foregroundActive1
                        : colorScheme.default.foreground1,
                    ...(si === activeStepIndex
                      ? {
                          backgroundColor:
                            theme === TeamsTheme.HighContrast
                              ? colorScheme.default.backgroundActive1
                              : colorScheme.default.background,
                          hoverBackgroundColor:
                            theme === TeamsTheme.HighContrast
                              ? colorScheme.default.backgroundActive1
                              : colorScheme.default.background,
                          fontWeight: 600,
                        }
                      : {
                          hoverBackgroundColor:
                            theme === TeamsTheme.HighContrast
                              ? colorScheme.default.background5
                              : colorScheme.default.background,
                        }),
                  }),
                  styles: {
                    minHeight: "none",
                    paddingTop: ".4375rem",
                    paddingBottom: ".4375rem",
                    borderRadius: ".1875rem",
                    ...(si > activeStepIndex && { pointerEvents: "none" }),
                  },
                  ...(onInteraction && {
                    onClick: () =>
                      onInteraction({
                        event: "click",
                        target: "wizard-sidebar",
                        subject: `wizard-step__${si}`,
                      }),
                  }),
                }))}
                styles={{
                  padding: "1.5rem .5rem",
                }}
              />
            </CustomScrollArea>
          </Box>
        );
      }}
    />
  );
};

export const Wizard = ({
  stepTitles,
  activeStepIndex,
  activeStep,
  onInteraction,
}: IWizardProps) => {
  return (
    <>
      <WizardSidebar {...{ stepTitles, activeStepIndex, onInteraction }} />
      <FormWizardStep
        {...{ onInteraction }}
        {...omit(activeStep, activeStepIndex === 0 ? ["back"] : [])}
      />
    </>
  );
};

export const WizardDialog = ({
  activeStep: formProps,
  ...props
}: IWizardDialogProps) => {
  return <FormWizardStepDialog {...formProps} {...props} />;
};
