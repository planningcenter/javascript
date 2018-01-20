import * as React from "react";

const XIcon: React.StatelessComponent<{ fill?: string; style?: object }> = ({
  fill = "#A0A0A0",
  style,
  ...nativeProps
}) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    style={{ display: "block", ...style }}
    {...nativeProps}
  >
    <title>close-x</title>
    <path
      d="M9.142,8l3.814,3.814-1.142,1.142L8,9.142,4.186,12.956,3.044,11.814,6.858,8,3.044,4.186,4.186,3.044,8,6.858l3.814-3.814,1.142,1.142Z"
      fill={fill}
    />
  </svg>
);

export default XIcon;
