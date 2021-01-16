# `@fluentui/react-teams`

[![npm version](https://badge.fury.io/js/%40fluentui%2Freact-teams.svg)][npm]

### [Storybook demos ↗️][sb] | [App sample ↗️][as]

This library of React components implements many of the designs released in [**Microsoft Teams UI Kit**][fc]. With these components, your Teams app can offer accessible, high-quality experiences in a design system that aligns with Microsoft Teams.

## Installation

This library expects a few peer dependencies; if your project doesn’t have them at these versions, you’ll need to add or upgrade them:

- `react@^16.8.0`
- `react-dom@^16.8.0`
- `@fluentui/react-northstar@^0.51.0`
-  `@fluentui/react-icons-northstar/@^0.51.0`

Next, simply add as a dependency to your project:

```shell
yarn add @fluentui/react-teams
```

or

```shell
npm i --save @fluentui/react-teams
```

Since the components require fairly specific, structured props, development will be easier in projects that use TypeScript.

## Getting started

### Always use the provider

In order for these components to work properly, they need their provider.

```tsx
import {Provider as RTProvider, Board } from "@fluentui/react-teams";

export default (props) => {
  
  const boardProps = getBoardProps(props)
  
  return <RTProvider themeName="teamsTheme" lang="en-US">
    <Board {...boardProps} />
  </RTProvider>
  
}
```

The provider accepts a `themeName`, which is either `teamsTheme` for the light Teams theme, or `teamsDarkTheme` or `teamsHighContrastTheme`.

### Content

Each component’s content props are designed to accept data that can be serialized to JSON. This means that instead of nesting components with fairly atomic props, components in this library don’t accept children and take props with fairly specific structures.

Consider modeling your use-case after examples provided in [this library’s Storybook][sb], or by examining the componnt’s TypeScript types.

### Interactions

Components with interactivity accept an `onInteraction` handler, which will call your function any time a user triggers an event you can respond to. The handler is called with a payload (also designed to be serialized to JSON) like this:

```json
{
  "event": "click",
  "target": "toolbar",
  "subject": ["item1", "item2"],
  "action": "delete"
}
```

This payload differs depending on the component and the kinds of interactions it supports; consider checking the type of `onInteraction` on the component you want to use.

## Localizing

Developers can override all text with their own wording by providing a `TTranslations` object to the `translations` prop on the `HVCThemeProvider` component. US English is already built-in.

## Improving this library

First, clone this repository. Then install dependencies with `yarn`:

```
yarn
```

To start Storybook, run the `start` script:

```
yarn start
```

…then point your browser to:

```
http://localhost:3000
```

## Contributing

This project welcomes contributions and suggestions. Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.opensource.microsoft.com.

When you submit a pull request, a CLA bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., status check, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.


[sb]: https://dev.teams.microsoft.com/storybook/main/index.html
[npm]: https://www.npmjs.com/package/@fluentui/react-teams
[as]: https://github.com/OfficeDev/microsoft-teams-app-sample
[fc]: https://www.figma.com/community/file/916836509871353159/Microsoft-Teams-UI-Kit
