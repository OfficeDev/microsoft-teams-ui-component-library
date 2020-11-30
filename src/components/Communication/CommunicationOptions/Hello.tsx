import React from "react";
import { ILayout, Layout } from "../Layout";
import { TeamsTheme } from "../../../themes";

const DEFAULT_STRINGS = {
  title: `Welcome to your homepage, {{userName}}`,
  desc: `This is where you will find all of your boards that organize your photos, files, and tasks across your different teams.`,
  actions: {
    primary: {
      label: "Create a board",
      action: () => alert("Create a board action called"),
    },
    secondary: {
      label: "Find an existing board",
      action: () => alert("Find an existing board action called"),
    },
  },
};

const Hello = ({ theme, values }: { theme: TeamsTheme; values?: ILayout }) => {
  let config: ILayout = DEFAULT_STRINGS;
  if (values) {
    config = { ...config, ...values };
  }
  return <Layout image={illustrations[theme]} {...config} />;
};

const illustrations = {
  [TeamsTheme.Default]: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 193 219">
      <defs />
      <defs>
        <linearGradient id="a" x1="44.1%" x2="64.9%" y1="73%" y2="42.5%">
          <stop offset="0%" stopColor="#B3AFAB" />
          <stop offset="2.6%" stopColor="#B8B5B1" />
          <stop offset="17.7%" stopColor="#D2CFCD" />
          <stop offset="33.9%" stopColor="#E6E5E3" />
          <stop offset="51.5%" stopColor="#F4F3F3" />
          <stop offset="71.7%" stopColor="#FCFCFC" />
          <stop offset="100%" stopColor="#FFF" />
        </linearGradient>
      </defs>
      <g fill="none" fillRule="evenodd">
        <path
          fill="#8B8CC4"
          fillRule="nonzero"
          d="M132.5 49.9l-32.2 9.9-3.1 19.7L144 87z"
        />
        <path
          fill="#F3F2F1"
          fillRule="nonzero"
          d="M7.4 123.8l22-95.1L164.8 60l-22 95.2z"
          opacity=".5"
        />
        <g fillRule="nonzero">
          <path fill="#C3F2F4" d="M88.3 76L108.4.7 192.6 23l-20.1 75.5z" />
          <path fill="#FFF" d="M95.7 72l17-64L185 27.3l-17 64z" />
          <path
            fill="#F8F8FB"
            d="M95.7 72l17-64L185 27.3l-17 64z"
            opacity=".5"
          />
          <path
            fill="#C3F2F4"
            d="M143.4 23.1l-5.3 2.8a9.4 9.4 0 00-8.2-2.1l-3.9-5.1s-8.1 31.1-12.8 39.7a78.2 78.2 0 00-7.7 22.2L144.2 91c1-3.1 2.4-8.1 2.8-12.4 1.1-11.1-4.9-21.3-6.2-27.7-1.3-6.4 2.6-27.8 2.6-27.8z"
          />
        </g>
        <path
          fill="#C3F2F4"
          fillRule="nonzero"
          d="M166.5 30.4c-3.9.1-11.6 3.2-13.2 14.1-.6 3.4.3 7.1 1.4 10.9 2.3 8.6 5.2 19.3-7.3 36.4l5.8 1.5c12.6-18.2 9.4-30.3 7-39.4-.9-3.4-1.7-6.3-1.2-8.5 1.4-9.2 7.8-9.4 7.9-9.5 1.5 0 2.8-1.3 2.7-2.9-.3-1.5-1.6-2.7-3.1-2.6z"
        />
        <path d="M95.7 72l17-64L185 27.3l-17 64z" />
        <g transform="translate(0 52)">
          <path
            fill="#E2E2F6"
            fillRule="nonzero"
            d="M0 33.7L135 .4l23.4 94.8-135 33.3z"
          />
          <path
            fill="url(#a)"
            fillRule="nonzero"
            d="M158.4 95.3l-4.8-19.4-46.8-33.2c-1.2-.9-3-.4-3.5 1.1l-27.8 72 82.9-20.5z"
          />
          <path
            fill="#FFF"
            fillRule="nonzero"
            d="M136.9 95.4L75.8 57.9c-1.5-.9-3.6-.3-4.3 1.3l-27 60.3 92.4-24.1z"
          />
          <circle cx="45" cy="55.8" r="10.9" fill="#FFF" fillRule="nonzero" />
          <g fill="#28C2D1" fillRule="nonzero">
            <path d="M34.3 84.5l-2.1 14.4 3.5 1-3.9 1.1-3.3 22.3 32-7.9zM131.5 73.2l-4.5 27.4 25.5-6.3-21-21.1z" />
            <path d="M51.1 93.4l-8.1 29 28.7-7.1z" />
          </g>
          <path d="M0 33.7L135 .4l23.4 94.8-135 33.3z" />
          <path
            fill="#BDBDE6"
            fillRule="nonzero"
            d="M127.6 12.6l18.6 75.3-115.4 28.5-18.6-75.3 115.4-28.5M135 .4L0 33.7l23.4 94.9 135-33.3L135 .4z"
          />
        </g>
        <g fillRule="nonzero">
          <path
            fill="#8B8CC7"
            d="M73.7 176.1c-.6 22 17.4 30.1 17.5 33l.5 9.6 4.7-4.4a9.6 9.6 0 018.7-2.4c13.5 2.9 50.6 7.6 56.6-27.6 2.9-17.2-8.2-36.6-37-42.1-29.7-5.8-50.4 9.2-51 33.9z"
          />
          <path
            fill="#FFF"
            d="M135.2 163.2a8.8 8.8 0 00-2.1-2.2c-.9-.6-1.8-1-2.8-1.3a8.1 8.1 0 00-6 1c-.9.6-1.7 1.3-2.5 2.2a54.3 54.3 0 00-4.2 5.3l-4 5.4-1.1 1.5-2.2 3-.9 1.6-.4 1v.9l.3.9.7.7c.6.4 1.2.6 1.8.5.7-.1 1.2-.5 1.7-1l12.3-16.6.9-.9 1.2-.5h1.2l1.1.5c.3.2.6.5.8.9.2.3.4.7.4 1.1v1.2c-.1.4-.2.8-.5 1.1l-14.2 19.3a7.7 7.7 0 01-4.5 2.8c-.9.2-1.8.1-2.7-.1-.9-.2-1.7-.6-2.4-1.1a6.6 6.6 0 01-1.8-1.9c-.5-.8-.8-1.6-1-2.5-.1-.9-.1-1.8.1-2.7.2-.9.6-1.7 1.1-2.4l9.6-13.7.4-.9v-1l-.3-.9-.7-.7-.9-.4h-1l-.9.4-.7.7-9.6 13.7a11.9 11.9 0 0011.4 18.5c1.5-.3 3-.8 4.3-1.6 1.3-.8 2.5-1.9 3.4-3.1l14.3-19.4c.6-.8 1.1-1.8 1.3-2.8.2-1.1.2-2.1.1-3.2 0-1.4-.4-2.4-1-3.3z"
          />
        </g>
      </g>
    </svg>
  ),
  [TeamsTheme.Dark]: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 193 219">
      <defs />
      <defs>
        <linearGradient id="a" x1="44.1%" x2="64.9%" y1="73%" y2="42.5%">
          <stop offset="0%" stopColor="#B3AFAB" />
          <stop offset="2.6%" stopColor="#B8B5B1" />
          <stop offset="17.7%" stopColor="#D2CFCD" />
          <stop offset="33.9%" stopColor="#E6E5E3" />
          <stop offset="51.5%" stopColor="#F4F3F3" />
          <stop offset="71.7%" stopColor="#FCFCFC" />
          <stop offset="100%" stopColor="#FFF" />
        </linearGradient>
      </defs>
      <g fill="none" fillRule="evenodd">
        <path
          fill="#8B8CC4"
          fillRule="nonzero"
          d="M132.5 49.9l-32.2 9.9-3.1 19.7L144 87z"
        />
        <path
          fill="#F3F2F1"
          fillRule="nonzero"
          d="M7.4 123.8l22-95.1L164.8 60l-22 95.2z"
          opacity=".5"
        />
        <g fillRule="nonzero">
          <path fill="#C3F2F4" d="M88.3 76L108.4.7 192.6 23l-20.1 75.5z" />
          <path fill="#FFF" d="M95.7 72l17-64L185 27.3l-17 64z" />
          <path
            fill="#F8F8FB"
            d="M95.7 72l17-64L185 27.3l-17 64z"
            opacity=".5"
          />
          <path
            fill="#C3F2F4"
            d="M143.4 23.1l-5.3 2.8a9.4 9.4 0 00-8.2-2.1l-3.9-5.1s-8.1 31.1-12.8 39.7a78.2 78.2 0 00-7.7 22.2L144.2 91c1-3.1 2.4-8.1 2.8-12.4 1.1-11.1-4.9-21.3-6.2-27.7a134 134 0 012.6-27.8z"
          />
        </g>
        <path
          fill="#C3F2F4"
          fillRule="nonzero"
          d="M166.5 30.4c-3.9.1-11.6 3.2-13.2 14.1-.6 3.4.3 7.1 1.4 10.9 2.3 8.6 5.2 19.3-7.3 36.4l5.8 1.5c12.6-18.2 9.4-30.3 7-39.4-.9-3.4-1.7-6.3-1.2-8.5 1.4-9.2 7.8-9.4 7.9-9.5 1.5 0 2.8-1.3 2.7-2.9-.3-1.5-1.6-2.7-3.1-2.6z"
        />
        <path d="M95.7 72l17-64L185 27.3l-17 64z" />
        <g transform="translate(0 52)">
          <path
            fill="#E2E2F6"
            fillRule="nonzero"
            d="M0 33.7L135 .4l23.4 94.8-135 33.3z"
          />
          <path
            fill="url(#a)"
            fillRule="nonzero"
            d="M158.4 95.3l-4.8-19.4-46.8-33.2c-1.2-.9-3-.4-3.5 1.1l-27.8 72 82.9-20.5z"
          />
          <path
            fill="#FFF"
            fillRule="nonzero"
            d="M136.9 95.4L75.8 57.9c-1.5-.9-3.6-.3-4.3 1.3l-27 60.3 92.4-24.1z"
          />
          <circle cx="45" cy="55.8" r="10.9" fill="#FFF" fillRule="nonzero" />
          <g fill="#28C2D1" fillRule="nonzero">
            <path d="M34.3 84.5l-2.1 14.4 3.5 1-3.9 1.1-3.3 22.3 32-7.9zM131.5 73.2l-4.5 27.4 25.5-6.3-21-21.1z" />
            <path d="M51.1 93.4l-8.1 29 28.7-7.1z" />
          </g>
          <path d="M0 33.7L135 .4l23.4 94.8-135 33.3z" />
          <path
            fill="#BDBDE6"
            fillRule="nonzero"
            d="M127.6 12.6l18.6 75.3-115.4 28.5-18.6-75.3 115.4-28.5M135 .4L0 33.7l23.4 94.9 135-33.3L135 .4z"
          />
        </g>
        <g fillRule="nonzero">
          <path
            fill="#8B8CC7"
            d="M73.7 176.1c-.6 22 17.4 30.1 17.5 33l.5 9.6 4.7-4.4a9.6 9.6 0 018.7-2.4c13.5 2.9 50.6 7.6 56.6-27.6 2.9-17.2-8.2-36.6-37-42.1-29.7-5.8-50.4 9.2-51 33.9z"
          />
          <path
            fill="#FFF"
            d="M135.2 163.2a8.8 8.8 0 00-2.1-2.2c-.9-.6-1.8-1-2.8-1.3a8.1 8.1 0 00-6 1c-.9.6-1.7 1.3-2.5 2.2a54.3 54.3 0 00-4.2 5.3l-4 5.4-1.1 1.5-2.2 3-.9 1.6-.4 1v.9l.3.9.7.7c.6.4 1.2.6 1.8.5.7-.1 1.2-.5 1.7-1l12.3-16.6.9-.9 1.2-.5h1.2l1.1.5c.3.2.6.5.8.9.2.3.4.7.4 1.1v1.2c-.1.4-.2.8-.5 1.1l-14.2 19.3a7.7 7.7 0 01-4.5 2.8c-.9.2-1.8.1-2.7-.1-.9-.2-1.7-.6-2.4-1.1a6.6 6.6 0 01-1.8-1.9c-.5-.8-.8-1.6-1-2.5-.1-.9-.1-1.8.1-2.7.2-.9.6-1.7 1.1-2.4l9.6-13.7.4-.9v-1l-.3-.9-.7-.7-.9-.4h-1l-.9.4-.7.7-9.6 13.7a11.9 11.9 0 0011.4 18.5c1.5-.3 3-.8 4.3-1.6 1.3-.8 2.5-1.9 3.4-3.1l14.3-19.4c.6-.8 1.1-1.8 1.3-2.8.2-1.1.2-2.1.1-3.2 0-1.4-.4-2.4-1-3.3z"
          />
        </g>
      </g>
    </svg>
  ),
  [TeamsTheme.HighContrast]: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 195 221">
      <defs />
      <g fill="none" fillRule="nonzero">
        <path
          fill="#FFF"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M133.5 50.9l-32.2 9.9-3.1 19.7L145 88z"
        />
        <path
          fill="#000"
          stroke="#FFF"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M8.4 124.8l22-95.1L165.8 61l-22 95.2z"
        />
        <path
          fill="#FFF"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M89.3 77l20.1-75.4L193.6 24l-20.1 75.5z"
        />
        <path fill="#000" d="M96.7 73l17-64L186 28.3l-17 64z" />
        <path
          fill="#FFF"
          d="M144.4 24.1l-5.3 2.8a9.4 9.4 0 00-8.2-2.1l-3.9-5.1s-8.1 31.1-12.8 39.7a78.2 78.2 0 00-7.7 22.2l39.8 6.7s1.4-5.8 1.7-8.7c1.1-11.1-4.9-21.3-6.2-27.7-1.3-6.4 2.6-27.8 2.6-27.8z"
        />
        <g fill="#FFF">
          <path d="M156.5 90.8c9.9-16.3 7-27.4 4.7-35.9-.9-3.4-1.7-6.3-1.2-8.5 1.4-9.2 7.8-9.4 7.9-9.5 1.5 0 2.8-1.3 2.7-2.9-.3-1.5-1.6-2.7-3.1-2.6-3.9.1-11.6 3.2-13.2 14.1-.6 3.4.3 7.1 1.4 10.9 2.1 8 4.7 17.6-4.6 32.5l5.4 1.9z" />
        </g>
        <g transform="translate(1 53)">
          <path fill="#000" d="M12.2 41l115.5-28.4 18.6 75.3-115.5 28.5z" />
          <path
            fill="#000"
            stroke="#FFF"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M146.2 87.9l-5.2-21-34.2-24.2c-1.2-.9-3-.4-3.5 1.1L80 104.3l66.2-16.4z"
          />
          <path
            fill="#000"
            stroke="#FFF"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M136.9 95.4L75.8 57.9c-1.5-.9-3.6-.3-4.3 1.3l-27 60.3 92.4-24.1z"
          />
          <circle
            cx="43"
            cy="57.3"
            r="10.9"
            fill="#FFF"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <g
            fill="#FFF"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          >
            <path d="M34.3 84.5l-2.1 14.4 3.5 1-3.9 1.1-3.3 22.3 32-7.9zM131.5 73.2l-4.5 27.4 25.5-6.3-21-21.1z" />
            <path d="M51.1 93.4l-8.1 29 28.7-7.1z" />
            <path d="M135 .4L0 33.7l23.4 94.9 135-33.3L135 .4zM12.2 41.1l115.4-28.5 18.6 75.3-115.4 28.5-18.6-75.3z" />
          </g>
        </g>
        <g>
          <path
            fill="#FFF"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M74.7 177.1c-.6 22 17.4 30.1 17.5 33l.5 9.6 4.7-4.4a9.6 9.6 0 018.7-2.4c13.5 2.9 50.6 7.6 56.6-27.6 2.9-17.2-8.2-36.6-37-42.1-29.7-5.8-50.4 9.2-51 33.9z"
          />
          <path
            fill="#000"
            d="M136.2 164.2a8.8 8.8 0 00-2.1-2.2c-.9-.6-1.8-1-2.8-1.3a8.1 8.1 0 00-6 1c-.9.6-1.7 1.3-2.5 2.2a54.3 54.3 0 00-4.2 5.3l-4 5.4-1.1 1.5-2.2 3-.9 1.6-.4 1v.9l.3.9.7.7c.6.4 1.2.6 1.8.5.7-.1 1.2-.5 1.7-1l12.3-16.6.9-.9 1.2-.5h1.2l1.1.5c.3.2.6.5.8.9.2.3.4.7.4 1.1v1.2c-.1.4-.2.8-.5 1.1l-14.2 19.3a7.7 7.7 0 01-4.5 2.8c-.9.2-1.8.1-2.7-.1-.9-.2-1.7-.6-2.4-1.1a6.6 6.6 0 01-1.8-1.9c-.5-.8-.8-1.6-1-2.5-.1-.9-.1-1.8.1-2.7.2-.9.6-1.7 1.1-2.4l9.6-13.7.4-.9v-1l-.3-.9-.7-.7-.9-.4h-1l-.9.4-.7.7-9.6 13.7a11.9 11.9 0 0011.4 18.5c1.5-.3 3-.8 4.3-1.6 1.3-.8 2.5-1.9 3.4-3.1l14.3-19.4c.6-.8 1.1-1.8 1.3-2.8.2-1.1.2-2.1.1-3.2 0-1.4-.4-2.4-1-3.3z"
          />
        </g>
      </g>
    </svg>
  ),
};

export default Hello;
