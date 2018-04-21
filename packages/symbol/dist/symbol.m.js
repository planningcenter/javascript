import"react";export default function(e){var s=e.symbol.replace(".svg","").split("#"),r=s[0],t=s[1];return h("svg",Object.assign({},{role:"presentation"},e,{className:["symbol",e.className].join(" ").trim()}),h("use",{xlinkHref:r+".svg#"+t}))};
//# sourceMappingURL=symbol.m.js.map
