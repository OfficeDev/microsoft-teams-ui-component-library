import isString from "lodash/isString";
import values from "lodash/values";

/**
 * A locale as an [IETF BCP 47 language tag](https://tools.ietf.org/rfc/bcp/bcp47.txt).
 * @public
 */
export type TLocale = string;

/**
 * Text content to display. When the preferred locale is not available, the plain string or the only
 * available locale will be used instead.
 * @public
 */
export type TTextObject = string | { [locale: string]: string } | undefined;

type TInterpolationArgs = [object] | string[];

export const interpolate = (
  template: string,
  interpolationArgs: TInterpolationArgs
) => {
  if (interpolationArgs.length) {
    const t = typeof interpolationArgs[0];
    let key;
    const args =
      "string" === t || "number" === t
        ? (Array.prototype.slice.call(interpolationArgs) as {
            [key: number]: string;
          })
        : (interpolationArgs[0] as { [key: string]: string });

    for (key in args) {
      template = template.replace(
        new RegExp("\\{" + key + "\\}", "gi"),
        args[key]
      );
    }
  }
  return template;
};

export const getAllText = (
  textObject: TTextObject,
  ...interpolationArgs: TInterpolationArgs
): string => {
  if (!textObject) return "";
  if (isString(textObject)) return interpolate(textObject, interpolationArgs);
  else
    return values(textObject)
      .map((text) => interpolate(text, interpolationArgs))
      .join("");
};

export const getText = (
  currentLocale: TLocale | null | undefined,
  textObject: TTextObject,
  ...interpolationArgs: TInterpolationArgs
): string => {
  if (!textObject) return "";
  if (isString(textObject)) return interpolate(textObject, interpolationArgs);
  if (currentLocale && textObject.hasOwnProperty(currentLocale))
    return interpolate(textObject[currentLocale], interpolationArgs);
  else
    return interpolate(
      textObject[Object.keys(textObject)[0]],
      interpolationArgs
    );
};

/**
 * A collection of strings for a certain locale. This library fetches translations by a `stringKey`,
 * which is common between all translations.
 *
 * @public
 */
export type TTranslations = {
  locale: TLocale;
  [stringKey: string]: string;
};

export default {
  ["en-US" as TLocale]: {
    locale: "en-US",
    hello: "Hello",
    "add lane": "Add column",
    "add board item": "Add item to board",
    "edit board item": "Edit item",
    "board lane": "Board column",
    "board item": "Board item",
    "name lane": "Name this column…",
    "lane pending": "New column",
    "move lane nearer": "Move left",
    "move lane further": "Move right",
    delete: "Delete",
    "confirm delete": "Are you sure you want to delete “{title}”?",
    "lane options": "Column options",
    "sort-order alphabetical descending": "A-Z",
    "sort-order alphabetical ascending": "Z-A",
    cancel: "Cancel",
    confirm: "Confirm",
    discard: "Discard",
    save: "Save",
    title: "Title",
    subtitle: "Subtitle",
    "board item body": "Description",
    "board item users": "Tagged users",
    "board item options": "Board item options",
    "on drag start board item":
      "You have lifted the item called {itemTitle} in position {itemPosition} of {laneLength} in the {laneTitle} column.",
    "on drag update board item same lane":
      "You have moved the item called {itemTitle} to position {itemPosition} of {laneLength}.",
    "on drag update board item different lane":
      "You have moved the item called {itemTitle} to position {itemPosition} of {laneLength} in the {laneTitle} column.",
    "on drag end board item":
      "You have placed the item called {itemTitle} in position {itemPosition} of {laneLength} in the {laneTitle} column.",
    "on drag cancel board item":
      "You have cancelled dragging the item called {itemTitle}.",
    "board lane instructions":
      "Press Enter to explore board lane items, then use Escape to shift focus back to the board lane.",
    "toolbar overflow menu": "Toolbar overflow menu",
    "could not load data": "Could not load data.",
    "no data": "No data available.",
    "list empty header": "Create your first list item",
    "list empty body":
      "Get started with the ‘Add’ button in the toolbar above.",
    "board empty header": "Create your first column",
    "board empty body": "Get started by adding a column in the toolbar above.",
    close: "Close",
    "edit dashboard coaching":
      "Enable or disable the data you want to see on the dashboard.",
    find: "Find",
    ok: "OK",
    more: "More",
    filter: "Filter",
    clear: "Clear",
    "hide widget": "Hide widget",
    "view more": "View more",
    "edit dashboard": "Edit dashboard",
  } as TTranslations,
};
