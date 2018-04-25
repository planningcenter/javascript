import * as React from "react";

import {
  Accounts as AccountsSymbol,
  CheckIns as CheckInsSymbol,
  Giving as GivingSymbol,
  Groups as GroupsSymbol,
  People as PeopleSymbol,
  Registrations as RegistrationsSymbol,
  Resources as ResourcesSymbol,
  Services as ServicesSymbol
} from "./app_symbols";

function Squircle({ color = "#fff", ...platformProps }) {
  return (
    <path
      fill={color}
      d="M10.008.045C2.047.045.056,2.036.056,10s1.991,9.952,9.952,9.952S19.96,17.959,19.96,10,17.969.045,10.008.045Z"
    />
  );
}

const Clipboard: React.StatelessComponent<{
  size?: string;
  color?: string;
  name?: string;
}> = ({ size = "32px", color = "#000", name = "Generic", children }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    style={{ display: "block" }}
  >
    <path
      d="M28.4,0H3.7C1.6,0,0,1.6,0,3.7v24.7c0,2,1.6,3.6,3.7,3.6h24.7c2,0,3.6-1.6,3.6-3.6V3.7C32,1.6,30.4,0,28.4,0z M27.2,26.6c0,0.4-0.3,0.6-0.6,0.6H5.4c-0.4,0-0.6-0.3-0.6-0.6V5.4c0-0.4,0.3-0.6,0.6-0.6h4.2v0.9c0,0.4,0.3,0.7,0.7,0.7h11.3 c0.4,0,0.7-0.3,0.7-0.7V4.8h4.2c0.4,0,0.6,0.3,0.6,0.6V26.6z"
      fill={color}
    />
    {children}
  </svg>
);

export function Accounts({ color, ...platformProps }) {
  return (
    <path
      fill={color}
      d="M13.657,10.478a3.419,3.419,0,0,0,0-.962l1.036-.81a.248.248,0,0,0,.059-.314l-.982-1.7a.245.245,0,0,0-.3-.108l-1.223.491a3.563,3.563,0,0,0-.83-.482l-.186-1.3a.24.24,0,0,0-.241-.206H9.027a.24.24,0,0,0-.241.206L8.6,6.594a3.748,3.748,0,0,0-.83.482L6.547,6.585a.238.238,0,0,0-.3.108l-.982,1.7a.242.242,0,0,0,.059.314l1.036.81a3.323,3.323,0,0,0,0,.962l-1.036.81a.249.249,0,0,0-.059.315l.982,1.7a.247.247,0,0,0,.3.108l1.223-.491a3.594,3.594,0,0,0,.83.481l.186,1.3a.24.24,0,0,0,.241.206h1.964a.24.24,0,0,0,.241-.206l.186-1.3a3.784,3.784,0,0,0,.83-.481l1.223.491a.239.239,0,0,0,.3-.108l.982-1.7a.249.249,0,0,0-.059-.315ZM10.009,11.9a1.9,1.9,0,1,1,1.9-1.9A1.9,1.9,0,0,1,10.009,11.9Z"
    />
  );
}

export function CheckIns({ color, ...platformProps }) {
  return (
    <path
      fill={color}
      d="M14.175,8.341,9.258,13.256a1.157,1.157,0,0,1-1.638,0L5.161,10.8A1.159,1.159,0,1,1,6.8,9.16L8.439,10.8l4.1-4.1a1.159,1.159,0,0,1,1.639,1.639Z"
    />
  );
}

export function Giving({ color, ...platformProps }) {
  return (
    <path
      fill={color}
      d="M10.3,13.769a.508.508,0,0,1-.592,0c-1.259-.888-5.982-4.494-3.268-6.83a2.386,2.386,0,0,1,3.215.205l.349.349.349-.349a2.386,2.386,0,0,1,3.215-.205C16.286,9.275,11.563,12.881,10.3,13.769Z"
    />
  );
}

export function Groups({ color, ...platformProps }) {
  return (
    <path
      fill={color}
      d="M13.769,11.313V8.683a1.867,1.867,0,1,0-2.443-2.449H8.69A1.867,1.867,0,1,0,6.243,8.681v2.632A1.867,1.867,0,1,0,8.69,13.76h2.632a1.867,1.867,0,1,0,2.447-2.447Zm-1.455,0a1.873,1.873,0,0,0-.992.992H8.69a1.877,1.877,0,0,0-.992-.992V8.681a1.877,1.877,0,0,0,.992-.992h2.636a1.872,1.872,0,0,0,.988.99Z"
    />
  );
}

export function People({ color, ...platformProps }) {
  return (
    <path
      fill={color}
      d="M8.177,5.732A2.018,2.018,0,1,1,6.159,7.75,2.019,2.019,0,0,1,8.177,5.732Zm2.494,8.53H5.664A.565.565,0,0,1,5.1,13.7V12.422a1.841,1.841,0,0,1,1.841-1.841H9.394a1.841,1.841,0,0,1,1.841,1.841V13.7A.565.565,0,0,1,10.671,14.262ZM12.814,6.94A1.513,1.513,0,1,1,11.3,8.453,1.513,1.513,0,0,1,12.814,6.94Zm1.537,6.093H12.413a.565.565,0,0,1-.565-.565v-.049a2.292,2.292,0,0,0-.2-.957.555.555,0,0,0-.062-.141.8.8,0,0,0-.061-.11,1.19,1.19,0,0,0-.092-.16,1.131,1.131,0,0,1,.908-.472h1.472a1.108,1.108,0,0,1,1.105,1.1v.785A.565.565,0,0,1,14.351,13.033Z"
    />
  );
}

export function Registrations({ color, ...platformProps }) {
  return (
    <path
      fill={color}
      d="M10.813,5.838A.985.985,0,0,1,12.2,5.774l.789.714a.985.985,0,0,1,.067,1.395l-.847.93L9.979,6.749Zm-3.68,8.234-2.012.444a.137.137,0,0,1-.164-.151l.277-2.046a1.566,1.566,0,0,1,.337-.722L9.434,7.336,11.668,9.4l-3.845,4.27A1.529,1.529,0,0,1,7.133,14.072Zm7.437.433H8.986l1.96-2.191H14.57a.491.491,0,0,1,.49.49v1.211A.49.49,0,0,1,14.57,14.505Z"
    />
  );
}

export function Resources({ color, ...platformProps }) {
  return (
    <path
      fill={color}
      d="M9.241,14a.6.6,0,0,1-.6.6H6.007a.6.6,0,0,1-.6-.6V11.364a.6.6,0,0,1,.6-.6H8.641a.6.6,0,0,1,.6.6Zm0-5.367a.6.6,0,0,1-.6.6H6.007a.6.6,0,0,1-.6-.6V6a.6.6,0,0,1,.6-.6H8.641a.6.6,0,0,1,.6.6ZM14.609,14a.6.6,0,0,1-.6.6H11.374a.6.6,0,0,1-.6-.6V11.364a.6.6,0,0,1,.6-.6h2.635a.6.6,0,0,1,.6.6Zm0-5.367a.6.6,0,0,1-.6.6H11.374a.6.6,0,0,1-.6-.6V6a.6.6,0,0,1,.6-.6h2.635a.6.6,0,0,1,.6.6Z"
    />
  );
}

export function Services({ color, ...platformProps }) {
  return (
    <path
      fill={color}
      d="M14.605,13.9a.484.484,0,0,1-.484.483H5.9a.483.483,0,0,1-.484-.483v-.942a.484.484,0,0,1,.484-.484h8.226a.484.484,0,0,1,.484.484Zm0-3.435a.484.484,0,0,1-.484.484H5.9a.484.484,0,0,1-.484-.484V9.526A.483.483,0,0,1,5.9,9.043h8.226a.484.484,0,0,1,.484.483Zm0-3.435a.484.484,0,0,1-.484.484H5.9a.484.484,0,0,1-.484-.484V6.092A.483.483,0,0,1,5.9,5.608h8.226a.484.484,0,0,1,.484.484Z"
    />
  );
}

export default function MonoAppIcon({
  app: appName,
  colors,
  style,
  size = 20,
  ...platformProps
}: {
  app: string;
  colors: any; // TODO: shared type
  style?: any;
  size?: number;
}): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 20 20"
      role="img"
      aria-labelledby="title desc"
      style={{ display: "block", ...style }}
      {...platformProps}
    >
      <title id="title">Planning Center {appName} App Icon</title>

      <desc id="desc">
        An image symbolizing the Planning Center {appName} app.
      </desc>

      <Squircle />
      {React.createElement(eval(appName), { color: colors.base0 })}
    </svg>
  );
}
