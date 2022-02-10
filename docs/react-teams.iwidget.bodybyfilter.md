<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@fluentui/react-teams](./react-teams.md) &gt; [IWidget](./react-teams.iwidget.md) &gt; [bodyByFilter](./react-teams.iwidget.bodybyfilter.md)

## IWidget.bodyByFilter property

The content to make available in the widget based on which filter is active, by id. This must be paired with `widgetFilterGroup` to display, otherwise `body` is used. `body` is also displayed when `bodyByFilter` does not have a value for a given filter id.

<b>Signature:</b>

```typescript
bodyByFilter?: Record<string, IWidgetBodyContent[]>;
```