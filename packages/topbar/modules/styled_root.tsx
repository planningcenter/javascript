import * as React from "react";

const StyledRoot: React.StatelessComponent<{
  children: any;
  style?: object;
}> = ({ children, style, ...nativeProps }) => (
  <div
    className="simple"
    style={{
      height: "48px",
      display: "flex",
      position: "relative",
      alignItems: "center",
      color: "white",
      fontFamily: "Lato",
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
      ...style
    }}
    {...nativeProps}
  >
    <style>{`
      @media only print {
        .simple {
          display: none !important;
        }
      }
    `}</style>
    {children}
  </div>
);

export default StyledRoot;
