<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@fluentui/react-teams](./react-teams.md)

## react-teams package

## Enumerations

|  Enumeration | Description |
|  --- | --- |
|  [CommunicationOptions](./react-teams.communicationoptions.md) | The illustration, text, and actions (if any) to use by default as the content of this component. |
|  [EChartTypes](./react-teams.echarttypes.md) | Each chart type can be previewed in the \[Data visualizations page of the Microsoft Teams UI Kit\](https://www.figma.com/file/EOsbapNvZgEwcA1mShswfh/Microsoft-Teams-UI-Kit-Community?node-id=3789%3A4091), or in \[this library’s Storybook\](https://dev-int.teams.microsoft.com/storybook/main/index.html?path=/story/components-charts--line-chart). |
|  [EInlineInputType](./react-teams.einlineinputtype.md) | The types of inline inputs. |
|  [EInputBlockType](./react-teams.einputblocktype.md) | The types of input blocks. |
|  [EInputWidth](./react-teams.einputwidth.md) | An inline input’s width. |
|  [themeNames](./react-teams.themenames.md) |  |
|  [WidgetSize](./react-teams.widgetsize.md) | The widget’s size relative to other widgets. |

## Functions

|  Function | Description |
|  --- | --- |
|  [Chart\_2({ title, type, data })](./react-teams.chart_2.md) |  |
|  [Communication({ option, fields, onInteraction, })](./react-teams.communication.md) |  |
|  [Dashboard({ widgets })](./react-teams.dashboard.md) |  |

## Interfaces

|  Interface | Description |
|  --- | --- |
|  [IBoardInteractionUpdateItems](./react-teams.iboardinteractionupdateitems.md) | This payload is emitted when the user updates the Board’s items, which occurs when the user creates a new item, deletes an item, or edits an item. |
|  [IBoardInteractionUpdateLanes](./react-teams.iboardinteractionupdatelanes.md) | This payload is emitted when the user updates the Board’s lanes, which occurs when the user adds or removes a lane, or rearranges the lanes. |
|  [IBoardItem](./react-teams.iboarditem.md) | An item in a Board component. |
|  [IBoardItemCardLayout](./react-teams.iboarditemcardlayout.md) | The way a Board item’s content is mapped to the adaptive card used to represent the item. |
|  [IBoardProps](./react-teams.iboardprops.md) | The Board component can be used to render kanban and task board experiences in your app. Designs for this component are available in the \[Task board page of the Microsoft Teams UI Kit\](https://www.figma.com/file/EOsbapNvZgEwcA1mShswfh/Microsoft-Teams-UI-Kit-Community?node-id=3789%3A3840). |
|  [IBubbleChartData](./react-teams.ibubblechartdata.md) | A vector datum for bubble charts and related types. |
|  [IChartData](./react-teams.ichartdata.md) | The data to display in this Chart. |
|  [IChartDataSet](./react-teams.ichartdataset.md) | One set of the Chart’s data. |
|  [IChartProps](./react-teams.ichartprops.md) | The Chart component can be used to render data visualizations. Designs for this component are available in the \[Data visualizations page of the Microsoft Teams UI Kit\](https://www.figma.com/file/EOsbapNvZgEwcA1mShswfh/Microsoft-Teams-UI-Kit-Community?node-id=3789%3A4091). |
|  [ICheckboxesInput](./react-teams.icheckboxesinput.md) | A set of checkboxes. |
|  [IColumn](./react-teams.icolumn.md) |  |
|  [ICommunicationAction](./react-teams.icommunicationaction.md) | An action rendered at the end of the Communication component’s content. |
|  [ICommunicationFields](./react-teams.icommunicationfields.md) | The specific content to display in the component. |
|  [ICommunicationFieldsWithThemedImage](./react-teams.icommunicationfieldswiththemedimage.md) | A variation of <code>ICommunicationFields</code> using a <code>themedImage</code> instead of <code>image</code>, which responds to the user’s active theme (light, dark, or high-contrast). |
|  [ICommunicationImage](./react-teams.icommunicationimage.md) | The image to use at the beginning of a Communication component’s content. This does not respond to the user’s active theme, so will remain the same across themes. |
|  [ICommunicationThemedImage](./react-teams.icommunicationthemedimage.md) | The image to use at the beginning of a Communication component’s content. The user’s active theme determines which image to display. |
|  [IDashboard](./react-teams.idashboard.md) | The Dashboard component summarizes disparate types of information into a series of widgets. Designs for this component are available in the \[Dashboard page of the Microsoft Teams UI Kit\](https://www.figma.com/file/EOsbapNvZgEwcA1mShswfh/Microsoft-Teams-UI-Kit-Community?node-id=3789%3A3890). |
|  [IDropdownInput](./react-teams.idropdowninput.md) | A single-select dropdown. |
|  [IDropdownMultipleInput](./react-teams.idropdownmultipleinput.md) | A multiple-select dropdown. |
|  [IEnumerableInputBase](./react-teams.ienumerableinputbase.md) | Properties shared by all enumerable inputs (radio buttons, checkboxes, dropdowns). |
|  [IEnumerableInputOption](./react-teams.ienumerableinputoption.md) | Properties for each option for Enumerable inputs (radio buttons, checkboxes, dropdowns). |
|  [IEnumerableMultipleInputBase](./react-teams.ienumerablemultipleinputbase.md) | Properties shared by enumerable inputs supporting multiple selections (checkboxes, multiple-select dropdowns). |
|  [IEnumerableSingletonInputBase](./react-teams.ienumerablesingletoninputbase.md) | Properties shared by singleton enumerable inputs (radio buttons, single-select dropdowns). |
|  [IFormProps](./react-teams.iformprops.md) | The Form component can be used to render an interactive Form. Designs for this component are available in the \[Forms page of the Microsoft Teams UI Kit\](https://www.figma.com/file/EOsbapNvZgEwcA1mShswfh/Microsoft-Teams-UI-Kit-Community?node-id=5271%3A221958). |
|  [IFormState](./react-teams.iformstate.md) | A collection of input values, keyed by input ID. If the input is a block of checkboxes or a dropdown with multiple selection, the value will be an array of option IDs. |
|  [IFormWizardStepProps](./react-teams.iformwizardstepprops.md) | A Form which is a step in a Wizard has the same inputs as Form with an additional option to override the text of the Wizard’s back button for the current step. |
|  [IInlineInputsBlock](./react-teams.iinlineinputsblock.md) | A block containing a set of one or more text inputs or dropdowns. |
|  [IListProps](./react-teams.ilistprops.md) | The List component can be used to display a list of items as a table which can be sorted, filtered, and searched.. Designs for this component are available in the \[List page of the Microsoft Teams UI Kit\](https://www.figma.com/file/EOsbapNvZgEwcA1mShswfh/Microsoft-Teams-UI-Kit-Community?node-id=3789%3A3790). |
|  [IMultilineTextInput](./react-teams.imultilinetextinput.md) | A multi-line text field. |
|  [IPreparedBoardItem](./react-teams.ipreparedboarditem.md) | A prepared Board item places the item’s unique key within itself so the item can be handled on its own. |
|  [IRadioButtonsInput](./react-teams.iradiobuttonsinput.md) | A set of radio buttons (from which only one can be selected). |
|  [ISection](./react-teams.isection.md) |  |
|  [ITableProps](./react-teams.itableprops.md) | The Table component is used by the List template as its primary content. |
|  [ITextField](./react-teams.itextfield.md) | A single-line text field. |
|  [ITextInputBase](./react-teams.itextinputbase.md) | Properties shared by text inputs (single- and multi-line). |
|  [IToolbarProps](./react-teams.itoolbarprops.md) | The Toolbar component can be used to render a Toolbar above the main view, which can make actions, find, and filter available. Designs for this component are available in the \[Toolbar page of the Microsoft Teams UI Kit\](https://www.figma.com/file/EOsbapNvZgEwcA1mShswfh/Microsoft-Teams-UI-Kit-Community?node-id=3789%3A4186). |
|  [IWidget](./react-teams.iwidget.md) | A Dashboard widget is rendered as a card of a certain size, containing the content specified. |
|  [IWidgetAction](./react-teams.iwidgetaction.md) | An action item displayed in a widget’s overflow menu. |
|  [IWidgetBodyContent](./react-teams.iwidgetbodycontent.md) | A piece of content to make available in the widget. |
|  [IWidgetLink](./react-teams.iwidgetlink.md) |  |
|  [IWizardProps](./react-teams.iwizardprops.md) | The Wizard component can be used to render a series of Forms. Designs for this component are available in the \[Wizard page of the Microsoft Teams UI Kit\](https://www.figma.com/file/EOsbapNvZgEwcA1mShswfh/Microsoft-Teams-UI-Kit-Community?node-id=3789%3A4233). |
|  [IWizardSidebarInteraction](./react-teams.iwizardsidebarinteraction.md) | An interaction payload triggered when the user clicks on a step in the sidebar. The subject will be in the form of <code>wizard-step__{step_index}</code>, where <code>step_index</code> is the index of the target step. |

## Variables

|  Variable | Description |
|  --- | --- |
|  [Board](./react-teams.board.md) |  |
|  [Form](./react-teams.form.md) |  |
|  [List](./react-teams.list.md) |  |
|  [Provider](./react-teams.provider.md) |  |
|  [Table](./react-teams.table.md) |  |
|  [Toolbar](./react-teams.toolbar.md) |  |
|  [Wizard](./react-teams.wizard.md) |  |

## Type Aliases

|  Type Alias | Description |
|  --- | --- |
|  [actionKey](./react-teams.actionkey.md) |  |
|  [TAction](./react-teams.taction.md) | An action a user can apply to an entity. |
|  [TActionGroups](./react-teams.tactiongroups.md) | A collection of action groups, keyed by group ID. |
|  [TActions](./react-teams.tactions.md) | A collection of actions, keyed by the action ID. |
|  [TBoardInteraction](./react-teams.tboardinteraction.md) | The interaction payloads emitted by the Board component is either an update of the Board’s lanes, or an update of the Board’s items. |
|  [TBoardLane](./react-teams.tboardlane.md) | Board lanes currently only need a <code>title</code>. |
|  [TBoardLanes](./react-teams.tboardlanes.md) | Each Board lane has a unique key, which is associated with the lane’s configuration. |
|  [TCommunication](./react-teams.tcommunication.md) | The Communication component can be used to render empty state messages and other combinations of illustration, coaching text, and actions. Designs for this component are available in the \[Empty state page of the Microsoft Teams UI Kit\](https://www.figma.com/file/EOsbapNvZgEwcA1mShswfh/Microsoft-Teams-UI-Kit-Community?node-id=3789%3A4042). |
|  [TCommunicationFields](./react-teams.tcommunicationfields.md) |  |
|  [TFormErrors](./react-teams.tformerrors.md) | A collection of error messages associated with inputs, keyed by input ID. |
|  [TFormInteraction](./react-teams.tforminteraction.md) | An interaction event emitted by the Form component. The payload always contains the Form’s state, which contains the values of all the Form’s inputs. |
|  [TInlineField](./react-teams.tinlinefield.md) |  |
|  [TInputBlock](./react-teams.tinputblock.md) | A block with a single input which occupies the full width of the form. |
|  [TListInteraction](./react-teams.tlistinteraction.md) | List interactions are proxied from the Table or the Toolbar. All are clicks on actions. |
|  [TLocale](./react-teams.tlocale.md) | The locale of the current view. |
|  [TSortable](./react-teams.tsortable.md) | Currently only alphabetical sort is available. |
|  [TTableInteraction](./react-teams.ttableinteraction.md) | An interaction payload emitted by Table. |
|  [TTextObject](./react-teams.ttextobject.md) | Text content to display. When the preferred locale is not available, the plain string or the only available locale will be used instead. |
|  [TToolbarInteraction](./react-teams.ttoolbarinteraction.md) | The interaction payload sent when a user clicks on an action in the Toolbar. The action may have one or more subjects if the action applies to entities in the main view, or it may be <code>null</code> if the action has no subject. |
|  [TUser](./react-teams.tuser.md) | A User entity, which certain components can use as part of their content. |
|  [TUsers](./react-teams.tusers.md) | A collection of Users, keyed by their unique ID. |
|  [TWizardInteraction](./react-teams.twizardinteraction.md) | An interaction event emitted by the Wizard component. The payload is either proxied from the Form component rendered in the primary area as the active step, or is triggered when the user interacts with any step listed in the sidebar. |
