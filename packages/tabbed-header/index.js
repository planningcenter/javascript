import React from "react";

export function TabsContainer(props) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "top",
        marginTop: 16
      }}
      {...props}
    />
  );
}

export function PageTitleContainer(props) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        marginTop: 24,
        marginBottom: 24
      }}
      {...props}
    />
  );
}

export function FlexibleSpacer() {
  return <div style={{ margin: "auto" }} />;
}

// export function PageTitle({ as: As = "span", style, ...props }) {
//   return (
    // <As
    //   style={{
        // margin: 0,
        // color: "white",
        // fontSize: 22,
        // fontWeight: 700,
        // ...style
    //   }}
    //   {...props}
    // />
//   );
// }

// export function Tab({ target, children, style, ...props }) {
//   return (
//     <a
//       style={{
//         backgroundColor: target === true ? "white" : "rgba(255,255,255, .8)",
//         fontWeight: target === true ? 700 : 400,
//         color: target === true ? "#000" : "#444",
//         paddingTop: 16,
//         paddingRight: 24,
//         paddingBottom: 16,
//         paddingLeft: 24,
//         borderTopLeftRadius: 4,
//         borderTopRightRadius: 4,
//         ...style
//       }}
//       {...props}
//     >
//       {children}
//     </a>
//   );
// }

export function EightPixelFlexTabSpacer() {
  return <div style={{ margin: 4 }} />;
}

// export function Container({ style, ...props }) {
//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         backgroundColor: "lightgray",
//         paddingLeft: 24,
//         paddingRight: 24,
//         ...style
//       }}
//       {...props}
//     />
//   );
// }

// export function TabNotificationBubble({ children, style, ...props }) {
//   return (
//     <span
//       style={{
//         backgroundColor: "rgba(0,0,0, .12)",
//         borderRadius: 9999,
//         display: "inline-block",
//         padding: 8,
//         margin: -8,
//         marginLeft: 8,
//         fontWeight: 700,
//         ...style
//       }}
//       {...props}
//     >
//       {children}
//     </span>
//   );
// }
