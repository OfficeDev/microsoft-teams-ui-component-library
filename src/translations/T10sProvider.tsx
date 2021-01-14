import React, { createContext } from "react";
import { TTranslations } from "./";

const T10sContext = createContext({ locale: "en-US" } as TTranslations);

export default T10sContext;
