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
} from "./APP_SYMBOLS";

const Clipboard: React.StatelessComponent<{
  size?: string;
  color?: string;
  name?: string;
}> = ({ size = "32px", color = "#000", name = "Generic", children }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    role="img"
    aria-labelledby="title desc"
    style={{ display: "block" }}
  >
    <title id="title">Planning Center {name} App Icon</title>
    <desc id="desc">
      An image of a clipboard with icon, symbolizing the Planning Center {name}{" "}
      app.
    </desc>
    <path
      d="M28.4,0H3.7C1.6,0,0,1.6,0,3.7v24.7c0,2,1.6,3.6,3.7,3.6h24.7c2,0,3.6-1.6,3.6-3.6V3.7C32,1.6,30.4,0,28.4,0z M27.2,26.6c0,0.4-0.3,0.6-0.6,0.6H5.4c-0.4,0-0.6-0.3-0.6-0.6V5.4c0-0.4,0.3-0.6,0.6-0.6h4.2v0.9c0,0.4,0.3,0.7,0.7,0.7h11.3 c0.4,0,0.7-0.3,0.7-0.7V4.8h4.2c0.4,0,0.6,0.3,0.6,0.6V26.6z"
      fill={color}
    />
    {children}
  </svg>
);

export default {
  accounts: props => (
    <Clipboard color="#fff" size={props.size || "20px"} name="Accounts">
      <Accounts color="#fff" transform="translate(0, 1)" />
    </Clipboard>
  ),
  "check-ins": props => (
    <Clipboard color="#fff" size={props.size || "20px"} name="CheckIns">
      <CheckIns color="#fff" transform="translate(0, 1)" />
    </Clipboard>
  ),
  giving: props => (
    <Clipboard color="#fff" size={props.size || "20px"} name="Giving">
      <Giving color="#fff" transform="translate(0, 1)" />
    </Clipboard>
  ),
  groups: props => (
    <Clipboard color="#fff" size={props.size || "20px"} name="Groups">
      <Groups color="#fff" transform="translate(0, 1)" />
    </Clipboard>
  ),
  people: props => (
    <Clipboard color="#fff" size={props.size || "20px"} name="People">
      <People color="#fff" transform="translate(0, 1)" />
    </Clipboard>
  ),
  registrations: props => (
    <Clipboard color="#fff" size={props.size || "20px"} name="Registrations">
      <Registrations color="#fff" transform="translate(0, 1)" />
    </Clipboard>
  ),
  resources: props => (
    <Clipboard color="#fff" size={props.size || "20px"} name="Resources">
      <Resources color="#fff" transform="translate(0, 1)" />
    </Clipboard>
  ),
  services: props => (
    <Clipboard color="#fff" size={props.size || "20px"} name="Services">
      <Services color="#fff" transform="translate(0, 1)" />
    </Clipboard>
  )
};
