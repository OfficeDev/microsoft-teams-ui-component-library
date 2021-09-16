import { radios, select } from "@storybook/addon-knobs";
import { StoryFn } from "@storybook/addons";
import React, { ReactNode } from "react";
import { HVCThemeProvider } from "./withTheme";
import { TeamsTheme } from "../themes";
import { TTranslations } from "../translations";

const storybookT10s = {
  // The Farsi translations here are not certified and are intended for demonstration purposes only at this time.
  fa: {
    locale: "fa",
    hello: "سلام",
    "add lane": "اضافه‌کردن خط",
    "add board item": "اضافه‌کردن آیتم",
    "edit board item": "ویرایش آیتم",
    "board lane": "خط تخته",
    "board item": "آیتم",
    "name lane": "نام‌گذاری خط",
    "lane pending": "خط جدید",
    "move lane further": "دور کردن خط",
    "move lane nearer":"نزدیک‌کردن خط",
    delete: "حذف",
    "lane options": "گزینه‌ها",
    "sort-order alphabetical descending": "مرتب‌سازی صعودی",
    "sort-order alphabetical ascending": "مرتب‌سازی نزولی",
    cancel: "لغو",
    confirm: "تایید",
    discard: "دور انداختن",
    save: "ذخیره",
    title: "عنوان",
    subtitle: "عنوان فرعی",
    "board item body": "شرح",
    "board item users": "کاربران",
    "board item options": "امکانات",
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
    "board lane instructions":
      "Enter را فشار دهید تا موارد خط تخته را کاوش کنید ، سپس از Escape استفاده کنید تا فوکوس را به سمت صفحه برد تغییر دهید.",
    "toolbar overflow menu": "منوی سرریز نوار ابزار",
    "could not load data": "اطلاعات لود نمی‌شوند",
    "no data": "اطلاعاتی موجود نیست.",
    "list empty default header": "اولین لیست خود را ایجاد کنید",
    "list empty default body": "با افزودن مورد لیست شروع کنید.",
    close: "بستن",
    "edit dashboard coaching":
      "داده هایی را که می خواهید در داشبورد مشاهده کنید فعال یا غیرفعال کنید.",
    find: "پیدا کردن",
    ok: "خوب",
    more: "بیشتر",
    filter: "فیلتر",
    clear: "پاک کردن",
    "hide widget": "مخفی‌کردن ویجت",
    "view more": "مشاهده بیشتر",
    "edit dashboard": "ویرایش داشبورد",
  } as TTranslations,
};

const langKnob = () =>
  select(
    "Language",
    {
      "English (US)": "en-US",
      "Machine-translated Farsi for RTL demonstration purposes only": "fa",
    },
    "en-US",
    "Theme"
  );

const themeKnob = () =>
  radios(
    "Theme",
    {
      "Teams Light": TeamsTheme.Default,
      "Teams Dark": TeamsTheme.Dark,
      "Teams High Contrast": TeamsTheme.HighContrast,
    },
    TeamsTheme.Default,
    "Theme"
  );

export interface IStorybookThemeProviderProps {
  children: ReactNode;
}

export const StorybookThemeProvider = ({
  children,
}: IStorybookThemeProviderProps) => {
  return (
    <HVCThemeProvider
      themeName={themeKnob()}
      lang={langKnob()}
      translations={storybookT10s}
    >
      {children}
    </HVCThemeProvider>
  );
};

export const withStorybookTheme = (storyFn: StoryFn<any>) => (
  <StorybookThemeProvider>{storyFn()}</StorybookThemeProvider>
);
