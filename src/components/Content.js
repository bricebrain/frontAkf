import React from "react";

function Content({ children, height }) {
  return (
    <div
      style={{
        width: "100vw",
        height: height ?? "90%",
        overflowY: "auto",
        flex: 1,
      }}
    >
      {children}
    </div>
  );
}

export default Content;
