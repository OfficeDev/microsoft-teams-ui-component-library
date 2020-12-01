import React from "react";
import {
  Button,
  Flex,
  FlexItem,
  Text,
  Loader,
  ProviderConsumer as FluentUIThemeConsumer,
} from "@fluentui/react-northstar";
import { TeamsTheme } from "../../lib/withTheme";
import {
  CommunicationOptions,
  TCommunicationFields,
  TCommunication,
  ICommunicationFields,
  ICommunicationFieldsWithThemedImage,
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

export function Communication({ option, fields }: TCommunication) {
  const [componentTheme, setComponentTheme] = React.useState<TeamsTheme>(
    TeamsTheme.Default
  );
  const [safeImageUrl, setSafeImageUrl] = React.useState<string>();
  let _fields: TCommunicationFields = {};
  let illustration: {
    [TeamsTheme.Default]: React.ReactNode;
    [TeamsTheme.Dark]: React.ReactNode;
    [TeamsTheme.HighContrast]: React.ReactNode;
  };
  if (option) {
    switch (true) {
      case option === CommunicationOptions.Default:
        _fields = DEFAULT_MESSAGE;
        illustration = DEFAULT_ILLUSTRATIONS;
        break;
      case option === CommunicationOptions.Empty:
        _fields = EMPTY_MESSAGE;
        illustration = EMPTY_ILLUSTRATIONS;
        break;
      case option === CommunicationOptions.Error:
        _fields = ERROR_MESSAGE;
        illustration = ERROR_ILLUSTRATIONS;
        break;
      case option === CommunicationOptions.Hello:
        _fields = HELLO_MESSAGE;
        illustration = HELLO_ILLUSTRATIONS;
        break;
      case option === CommunicationOptions.Thanks:
        _fields = THANKS_MESSAGE;
        illustration = THANKS_ILLUSTRATIONS;
        break;
      case option === CommunicationOptions.Welcome:
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
  return (
    <FluentUIThemeConsumer
      render={(globalTheme) => {
        setComponentTheme(globalTheme.siteVariables.theme as TeamsTheme);
        return (
          <Flex
            vAlign="center"
            hAlign="center"
            styles={{
              width: "100%",
              height: "100%",
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
                        content={title}
                        size="large"
                        align="center"
                        weight="bold"
                        as="h1"
                        styles={{ marginTop: 0, marginBottom: ".5rem" }}
                      />
                    )}
                    {desc && (
                      <Text
                        content={desc}
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
                        content={actions.primary.label}
                        onClick={actions.primary.action}
                        aria-label={actions.primary.label}
                        styles={{ width: "100%" }}
                        primary
                      />
                    )}
                    {actions.secondary && (
                      <Button
                        content={actions.secondary.label}
                        onClick={actions.secondary.action}
                        aria-label={actions.secondary.label}
                        styles={{ width: "100%" }}
                      />
                    )}
                    {actions.tertiary && (
                      <Button text primary>
                        <Text
                          content={actions.tertiary.label}
                          onClick={actions.tertiary.action}
                          weight="light"
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
