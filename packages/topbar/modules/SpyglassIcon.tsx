import * as React from "react";

export const SpyglassIcon: React.StatelessComponent<{
  fill?: string;
  style?: object;
}> = ({ fill = "#000", style, ...nativeProps }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    style={{ display: "block", ...style }}
    {...nativeProps}
  >
    <title>search spyglass icon</title>
    <path
      d="M17.352,15.481a8.517,8.517,0,1,0-2.209,2.033l4.642,4.642,2.121-2.121Zm-6.757,1.364a6.5,6.5,0,1,1,6.5-6.5A6.508,6.508,0,0,1,10.595,16.845Z"
      fill={fill}
    />
  </svg>
);
