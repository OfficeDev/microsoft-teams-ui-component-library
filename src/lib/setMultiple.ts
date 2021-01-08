import set from "lodash/set";

type TSetMultipleArg = { [path: string]: any };

export default (target: object, setMultiple: TSetMultipleArg) =>
  Object.keys(setMultiple).reduce((acc, path) => {
    return set(acc, path, setMultiple[path]);
  }, target);
