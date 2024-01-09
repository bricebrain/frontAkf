/* eslint-disable jsx-a11y/alt-text */
import "../App.css";
import { useDispatch } from "react-redux";
import SliderVertical from "../components/SliderVertical";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import Layout from "../components/Layout";

function Details() {
  let { state } = useLocation();
  console.log(state);

  const dispatch = useDispatch();
  const [totalCommande, setTotalCommande] = useState(0);
  const [stateCart, setStateCart] = useState([]);
  const [contact, setContact] = useState({});

  useEffect(() => {
    setTotalCommande(state.data.total);
    setStateCart(state.data.cart);

    setContact(state.data);
    return () => {};
  }, []);

  const Item = ({ data }) => {
    return (
      <div
        // className="slider-item"
        style={{
          height: 200,
          width: "100%",
          margin: 10,
          padding: 20,
          display: "flex",
          borderRadius: 25,
          backgroundColor: "white",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <img
          style={{
            width: "40%",
            height: "90%",
            objectFit: "contain",
            borderRadius: 20,
            backgroundColor: "#F9F9F9",
            display: "flex",
            alignItems: "center",
          }}
          src={data?.picture && data?.picture[0]}
        ></img>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h2> Quantité : {data.quantity} </h2>
          <br />

          <h1>{data.brand}</h1>
          <h2>{data.description}</h2>
          <h2>{(data.price * data.quantity).toLocaleString("fr-FR")} FCFA </h2>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        ></div>
      </div>
    );
  };

  return (
    <Layout headerName={"Details commande"} noIconCart>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1
          style={{
            fontSize: 26,
            color: "#0D0E78",
          }}
        >
          {contact.civility} {contact.lastname} {contact.firstname}
        </h1>
        <h1
          style={{
            fontSize: 26,
            color: "#0D0E78",
          }}
        >
          Total Commande
        </h1>
        <h1
          style={{
            fontSize: 20,
            color: "orange",
          }}
        >
          {totalCommande.toLocaleString("fr-FR")} FCFA
        </h1>
      </div>

      <SliderVertical>
        <ul className="sliderVertical-list">
          {stateCart && stateCart.map((item) => <Item data={item} />)}
        </ul>
      </SliderVertical>
    </Layout>
  );
}

export default Details;
