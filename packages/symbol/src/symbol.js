import * as React from "react";

function Symbol(props) {
  let [path, symbol] = props.symbol.replace(".svg", "").split("#");

  return (
    <svg
      role="presentation"
      {...props}
      className={["symbol", props.className].join(" ").trim()}
    >
      <use xlinkHref={`${path}.svg#${symbol}`} />
    </svg>
  );
}

export default Symbol;
