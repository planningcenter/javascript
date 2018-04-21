import { createElement } from "react";

function Symbol(props) {
  let [path, symbol] = props.symbol.replace(".svg", "").split("#");

  return createElement(
    "svg",
    Object.assign(
      {},
      {
        role: "presentation"
      },
      props,
      {
        className: ["symbol", props.className].join(" ").trim()
      }
    ),
    createElement("use", {
      xlinkHref: path + ".svg#" + symbol
    })
  );
}

export default Symbol;
