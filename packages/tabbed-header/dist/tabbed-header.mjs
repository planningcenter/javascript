Object.defineProperty(exports,"__esModule",{value:!0}),exports.TabsContainer=function(e){return t.default.createElement("div",o({style:{display:"flex",alignItems:"top",marginTop:16}},e))},exports.PageTitleContainer=function(e){return t.default.createElement("div",o({style:{display:"flex",alignItems:"center",marginTop:24,marginBottom:24}},e))},exports.FlexibleSpacer=function(){return t.default.createElement("div",{style:{margin:"auto"}})},exports.PageTitle=function(e){var n=e.as,i=void 0===n?"span":n,l=e.style,u=a(e,["as","style"]);return t.default.createElement(i,o({style:r({margin:0,color:"white",fontSize:22,fontWeight:700},l)},u))},exports.Tab=function(e){var n=e.target,i=e.children,l=e.style,u=a(e,["target","children","style"]);return t.default.createElement("a",o({style:r({backgroundColor:!0===n?"white":"rgba(255,255,255, .8)",fontWeight:!0===n?700:400,color:!0===n?"#000":"#444",paddingTop:16,paddingRight:24,paddingBottom:16,paddingLeft:24,borderTopLeftRadius:4,borderTopRightRadius:4},l)},u),i)},exports.EightPixelFlexTabSpacer=function(){return t.default.createElement("div",{style:{margin:4}})},exports.Container=function(e){var n=e.style,i=a(e,["style"]);return t.default.createElement("div",o({style:r({display:"flex",flexDirection:"column",backgroundColor:"lightgray",paddingLeft:24,paddingRight:24},n)},i))},exports.TabNotificationBubble=function(e){var n=e.children,i=e.style,l=a(e,["children","style"]);return t.default.createElement("span",o({style:r({backgroundColor:"rgba(0,0,0, .12)",borderRadius:9999,display:"inline-block",padding:8,margin:-8,marginLeft:8,fontWeight:700},i)},l),n)};var e,t=(e=require("react"))&&e.__esModule?e:{default:e};function r(e){for(var t=arguments,r=1;r<arguments.length;r++){var a=null!=t[r]?t[r]:{},o=Object.keys(a);"function"==typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(a).filter(function(e){return Object.getOwnPropertyDescriptor(a,e).enumerable}))),o.forEach(function(t){n(e,t,a[t])})}return e}function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)t.indexOf(r=o[n])>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)t.indexOf(r=o[n])>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}function o(){return(o=Object.assign||function(e){for(var t=arguments,r=1;r<arguments.length;r++){var n=t[r];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}
//# sourceMappingURL=tabbed-header.mjs.map
