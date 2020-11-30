import React from "react";

import { TeamsTheme } from "../../../lib/withTheme";
import { ILayout, Layout } from "../Layout";

const DEFAULT_STRINGS = {
  title: "Primary line of text",
  desc:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
  actions: {
    primary: {
      label: "Primary action",
      action: () => alert("Primary action called"),
    },
    secondary: {
      label: "Secondary action",
      action: () => alert("Secondary action called"),
    },
    tertiary: {
      label: "Tertiary action",
      action: () => alert("Tertiary action called"),
    },
  },
};

const Default = ({
  theme,
  values,
}: {
  theme: TeamsTheme;
  values?: ILayout;
}) => {
  let config: ILayout = DEFAULT_STRINGS;
  if (values) {
    config = { ...config, ...values };
  }
  return <Layout image={illustrations[theme]} {...config} />;
};

const illustrations = {
  [TeamsTheme.Default]: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 173.2">
      <path fill="#FFF" d="M166 126.3l20-93L263.8 50l-20 93z" />
      <path fill="#E66693" d="M175.7 108l14.6-68L257 54.3l-14.7 68z" />
      <path fill="#FFF" d="M166 141.4l34.6-95L280 75.1l-34.6 95.2z" />
      <path fill="#EF9FBB" d="M177.7 124l26-71.3 70 25.5-26 71.3z" />
      <path
        fill="#FFF"
        d="M246.8 128.7c.5-4.6 7-6.6 6.5-11.3-.5-4.8-6-6.4-7.4-11.3a22 22 0 01.6-10.7L235.9 81l-2.6 3.8.6-4-17.3 3.6s-2.6 5.6-6.9 8.3-9 1-12.5 4.1-.4 8.4-3.2 12.2c-2.1 3-7.8 1.3-11.6 2.4l-4.6 12.5v.2l70 25.4 4.6-12.8c-2.5-2.7-5.9-5-5.6-8z"
      />
      <path
        fill="#FFF"
        d="M215.7 86.5a17 17 0 00.3 12.7c1.7 3.9 4.8 7 9 8.5h.2a16.2 16.2 0 0020.7-10.2 15 15 0 00-.3-11 13.8 13.8 0 00-7.7-7.4l-4.2-1.6c-2-.7-3.9-.9-5.8-.7-5.3.5-10.2 4.1-12.2 9.7z"
      />
      <path fill="#FADCBD" d="M218.4 113.6l4-11.1 8 2.8-4 11.1z" />
      <path
        fill="#FADCBD"
        d="M224.3 106.8l1.9.7c5.4 2 11.3-.8 13.3-6.2l.6-1.6a9 9 0 00-5.4-11.6l-4.4-1.5a9 9 0 00-11.6 5.3l-.6 1.6c-2 5.4.9 11.3 6.2 13.3z"
      />
      <path
        fill="#FFF"
        d="M215.4 89.6a8 8 0 0013.3-2.2l6.5 2.4a8 8 0 009 10.2c.2-.6-.8-12.3-.8-12.3l-20-7.2s-7.9 8.5-8 9z"
      />
      <path fill="#E0BB95" d="M228.6 87.4l3.3 1.2a1.8 1.8 0 00-3.3-1.2z" />
      <radialGradient
        id="a"
        cx="-7.3"
        cy="-52.6"
        r="6.6"
        gradientTransform="matrix(-.9395 -.3425 .5744 -1.5754 253.3 .5)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#9689c1" />
        <stop offset=".3" stopColor="#b8afd5" stopOpacity=".7" />
        <stop offset="1" stopColor="#fff" stopOpacity="0" />
      </radialGradient>
      <path
        fill="url(#a)"
        d="M235.3 79l-3.5 9.6 3.4 1.2a8 8 0 009 10.2c.1-.4-2-5.4.9-12.4l-9.8-8.5z"
      />
      <path fill="#E0BB95" d="M231.9 88.6l3.3 1.2a1.8 1.8 0 00-3.3-1.2z" />
      <path
        fill="#8B8CC4"
        d="M224.6 113.2l-2.7-1a22.2 22.2 0 00-28.5 13.4l-1.4 3.7 44.5 16.2 1.4-3.8a22.2 22.2 0 00-13.3-28.5z"
      />
      <path
        fill="#FADCBD"
        d="M216.1 111c.9 1.9 3.1 3.7 6 4.8 3 1 5.9 1 7.7.2-1.5-1.2-3.3-2-5.2-2.8l-2.7-1c-2-.7-3.9-1-5.8-1.2z"
      />
      <path fill="#C3C3E1" d="M88.8 0h103.4v133H88.8z" />
      <path
        fill="#E66693"
        d="M161.6 11.6H151a1 1 0 00-.8 1.4l5.3 9.2a1 1 0 001.7 0l5.3-9.2a1 1 0 00-.9-1.4z"
      />
      <g>
        <path
          fill="#E66693"
          d="M137.5 26.4l-4.9-7.9-14.7 7-1.3-2.7 17.1-8.1 4.9 7.8 14.4-6.8 1.3 2.7z"
        />
      </g>
      <g fill="#8B8CC4">
        <path d="M108.1 82.8h64.8v5h-64.8zM108.1 95.6h64.8v5h-64.8zM108.1 108.3h64.8v5h-64.8z" />
      </g>
      <g>
        <path fill="#8B8CC4" d="M177.2 70.4h-69.9v-3h66.9V25.9h3z" />
        <path
          fill="#8B8CC4"
          d="M154 29.9h14.2v32H154zM132.8 35.3H147V62h-14.2zM111.6 47.7h14.2v14.2h-14.2z"
        />
      </g>
      <g>
        <path
          fill="#F3F2F1"
          d="M105.1 48l28.2 89.4-96.2 30.2L0 49.8l67.7-21.3z"
        />
        <path
          fill="#E1DFDD"
          d="M105.1 48l-28.4 8.9-9-28.4zM58 84.1l36.7-11.6 1.7 5.4-36.8 11.6zM35.9 106.3l63.2-20 1.7 5.4-63.2 20zM40.3 120l63.2-19.8 1.7 5.3-63.2 20zM44.6 133.9l63.2-20 1.7 5.4-63.2 20zM53.6 70.3l36.8-11.6 1.7 5.4-36.8 11.6z"
        />
        <path fill="#EF9FBB" d="M46.5 72.6l6 19.2-19.2 6-6-19.1 19.2-6.1" />
      </g>
    </svg>
  ),
  [TeamsTheme.Dark]: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 173.2">
      <defs />
      <path fill="#EDEBE9" d="M166 126.3l20-93L263.8 50l-20 93z" />
      <path fill="#E66693" d="M175.6 108l14.7-68 66.6 14.3-14.7 68z" />
      <path fill="#EDEBE9" d="M166 141.4l34.6-95L280 75.2l-34.6 95z" />
      <path fill="#EF9FBB" d="M177.8 124l26-71.3 70 25.4-26 71.4z" />
      <path
        fill="#FFF"
        d="M246.8 128.7c.5-4.6 7-6.6 6.5-11.3-.5-4.8-6-6.4-7.4-11.3-1.3-4.8.6-10.7.6-10.7L235.9 81l-2.6 3.8.6-4-17.3 3.6s-2.6 5.6-6.9 8.3-9 1-12.5 4.1-.4 8.4-3.2 12.2c-2.1 3-7.8 1.3-11.6 2.4l-4.6 12.5v.2l70 25.4 4.6-12.8c-2.5-2.7-5.9-5-5.6-8z"
      />
      <path
        fill="#FFF"
        d="M215.7 86.5a17 17 0 00.3 12.7c1.7 3.9 4.8 7 9 8.5h.2a16.2 16.2 0 0020.7-10.2 15 15 0 00-.3-11 13.8 13.8 0 00-7.7-7.4l-4.2-1.6c-2-.7-3.9-.9-5.8-.7-5.3.5-10.2 4.1-12.2 9.7z"
      />
      <path
        fill="#8B8CC4"
        d="M224.6 113.2l-2.7-1a22.2 22.2 0 00-28.5 13.4l-1.4 3.7 44.5 16.2 1.4-3.8a22.2 22.2 0 00-13.3-28.5z"
      />
      <path
        fill="#FADCBD"
        d="M234.7 88.1l-4.4-1.5a9 9 0 00-11.6 5.3l-.6 1.6c-1.5 4.3 0 9 3.4 11.7l-2.3 6.3c-1-.3-2-.4-3-.5.8 1.9 3 3.7 6 4.8 2.9 1 5.8 1 7.6.2-.8-.6-1.7-1.2-2.7-1.7l2.3-6.2c4.4.1 8.5-2.5 10.1-6.8l.6-1.6a9 9 0 00-5.4-11.6z"
      />
      <path
        fill="#FFF"
        d="M215.4 89.6a8 8 0 0013.3-2.2l6.5 2.4a8 8 0 009 10.2c.2-.6-.8-12.3-.8-12.3l-20-7.2s-7.9 8.5-8 9z"
      />
      <path fill="#E0BB95" d="M228.6 87.4l3.3 1.2a1.8 1.8 0 00-3.3-1.2z" />
      <radialGradient
        id="a"
        cx="-768.2"
        cy="-34.5"
        r="6.6"
        gradientTransform="matrix(-.9395 -.3425 .5744 -1.5754 -472 -231.6)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stop-color="#9689c1" />
        <stop offset=".3" stop-color="#b8afd5" stopOpacity=".7" />
        <stop offset="1" stop-color="#fff" stopOpacity="0" />
      </radialGradient>
      <path
        fill="url(#a)"
        d="M235.3 79l-3.5 9.6 3.4 1.2a8 8 0 009 10.2c.1-.4-2-5.4.9-12.4l-9.8-8.5z"
      />
      <path fill="#E0BB95" d="M231.9 88.6l3.3 1.2a1.8 1.8 0 00-3.3-1.2z" />
      <path fill="#8B8CC7" d="M88.8 0h103.4v133H88.8z" />
      <path
        fill="#E38BB0"
        d="M161.6 11.6H151a1 1 0 00-.8 1.4l5.3 9.2a1 1 0 001.7 0l5.3-9.2a1 1 0 00-.9-1.4z"
      />
      <g>
        <path
          fill="#E38BB0"
          d="M137.5 26.4l-4.9-7.9-14.7 7-1.3-2.7 17.1-8.1 4.9 7.8 14.4-6.8 1.3 2.7z"
        />
      </g>
      <g fill="#6264A7">
        <path d="M108.1 82.8h64.8v5h-64.8zM108.1 95.6h64.8v5h-64.8zM108.1 108.3h64.8v5h-64.8z" />
      </g>
      <g>
        <path fill="#8B8CC4" d="M177.2 70.4h-69.9v-3h66.9V25.9h3z" />
        <path
          fill="#6264A7"
          d="M154 29.9h14.2v32H154zM132.8 35.3H147V62h-14.2zM111.6 47.7h14.2v14.2h-14.2z"
        />
      </g>
      <g>
        <path
          fill="#EDEBE9"
          d="M105.1 48l28.2 89.4-96.2 30.2L0 49.8l67.7-21.3z"
        />
        <path
          fill="#C8C6C4"
          d="M105.1 48l-28.4 8.9-9-28.4zM58 84.1l36.8-11.6 1.6 5.4-36.8 11.6zM35.9 106.3l63.2-20 1.7 5.4-63.2 20zM40.3 120l63.2-19.8 1.7 5.3-63.2 20zM44.6 133.9l63.2-20 1.7 5.4-63.2 20zM53.6 70.3l36.8-11.6 1.7 5.4-36.8 11.6z"
        />
        <path fill="#EF9FBB" d="M46.5 72.6l6 19.2-19.2 6-6-19.1 19.2-6.1" />
      </g>
    </svg>
  ),
  [TeamsTheme.HighContrast]: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 281.6 171.8">
      <defs />
      <g
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="1.5"
      >
        <path fill="#FFF" stroke="#000" d="M166.7 127l20-93 77.7 16.8-20 93z" />
        <path stroke="#FFF" d="M176.4 108.7l14.7-68L257.7 55 243 123z" />
      </g>
      <path
        fill="#FFF"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="1.5"
        d="M166.8 142.2L201.4 47 280.9 76l-34.6 95z"
      />
      <path
        fill="#FFF"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="1.5"
        d="M178.5 124.9l26-71.4 70 25.4-26 71.5z"
      />
      <path d="M247.6 129.5c.5-4.7 7-6.6 6.4-11.4s-6-6.4-7.3-11.2a20.4 20.4 0 01.5-10.6v-.2c.6-3.1.3-6.2-.9-9a13.8 13.8 0 00-7.7-7.3l-4.2-1.5c-1.9-.7-3.8-1-5.7-.8-4.7.5-9 3.3-11.4 7.8v.2c-.6 1-3 5.7-6.8 8-4.2 2.7-9 1-12.5 4.2s-.5 8.3-3.3 12.1c-2 3-7.8 1.4-11.6 2.4l-4.5 12.5v.2l69.9 25.4 4.6-12.8c-2.4-2.6-5.8-5-5.5-8z" />
      <path
        fill="#FFF"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="1.5"
        d="M225.4 114l-2.8-1a22.2 22.2 0 00-28.4 13.3l-1.4 3.8 44.5 16.2 1.4-3.9a22.2 22.2 0 00-13.3-28.4z"
      />
      <path
        fill="#FFF"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="1.5"
        d="M219.8 92.2l-1 2c-1.3 3.8-.3 8 2.3 10.7.6.7 1 1.8.6 2.7l-.5 1.4a4.2 4.2 0 01-4.3 2.7h0c.8 2 3 3.8 6 4.8 3 1.1 5.8 1 7.7.2 0 0 0 0 0 0a4 4 0 01-1.6-4.7l.5-1.5c.4-1 1.3-1.6 2.3-1.7 3.7-.5 7-3 8.4-6.8l1-2.2"
      />
      <path
        fill="#FFF"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="1.5"
        d="M219.3 92.5a8 8 0 0010-4.3l6.6 2.3a8 8 0 005 9.8M89.6.8H193v133H89.6z"
      />
      <path d="M162.4 12.3h-10.6a1 1 0 00-.9 1.5l5.3 9.2a1 1 0 001.7 0l5.3-9.2a1 1 0 00-.8-1.5z" />
      <g>
        <path d="M138.2 27.1l-4.9-7.8-14.7 6.9-1.3-2.7 17.2-8.1 4.9 7.9 14.3-6.8 1.3 2.7z" />
      </g>
      <g>
        <path d="M108.8 83.6h64.8v5h-64.8zM108.8 96.3h64.8v5h-64.8zM108.8 109.1h64.8v5h-64.8z" />
      </g>
      <g>
        <path d="M178 71.1h-69.9v-3H175V26.6h3z" />
        <path d="M154.8 30.6H169v32h-14.2zM133.6 36h14.2v26.7h-14.2zM112.3 48.5h14.2v14.2h-14.2z" />
      </g>
      <g>
        <path
          fill="#FFF"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="1.5"
          d="M105.9 48.7l28.1 89.4-96.1 30.3L.8 50.5l67.7-21.3z"
        />
        <path
          fill="#FFF"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="1.5"
          d="M105.9 48.7l-28.5 9-8.9-28.5z"
        />
        <path d="M58.7 85l36.9-11.7 1.6 5.4-36.8 11.6zM36.7 107l63.2-20 1.7 5.4-63.3 20zM41 120.8l63.2-20 1.7 5.4-63.3 20zM45.3 134.6l63.2-20 1.7 5.4L47 140zM54.3 71.1l36.9-11.6 1.6 5.4L56 76.5zM47.2 73.4l6.1 19.2-19.2 6L28 79.4l19.2-6" />
      </g>
    </svg>
  ),
};

export default Default;
