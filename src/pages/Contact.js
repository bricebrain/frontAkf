/* eslint-disable jsx-a11y/alt-text */
import "../App.css";
import { useSelector, useDispatch } from "react-redux";
import emailjs from "emailjs-com";
import SliderVertical from "../components/SliderVertical";
import Title from "../components/Title";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { ReactComponent as EmptyCart } from "../assets/emptyCart.svg";
import axios from "axios";
import {
  incrementQuantity,
  decrementQuantity,
  removeItem,
  addItem,
  resetCart,
} from "../redux/Cart";
import Layout from "../components/Layout";
import MapContainer from "../components/Map";

function CheckOut() {
  let { state } = useLocation();
  const stateCart = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();
  const [totalCommande, setTotalCommande] = useState(0);
  //

  useEffect(() => {
    let montant = 0;
    stateCart.map((item) => {
      let value = item.price * item.quantity;
      montant += value;
    });

    setTotalCommande(montant);

    return () => {};
  }, []);

  useEffect(() => {
    let montant = 0;
    stateCart.map((item) => {
      let value = item.price * item.quantity;
      montant += value;
    });

    setTotalCommande(montant);

    return () => {};
  }, [stateCart]);

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
