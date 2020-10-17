// import React from "react";
// import { withKnobs, object } from "@storybook/addon-knobs";
// import { withA11y } from "@storybook/addon-a11y";

// import EmptyStates from "../components/States";
// import { StorybookThemeProvider } from "../lib/withTheme";
// import { states } from "../components/States/States";

// export default {
//   title: "Components/Empty States/Empty",
//   component: EmptyStates,
//   decorators: [withKnobs, withA11y],
// };

// const emptyStatesKnobGroupID = "EmptyStates";
// const emptyConfig = { option: states.empty };
// const emptyConfig2 = { option: states.empty2 };

// export const Actions = () => {
//   return (
//     <StorybookThemeProvider>
//       <EmptyStates
//         {...object("Configuration", emptyConfig, emptyStatesKnobGroupID)}
//       />
//     </StorybookThemeProvider>
//   );
// };

// export const Message = () => {
//   return (
//     <StorybookThemeProvider>
//       <EmptyStates
//         {...object("Configuration", emptyConfig2, emptyStatesKnobGroupID)}
//       />
//     </StorybookThemeProvider>
//   );
// };
