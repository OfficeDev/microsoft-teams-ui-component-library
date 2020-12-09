export type TLocale = "en-US" | "fa";
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

export const getText = (
  currentLocale: TLocale | null | undefined,
  textObject: TTextObject,
  ...interpolationArgs: TInterpolationArgs
): string => {
  if (!textObject) return "";
  if (typeof textObject === "string")
    return interpolate(textObject, interpolationArgs);
  if (currentLocale && textObject.hasOwnProperty(currentLocale))
    return interpolate(textObject[currentLocale], interpolationArgs);
  else
    return interpolate(
      textObject[Object.keys(textObject)[0]],
      interpolationArgs
    );
};

export type TTranslations = {
  locale: TLocale;
  [stringKey: string]: string;
};

export default {
  "en-US": {
    locale: "en-US",
    hello: "Hello",
    "add lane": "Add lane",
    "add board item": "Add item to board",
    "edit board item": "Edit item",
    "board lane": "Board lane",
    "board item": "Board item",
    "name lane": "Name this lane…",
    "lane pending": "New lane",
    "move lane nearer": "Move left",
    "move lane further": "Move right",
    delete: "Delete",
    "lane options": "Lane options",
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
    "on drag start board item":
      "You have lifted the item called {itemTitle} in position {itemPosition} of {laneLength} in the {laneTitle} lane.",
    "on drag update board item same lane":
      "You have moved the item called {itemTitle} to position {itemPosition} of {laneLength}.",
    "on drag update board item different lane":
      "You have moved the item called {itemTitle} to position {itemPosition} of {laneLength} in the {laneTitle} lane.",
    "on drag end board item":
      "You have placed the item called {itemTitle} in position {itemPosition} of {laneLength} in the {laneTitle} lane.",
    "on drag cancel board item":
      "You have cancelled dragging the item called {itemTitle}.",
  } as TTranslations,
  fa: {
    locale: "fa",
    hello: "سلام",
    "add lane": "خط اضافه کنید",
    "add board item": "مورد را به تخته اضافه کنید",
    "edit board item": "ویرایش آیتم",
    "board lane": "خط تخته",
    "board item": "مورد هیئت مدیره",
    "name lane": "این خط را نامگذاری کنید…",
    "lane pending": "خط جدید",
    "move lane further": "به سمت چپ حرکت کنید",
    "move lane nearer": "حرکت به سمت راست",
    delete: "حذف",
    "lane options": "گزینه های خط",
    "sort-order alphabetical descending": "A-Z",
    "sort-order alphabetical ascending": "Z-A",
    cancel: "لغو",
    confirm: "تایید",
    discard: "دور انداختن",
    save: "صرفه جویی",
    title: "عنوان",
    subtitle: "عنوان فرعی",
    "board item body": "شرح",
    "board item users": "کاربران با برچسب",
    "on drag start board item":
      "شما آیتمی به نام {itemTitle} را در موقعیت {itemPosition} از {laneLength} در خط {laneTitle} بلند کرده اید.",
    "on drag update board item same lane":
      "شما موردی را به نام {itemTitle} به موقعیت {itemPosition} {laneLength} منتقل کرده اید.",
    "on drag update board item different lane":
      "You have moved the item called {itemTitle} to position {itemPosition} of {laneLength} in the {laneTitle} lane.",
    "on drag end board item":
      "شما موردی را به نام {itemTitle} به موقعیت {itemPosition} {laneLength} در خط {laneTitle} منتقل کرده اید.",
    "on drag cancel board item":
      "شما کشیدن موردی به نام {itemTitle} را لغو کرده اید.",
  } as TTranslations,
};
