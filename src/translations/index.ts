export type TLocale = "en-US" | "fa";
export type TTextObject = string | { [locale: string]: string };

export const getText = (
  currentLocale: TLocale,
  textObject: TTextObject
): string => {
  if (typeof textObject === "string") return textObject;
  else if (textObject.hasOwnProperty(currentLocale))
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
    "add category": "Add category",
    "add board item": "Add item to board",
    "board lane": "Board lane",
    "board item": "Board item",
  },
  fa: {
    locale: "fa",
    hello: "سلام",
    "add category": "افزودن دسته",
    "add board item": "مورد را به تخته اضافه کنید",
    "board lane": "خط تخته",
    "board item": "مورد هیئت مدیره",
  },
};
