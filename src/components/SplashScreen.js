import React from "react";
//import logo from './logo.svg';
import logo from "../assets/logoMin.jpg";
import "../App.css";

function SplashScreen() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#0F0F7D",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "55%",
          height: "30%",
          backgroundColor: "blue",
          borderRadius: 100,
          border: "2px  solid  white",
        }}
      >
        <img
          src={logo}
          style={{ width: "100%", height: "100%", borderRadius: 100 }}
        />
      </div>
    </div>
  );
}

export default SplashScreen;
