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

// const sendEmail = () => {
//   emailjs.send(
//     'service_ylvxaws',
//     'template_gr2epar', // Utilisez l'ID du modèle que vous avez créé sur EmailJS
//     {
//       to_email: 'akfrehoboth@gmail.com',
//       message: text,
//       from_name:name,
//       email_contact:email
//     },
//     XfH5RhNQyQgdapFUp'
//   )
//   .then((response) => {
//     console.log('Email sent:', response);
//     setDone(true)
//   })
//   .catch((error) => {
//     console.error('Error sending email:', error);
//   });()

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
        >
          {/* <button
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
          </button> */}
          {/* <div
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
          </div> */}
          {/* <button
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
          </button> */}
        </div>
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

      {/* <Link to="/Form" state={{ totalCommande }}>
        <button onClick={() => console.log(stateCart)}>Validation</button>
      </Link> */}
    </Layout>
  );
}

export default Details;
