/* eslint-disable jsx-a11y/alt-text */
import "../App.css";
import { removeItem, addItem } from "../redux/Cart";
import Layout from "../components/Layout";

import Slider from "../components/Slider";

import { useLocation } from "react-router-dom";
import { ReactComponent as AddShoppingCart } from "../assets/add_shopping_cart.svg";
import { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import Favorite from "../components/Favorite";

function Article() {
  let { state } = useLocation();
  let nbPicture = state.data.picture.length;
  const stateCart = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();
  const [isAlreadyInCart, setIsAlreadyInCart] = useState(false);

  useEffect(() => {
    let findItem = stateCart.find((item) => item.id === state.data.id);
    if (findItem) {
      setIsAlreadyInCart(true);
    } else {
      setIsAlreadyInCart(false);
    }

    return () => {};
  }, []);

  useEffect(() => {
    let findItem = stateCart.find((item) => item.id === state.data.id);
    if (findItem) {
      setIsAlreadyInCart(true);
    } else {
      setIsAlreadyInCart(false);
    }

    return () => {};
  }, [stateCart]);

  const Item = (props) => {
    return (
      <div
        // className="slider-item"
        style={{
          width: "90vw",
          height: "50vh",
          margin: 10,

          padding: 10,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          borderRadius: 25,
          backgroundColor: "white",
        }}
        onClick={props.onClick}
      >
        {props.children}
      </div>
    );
  };

  return (
    <Layout>
      <Slider>
        <ul className="slider-list" style={{ margin: 10 }}>
          {state.data.picture.map((picture, index) => (
            <Item>
              {nbPicture > 1 && (
                <span
                  style={{
                    backgroundColor: "black",
                    height: 20,
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    borderRadius: 10,
                    padding: 10,
                    opacity: 0.1,
                  }}
                >
                  {index + 1} / {nbPicture}
                </span>
              )}

              <img
                src={picture}
                alt={`Blob ${1}`}
                height={"100%"}
                width={"80%"}
                style={{
                  borderRadius: 10,
                  objectFit: "contain",
                }}
              />
            </Item>
          ))}
        </ul>
      </Slider>

      <div
        style={{
          width: "90%",

          padding: 20,
          marginTop: 0,
          margin: 20,

          backgroundColor: "white",
          borderRadius: 20,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              borderBottom: "1px solid lightgrey",
              marginBottom: 20,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h1
              style={{
                paddingBottom: 5,
                marginBottom: 2,
              }}
            >
              {state.data.brand}
            </h1>

            <h1 style={{ fontSize: 20, color: "orange" }}>
              {state.data.price.toLocaleString("fr-FR")} FCFA
            </h1>
          </div>
          <p style={{ paddingLeft: 0, marginBottom: 20 }}>
            {state.data.description}
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Favorite />{" "}
          </div>
        </div>

        <div
          style={{
            width: "90%",
            height: 40,
            padding: 10,
            margin: 20,
            marginBottom: 20,

            color: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            onClick={() =>
              isAlreadyInCart
                ? dispatch(removeItem(state.data))
                : dispatch(addItem(state.data))
            }
            style={{
              border: "1px solid white",
              height: 50,
              padding: 20,
              margin: 20,
              borderRadius: 30,
              backgroundColor: "lightpink",
              color: "white",
              display: "flex",
              justifyContent: isAlreadyInCart ? "center" : "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ paddingRight: 10 }}>
              {isAlreadyInCart ? "Retirer du panier" : "Ajoutez au Panier"}
            </span>
            {!isAlreadyInCart && <AddShoppingCart fill="white" />}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Article;
