import { createElement } from "react";

function Symbol({ symbol: _symbol, ...props }) {
  let [path, symbol] = _symbol.replace(".svg", "").split("#");

  return (
    <svg
      role="img"
      title={`${symbol} icon`}
      className={["symbol", props.className].join(" ").trim()}
      {...props}
    >
      <use xlinkHref={`${path}.svg#${symbol}`} />
    </svg>
  );
}

export default Symbol;
