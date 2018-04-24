import * as React from "react";
import {
  Accounts,
  CheckIns,
  Giving,
  Groups,
  People,
  Registrations,
  Resources,
  Services
} from "./app_symbols";

const Clipboard = ({
  size = "32px",
  color = "#000",
  name = "Generic",
  children
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    role="img"
    aria-labelledby="title desc"
  >
    <title id="title">Planning Center {name} App Icon</title>
    <desc id="desc">
      An image of a clipboard with icon, symbolizing the Planning Center {name}{" "}
      app.
    </desc>

    <rect
      fill={color}
      x="0"
      y="0"
      width="32"
      height="32"
      rx="3.5"
      role="presentation"
    />

    <rect
      fill="#FFFFFF"
      x="4.75"
      y="4.25"
      width="22.5"
      height="23"
      rx=".85"
      role="presentation"
    />

    <path
      d="M9.11999989,-3.66385795e-16 L22.8800001,-3.66385795e-16 L22.8800001,4.19999981 L22.8800001,4.19999981 C22.8800001,4.75228456 22.4322849,5.19999981 21.8800001,5.19999981 L10.1199999,5.19999981 L10.1199999,5.19999981 C9.56771514,5.19999981 9.11999989,4.75228456 9.11999989,4.19999981 L9.11999989,-3.66385795e-16 Z"
      fill="#FEC123"
      role="presentation"
    />
    {children}
  </svg>
);

export default {
  accounts: props => (
    <Clipboard color="#4984C4" size={props.size || "20px"} name="Accounts">
      <Accounts color="#4a4a4d" />
    </Clipboard>
  ),
  "check-ins": props => (
    <Clipboard color="#8C6999" size={props.size || "20px"} name="Check-Ins">
      <CheckIns color="#4a4a4d" />
    </Clipboard>
  ),
  giving: props => (
    <Clipboard color="#fcc846" size={props.size || "20px"} name="Check-Ins">
      <Giving color="#4a4a4d" />
    </Clipboard>
  ),
  groups: props => (
    <Clipboard color="#fb7642" size={props.size || "20px"} name="Check-Ins">
      <Groups color="#4a4a4d" />
    </Clipboard>
  ),
  people: props => (
    <Clipboard color="#5677b5" size={props.size || "20px"} name="Check-Ins">
      <People color="#4a4a4d" />
    </Clipboard>
  ),
  registrations: props => (
    <Clipboard color="#46948d" size={props.size || "20px"} name="Check-Ins">
      <Registrations color="#4a4a4d" />
    </Clipboard>
  ),
  resources: props => (
    <Clipboard color="#cc4f3e" size={props.size || "20px"} name="Resources">
      <Resources color="#4a4a4d" />
    </Clipboard>
  ),
  services: props => (
    <Clipboard color="#6e9541" size={props.size || "20px"} name="Services">
      <Services color="#4a4a4d" />
    </Clipboard>
  )
};
