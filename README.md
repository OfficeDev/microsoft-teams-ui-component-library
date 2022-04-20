# `@fluentui/react-teams`

[![npm version](https://badge.fury.io/js/%40fluentui%2Freact-teams.svg)][npm]

### [Playground ↗️][sb] | [Sample app ↗️][as]

[**API Documentation**](./docs/react-teams.md)

This library of React components implements many of the designs released in the [**Microsoft Teams UI Kit**][fc]. With these components, your Teams app can offer accessible, high-quality experiences that align with Microsoft Teams.

## Installation

This library expects a few peer dependencies; if your project doesn’t have them at these versions, you’ll need to add or upgrade them:

- `react@^16.8.0`
- `react-dom@^16.8.0`
- `@fluentui/react-northstar@^0.54.0`

Next, simply add as a dependency to your project:

```shell
yarn add @fluentui/react-teams
```

or

```shell
npm i --save @fluentui/react-teams
```

### Use TypeScript without `any` for these components’ props

Since the components require fairly specific, structured props, development is far easier in projects that use TypeScript. Avoid typing props passed to these components as `any` in order to ensure your content’s types are checked.

The API’s promises are communicated in the [docs](./docs/react-teams.md), which are derived directly from the type declarations. This library uses [semver](https://semver.org/) to indicate breaking changes in the API, so props that pass a type check will still work for all releases of this library with the same major version.

## Getting started

### Always use the provider

For these components to work properly, they need their provider.

```tsx
import {Provider as RTProvider, Board } from "@fluentui/react-teams";

export default (props) => {
  
  const boardProps = getBoardProps(props)
  
  return <RTProvider themeName="teamsTheme" lang="en-US">
    <Board {...boardProps} />
  </RTProvider>
  
}
```

The provider accepts a `themeName`, which can be `teamsTheme` for the default (light) Teams theme, `teamsDarkTheme`, or `teamsHighContrastTheme`.

### Content

Each component’s content props accept data that can be serialized to JSON. This means that instead of nesting components with fairly atomic props, components in this library don’t accept children and take props with fairly specific structures.

Consider modeling your use case after examples provided in [this library’s Storybook][sb] or by examining the componnt’s TypeScript types.

### Interactions

Components with interactivity accept an `onInteraction` handler, which calls your function any time a user triggers an event you can respond to. The handler is called with a payload (also designed to be serialized to JSON) like this:

```json
{
  "event": "click",
  "target": "toolbar",
  "subject": ["item1", "item2"],
  "action": "delete"
}
```

This payload differs depending on the component and the kinds of interactions it supports; consider checking the type of `onInteraction` on the component you want to use in [the API docs](./docs/react-teams.md).

## Localization

Developers can override all text with their own wording by providing a [`TTranslations`](./docs/react-teams.ttranslations.md) object to the `translations` prop on the [`HVCThemeProvider`](./docs/react-teams.provider.md) component. US English is already built-in.

Any component props which become rendered text in the UI are defined as a [`TTextObject`](./docs/react-teams.ttextobject.md), which lets you configure what to display in supported locales.

## API Docs

You can read more about each component’s specific props and their types in the API docs in the `docs` folder. The index for the entire project is [`docs/react-teams.md`](./docs/react-teams.md).

The best place to start for each component is its `I{Component}Props`, where `Component` is the component name, e.g. the main API docs for Board is [`IBoardProps`](./docs/react-teams.iboardprops.md).

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
[as]: https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-ui-templates/ts
[fc]: https://www.figma.com/community/file/916836509871353159/Microsoft-Teams-UI-Kit
