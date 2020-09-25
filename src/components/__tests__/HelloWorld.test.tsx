import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { HelloWorld } from "../HelloWorld";

let container: HTMLDivElement;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
});

it("can render into a container", () => {
  // Test first render and componentDidMount
  act(() => {
    ReactDOM.render(<HelloWorld name="hello" />, container);
  });

  const helloElement = container.querySelector(".hello");

  expect(helloElement?.tagName).toBe("DIV");
});
