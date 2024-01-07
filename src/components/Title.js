import React from "react";

function Title({ height, name, subname, marginBottom, header }) {
  return header ? (
    <div
      style={{
        height: height,
        paddingLeft: 10,
        marginBottom: marginBottom ?? 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1 style={{ fontSize: 20, fontWeight: "bold", color: "#0D0E78" }}>
        {name}
      </h1>
      {subname && (
        <h2 style={{ display: "flex", textAlign: "center" }}>{subname}</h2>
      )}
    </div>
  ) : (
    <div
      style={{
        height: height,
        paddingLeft: 10,
        marginBottom: marginBottom ?? 40,
      }}
    >
      <h1 style={{ fontSize: 20, fontWeight: "bold" }}>{name}</h1>
      {subname && (
        <h2 style={{ display: "flex", textAlign: "center" }}>{subname}</h2>
      )}
    </div>
  );
}

export default Title;
