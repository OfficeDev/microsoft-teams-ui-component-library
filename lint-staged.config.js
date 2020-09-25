// @ts-check

// https://www.npmjs.com/package/lint-staged
module.exports = {
  // Run eslint in fix mode followed by prettier
  [`*.{ts,tsx}`]: ["yarn prettier --write"],
};
