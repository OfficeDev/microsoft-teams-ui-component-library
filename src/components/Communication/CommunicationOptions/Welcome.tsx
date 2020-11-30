import React from "react";
import { ILayout, Layout } from "../Layout";
import { TeamsTheme } from "../../../themes";

const DEFAULT_STRINGS = {
  title: `Welcome to {{appName}}! We’re glad you’re here.`,
  desc: `{{appName}} is your tool to create, take, and manage polls.`,
  actions: {
    primary: {
      label: "Sign In",
      action: () => alert("Sign In action called"),
    },
    secondary: {
      label: "Sign Up",
      action: () => alert("Sign Up action called"),
    },
    tertiary: {
      label: "Learn more about {{appName}}",
      action: () => alert("Learn more action called"),
    },
  },
};

const Welcome = ({
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
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 199.1 210.2">
      <path fill="#EDEBE9" d="M103 210.2a96 96 0 010-192 96 96 0 010 192z" />
      <path
        fill="#DEBC97"
        d="M66.3 57l2.8-.2A21 21 0 0089.3 35l-.1-3.7A21 21 0 0067.3 11l-2.7.1A21 21 0 0044.3 33l.1 3.7a21 21 0 0021.9 20.2z"
      />
      <path
        fill="#DFBA95"
        d="M6.2 96.4c-3-5.2-4.9-11.6-1-17.3s12.8-6 16-12.3c3.4-6.3 0-11.6 1.8-16.6 2.2-5.9 6.6-6 12-9.1C44.4 36 45 27 45 27l44.3 5.5s-.4 6.3 3.5 10.6c5 5.7 8.7 1.6 13 8.2 3 5-1 8.3 2.4 15.8 3 6.5 13.3 3.8 15 13 2.3 12.2-10.2 20-11.6 26.4-1.4 6.3 0 11.1 1.2 21.3 2.3 17.6-16.2 19.3-24.2 15.5-8-3.8-50 1.6-52.3 1.5-9.8-.4-41.2-6.9-35.5-28 1.8-6.7 10.7-11.2 5.5-20.5z"
      />
      <linearGradient
        id="a"
        x1="50.1"
        x2="92.2"
        y1="107.7"
        y2="156.8"
        gradientTransform="matrix(1 0 0 -1 -2 212)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#9b653e" />
        <stop offset="1" stopColor="#dfba95" />
      </linearGradient>
      <path
        fill="url(#a)"
        d="M116.6 94L34.2 77.6l12-40.7 41.8-1 7 14.3s7.7 2 9.2 5.7-.5 13.3 1.4 15.8c2 2.6 7.8 1 11.2 6.1 3.4 5.1-.2 16.2-.2 16.2z"
      />
      <path
        fill="#8C8CC4"
        d="M108.5 99C98.8 70.2 77 66.5 77 66.5l-20.5-.3s-12.6 3.4-20.2 13c-15.3 19-8 63.2-7.9 63.6.2.3 67.2 5 67.2 5l1.3-18.8c11 3.7 18.1-10.9 11.6-30.2z"
      />
      <path
        fill="#DFBA95"
        d="M32.7 50.6c-3.3 4.8-11.4 67.7-11.4 67.7S5 135.8 15.7 146c9.4 9.3 25.4 9.7 24.9 5.8-1.2-10-4.6-26.8-1.7-31 3.9-5.7-4.6-9-4-13.2.6-4.2 10-5.2 10.4-8.8.9-7.2-10-9.9-9.8-14s7.5-5.6 11-10.1c2.8-3.8 2.5-7.4-1-14.2a5.8 5.8 0 01-.8-4.5c1.4-5.5 5.9-5 8.6-10.3 1.8-3.7 1.4-10.4.9-14.3-.3.2-6-.8-6-.8S36 45.7 32.7 50.6z"
      />
      <radialGradient
        id="b"
        cx="63.4"
        cy="-4"
        r="12.1"
        gradientTransform="scale(1 -1) rotate(-4.2 -576.4 -122.9)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#dfba95" />
        <stop offset=".3" stopColor="#eac9a7" />
        <stop offset=".7" stopColor="#f4d6b7" />
        <stop offset="1" stopColor="#f8dbbd" />
      </radialGradient>
      <path
        fill="url(#b)"
        d="M60 48.7s.5 9.6-1.1 14.5c-.7 2-2.5 3.1-3.8 3.6 0 0 9.3 7 22-.2 0 0-4.2-1-5.3-3.7-1.2-3.1 0-10 0-10l-11.9-4.2z"
      />
      <path
        fill="#F9DDBF"
        d="M68.9 57.4c8-.3 14.3-7 14-15l-.3-6.7c-.3-8-7-14.3-15-14-8.1.3-14.4 7-14 15l.2 6.7c.3 8 7 14.3 15 14z"
      />
      <path
        fill="#F9DDBF"
        d="M53.3 45.9l4-.2-.3-7.4-4 .2c-2 0-3.6 1.8-3.5 3.8 0 2 1.8 3.7 3.8 3.6zM83 44.8l-3.9.1-.2-7.4 3.9-.1c2-.1 3.8 1.5 3.8 3.5.1 2-1.5 3.8-3.5 3.9z"
      />
      <radialGradient
        id="c"
        cx="3658.5"
        cy="190.3"
        r="7.1"
        gradientTransform="matrix(-.9993 .0375 -.0278 -.7394 3729.3 48)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#9b5332" />
        <stop offset=".1" stopColor="#aa6947" />
        <stop offset=".3" stopColor="#c28b69" />
        <stop offset=".5" stopColor="#d7ab8a" />
        <stop offset=".7" stopColor="#e7c4a5" />
        <stop offset=".9" stopColor="#f3d6b8" />
        <stop offset="1" stopColor="#f9ddbf" />
      </radialGradient>
      <path fill="url(#c)" d="M70.2 50.4L80 50l-.7-17.6-9.7.4z" />
      <ellipse
        cx="75.7"
        cy="39.3"
        fill="#33322E"
        rx="1.2"
        ry="2.4"
        transform="rotate(-2.1 75.7 39.3)"
      />
      <ellipse
        cx="63.4"
        cy="39.8"
        fill="#33322E"
        rx="1.2"
        ry="2.4"
        transform="rotate(-2.1 63.4 39.7)"
      />
      <path
        fill="#F9DDBF"
        d="M70.2 48c0-1.6 1.7-2.3 2.3-3 .3-.4.3-.8 0-1.1-.8-1-2.2-2.3-2.7-6.6-.8 1.5-2.4 7.3.4 10.6z"
      />
      <path
        fill="#DEBC97"
        d="M58.6 37.3c.9-.5 1.7-1.1 2.5-1.9 2-2 3-5.5 3-8.2l9-.3c.3 2.7 1.5 6.1 3.5 8 2.1 1.7 4.5 2.6 7.3 2.5 1.9-.1 3.6-.6 5.1-1.6 0-.3-7-15.5-7-15.5l-27.6 1C50.8 30.8 49 37 49.2 37.5a10.4 10.4 0 009.4-.2"
      />
      <radialGradient
        id="d"
        cx="3665.1"
        cy="218.7"
        r="15.7"
        gradientTransform="rotate(177.9 1864.8 90)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#5b2e11" stopOpacity=".8" />
        <stop offset="1" stopColor="#bd8f6b" stopOpacity="0" />
      </radialGradient>
      <path fill="url(#d)" d="M68.6 27.1l7.6-.3-.5-13.8-7.6.3.5 13.8z" />
      <path
        fill="#BF8F68"
        d="M68.6 27.1l4.5-.1c0-1.2-1-2.2-2.2-2.1h-.2c-1.2 0-2.1 1-2 2.2zM64 27.3l4.6-.2c0-1.2-1-2.1-2.3-2h-.1C65 25 64 26 64 27.2z"
      />
      <g opacity=".5">
        <path
          fill="#BF8F68"
          d="M71.5 50.4a3 3 0 01-1.4.9c-.6.2-1.2.2-1.8 0a3 3 0 01-1.7-1c-.4-.4-.6-1-.6-1.6a.4.4 0 01.6-.3l1.2.7 1 .3c.6.2 1.4.2 2.4.3a.4.4 0 01.3.7z"
        />
      </g>
      <g>
        <path
          fill="#9B653E"
          d="M140.1 58a7.2 7.2 0 004.8-.5 5 5 0 001.2-.8l.1-.1a.7.7 0 011 .7c-.1.7-1.1 2.7-3.3 3.1a5 5 0 01-4.3-1.5.5.5 0 01.5-.9z"
        />
        <ellipse
          cx="148.3"
          cy="49"
          fill="#615E5B"
          rx="2.4"
          ry="1.4"
          transform="rotate(-89.3 148.3 49)"
        />
        <ellipse
          cx="135"
          cy="49"
          fill="#615E5B"
          rx="2.4"
          ry="1.4"
          transform="rotate(-89.3 135 49)"
        />
        <linearGradient
          id="e"
          x1="139.9"
          x2="139.9"
          y1="24.9"
          y2="115.2"
          gradientTransform="matrix(1 0 0 -1 0 212)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#e89b41" />
          <stop offset=".6" stopColor="#f0aa46" />
          <stop offset="1" stopColor="#f6b548" />
        </linearGradient>
        <path
          fill="url(#e)"
          d="M199 114.2c0-8.5-1-16.8-3.1-24.6a78 78 0 00-46-12.4h-1c-53.6-1.8-65 36.8-67.2 74.4l-.8 15.6a69.9 69.9 0 0010 42.2A96 96 0 00199 114.1z"
        />
        <path
          fill="#FFD591"
          d="M128.4 83l4.5-9 30.5-4.6s-.1 4.5 2.5 6.4l-37.5 7.1z"
        />
        <path
          fill="#969593"
          d="M140.3 89.2L133 74l24.9-4.5s-.1 4.5 2 6.4l-19.5 13.4z"
        />
        <path
          fill="#DFBA95"
          d="M138.4 40.3l28.4-1 1.7 47.3-27 4.7s-2.3-5.9-3-12c-.8-6.4 0-39 0-39z"
        />
        <path fill="#F6B548" d="M148.8 73.9l-9.3 18.2 36.4.9-6.7-19z" />
        <path
          fill="#FFD591"
          d="M151.4 83.9l-2.6-10 21.3-2s.8 6.2 4.2 8l-22.9 4z"
        />
        <path
          fill="#DFBA95"
          d="M166.4 40.6l-.3 17.5c0 4.7-4 13.8-14.6 13.7l-10.8-.2c-6.2-.1-11.1-4-11-8.8l.2-22.6c0-4.8 5.2-8.6 11.3-8.5l14.1.1c6.2.1 11.1 4 11 8.8z"
        />
        <path fill="#9C97AE" d="M129.8 56.6v.1z" />
        <path
          fill="#DFBA95"
          d="M151.4 60.1a13.5 13.5 0 11-27-.3 13.5 13.5 0 0127 .3z"
        />
        <circle cx="167.9" cy="50.4" r="5.5" fill="#DFBA95" />
        <path
          fill="#BF8F68"
          d="M166.4 37.7l-.2 20.4a15.7 15.7 0 01-15.8 15.4H138c-7.4-.1-13.5-6.1-13.6-13.5 0-2.2.5-4.2 1.4-6l27.6.3c3 0 5.4-2.3 5.5-5.3l.1-11.4h7.4z"
        />
        <path
          fill="#BF8F68"
          d="M155.6 27.3h-1c-2.2 11 4.1 17.6 13.3 17.6l-.1-5c0-8-4.6-12.6-12.2-12.6z"
        />
        <path
          fill="#BF8F68"
          d="M155.5 34.8l-13-.2h-10s-2.6-1.3-2.3-5c.1-2 .7-3.4 1.3-4.5l1.1-1.7s.4.8 1.4 1.7c1 .8 2.4 1.6 4.6 1.8a65 65 0 007.6.3h.2l9.2.1v7.5z"
        />
        <radialGradient
          id="f"
          cx="4107.9"
          cy="197.9"
          r="10.5"
          gradientTransform="matrix(-.9999 -.0126 -.0078 .6207 4251.4 -19.9)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#9b653e" />
          <stop offset="1" stopColor="#bf8f68" stopOpacity="0" />
        </radialGradient>
        <path fill="url(#f)" d="M130.1 32.6l-.6 43.2 11.8.4.6-43.2z" />
        <path
          fill="#231F20"
          d="M137.6 50c0 .3-.3.3-.5.2h-.1c-.7-.5-1.2-.8-1.8-.8-.5-.1-1 0-1.6.5a.4.4 0 01-.7-.2c0-.6.3-1.1.8-1.5.5-.4 1.1-.5 1.7-.5 1.2.2 2.1 1 2.3 2v.4z"
        />
        <path
          fill="#6F70AC"
          d="M134.5 55.1a7.1 7.1 0 11.2-14.3 7.1 7.1 0 017 7.3c-.1 3.9-3.3 7-7.2 7zm0-12.7a5.6 5.6 0 00-5.6 5.5c0 3.1 2.4 5.6 5.5 5.7h.1a5.6 5.6 0 000-11.2z"
        />
        <path
          fill="#DFBA95"
          d="M141.2 54.6a4 4 0 01-4-4 4 4 0 014-4 4 4 0 014 4.1 4 4 0 01-4 4z"
        />
        <path
          fill="#6F70AC"
          d="M149 55.3c-4 0-7.1-3.3-7-7.2a7.1 7.1 0 017.1-7 7.1 7.1 0 017.1 7.2c0 3.9-3.2 7-7.1 7zm0-12.7a5.6 5.6 0 00-5.5 5.5 5.6 5.6 0 105.6-5.5z"
        />
        <path
          fill="#BF8F68"
          d="M163.6 42.2l2.7 6v-1.7c0-.9.7-1.6 1.5-1.6l-4.2-2.7z"
        />
        <path fill="#6F70AC" d="M155.5 49v-1.6l10.8.2V49z" />
        <path fill="#D7D0E6" d="M129.5 72.1h-.1.1z" />
        <path
          fill="#231F20"
          d="M150.5 50c-.1.2-.4.3-.6.1-.7-.4-1.3-.8-1.8-.8-.6-.1-1 0-1.6.5h-.1a.4.4 0 01-.6-.2c0-.6.3-1.1.8-1.5.5-.4 1.1-.5 1.7-.4 1.2.1 2 1 2.2 2v.3z"
        />
        <path
          fill="#6D3916"
          d="M147 57.4c.5 0 1 .3 1 .9a4.5 4.5 0 01-8.6 1.5c-.2-.5.1-1 .6-1.1l7-1.3z"
        />
        <path
          fill="#FFF"
          d="M140 58.7l7-1.3c.2 0 .5 0 .6.2-.7.7-1.9 1.3-3.2 1.7-2 .5-3.8.3-4.8-.4l.4-.2z"
        />
      </g>
      <g>
        <path fill="#E1DFDD" d="M131.3 96.1l-32.8-8.7-11.4 40.7 32.7 8.7z" />
      </g>
      <g>
        <path fill="#F3F2F1" d="M112.3 100.7l-33.9 2 3.5 41.1 33.8-2.1z" />
      </g>
      <g>
        <path fill="#FFF" d="M68 118.8l32.8-8.7 11.9 44.9-32.8 8.7z" />
        <path
          fill="#E1DFDD"
          d="M75.6 123.7l11.1-3 .4 1.6-11.1 2.9zM89.2 119.6l8-2.1 2.2 8.2-8 2.1zM77.2 129l11-2.8.6 2-11 2.8zM79 134.8l21.3-5.7.5 2-21.4 5.6zM80.6 140.4l21.4-5.7.5 2-21.4 5.6zM82.3 146l21.4-5.7.5 2-21.4 5.6z"
        />
      </g>
      <path fill="#8C8CC4" d="M80.3 74z" />
      <radialGradient
        id="g"
        cx="-641.4"
        cy="177.9"
        r="30.6"
        gradientTransform="scale(-.9845 .9845) rotate(3.1 544 10410)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset=".3" stopColor="#33322e" />
        <stop offset=".9" stopColor="#5a5754" stopOpacity=".1" />
        <stop offset="1" stopColor="#605d5a" stopOpacity="0" />
      </radialGradient>
      <path fill="url(#g)" d="M80.3 74z" opacity=".1" />
      <g>
        <path
          fill="#4C4E77"
          d="M66.2 139H36.7s-11.9 1.3-23.5 9a96 96 0 0089.9 62.2c2 0 4.2 0 6.2-.2l1.4-24c1.4-25.5-19-47-44.5-47z"
        />
        <linearGradient
          id="h"
          x1="29"
          x2="57.3"
          y1="44.3"
          y2="44.3"
          gradientTransform="matrix(1 0 0 -1 -2 212)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#e89b41" />
          <stop offset=".6" stopColor="#f0aa46" />
          <stop offset="1" stopColor="#f6b548" />
        </linearGradient>
        <path
          fill="url(#h)"
          d="M49.5 194.8c-5.4-27-11.1-45.7-20.2-54.2-2.3.7-5.1 1.6-8 3 8.4 4.3 14.3 20.8 19.5 44.5a98 98 0 008.7 6.7z"
        />
        <path
          fill="#9B653E"
          d="M43.8 160.8s1.7-4.3-2.7-4.1l-7.5.4c-1.1.1-2 .9-2.4 2 0 0-3 7.3-5.4 12 2.3 3.2 4.9 6.3 7.6 9.1 1.4-.9 3-1.9 3.7-2.6 2.5-2.4 3.5-8.9 3.5-8.9l3.4-.2c1.3.2 2.5-1 1.9-2.8l-2-4.9z"
        />
        <path
          fill="#FFF"
          d="M69.8 104.7l-34 4.3s-3.2-8-4-11.9c-1.3-5.3 1.7-8.8 5.4-9.2l23.1-3a6.9 6.9 0 017.7 6l1.8 13.8z"
        />
        <radialGradient
          id="i"
          cx="5354.5"
          cy="109.6"
          r="25.2"
          gradientTransform="matrix(-1 0 0 -.9516 5417.1 219.3)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#5a463a" />
          <stop offset="1" stopColor="#9b653e" />
        </radialGradient>
        <path
          fill="url(#i)"
          d="M36.4 114.3l24.5-12.9 3 31.8c0 2 2.3 5.4 6.5 6-8.6 13.3-25.5 4.2-41 1.3 2.7-.4 5-2.8 6.2-6.2 2.4-7.7.8-20 .8-20z"
        />
        <circle cx="37.2" cy="109.5" r="6" fill="#9B653E" />
        <path
          fill="#9B653E"
          d="M61 129.5l-4 .5c-9.4 1.3-18-5.6-19.3-15.2l-2.2-18.3a7.7 7.7 0 016.5-8.7l23.3-3a4.2 4.2 0 014.8 3.7l3 25c1 7.8-4.4 15-12 16z"
        />
        <path
          fill="#FFF"
          d="M44.5 94.4c0 5.1-4.1 9.3-9.3 9.3s3-18.3 4.3-17.6c3 1.6 5 4.7 5 8.3z"
        />
        <path
          fill="#FFF"
          d="M62.2 89.9c-5-.4-10.4-2.9-15.4-2.4-7.8.6-11 4.9-11 4.9l.4-3.7c-3-6.8 3.6-10.2 10-9 8.9 1.5 6-2.7 9.7-3.4 4-.7 4.6 3.1 7.7 3 3.6-.2 3-5.5 8.2-5 5.3.7 9.2 16.8-9.6 15.6z"
        />
        <ellipse
          cx="51.1"
          cy="104.2"
          fill="#33322E"
          rx="1.5"
          ry="2.8"
          transform="rotate(-7.3 51 104.2)"
        />
        <radialGradient
          id="j"
          cx="6220.6"
          cy="161.7"
          r="11.2"
          gradientTransform="matrix(-.9635 .1303 .1014 .7501 6034.4 -822.7)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#5a463a" />
          <stop offset="1" stopColor="#9b653e" />
        </radialGradient>
        <path
          fill="url(#j)"
          d="M71.4 119.8l-11.6 1.4-.8-6.9c0-.6.2-1.3.7-1.7l2.5-2.2c.6-.5.7-1.3.2-1.9l-2.9-3.4a5.7 5.7 0 01-1.3-3l-.8-6.5 12-1.6 2 25.8z"
        />
        <ellipse
          cx="64.6"
          cy="102.6"
          fill="#33322E"
          rx="1.5"
          ry="2.8"
          transform="rotate(-7.3 64.6 102.6)"
        />
        <path
          fill="#76452B"
          d="M53.8 115.5l1.8 1a9.7 9.7 0 005.7.3.5.5 0 01.5.7c-.4.8-1.2 1.4-2 1.7-1 .3-2 .4-2.8.2-1.8-.3-3.6-1.6-4-3.3a.5.5 0 01.7-.6z"
        />
      </g>
      <g>
        <path
          fill="#3B322F"
          d="M175.6 114c-.1-.3-1.7-5.7-2.8-7.8a25.9 25.9 0 00-18-14c-7.6-1.4-15 .8-20.8 5.4h-.1c-1.3 1-13.4 9.5-11.6 27.3v2.1c-.2 4.6-1.9 22.1-13.6 39.7-7.7 11.4-6 27.5 3.9 41.6a97.2 97.2 0 0054.4-22.5 96.2 96.2 0 0024.4-34c-6.3-11-13-22.1-15.8-37.7z"
        />
        <path
          fill="#8C8CC4"
          d="M186.3 162a40.5 40.5 0 00-28.1-10.3c-19.5 0-35.6 14.7-36.3 30.6-.2 5.2-1.4 17.1-2.5 26.5 28.6-4.9 53-22.5 67-46.8z"
        />
        <path
          fill="#BF8F68"
          d="M163.3 128c-4.2 2-15.3 10.8-15.3 10.8s3.3 6.3 3 10.2c-.3 3.1-7.7 5.7-7.7 5.7s6.6 5 12.7 4.2c8.1-1.1 8.2-3 17-4.8-.3-.1-4-2.2-5.3-4.8-2.3-4.4-2.9-11.3-4.4-21.3z"
        />
        <circle cx="132.4" cy="137.4" r="2.6" fill="#F8CA54" />
        <path
          fill="#BF8F68"
          d="M163.6 121.8c.8 11.9-8.2 22.1-16.7 22.3s-17.4-7.1-18.4-19c-1.4-15 7-22.6 15.5-22.8 8.5-.2 18.8 7.7 19.6 19.5z"
        />
        <ellipse
          cx="149.8"
          cy="122.9"
          fill="#3B322F"
          rx="1.5"
          ry="2.6"
          transform="rotate(-4.4 149.8 122.9)"
        />
        <radialGradient
          id="k"
          cx="13048.8"
          cy="-2858.9"
          r="7.6"
          gradientTransform="matrix(-.9858 .1014 .1514 1.0539 13439.3 1818.5)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#9b653e" />
          <stop offset=".9" stopColor="#ba8a63" stopOpacity=".1" />
          <stop offset="1" stopColor="#bf8f68" stopOpacity="0" />
        </radialGradient>
        <path
          fill="url(#k)"
          d="M143.2 113.4v6.3c0 3.3-1.6 5.6-2.7 6.8-.7.7-1 2.4 0 3.4.5.6 2.6 1.7 2.7 3.2l.2 5.9-11.8.4-1.3-26h12.9z"
        />
        <path
          fill="#9B653E"
          d="M142.8 134.9l1.6-.4a15.9 15.9 0 002.7-.9l1.5-.7a.5.5 0 01.8.4c0 .8-.4 1.5-.9 2a4 4 0 01-1.9 1.3c-.7.2-1.5.3-2.2.1-.7-.1-1.4-.4-2-1a.5.5 0 01.3-.8z"
        />
        <path
          fill="#3B322F"
          d="M136.8 100.7s-2.5 12.1 9.3 14.1c10.6 1.8 14.8 3.6 17.5 7 4.6-4.6 4.5-15.9-2.4-20.8-13.4-9.7-24.4-.3-24.4-.3z"
        />
        <ellipse
          cx="136.6"
          cy="123.3"
          fill="#3B322F"
          rx="1.5"
          ry="2.6"
          transform="rotate(-6 136.6 123.3)"
        />
        <path
          fill="#BF8F68"
          d="M160.5 131l6-.9a4.4 4.4 0 003.7-5.2 4.9 4.9 0 00-5.5-4l-5.9.9 1.7 9.2z"
        />
        <circle cx="164.5" cy="132.7" r="2.6" fill="#F8CA54" />
      </g>
      <path
        fill="#D6CED7"
        d="M121.9 188.2c-.4-1-1.4-1.7-2.5-1.7H64a2 2 0 00-2 2.6l4.9 14a96.1 96.1 0 0061.4 3.6l-6.5-18.5z"
      />
      <g>
        <path
          fill="#FFF"
          d="M116 52.7h-15a10 10 0 01-10-10v-2.8a10 10 0 0110-10h15a10 10 0 0110 10v2.8a10 10 0 01-10 10z"
        />
        <g fill="#E1DFDD">
          <path d="M99.7 42.9h17.6v2.4H99.7zM99.7 37.3H112v2.4H99.7z" />
        </g>
      </g>
      <g>
        <path
          fill="#C8C6C4"
          d="M113.1 22.8h-15a10 10 0 01-10-10V10a10 10 0 0110-10h15a10 10 0 0110 10v2.8a10 10 0 01-10 10z"
        />
        <circle cx="98.8" cy="11.5" r="1.8" fill="#EDEBE9" />
        <circle cx="105.6" cy="11.5" r="1.8" fill="#EDEBE9" />
        <circle cx="112.5" cy="11.5" r="1.8" fill="#EDEBE9" />
        <path
          fill="#C8C6C4"
          d="M100.4 22.8c-.8 2-2.7 3.7-4.9 3.7-.4 0-.8 0-1.3-.2a5.1 5.1 0 002-3.5"
        />
      </g>
    </svg>
  ),
  [TeamsTheme.Dark]: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 206.1 210.2">
      <defs />
      <path fill="#979593" d="M103 210.2a96 96 0 010-192 96 96 0 010 192z" />
      <path
        fill="#DEBC97"
        d="M66.3 57l2.8-.2A21 21 0 0089.3 35l-.1-3.7A21 21 0 0067.3 11l-2.7.1A21 21 0 0044.3 33l.1 3.7a21 21 0 0021.9 20.2z"
      />
      <path
        fill="#DFBA95"
        d="M6.2 96.4c-3-5.2-4.9-11.6-1-17.3s12.8-6 16-12.3c3.4-6.3 0-11.6 1.8-16.6 2.2-5.9 6.6-6 12-9.1C44.4 36 45 27 45 27l44.3 5.5s-.4 6.3 3.5 10.6c5 5.7 8.7 1.6 13 8.2 3 5-1 8.3 2.4 15.8 3 6.5 13.3 3.8 15 13 2.3 12.2-10.2 20-11.6 26.4-1.4 6.3 0 11.1 1.2 21.3 2.3 17.6-16.2 19.3-24.2 15.5-8-3.8-50 1.6-52.3 1.5-9.8-.4-41.2-6.9-35.5-28 1.8-6.7 10.7-11.2 5.5-20.5z"
      />
      <linearGradient
        id="a"
        x1="50.1"
        x2="92.2"
        y1="172.3"
        y2="123.2"
        gradientTransform="translate(-2 -68)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#9b653e" />
        <stop offset="1" stopColor="#dfba95" />
      </linearGradient>
      <path
        fill="url(#a)"
        d="M116.6 94L34.2 77.6l12-40.7 41.8-1 7 14.3s7.7 2 9.2 5.7-.5 13.3 1.4 15.8c2 2.6 7.8 1 11.2 6.1 3.4 5.1-.2 16.2-.2 16.2z"
      />
      <path
        fill="#8C8CC4"
        d="M108.5 99C98.8 70.2 77 66.5 77 66.5l-20.5-.3s-12.6 3.4-20.2 13c-15.3 19-8 63.2-7.9 63.6.2.3 67.2 5 67.2 5l1.3-18.8c11 3.7 18.1-10.9 11.6-30.2z"
      />
      <path
        fill="#DFBA95"
        d="M32.7 50.6c-3.3 4.8-11.4 67.7-11.4 67.7S5 135.8 15.7 146c9.4 9.3 25.4 9.7 24.9 5.8-1.2-10-4.6-26.8-1.7-31 3.9-5.7-4.6-9-4-13.2.6-4.2 10-5.2 10.4-8.8.9-7.2-10-9.9-9.8-14s7.5-5.6 11-10.1c2.8-3.8 2.5-7.4-1-14.2a5.8 5.8 0 01-.8-4.5c1.4-5.5 5.9-5 8.6-10.3 1.8-3.7 1.4-10.4.9-14.3-.3.2-6-.8-6-.8S36 45.7 32.7 50.6z"
      />
      <radialGradient
        id="b"
        cx="64.5"
        cy="247.3"
        r="12.1"
        gradientTransform="rotate(4.2 2728.9 229.1)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#dfba95" />
        <stop offset=".3" stopColor="#eac9a7" />
        <stop offset=".7" stopColor="#f4d6b7" />
        <stop offset="1" stopColor="#f8dbbd" />
      </radialGradient>
      <path
        fill="url(#b)"
        d="M60 48.7s.5 9.6-1.1 14.5c-.7 2-2.5 3.1-3.8 3.6 0 0 9.3 7 22-.2 0 0-4.2-1-5.3-3.7-1.2-3.1 0-10 0-10l-11.9-4.2z"
      />
      <path
        fill="#F9DDBF"
        d="M68.9 57.4c8-.3 14.3-7 14-15l-.3-6.7c-.3-8-7-14.3-15-14-8.1.3-14.4 7-14 15l.2 6.7c.3 8 7 14.3 15 14z"
      />
      <path
        fill="#F9DDBF"
        d="M53.3 45.9l4-.2-.3-7.4-4 .2c-2 0-3.6 1.8-3.5 3.8 0 2 1.8 3.7 3.8 3.6zM83 44.8l-3.9.1-.2-7.4 3.9-.1c2-.1 3.8 1.5 3.8 3.5.1 2-1.5 3.8-3.5 3.9z"
      />
      <radialGradient
        id="c"
        cx="2662"
        cy="126.9"
        r="7.1"
        gradientTransform="matrix(-.9993 .0375 .0278 .7394 2724.7 -149.2)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#9b5332" />
        <stop offset=".1" stopColor="#aa6947" />
        <stop offset=".3" stopColor="#c28b69" />
        <stop offset=".5" stopColor="#d7ab8a" />
        <stop offset=".7" stopColor="#e7c4a5" />
        <stop offset=".9" stopColor="#f3d6b8" />
        <stop offset="1" stopColor="#f9ddbf" />
      </radialGradient>
      <path fill="url(#c)" d="M70.2 50.4L80 50l-.7-17.6-9.7.4z" />
      <ellipse
        cx="75.7"
        cy="39.3"
        fill="#33322E"
        rx="1.2"
        ry="2.4"
        transform="rotate(-2.1 75.7 39.3)"
      />
      <ellipse
        cx="63.4"
        cy="39.8"
        fill="#33322E"
        rx="1.2"
        ry="2.4"
        transform="rotate(-2.1 63.4 39.8)"
      />
      <path
        fill="#F9DDBF"
        d="M70.2 48c0-1.6 1.7-2.3 2.3-3 .3-.4.3-.8 0-1.1-.8-1-2.2-2.3-2.7-6.6-.8 1.5-2.4 7.3.4 10.6z"
      />
      <path
        fill="#DEBC97"
        d="M58.6 37.3c.9-.5 1.7-1.1 2.5-1.9 2-2 3-5.5 3-8.2l9-.3c.3 2.7 1.5 6.1 3.5 8 2.1 1.7 4.5 2.6 7.3 2.5 1.9-.1 3.6-.6 5.1-1.6 0-.3-7-15.5-7-15.5l-27.6 1C50.8 30.8 49 37 49.2 37.5a10.4 10.4 0 009.4-.2"
      />
      <radialGradient
        id="d"
        cx="2668.6"
        cy="80"
        r="15.7"
        gradientTransform="scale(-1 1) rotate(2.1 2668.7 -72706)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#5b2e11" stopOpacity=".8" />
        <stop offset="1" stopColor="#bd8f6b" stopOpacity="0" />
      </radialGradient>
      <path fill="url(#d)" d="M68.6 27.1l7.6-.3-.5-13.8-7.6.3.5 13.8z" />
      <path
        fill="#BF8F68"
        d="M68.6 27.1l4.5-.1c0-1.2-1-2.2-2.2-2.1h-.2c-1.2 0-2.1 1-2 2.2zM64 27.3l4.6-.2c0-1.2-1-2.1-2.3-2h-.1C65 25 64 26 64 27.2z"
      />
      <g opacity=".5">
        <path
          fill="#BF8F68"
          d="M71.5 50.4a3 3 0 01-1.4.9c-.6.2-1.2.2-1.8 0a3 3 0 01-1.7-1c-.4-.4-.6-1-.6-1.6a.4.4 0 01.6-.3l1.2.7 1 .3c.6.2 1.4.2 2.4.3a.4.4 0 01.3.7z"
        />
      </g>
      <g>
        <path
          fill="#9B653E"
          d="M140.1 58a7.2 7.2 0 004.8-.5 5 5 0 001.2-.8l.1-.1a.7.7 0 011 .7c-.1.7-1.1 2.7-3.3 3.1a5 5 0 01-4.3-1.5.5.5 0 01.5-.9z"
        />
        <ellipse
          cx="148.3"
          cy="49"
          fill="#615E5B"
          rx="2.4"
          ry="1.4"
          transform="rotate(-89.3 148.3 49)"
        />
        <ellipse
          cx="135"
          cy="49"
          fill="#615E5B"
          rx="2.4"
          ry="1.4"
          transform="rotate(-89.3 135 49)"
        />
        <linearGradient
          id="e"
          x1="139.9"
          x2="139.9"
          y1="255.1"
          y2="164.8"
          gradientTransform="translate(0 -68)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#e89b41" />
          <stop offset=".6" stopColor="#f0aa46" />
          <stop offset="1" stopColor="#f6b548" />
        </linearGradient>
        <path
          fill="url(#e)"
          d="M199 114.2c0-8.5-1-16.8-3.1-24.6a78 78 0 00-46-12.4h-1c-53.6-1.8-65 36.8-67.2 74.4l-.8 15.6a69.9 69.9 0 0010 42.2A96 96 0 00199 114.1z"
        />
        <path
          fill="#FFD591"
          d="M128.4 83l4.5-9 30.5-4.6s-.1 4.5 2.5 6.4l-37.5 7.1z"
        />
        <path
          fill="#969593"
          d="M140.3 89.2L133 74l24.9-4.5s-.1 4.5 2 6.4l-19.5 13.4z"
        />
        <path
          fill="#DFBA95"
          d="M138.4 40.3l28.4-1 1.7 47.3-27 4.7s-2.3-5.9-3-12c-.8-6.4 0-39 0-39z"
        />
        <path fill="#F6B548" d="M148.8 73.9l-9.3 18.2 36.4.9-6.7-19z" />
        <path
          fill="#FFD591"
          d="M151.4 83.9l-2.6-10 21.3-2s.8 6.2 4.2 8l-22.9 4z"
        />
        <path
          fill="#DFBA95"
          d="M166.4 40.6l-.3 17.5c0 4.7-4 13.8-14.6 13.7l-10.8-.2c-6.2-.1-11.1-4-11-8.8l.2-22.6c0-4.8 5.2-8.6 11.3-8.5l14.1.1c6.2.1 11.1 4 11 8.8z"
        />
        <path fill="#9C97AE" d="M129.8 56.6v.1z" />
        <path
          fill="#DFBA95"
          d="M151.4 60.1a13.5 13.5 0 11-27-.3 13.5 13.5 0 0127 .3z"
        />
        <circle cx="167.9" cy="50.4" r="5.5" fill="#DFBA95" />
        <path
          fill="#BF8F68"
          d="M166.4 37.7l-.2 20.4a15.7 15.7 0 01-15.8 15.4H138c-7.4-.1-13.5-6.1-13.6-13.5 0-2.2.5-4.2 1.4-6l27.6.3c3 0 5.4-2.3 5.5-5.3l.1-11.4h7.4z"
        />
        <path
          fill="#BF8F68"
          d="M155.6 27.3h-1c-2.2 11 4.1 17.6 13.3 17.6l-.1-5c0-8-4.6-12.6-12.2-12.6z"
        />
        <path
          fill="#BF8F68"
          d="M155.5 34.8l-13-.2h-10s-2.6-1.3-2.3-5a11.4 11.4 0 012.4-6.2s.4.8 1.4 1.7c1 .8 2.4 1.6 4.6 1.8a65 65 0 007.6.3h.2l9.2.1v7.5z"
        />
        <radialGradient
          id="f"
          cx="3109.4"
          cy="3.5"
          r="10.5"
          gradientTransform="matrix(-.9999 -.0126 .0078 -.6207 3251.4 92.5)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#9b653e" />
          <stop offset="1" stopColor="#bf8f68" stopOpacity="0" />
        </radialGradient>
        <path fill="url(#f)" d="M130.1 32.6l-.6 43.2 11.8.4.6-43.2z" />
        <path
          fill="#231F20"
          d="M137.6 50c0 .3-.3.3-.5.2h-.1c-.7-.5-1.2-.8-1.8-.8-.5-.1-1 0-1.6.5a.4.4 0 01-.7-.2c0-.6.3-1.1.8-1.5.5-.4 1.1-.5 1.7-.5 1.2.2 2.1 1 2.3 2v.4z"
        />
        <path
          fill="#6F70AC"
          d="M134.5 55.1a7.1 7.1 0 11.2-14.3 7.1 7.1 0 017 7.3c-.1 3.9-3.3 7-7.2 7zm0-12.7a5.6 5.6 0 00-5.6 5.5 5.6 5.6 0 105.7-5.5h-.1z"
        />
        <path
          fill="#DFBA95"
          d="M141.2 54.6a4 4 0 01-4-4 4 4 0 014-4 4 4 0 014 4.1 4 4 0 01-4 4z"
        />
        <path
          fill="#6F70AC"
          d="M149 55.3c-4 0-7.1-3.3-7-7.2a7.1 7.1 0 017.1-7 7.1 7.1 0 017.1 7.2c0 3.9-3.2 7-7.1 7zm0-12.7a5.6 5.6 0 00-5.5 5.5 5.6 5.6 0 105.6-5.5z"
        />
        <path
          fill="#BF8F68"
          d="M163.6 42.2l2.7 6v-1.7c0-.9.7-1.6 1.5-1.6l-4.2-2.7z"
        />
        <path fill="#6F70AC" d="M155.5 49v-1.6l10.8.2V49z" />
        <path fill="#D7D0E6" d="M129.5 72.1h-.1.1z" />
        <path
          fill="#231F20"
          d="M150.5 50c-.1.2-.4.3-.6.1-.7-.4-1.3-.8-1.8-.8-.6-.1-1 0-1.6.5h-.1a.4.4 0 01-.6-.2c0-.6.3-1.1.8-1.5.5-.4 1.1-.5 1.7-.4 1.2.1 2 1 2.2 2v.3z"
        />
        <path
          fill="#6D3916"
          d="M147 57.4c.5 0 1 .3 1 .9a4.5 4.5 0 01-8.6 1.5c-.2-.5.1-1 .6-1.1l7-1.3z"
        />
        <path
          fill="#FFF"
          d="M140 58.7l7-1.3c.2 0 .5 0 .6.2-.7.7-1.9 1.3-3.2 1.7-2 .5-3.8.3-4.8-.4l.4-.2z"
        />
      </g>
      <g>
        <path fill="#E1DFDD" d="M131.3 96.1l-32.8-8.7-11.4 40.7 32.7 8.7z" />
      </g>
      <g>
        <path fill="#F3F2F1" d="M112.3 100.7l-33.9 2 3.5 41.1 33.8-2.1z" />
      </g>
      <g>
        <path fill="#FFF" d="M68 118.8l32.8-8.7 11.9 44.9-32.8 8.7z" />
        <path
          fill="#E1DFDD"
          d="M75.6 123.7l11.1-3 .4 1.6-11.1 3zM89.2 119.6l8-2.1 2.2 8.2-8 2.1zM77.2 129l11-2.8.6 2-11 2.8zM79 134.8l21.3-5.7.5 2-21.4 5.6zM80.6 140.4l21.4-5.7.5 2-21.4 5.6zM82.3 146l21.4-5.7.5 2-21.4 5.6z"
        />
      </g>
      <path fill="#8C8CC4" d="M80.3 74z" />
      <radialGradient
        id="g"
        cx="-1644.8"
        cy="6.3"
        r="30.6"
        gradientTransform="scale(-.9845) rotate(-3.1 -3370 -28908)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset=".3" stopColor="#33322e" />
        <stop offset=".9" stopColor="#5a5754" stopOpacity=".1" />
        <stop offset="1" stopColor="#605d5a" stopOpacity="0" />
      </radialGradient>
      <path fill="url(#g)" d="M80.3 74z" opacity=".1" />
      <g>
        <path
          fill="#4C4E77"
          d="M66.2 139H36.7s-11.9 1.3-23.5 9a96 96 0 0089.9 62.2c2 0 4.2 0 6.2-.2l1.4-24c1.4-25.5-19-47-44.5-47z"
        />
        <linearGradient
          id="h"
          x1="29"
          x2="57.3"
          y1="235.7"
          y2="235.7"
          gradientTransform="translate(-2 -68)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#e89b41" />
          <stop offset=".6" stopColor="#f0aa46" />
          <stop offset="1" stopColor="#f6b548" />
        </linearGradient>
        <path
          fill="url(#h)"
          d="M49.5 194.8c-5.4-27-11.1-45.7-20.2-54.2-2.3.7-5.1 1.6-8 3 8.4 4.3 14.3 20.8 19.5 44.5a98 98 0 008.7 6.7z"
        />
        <path
          fill="#9B653E"
          d="M43.8 160.8s1.7-4.3-2.7-4.1l-7.5.4c-1.1.1-2 .9-2.4 2 0 0-3 7.3-5.4 12 2.3 3.2 4.9 6.3 7.6 9.1 1.4-.9 3-1.9 3.7-2.6 2.5-2.4 3.5-8.9 3.5-8.9l3.4-.2c1.3.2 2.5-1 1.9-2.8l-2-4.9z"
        />
        <path
          fill="#FFF"
          d="M69.8 104.7l-34 4.3s-3.2-8-4-11.9c-1.3-5.3 1.7-8.8 5.4-9.2l23.1-3a6.9 6.9 0 017.7 6l1.8 13.8z"
        />
        <radialGradient
          id="i"
          cx="4356.4"
          cy="172.1"
          r="25.2"
          gradientTransform="matrix(-1 0 0 .9516 4419 -48.8)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#5a463a" />
          <stop offset="1" stopColor="#9b653e" />
        </radialGradient>
        <path
          fill="url(#i)"
          d="M36.4 114.3l24.5-12.9 3 31.8c0 2 2.3 5.4 6.5 6-8.6 13.3-25.5 4.2-41 1.3 2.7-.4 5-2.8 6.2-6.2 2.4-7.7.8-20 .8-20z"
        />
        <circle cx="37.2" cy="109.5" r="6" fill="#9B653E" />
        <path
          fill="#9B653E"
          d="M61 129.5l-4 .5c-9.4 1.3-18-5.6-19.3-15.2l-2.2-18.3a7.7 7.7 0 016.5-8.7l23.3-3a4.2 4.2 0 014.8 3.7l3 25c1 7.8-4.4 15-12 16z"
        />
        <path
          fill="#FFF"
          d="M44.5 94.4c0 5.1-4.1 9.3-9.3 9.3s3-18.3 4.3-17.6c3 1.6 5 4.7 5 8.3z"
        />
        <path
          fill="#FFF"
          d="M62.2 89.9c-5-.4-10.4-2.9-15.4-2.4-7.8.6-11 4.9-11 4.9l.4-3.7c-3-6.8 3.6-10.2 10-9 8.9 1.5 6-2.7 9.7-3.4 4-.7 4.6 3.1 7.7 3 3.6-.2 3-5.5 8.2-5 5.3.7 9.2 16.8-9.6 15.6z"
        />
        <ellipse
          cx="51.1"
          cy="104.2"
          fill="#33322E"
          rx="1.5"
          ry="2.8"
          transform="rotate(-7.3 51 104.2)"
        />
        <radialGradient
          id="j"
          cx="5217.5"
          cy="-48.6"
          r="11.2"
          gradientTransform="matrix(-.9635 .1303 -.1014 -.7501 5079.4 -607.2)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#5a463a" />
          <stop offset="1" stopColor="#9b653e" />
        </radialGradient>
        <path
          fill="url(#j)"
          d="M71.4 119.8l-11.6 1.4-.8-6.9c0-.6.2-1.3.7-1.7l2.5-2.2c.6-.5.7-1.3.2-1.9l-2.9-3.4a5.7 5.7 0 01-1.3-3l-.8-6.5 12-1.6 2 25.8z"
        />
        <ellipse
          cx="64.6"
          cy="102.6"
          fill="#33322E"
          rx="1.5"
          ry="2.8"
          transform="rotate(-7.3 64.6 102.6)"
        />
        <path
          fill="#76452B"
          d="M53.8 115.5l1.8 1a9.7 9.7 0 005.7.3.5.5 0 01.5.7c-.4.8-1.2 1.4-2 1.7-1 .3-2 .4-2.8.2-1.8-.3-3.6-1.6-4-3.3a.5.5 0 01.7-.6z"
        />
      </g>
      <g>
        <path
          fill="#3B322F"
          d="M175.6 114c-.1-.3-1.7-5.7-2.8-7.8a25.9 25.9 0 00-18-14c-7.6-1.4-15 .8-20.8 5.4h-.1c-1.3 1-13.4 9.5-11.6 27.3v2.1c-.2 4.6-1.9 22.1-13.6 39.7-7.7 11.4-6 27.5 3.9 41.6a97.2 97.2 0 0054.4-22.5 96.2 96.2 0 0024.4-34c-6.3-11-13-22.1-15.8-37.7z"
        />
        <path
          fill="#8C8CC4"
          d="M186.3 162a40.5 40.5 0 00-28.1-10.3c-19.5 0-35.6 14.7-36.3 30.6-.2 5.2-1.4 17.1-2.5 26.5 28.6-4.9 53-22.5 67-46.8z"
        />
        <path
          fill="#BF8F68"
          d="M163.3 128c-4.2 2-15.3 10.8-15.3 10.8s3.3 6.3 3 10.2c-.3 3.1-7.7 5.7-7.7 5.7s6.6 5 12.7 4.2c8.1-1.1 8.2-3 17-4.8-.3-.1-4-2.2-5.3-4.8-2.3-4.4-2.9-11.3-4.4-21.3z"
        />
        <circle cx="132.4" cy="137.4" r="2.6" fill="#F8CA54" />
        <path
          fill="#BF8F68"
          d="M163.6 121.8c.8 11.9-8.2 22.1-16.7 22.3-8.5.3-17.4-7.1-18.4-19-1.4-15 7-22.6 15.5-22.8 8.5-.2 18.8 7.7 19.6 19.5z"
        />
        <ellipse
          cx="149.8"
          cy="123"
          fill="#3B322F"
          rx="1.5"
          ry="2.6"
          transform="rotate(-4.4 149.8 123)"
        />
        <radialGradient
          id="k"
          cx="12056.1"
          cy="3025.3"
          r="7.6"
          gradientTransform="matrix(-.9858 .1014 -.1514 -1.0539 12485.5 2094.4)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#9b653e" />
          <stop offset="1" stopColor="#bf8f68" stopOpacity="0" />
        </radialGradient>
        <path
          fill="url(#k)"
          d="M143.2 113.4v6.3c0 3.3-1.6 5.6-2.7 6.8-.7.7-1 2.4 0 3.4.5.6 2.6 1.7 2.7 3.2l.2 5.9-11.8.4-1.3-26h12.9z"
        />
        <path
          fill="#9B653E"
          d="M142.8 134.9l1.6-.4a15.9 15.9 0 002.7-.9l1.5-.7a.5.5 0 01.8.4c0 .8-.4 1.5-.9 2a4 4 0 01-1.9 1.3c-.7.2-1.5.3-2.2.1-.7-.1-1.4-.4-2-1a.5.5 0 01.3-.8z"
        />
        <path
          fill="#3B322F"
          d="M136.8 100.7s-2.5 12.1 9.3 14.1c10.6 1.8 14.8 3.6 17.5 7 4.6-4.6 4.5-15.9-2.4-20.8-13.4-9.7-24.4-.3-24.4-.3z"
        />
        <ellipse
          cx="136.6"
          cy="123.3"
          fill="#3B322F"
          rx="1.5"
          ry="2.6"
          transform="rotate(-6 136.6 123.3)"
        />
        <path
          fill="#BF8F68"
          d="M160.5 131l6-.9a4.4 4.4 0 003.7-5.2 4.9 4.9 0 00-5.5-4l-5.9.9 1.7 9.2z"
        />
        <circle cx="164.5" cy="132.7" r="2.6" fill="#F8CA54" />
      </g>
      <path
        fill="#D6CED7"
        d="M121.9 188.2c-.4-1-1.4-1.7-2.5-1.7H64a2 2 0 00-2 2.6l4.9 14a96.1 96.1 0 0061.4 3.6l-6.5-18.5z"
      />
      <g>
        <path
          fill="#FFF"
          d="M116 52.7h-15a10 10 0 01-10-10v-2.8a10 10 0 0110-10h15a10 10 0 0110 10v2.8a10 10 0 01-10 10z"
        />
        <g fill="#E1DFDD">
          <path d="M99.7 42.9h17.6v2.4H99.7zM99.7 37.3H112v2.4H99.7z" />
        </g>
      </g>
      <g>
        <path
          fill="#C8C6C4"
          d="M113.1 22.8h-15a10 10 0 01-10-10V10a10 10 0 0110-10h15a10 10 0 0110 10v2.8a10 10 0 01-10 10z"
        />
        <circle cx="98.8" cy="11.5" r="1.8" fill="#EDEBE9" />
        <circle cx="105.6" cy="11.5" r="1.8" fill="#EDEBE9" />
        <circle cx="112.5" cy="11.5" r="1.8" fill="#EDEBE9" />
        <path
          fill="#C8C6C4"
          d="M100.4 22.8c-.8 2-2.7 3.7-4.9 3.7-.4 0-.9 0-1.3-.2a5.1 5.1 0 002-3.5"
        />
      </g>
    </svg>
  ),
  [TeamsTheme.HighContrast]: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 206.1 210.2">
      <defs />
      <path
        stroke="#FFF"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        d="M103 210.2h0c-53 0-96-43-96-96v0c0-53 43-96 96-96h0c53 0 96 43 96 96v0c0 53-43 96-96 96z"
      />
      <path
        fill="#FFF"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        d="M66.3 57l2.8-.2A21 21 0 0089.3 35l-.1-3.7A21 21 0 0067.3 11l-2.7.1A21 21 0 0044.3 33l.1 3.7a21 21 0 0021.9 20.2z"
      />
      <path
        fill="#FFF"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        d="M89.2 32.8s-.4 6.3 3.5 10.6c5 5.7 8.7 1.5 13 8.2 3 5-1 8.2 2.4 15.8 3 6.5 13.3 3.8 15 13 2.3 12.1-10.2 20-11.6 26.4-1.4 6.3 0 11 1.2 21.2 2.3 17.7-16.2 19.4-24.2 15.6-8-3.9-50 1.5-52.3 1.5-9.8-.4-41.2-7-35.5-28 1.8-6.8 10.7-11.3 5.5-20.5-3-5.2-4.9-11.6-1-17.3s12.8-6 16-12.3c3.4-6.4 0-11.6 1.8-16.6 2.2-6 6.6-6.1 12-9.1 9.3-5.1 9.9-14 9.9-14"
      />
      <path d="M53.3 45.8c-2.7 5.4-7.2 4.8-8.6 10.3-.4 1.6 0 3 .8 4.5 3.5 6.8 3.8 10.4 1 14.2-2.6 3.3-7.2 5-9.5 7.3h31.6l-10-39.5h-4.9l-.4 3.2z" />
      <path
        fill="#FFF"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        d="M37.2 83.3c7 19.3 2.5 58.6 2.7 59 .2.3 55.7 5.5 55.7 5.5l1.3-18.7c11 3.7 18.1-10.9 11.6-30.2C98.8 70.3 77 66.6 77 66.6l-20.5-.3s-3.6 1-8.1 3.4"
      />
      <path
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        d="M12.1 138.4c.2 2.7 1.2 5.4 3.6 7.7 9.4 9.3 25.4 9.7 24.9 5.8-1.2-10-4.6-26.8-1.7-31 3.9-5.7-4.6-9-4-13.2.6-4.2 10-5.2 10.4-8.8.9-7.2-10-9.9-9.8-14s7.5-5.6 11-10.1c2.8-3.8 2.5-7.4-1-14.2a5.8 5.8 0 01-.8-4.5c1.4-5.5 5.9-5 8.6-10.3"
      />
      <path
        fill="#FFF"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        d="M60 48.7s.5 9.6-1.1 14.5c-.7 2-2.5 3.1-3.8 3.6 0 0 9.3 7 22-.2 0 0-4.2-1-5.3-3.7-1.2-3.1 0-10 0-10l-11.9-4.2zM82.8 37.4c2-.1 3.8 1.5 3.8 3.5h0c.1 2-1.5 3.8-3.5 3.9"
      />
      <path
        fill="#FFF"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        d="M53.6 38.5l.2 4.9c.3 8 7 14.3 15 14h0c8.1-.3 14.4-7 14-15l-.1-5"
      />
      <path
        fill="#FFF"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        d="M55.6 38.3l-2.6.2c-2 0-3.6 1.8-3.5 3.8h0c0 2 1.8 3.7 3.8 3.6h1.2M70.2 48c0-1.6 1.7-2.3 2.3-3 .3-.4.3-.8 0-1.1-.8-1-2.2-2.3-2.7-6.6"
      />
      <g
        fill="#FFF"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
      >
        <path d="M49.2 37.5a10.4 10.4 0 009.4-.2M58.6 37.3c.9-.5 1.7-1.1 2.5-1.9 2-2 3-5.5 3-8.2l9-.3c.3 2.7 1.5 6.1 3.5 8 2.1 1.7 4.5 2.6 7.3 2.5 1.9-.1 3.6-.6 5.1-1.6" />
      </g>
      <path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        d="M68.6 27.1l4.5-.1h0c0-1.2-1-2.2-2.2-2.1h-.2c-1.2 0-2.1 1-2 2.2h0zM64 27.3l4.6-.2h0c0-1.2-1-2.1-2.3-2h-.1C65 25 64 26 64 27.2h0z"
      />
      <path d="M71.5 50.4a3 3 0 01-1.4.9c-.6.2-1.2.2-1.8 0a3 3 0 01-1.7-1c-.4-.4-.6-1-.6-1.6a.4.4 0 01.6-.3l1.2.7 1 .3c.6.2 1.4.2 2.4.3a.4.4 0 01.3.7z" />
      <g>
        <path
          fill="#FFF"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          d="M140.1 58a7.2 7.2 0 004.8-.5 5 5 0 001.2-.8l.1-.1a.7.7 0 011 .7c-.1.7-1.1 2.7-3.3 3.1a5 5 0 01-4.3-1.5.5.5 0 01.5-.9h0z"
        />
        <ellipse
          cx="148.3"
          cy="49"
          fill="#FFF"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          rx="2.4"
          ry="1.4"
          transform="rotate(-89.3 148.3 49)"
        />
        <ellipse
          cx="135"
          cy="49"
          fill="#FFF"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          rx="2.4"
          ry="1.4"
          transform="rotate(-89.3 135 49)"
        />
        <path
          fill="#FFF"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          d="M199 114.2v0c0-8.5-1-16.8-3.1-24.6a78 78 0 00-46-12.4h-1c-53.6-1.8-65 36.8-67.2 74.4l-.8 15.6a69.9 69.9 0 0010 42.2c4 .5 8 .8 12.2.8h0c53 0 96-43 96-96z"
        />
        <path
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          d="M128.4 83l4.5-9 30.5-4.6s-.1 4.5 2.5 6.4l-37.5 7.1z"
        />
        <path
          fill="#FFF"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          d="M140.7 89.8L133 73.9l24.9-4.5"
        />
        <path
          fill="#FFF"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          d="M140.7 89.8s-1.5-4.4-2.2-10.5c-.8-6.4 0-39 0-39l28.3-1 1.3 35.6"
        />
        <path
          fill="#FFF"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          d="M169.2 74l-20.4-.1-8.1 15.9"
        />
        <path
          fill="#FFF"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          d="M151.4 83.9l-2.6-10 21.3-2s.8 6.2 4.2 8l-22.9 4zM166.4 40.6l-.3 17.5c0 4.7-4 13.8-14.6 13.7l-10.8-.2c-6.2-.1-11.1-4-11-8.8l.2-22.6c0-4.8 5.2-8.6 11.3-8.5l14.1.1c6.2.1 11.1 4 11 8.8zM129.8 56.6v.1h0zM151.4 60.1a13.5 13.5 0 11-21.6-11"
        />
        <circle
          cx="167.9"
          cy="50.4"
          r="5.5"
          fill="#FFF"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
        />
        <path
          fill="#FFF"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          d="M166.4 37.7l-.2 20.4a15.7 15.7 0 01-15.8 15.4H138c-7.4-.1-13.5-6.1-13.6-13.5 0-2.2.5-4.2 1.4-6l27.6.3c3 0 5.4-2.3 5.5-5.3l.1-11.4h7.4z"
        />
        <path
          fill="#FFF"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          d="M166.3 45h1.6l-.1-5.1c0-8-4.6-12.6-12.2-12.6h-1c-1.3 6.8.6 11.9 4.3 14.8"
        />
        <path
          fill="#FFF"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          d="M155 34.8l-12.6-.2H132.5s-2.6-1.3-2.3-5a11.4 11.4 0 012.4-6.2s.4.8 1.4 1.7c1 .8 2.4 1.6 4.6 1.8a65 65 0 007.6.3h.2l9.2.1"
        />
        <path d="M137.6 50c0 .3-.3.3-.5.2h-.1c-.7-.5-1.2-.8-1.8-.8-.5-.1-1 0-1.6.5a.4.4 0 01-.7-.2c0-.6.3-1.1.8-1.5.5-.4 1.1-.5 1.7-.5 1.2.2 2.1 1 2.3 2v.4z" />
        <path d="M134.5 55.1a7.1 7.1 0 11.2-14.3 7.1 7.1 0 017 7.3c-.1 3.9-3.3 7-7.2 7zm0-12.7a5.6 5.6 0 00-5.6 5.5 5.6 5.6 0 105.7-5.5h-.1z" />
        <path
          fill="#FFF"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          d="M144.6 52.7a4 4 0 01-3.4 2h0a4 4 0 01-4-4.1v0a4 4 0 014-4h0l1.5.4"
        />
        <path d="M149 55.3c-4 0-7.1-3.3-7-7.2a7.1 7.1 0 017.1-7 7.1 7.1 0 017.1 7.2c0 3.9-3.2 7-7.1 7zm0-12.7a5.6 5.6 0 00-5.5 5.5 5.6 5.6 0 105.6-5.5z" />
        <path d="M155.5 49v-1.6l10.8.2V49zM150.5 50c-.1.2-.4.3-.6.1-.7-.4-1.3-.8-1.8-.8-.6-.1-1 0-1.6.5h-.1a.4.4 0 01-.6-.2c0-.6.3-1.1.8-1.5.5-.4 1.1-.5 1.7-.4 1.2.1 2 1 2.2 2v.3zM143.5 63a5 5 0 01-4.6-3V59c.3-.4.6-.7 1-.7l7-1.3a1.4 1.4 0 011.2.4c.2.3.4.6.3 1a5 5 0 01-5 4.7z" />
        <path d="M147 57.4c.6 0 1 .4 1 .9a4.5 4.5 0 01-8.6 1.5c-.2-.5.1-1 .6-1.1l7-1.3m0-1h-.2l-7 1.3a1.9 1.9 0 00-1.3 2.5 5.5 5.5 0 0010.4-1.9c0-.5-.1-1-.5-1.3-.3-.4-.8-.6-1.3-.6z" />
        <g>
          <path
            fill="#FFF"
            d="M142.2 60c-1.2 0-2.2-.2-3-.7a.5.5 0 010-.8c.3-.2.5-.3.8-.3l6.8-1.3h.3c.3 0 .7.1.9.4a.5.5 0 010 .7 9.3 9.3 0 01-5.8 2z"
          />
          <path d="M147 57.4c.3 0 .5 0 .6.2-.7.7-1.9 1.3-3.2 1.7l-2.2.3c-1 0-2-.3-2.6-.7l.4-.2 7-1.3m0-1h-.2l-7 1.3a2 2 0 00-.9.4 1 1 0 000 1.6c.9.6 2 .9 3.3.9a9.8 9.8 0 006.1-2.2 1 1 0 000-1.5c-.3-.3-.7-.5-1.2-.5z" />
        </g>
      </g>
      <g>
        <path
          fill="#FFF"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          d="M131.3 96.1l-32.8-8.7-11.4 40.7 32.7 8.7z"
        />
      </g>
      <g>
        <path
          stroke="#FFF"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          d="M112.3 100.7l-33.9 2 3.5 41.1 33.8-2.1z"
        />
      </g>
      <g>
        <path
          fill="#FFF"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          d="M68 118.8l32.8-8.7 11.9 44.9-32.8 8.7z"
        />
        <path d="M75.6 123.7l11.1-3 .4 1.6-11.1 3zM89.2 119.6l8-2.1 2.2 8.2-8 2.1zM77.2 129l11-2.8.6 2-11 2.8zM79 134.8l21.3-5.7.5 2-21.4 5.6zM80.6 140.4l21.4-5.7.5 2-21.4 5.6zM82.3 146l21.4-5.7.5 2-21.4 5.6z" />
      </g>
      <g>
        <path
          fill="#FFF"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          d="M66.2 139H36.7s-11.9 1.3-23.5 9a96 96 0 0089.9 62.2h0c2 0 4.2 0 6.2-.2l1.4-24c1.4-25.5-19-47-44.5-47z"
        />
        <path d="M49.5 194.8c-5.4-27-11.1-45.7-20.2-54.2-2.3.7-5.1 1.6-8 3 8.4 4.3 14.3 20.8 19.5 44.5a98 98 0 008.7 6.7z" />
        <path
          fill="#FFF"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          d="M43.8 160.8s1.7-4.3-2.7-4.1l-7.5.4c-1.1.1-2 .9-2.4 2 0 0-3 7.3-5.4 12 2.3 3.2 4.9 6.3 7.6 9.1 1.4-.9 3-1.9 3.7-2.6 2.5-2.4 3.5-8.9 3.5-8.9l3.4-.2c1.3.2 2.5-1 1.9-2.8l-2-4.9z"
        />
        <path d="M35.8 109s-3.2-8-4-11.9c-1.3-5.3 1.7-8.8 5.4-9.2l23.1-3a6.9 6.9 0 017.7 6l1.8 13.8" />
        <path
          fill="#FFF"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          d="M60.9 101.4l3 31.8c0 2 2.3 5.4 6.5 6-8.6 13.3-25.5 4.2-41 1.3 2.7-.4 5-2.8 6.2-6.2 2.4-7.7.8-20 .8-20l-.4-11.7 24.9-1.2zM37.2 115.5a6 6 0 010-12"
        />
        <path
          fill="#FFF"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          d="M39.4 88l26-3.2a4.2 4.2 0 014.7 3.7l3 25c1 7.8-4.4 15-12 16l-4 .5a17.3 17.3 0 01-19.3-14.5"
        />
        <path d="M39.5 86.1a9.3 9.3 0 01-4.3 17.6M36 88.1c-2.3-6.4 4-9.5 10.2-8.4 8.9 1.5 6-2.7 9.7-3.4 4-.7 4.6 3.1 7.7 3 3.6-.2 3-5.5 8.2-5 5.3.7 9.2 16.8-9.6 15.6-5-.4-10.2-2.6-15.2-2.1-1.7.1-3.2.4-4.5.8l-6.5-.5z" />
        <ellipse
          cx="51.1"
          cy="104.2"
          rx="1.5"
          ry="2.8"
          transform="rotate(-7.3 51 104.2)"
        />
        <path
          fill="#FFF"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          d="M59.7 112.6l2.5-2.2c.6-.5.7-1.3.2-1.9l-2.9-3.4a5.7 5.7 0 01-1.3-3"
        />
        <ellipse
          cx="64.6"
          cy="102.6"
          rx="1.5"
          ry="2.8"
          transform="rotate(-7.3 64.6 102.6)"
        />
        <path d="M53.8 115.5l1.8 1a9.7 9.7 0 005.7.3.5.5 0 01.5.7c-.4.8-1.2 1.4-2 1.7-1 .3-2 .4-2.8.2-1.8-.3-3.6-1.6-4-3.3a.5.5 0 01.7-.6z" />
      </g>
      <g>
        <path d="M175.6 114c-.1-.3-1.7-5.7-2.8-7.8a25.9 25.9 0 00-18-14c-7.6-1.4-15 .8-20.8 5.4h-.1c-1.3 1-13.4 9.5-11.6 27.3v2.1c-.2 4.6-1.9 22.1-13.6 39.7-7.7 11.4-6 27.5 3.9 41.6a97.2 97.2 0 0054.4-22.5 96.2 96.2 0 0024.4-34c-6.3-11-13-22.1-15.8-37.7z" />
        <path
          fill="#FFF"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          d="M186.3 162a40.5 40.5 0 00-28.1-10.3c-19.5 0-35.6 14.7-36.3 30.6-.2 5.2-1.4 17.1-2.5 26.5 28.6-4.9 53-22.5 67-46.8z"
        />
        <path
          fill="#FFF"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          d="M163.3 128c-4.2 2-15.3 10.8-15.3 10.8s3.3 6.3 3 10.2c-.3 3.1-7.7 5.7-7.7 5.7s6.6 5 12.7 4.2c8.1-1.1 8.2-3 17-4.8-.3-.1-4-2.2-5.3-4.8-2.3-4.4-2.9-11.3-4.4-21.3z"
        />
        <circle
          cx="132.4"
          cy="137.4"
          r="2.6"
          fill="#FFF"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
        />
        <path
          fill="#FFF"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          d="M163.6 121.8c.8 11.9-8.2 22.1-16.7 22.3s-17.4-7.1-18.4-19c-1-11.2 3.4-18.2 9.2-21.2"
        />
        <ellipse
          cx="149.8"
          cy="123"
          rx="1.5"
          ry="2.6"
          transform="rotate(-4.4 149.8 123)"
        />
        <path
          fill="#FFF"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          d="M143.2 119.7c0 3.3-1.6 5.6-2.7 6.8-.7.7-1 2.4 0 3.4.4.4 1.8 1.3 2.4 2.4"
        />
        <path d="M142.8 134.9l1.6-.4a15.9 15.9 0 002.7-.9l1.5-.7a.5.5 0 01.8.4c0 .8-.4 1.5-.9 2a4 4 0 01-1.9 1.3c-.7.2-1.5.3-2.2.1-.7-.1-1.4-.4-2-1a.5.5 0 01.3-.8zM136.8 100.7s-2.5 12.1 9.3 14.1c10.6 1.8 14.8 3.6 17.5 7" />
        <ellipse
          cx="136.6"
          cy="123.3"
          rx="1.5"
          ry="2.6"
          transform="rotate(-6 136.6 123.3)"
        />
        <path
          fill="#FFF"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          d="M162 130.7l4.4-.6a4.4 4.4 0 003.8-5.2h0a4.9 4.9 0 00-5.5-4l-1.7.3"
        />
        <circle
          cx="164.5"
          cy="132.7"
          r="2.6"
          fill="#FFF"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
        />
      </g>
      <path
        fill="#FFF"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        d="M121.9 188.2c-.4-1-1.4-1.7-2.5-1.7H64a2 2 0 00-2 2.6l4.9 14c11.1 4.6 23.3 7.1 36 7.1h0c8.8 0 17.3-1.2 25.4-3.4l-6.5-18.6z"
      />
      <g>
        <path
          fill="#FFF"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          d="M116 52.7h-15a10 10 0 01-10-10v-2.8a10 10 0 0110-10h15a10 10 0 0110 10v2.8a10 10 0 01-10 10z"
        />
        <path d="M99.7 42.9h17.6v2.4H99.7zM99.7 37.3H112v2.4H99.7z" />
      </g>
      <path
        fill="#FFF"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        d="M113.1 0h-15a10 10 0 00-10 10v2.8c0 5 3.5 9 8.2 9.8v.2c-.2 1.4-1 2.7-2 3.5l1.2.2c2.2 0 4-1.8 4.9-3.7H113a10 10 0 0010-10V10a10 10 0 00-10-10z"
      />
      <g>
        <circle cx="98.8" cy="11.5" r="1.8" />
        <circle cx="105.6" cy="11.5" r="1.8" />
        <circle cx="112.5" cy="11.5" r="1.8" />
      </g>
      <ellipse
        cx="75.7"
        cy="39.3"
        rx="1.2"
        ry="2.4"
        transform="rotate(-2.1 75.7 39.3)"
      />
      <ellipse
        cx="63.4"
        cy="39.8"
        rx="1.2"
        ry="2.4"
        transform="rotate(-2.1 63.4 39.8)"
      />
    </svg>
  ),
};

export default Welcome;
