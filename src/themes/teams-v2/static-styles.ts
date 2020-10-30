/**
 * Custom static styles.
 *
 * ! Avoid adding anything to this export, unless absolutely necessary.
 * ! Rather, refactor these definitions into component-specific styles.
 */
export const staticStyles = [
  `html[data-whatinput="keyboard"] :focus::after {
    border-width: 2px !important;
  }`,
  `html[data-whatinput="keyboard"] :focus::after, html[data-whatinput="keyboard"] :focus::before {
    border-radius: 4px !important;
  }`,
];
