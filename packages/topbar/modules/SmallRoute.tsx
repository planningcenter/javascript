import * as React from "react";

import { fontFamily } from "./styles";

const Route = ({ active, ...props }) => (
  <a
    style={{
      display: "block",
      backgroundColor: "#444",
      borderBottom: "1px solid #333",
      color: "#fff",
      fontWeight: "bold",
      textTransform: "capitalize",
      textDecoration: "none",
      lineHeight: "47px",
      textAlign: "center",
      ...fontFamily,
      ...(active && { backgroundColor: "#333" })
    }}
    {...props}
  />
);

export default Route;
