// import React from "react";

// const DEFAULT_STRINGS = {
//   title: "Primary line of text",
//   desc:
//     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
//   actions: {
//     primary: {
//       label: "Primary action",
//     },
//     secondary: {
//       label: "Secondary action",
//     },
//     tertiary: {
//       label: "Secondary action",
//     },
//   },
// };

// const Default = ({ theme, values }: { theme: TeamsTheme; values?: IState }) => {
//   let config: IState = DEFAULT_STRINGS;
//   if (values) {
//     config = { ...config, ...values };
//   }
//   return <State image={illustrations[theme]} {...config} />;
// };

// const illustrations = {
//   [TeamsTheme.Default]: (

//   ),
//   [TeamsTheme.Dark]: (

//   ),
//   [TeamsTheme.HighContrast]: (

//   ),
// };

// const WentWrong = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 285.6 147.6">
//     <ellipse cx="129.6" cy="134.7" fill="#E1DFDD" rx="129.6" ry="12.9" />
//     <linearGradient
//       id="a"
//       x1="-6851.9"
//       x2="-6888.2"
//       y1="4389.9"
//       y2="4325.8"
//       gradientTransform="scale(1 -1) rotate(-20 -15792.3 -17905)"
//       gradientUnits="userSpaceOnUse"
//     >
//       <stop offset="0" stopColor="#c3c3e1" />
//       <stop offset="1" stopColor="#8b8cc4" />
//     </linearGradient>
//     <path
//       fill="url(#a)"
//       d="M248.3 18.6l-22.1-8c-6.8-2.5-14.4 1-17 7.9L199 46.9l14.3 5.2c11.2 4 23.5-1.7 27.6-12.8l7.5-20.7z"
//     />
//     <linearGradient
//       id="b"
//       x1="-6853.9"
//       x2="-6889"
//       y1="4391"
//       y2="4329.2"
//       gradientTransform="scale(1 -1) rotate(-20 -15792.3 -17905)"
//       gradientUnits="userSpaceOnUse"
//     >
//       <stop offset="0" stopColor="#c3c3e1" />
//       <stop offset="1" stopColor="#8b8cc4" />
//     </linearGradient>
//     <path
//       fill="url(#b)"
//       d="M253 20.4l-26.8-9.8c-6.8-2.5-14.4 1-17 7.9l-1.5 4.3 26.2 9.5c8.2 3 17.3-1.2 20.3-9.4a2 2 0 00-1.2-2.5z"
//     />
//     <path
//       fill="#AEB0D6"
//       d="M134.3 3.6l-28.6-.3c-7.3-.1-13.3 5.7-13.4 13L92 46.6l41.9.5.5-43.5z"
//     />
//     <path
//       fill="#FFD590"
//       d="M162.5 22.4H77.1c-13.5 0-24.5 11-24.5 24.5h157.7c0-13.5-24.4-24.5-47.8-24.5z"
//     />
//     <path
//       fill="#C3C3E1"
//       d="M57.8 1.2C57.2.2 56-.2 55 .2L21.7 11.7c-7 2.5-3.6 20.1 5.3 17l23.4-8.2a13 13 0 007.4-19.4z"
//     />
//     <path
//       fill="#AEB0D6"
//       d="M141.2 5.4c-.2-1.1-1.1-2-2.2-2h-35.3c-7.4 0-10 17.8-.7 17.8H128a13 13 0 0013.3-15.8z"
//     />
//     <path
//       fill="#C3C3E1"
//       d="M48.6 2.4l-27 9.5c-9.8 3.4-8.3 12.9-2 18.2 15.8 13.4 13 24.2 13 24.2l19.7-6.9c11-3.9 16.1-15 1.3-28l-5-17z"
//     />
//     <linearGradient
//       id="c"
//       x1="-6536.7"
//       x2="-6580.1"
//       y1="5308.1"
//       y2="5290.8"
//       gradientTransform="matrix(1 0 0 -1 6730.3 5359)"
//       gradientUnits="userSpaceOnUse"
//     >
//       <stop offset="0" stopColor="#c3c3e1" />
//       <stop offset="1" stopColor="#8b8cc4" />
//     </linearGradient>
//     <path
//       fill="url(#c)"
//       d="M207 46.9h-98.1c-2.5 0-4.5 2-4.5 4.5v34.9c0 2.5 2 4.5 4.5 4.5h74.6a28 28 0 0028-28V51.4c0-2.5-2-4.5-4.6-4.5z"
//     />
//     <path
//       fill="none"
//       d="M129.5 46.9H28.6v11c0 40 32.4 72.4 72.4 72.4h36.9c33.1 0 56.4-22.3 69.7-43.5-33.1-7-35.9-39.9-78-39.9z"
//     />
//     <path
//       fill="#6E6FAC"
//       d="M28.6 46.9v11c0 40 32.4 72.4 72.4 72.4h36.9c33.1 0 56.4-22.3 69.7-43.5-33.1-7-35.9-39.9-78-39.9h-101z"
//     />
//     <path
//       fill="#8B8CC4"
//       d="M133 105.2L150 76h33.5l14.1 24.4 4.8-6-6.7-11.6A79 79 0 01177 69h-27l-12.6-21.7c-2.4-.3-5-.4-7.9-.4h-.5l14.8 25.6-16.9 29.2H93.2L76.4 72.5l14.8-25.6h-8.3l-12.7 22H36.5l-7.9-13.5V58c0 8.6 1.5 16.7 4.2 24.4l3.6-6.3h33.7L87 105.2l-11.7 20.3c2.2 1 4.5 1.7 7 2.3l11-19h33.6l12.4 21.5c2.7-.1 5.4-.3 8-.6L133 105.2z"
//     />
//     <path
//       fill="none"
//       stroke="#8B8CC4"
//       strokeLinecap="round"
//       strokeMiterlimit="10"
//       strokeWidth="11.2"
//       d="M207.6 86.8c-33.1-7-35.9-39.9-78-39.9M129.5 46.9H28.6"
//     />
//     <path
//       fill="#C3C3E1"
//       d="M217.9 86.5c0-10.8-3.6-12.4-6.7-11.6-3 .8-6 5.6-6 5.6l-22.8-33s27.7-11.3 43.2-4c16.6 8 21 22.8 21 40.3l-28.7 2.7zM189 28.3c4-7.9-28.7-8.6-30.2-6.2-3.8 6-1.7 12.6-11.6 12.4-9.3-.1-11.5 7-11.5 7s6.3 3 10.8 13.2a18.7 18.7 0 0036-7.2c.3-6.4 3.3-13 6.5-19.2z"
//     />
//     <path
//       fill="#C3C3E1"
//       d="M190.2 16.6l-19.9-.6a13.2 13.2 0 00-13.6 12.8l-.1 4.6 25 .8c7.2.2 13.2-5.4 13.4-12.5 0-2.7-2-5-4.8-5zM247.7 54.9h-1.4a28.5 28.5 0 000 57H267c10.3-.1 18.6-8.5 18.6-18.8v-.3c0-21-17-38-38-38z"
//     />
//     <ellipse
//       cx="261.6"
//       cy="92.1"
//       fill="#605D5A"
//       rx="6.1"
//       ry="3.5"
//       transform="rotate(-70 261.6 92)"
//     />
//     <path
//       fill="#8B8CC4"
//       d="M281.8 76.2l-2-3.7-4.2-.2-5.5-.4c-1.8 0-3.6-.3-5.6-.3a.8.8 0 00-.5 1.5c1.7 1.1 3.5 2 5.4 2.5a25.8 25.8 0 0011.9.7h.5z"
//       opacity=".5"
//     />
//     <path
//       fill="none"
//       d="M247.7 54.9h-1.4a28.5 28.5 0 000 57H267c10.3-.1 18.6-8.5 18.6-18.8v-.3c0-21-17-38-38-38z"
//     />
//   </svg>
// );

// export default WentWrong;
