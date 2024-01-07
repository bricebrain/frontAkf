import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { ReactComponent as CheckCircle } from "../assets/check_circle.svg";

const Validation = ({ to, message1, message2 }) => {
  setTimeout(() => {
    // return redirect("/");
    window.location.replace(to);
  }, 2000);
  return (
    <Layout>
      <div
        style={{
          width: "100%",
          height: "100%",
          padding: 10,
          marginBottom: 10,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CheckCircle fill="green" style={{ height: 80, width: 80 }} />
        <h1 style={{ fontSize: 20, marginTop: 20 }}>{message1}</h1>
        {message2 && (
          <h2 style={{ fontSize: 20, marginTop: 20, textAlign: "center" }}>
            {message2}
          </h2>
        )}
      </div>
    </Layout>
  );
};

export default Validation;
