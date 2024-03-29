/* eslint-disable jsx-a11y/alt-text */
import "../App.css";
import { useEffect } from "react";

import Layout from "../components/Layout";
import MapContainer from "../components/Map";
import Banner from "../components/Banner";

function CheckOut() {
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <Layout>
      <div
        style={{
          width: "100%",
          height: "80%",

          marginBottom: 10,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Banner />
        <h1 style={{ fontSize: 20, marginTop: 10 }}> 3 Allée du Bois Percé</h1>
        <h1 style={{ fontSize: 20, marginTop: 10 }}> Crocodile Island</h1>
        <h1 style={{ fontSize: 20, marginTop: 10 }}> Tel : 091919191</h1>
        <MapContainer />
      </div>
    </Layout>
  );
}

export default CheckOut;
