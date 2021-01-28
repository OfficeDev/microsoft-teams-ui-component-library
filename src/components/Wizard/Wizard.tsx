import React from "react";
import {
  Box,
  List,
  ProviderConsumer as FluentUIThemeConsumer,
  SiteVariablesPrepared,
} from "@fluentui/react-northstar";

import { AcceptIcon } from "@fluentui/react-icons-northstar";

import { IFormWizardStepProps, FormWizardStep } from "../Form/Form";
import { getText, TTextObject } from "../../translations";

export interface IWizardProps {
  stepTitles: TTextObject[];
  activeStepIndex: number;
  activeStep: IFormWizardStepProps;
}

const WizardSidebar = ({
  stepTitles,
  activeStepIndex,
}: Pick<IWizardProps, "stepTitles" | "activeStepIndex">) => {
  return (
    <FluentUIThemeConsumer
      render={(globalTheme) => {
        const { t } = globalTheme.siteVariables;
        return (
          <Box
            styles={{
              position: "fixed",
              top: 0,
              bottom: 0,
              left: 0,
              width: "14rem",
              overflowY: "auto",
              borderRightWidth: "1px",
              borderRightStyle: "solid",
              zIndex: 3,
            }}
            variables={({ colorScheme }: SiteVariablesPrepared) => ({
              borderColor: colorScheme.default.border2,
              backgroundColor: colorScheme.default.background2,
            })}
          >
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
                  ...(si > activeStepIndex && {
                    color: colorScheme.default.foregroundDisabled,
                  }),
                  ...(si === activeStepIndex && {
                    backgroundColor: colorScheme.default.background,
                  }),
                }),
              }))}
            />
          </Box>
        );
      }}
    />
  );
};

export const WizardDialog = () => {};

export const Wizard = ({
  stepTitles,
  activeStepIndex,
  activeStep,
}: IWizardProps) => {
  return (
    <>
      <WizardSidebar {...{ stepTitles, activeStepIndex }} />
      <FormWizardStep {...activeStep} />
    </>
  );
};
