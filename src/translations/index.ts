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
    "add task": "Add task",
  },
  fa: {
    locale: "fa",
    hello: "سلام",
    "add category": "افزودن دسته",
    "add task": "اضافه کردن کار",
  },
};
