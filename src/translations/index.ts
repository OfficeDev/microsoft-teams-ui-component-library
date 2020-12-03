export type TLocale = "en-US" | "fa";
export type TTextObject = string | { [locale: string]: string };

export const getText = (
  currentLocale: TLocale | null | undefined,
  textObject: TTextObject
): string => {
  if (typeof textObject === "string") return textObject;
  if (currentLocale && textObject.hasOwnProperty(currentLocale))
    return textObject[currentLocale];
  else return textObject[Object.keys(textObject)[0]];
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
  } as TTranslations,
};
