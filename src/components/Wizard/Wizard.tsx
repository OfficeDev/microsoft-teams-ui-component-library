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
                          }: SiteVariablesPrepared) => ({
                            color: colorScheme.green.foreground,
                          })}
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
                  variables: ({ colorScheme }: SiteVariablesPrepared) => ({
                    color:
                      si > activeStepIndex
                        ? colorScheme.default.foregroundDisabled
                        : colorScheme.default.foreground1,
                    ...(si === activeStepIndex && {
                      backgroundColor: colorScheme.default.background,
                      hoverBackgroundColor: colorScheme.default.background,
                    }),
                  }),
                  styles: {
                    minHeight: "none",
                    paddingTop: ".4375rem",
                    paddingBottom: ".4375rem",
                    borderRadius: ".1875rem",
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
                  padding: ".5rem",
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
