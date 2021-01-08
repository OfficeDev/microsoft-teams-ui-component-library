/**
 * Custom static styles.
 *
 * ! Avoid adding anything to this export, unless absolutely necessary.
 * ! Rather, refactor these definitions into component-specific styles.
 */

const focusableSelectors = [
  ":focus",
  ".ui-dropdown__container",
  ".ui-dropdown__item",
];

export const staticStyles = [
  `${focusableSelectors
    .map(
      (selector) =>
        `html[data-whatinput="keyboard"] ${selector}::before, html[data-whatinput="keyboard"] ${selector}::after`
    )
    .join(", ")} {
    border-width: 2px !important;
    border-radius: 4px !important;
  }`,
];
