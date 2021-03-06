<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@fluentui/react-teams](./react-teams.md) &gt; [IBoardProps](./react-teams.iboardprops.md)

## IBoardProps interface

The Board component can be used to render kanban and task board experiences in your app. Designs for this component are available in the \[Task board page of the Microsoft Teams UI Kit\](https://www.figma.com/file/EOsbapNvZgEwcA1mShswfh/Microsoft-Teams-UI-Kit-Community?node-id=3789%3A3840).

<b>Signature:</b>

```typescript
export interface IBoardProps 
```

## Properties

|  Property | Type | Description |
|  --- | --- | --- |
|  [boardItemCardLayout?](./react-teams.iboardprops.boarditemcardlayout.md) | [IBoardItemCardLayout](./react-teams.iboarditemcardlayout.md) | <i>(Optional)</i> If the cards representing the Board’s items should be different from the default, that design can be configured here. |
|  [emptyState?](./react-teams.iboardprops.emptystate.md) | [TCommunicationProps](./react-teams.tcommunicationprops.md) | <i>(Optional)</i> The empty state Communication component to render if this Component has no content. |
|  [items](./react-teams.iboardprops.items.md) | [TBoardItems](./react-teams.tboarditems.md) | The Board’s items. |
|  [lanes](./react-teams.iboardprops.lanes.md) | [TBoardLanes](./react-teams.tboardlanes.md) | The Board’s lanes, or columns. |
|  [onInteraction?](./react-teams.iboardprops.oninteraction.md) | (interaction: [TBoardInteraction](./react-teams.tboardinteraction.md)<!-- -->) =&gt; void | <i>(Optional)</i> The Board’s interaction handler, called when the user changes the Board’s items or lanes. |
|  [users](./react-teams.iboardprops.users.md) | [TUsers](./react-teams.tusers.md) | The users the Board’s items may associate with. To improve performance, this object should contain only the users associated with any items in the Board. |

