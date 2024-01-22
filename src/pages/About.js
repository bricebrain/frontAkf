/* eslint-disable jsx-a11y/alt-text */
import "../App.css";
import { useEffect } from "react";

import Layout from "../components/Layout";
import MapContainer from "../components/Map";

function CheckOut() {
  useEffect(() => {
    return () => {};
  }, []);

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
        <h1 style={{ fontSize: 20, marginTop: 20 }}> 3 Allée du Bois Percé</h1>
        <h1 style={{ fontSize: 20, marginTop: 20 }}> Crocodile Island</h1>
        <h1 style={{ fontSize: 20, marginTop: 20 }}> Tel : 091919191</h1>
        <MapContainer />
      </div>
    </Layout>
  );
}

export default CheckOut;
