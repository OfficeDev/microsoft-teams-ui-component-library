// import React from "react";
// import { withKnobs, object } from "@storybook/addon-knobs";
// import { withA11y } from "@storybook/addon-a11y";

// import EmptyStates from "../components/States";
// import { StorybookThemeProvider } from "../lib/withTheme";
// import { states } from "../components/States/States";

// export default {
//   title: "Components/Empty States/Welcome",
//   component: EmptyStates,
//   decorators: [withKnobs, withA11y],
// };

// const emptyStatesKnobGroupID = "EmptyStates";
// const welcomeConfig = { option: states.welcome };
// const welcomeConfig2 = { option: states.welcome2 };

// export const NewUser = () => {
//   return (
//     <StorybookThemeProvider>
//       <EmptyStates
//         {...object("Configuration", welcomeConfig, emptyStatesKnobGroupID)}
//       />
//     </StorybookThemeProvider>
//   );
// };

// export const AuthorizedUser = () => {
//   return (
//     <StorybookThemeProvider>
//       <EmptyStates
//         {...object("Configuration", welcomeConfig2, emptyStatesKnobGroupID)}
//       />
//     </StorybookThemeProvider>
//   );
// };
