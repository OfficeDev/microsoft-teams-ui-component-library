import React from "react";

export interface HelloWorldProps {
  name: string;
}

export const HelloWorld: React.FC<HelloWorldProps> = (
  props: HelloWorldProps
) => <div className="hello">Hello World {props.name}</div>;
