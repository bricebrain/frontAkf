import React from "react";

function Content({ children }) {
  return (
    <div
      style={{
        width: "100vw",

        flex: 1,
      }}
    >
      {children}
    </div>
  );
}

export default Content;
