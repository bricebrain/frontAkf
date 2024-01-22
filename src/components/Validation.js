import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { ReactComponent as CheckCircle } from "../assets/check_circle.svg";
import { Navigate } from "react-router-dom";

const Validation = ({ to, message1, message2, height, func }) => {
  const [go, setgo] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setgo(true);
      // func();
    }, 2000);
    setTimeout(() => {
      try {
        func();
      } catch (error) {}
    }, 2500);

    return () => {};
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: height ?? "100%",
        padding: 10,
        marginBottom: 10,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {go && (
        <Navigate
          to={to ?? "/"}
          replace={true}
          state={{ item: { type: "Edition", name: "Edition" } }}
        />
      )}

      <CheckCircle fill="green" style={{ height: 80, width: 80 }} />
      <h1 style={{ fontSize: 20, marginTop: 20 }}>{message1}</h1>
      {message2 && (
        <h2 style={{ fontSize: 20, marginTop: 20, textAlign: "center" }}>
          {message2}
        </h2>
      )}
    </div>
  );
};

export default Validation;
