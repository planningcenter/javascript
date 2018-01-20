import * as React from "react";

const BellIcon: React.StatelessComponent<{
  dot?: boolean;
  dotFill?: string;
  fill?: string;
  stroke?: string;
  style?: object;
}> = ({
  dot = false,
  fill = "#fff",
  dotFill = "#FFDC51",
  stroke = "#000",
  style,
  ...props
}) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    style={{ display: "block", ...style }}
    {...props}
  >
    <title>bell</title>
    <path
      d="M21.482,16.626,19.1,13.649V9a7,7,0,0,0-14,0v4.649L2.478,16.929A1.89,1.89,0,0,0,3.952,20H9.285a2.983,2.983,0,0,0,5.633,0H19.86a2.077,2.077,0,0,0,1.622-3.374ZM19.86,18H4.182l2.7-3.375A1,1,0,0,0,7.1,14V9a5,5,0,0,1,10,0v5a1,1,0,0,0,.219.625l2.6,3.25Z"
      fill={fill}
    />
    {dot && (
      <circle
        cx="18"
        cy="6"
        r="5.5"
        fill={dotFill}
        stroke={stroke}
        strokeWidth="3"
      />
    )}
  </svg>
);

export default BellIcon;
