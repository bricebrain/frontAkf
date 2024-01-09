/* eslint-disable jsx-a11y/alt-text */
import "../App.css";
import { useSelector, useDispatch } from "react-redux";
import SliderVertical from "../components/SliderVertical";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { ReactComponent as EmptyCart } from "../assets/emptyCart.svg";

import {
  incrementQuantity,
  decrementQuantity,
  removeItem,
} from "../redux/Cart";
import Layout from "../components/Layout";

function CheckOut() {
  let { state } = useLocation();
  const stateCart = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();
  const [totalCommande, setTotalCommande] = useState(0);

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
        >
          <button
            onClick={() => dispatch(incrementQuantity(data))}
            style={{
              width: 30,
              height: 30,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {" "}
            +
          </button>
          <div
            style={{
              width: 30,
              height: 30,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {" "}
            {data.quantity}
          </div>
          <button
            onClick={() => {
              if (data.quantity === 1) {
                dispatch(removeItem(data));
              } else {
                dispatch(decrementQuantity(data));
              }
            }}
            style={{
              width: 30,
              height: 30,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {" "}
            -
          </button>
        </div>
      </div>
    );
  };

  return stateCart && stateCart.length > 0 ? (
    <Layout headerName={"Panier"}>
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

      <Link
        to="/Form"
        state={{ totalCommande }}
        style={{
          display: "flex",
          justifyContent: "center",
          textDecoration: "none",
        }}
      >
        <button
          style={{
            backgroundColor: "green",
            border: "none",
            color: "white",
            padding: 5,
            borderRadius: 5,
          }}
          onClick={() => console.log(stateCart)}
        >
          Valider panier
        </button>
      </Link>
    </Layout>
  ) : (
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
        <EmptyCart style={{ height: 50, width: 50 }} />
        <h1 style={{ fontSize: 20, marginTop: 20 }}>
          {" "}
          Aucun élémént de votre panier
        </h1>
      </div>
    </Layout>
  );
}

export default CheckOut;
