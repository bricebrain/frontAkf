/* eslint-disable jsx-a11y/alt-text */
import "../App.css";
// import { ReactComponent as EmptyCart } from "../assets/emptyCart.svg";

import Layout from "../components/Layout";

function EmptyPage({ text }) {
  return (
    <Layout>
      <div
        style={{
          width: "100%",
          height: "90%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1 style={{ fontSize: 20, marginTop: 20 }}> {text}</h1>
      </div>
    </Layout>
  );
}

export default EmptyPage;
