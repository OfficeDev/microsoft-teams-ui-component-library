import React from "react";
import {
  Button,
  Flex,
  FlexItem,
  Text,
  Loader,
  ProviderConsumer as FluentUIThemeConsumer,
} from "@fluentui/react-northstar";
import { TeamsTheme } from "../../themes";
import {
  CommunicationOptions,
  TCommunicationFields,
  TCommunicationProps,
  ICommunicationFields,
  ICommunicationFieldsWithThemedImage,
  ICommunicationIllustration,
} from "./CommunicationTypes";
import { Illustration } from "./Illustration";
import { isImageOrNot } from "../../lib/isImage";
import {
  DEFAULT_MESSAGE,
  DEFAULT_ILLUSTRATIONS,
  EMPTY_MESSAGE,
  EMPTY_ILLUSTRATIONS,
  ERROR_ILLUSTRATIONS,
  ERROR_MESSAGE,
  HELLO_ILLUSTRATIONS,
  HELLO_MESSAGE,
  THANKS_ILLUSTRATIONS,
  THANKS_MESSAGE,
  WELCOME_MESSAGE,
} from "./CommunicationOptions";
import { getText } from "../../translations";

/**
 * @public
 */
export function Communication({
  option,
  fields,
  onInteraction,
}: TCommunicationProps) {
  const [componentTheme, setComponentTheme] = React.useState<TeamsTheme>(
    TeamsTheme.Default
  );
  const [safeImageUrl, setSafeImageUrl] = React.useState<string>();
  let _fields: TCommunicationFields = {};
  let illustration: ICommunicationIllustration;
  if (option) {
    switch (option) {
      case CommunicationOptions.Default:
        _fields = DEFAULT_MESSAGE;
        illustration = DEFAULT_ILLUSTRATIONS;
        break;
      case CommunicationOptions.Empty:
        _fields = EMPTY_MESSAGE;
        illustration = EMPTY_ILLUSTRATIONS;
        break;
      case CommunicationOptions.Error:
        _fields = ERROR_MESSAGE;
        illustration = ERROR_ILLUSTRATIONS;
        break;
      case CommunicationOptions.Hello:
        _fields = HELLO_MESSAGE;
        illustration = HELLO_ILLUSTRATIONS;
        break;
      case CommunicationOptions.Thanks:
        _fields = THANKS_MESSAGE;
        illustration = THANKS_ILLUSTRATIONS;
        break;
      case CommunicationOptions.Welcome:
        _fields = WELCOME_MESSAGE;
        illustration = DEFAULT_ILLUSTRATIONS;
        break;
    }
  }
  if (fields) {
    _fields = { ..._fields, ...fields };
  }
  const { title, desc, actions } = _fields;
  const { image } = _fields as ICommunicationFields;
  if (image) {
    // Check if URL contains image and image in supported formats
    isImageOrNot(image.src).then(() => {
      setSafeImageUrl(image.src);
    });
  }

  const { themedImage } = _fields as ICommunicationFieldsWithThemedImage;
  if (themedImage) {
    isImageOrNot(themedImage[componentTheme]).then(() => {
      setSafeImageUrl(themedImage[componentTheme]);
    });
  }

  const onClick = onInteraction
    ? (target: string) => ({
        onClick: () =>
          onInteraction({
            event: "click",
            target,
          }),
      })
    : () => ({});

  return (
    <FluentUIThemeConsumer
      render={(globalTheme) => {
        setComponentTheme(globalTheme.siteVariables.theme as TeamsTheme);
        const { t } = globalTheme.siteVariables;
        return (
          <Flex
            vAlign="center"
            hAlign="center"
            styles={{
              width: "100%",
              flex: "1 1 100vh",
            }}
          >
            <Flex
              hAlign="center"
              gap="gap.large"
              column
              style={{
                width: "100%",
                maxWidth: "33.5rem",
                margin: "3rem 1.25rem",
              }}
            >
              {
                // Show default illustrations if imageUrl not passed
                illustration && !(image || themedImage) && (
                  <Illustration option={illustration[componentTheme]} />
                )
              }
              {
                // Render image if URL is safe
                safeImageUrl && (image || themedImage) && (
                  <img
                    src={safeImageUrl}
                    style={{
                      width: "100%",
                      maxWidth: "20rem",
                      height: "12.5rem",
                      maxHeight: "12.5rem",
                      objectFit: "contain",
                    }}
                    aria-label={
                      image ? image.ariaLabel : themedImage?.ariaLabel
                    }
                  />
                )
              }
              {
                // While an image is loading, show a loading indicator
                !safeImageUrl && (image || themedImage) && (
                  <Flex
                    vAlign="center"
                    hAlign="center"
                    styles={{
                      width: "100%",
                      maxWidth: "20rem",
                      height: "12.5rem",
                      maxHeight: "12.5rem",
                      objectFit: "cover",
                    }}
                  >
                    <Loader />
                  </Flex>
                )
              }
              {(title || desc) && (
                <FlexItem>
                  <Flex hAlign="center" column>
                    {title && (
                      <Text
                        content={getText(t.locale, title)}
                        size="large"
                        align="center"
                        weight="bold"
                        as="h1"
                        styles={{ marginTop: 0, marginBottom: ".5rem" }}
                      />
                    )}
                    {desc && (
                      <Text
                        content={getText(t.locale, desc)}
                        align="center"
                        as="p"
                        styles={{ textAlign: "center", margin: 0 }}
                      />
                    )}
                  </Flex>
                </FlexItem>
              )}
              {actions && (
                <FlexItem>
                  <Flex
                    gap="gap.small"
                    column
                    styles={{
                      width: "100%",
                      maxWidth: "17.5rem",
                    }}
                  >
                    {actions.primary && (
                      <Button
                        content={getText(t.locale, actions.primary.label)}
                        aria-label={getText(t.locale, actions.primary.label)}
                        styles={{ width: "100%" }}
                        primary
                        {...onClick(actions.primary.target)}
                      />
                    )}
                    {actions.secondary && (
                      <Button
                        content={getText(t.locale, actions.secondary.label)}
                        aria-label={getText(t.locale, actions.secondary.label)}
                        styles={{ width: "100%" }}
                        {...onClick(actions.secondary.target)}
                      />
                    )}
                    {actions.tertiary && (
                      <Button text primary>
                        <Text
                          content={getText(t.locale, actions.tertiary.label)}
                          weight="light"
                          {...onClick(actions.tertiary.target)}
                        />
                      </Button>
                    )}
                  </Flex>
                </FlexItem>
              )}
            </Flex>
          </Flex>
        );
      }}
    />
  );
}
