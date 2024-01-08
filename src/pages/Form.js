/* eslint-disable jsx-a11y/alt-text */
import "../App.css";
import { useSelector, useDispatch } from "react-redux";
import emailjs from "emailjs-com";
import SliderVertical from "../components/SliderVertical";
import Title from "../components/Title";
import { Link, useLocation, redirect } from "react-router-dom";
import { useEffect, useState } from "react";
import { ReactComponent as CheckCircle } from "../assets/check_circle.svg";

import axios from "axios";
import {
  incrementQuantity,
  decrementQuantity,
  removeItem,
  addItem,
  resetCart,
} from "../redux/Cart";
import Layout from "../components/Layout";
import Validation from "../components/Validation";

function Form() {
  let { state } = useLocation();
  const stateCart = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();
  const [hasSendMail, setHasSendMail] = useState(false);
  const [contact, setContact] = useState({
    civilite: "",
    nom: "",
    prenom: "",
    adresse: "",
    email: "",
    tel: "",
  });

  useEffect(() => {
    let objetRecupere = JSON.parse(localStorage.getItem("akfRehobothContact"));
    if (objetRecupere) {
      setContact(objetRecupere);
    }

    return () => {};
  }, []);

  const notifications = (data) => {
    emailjs
      .send(
        "service_ylvxaws",
        "template_tu19im9", // Utilisez l'ID du modèle que vous avez créé sur EmailJS
        {
          to_email: "akfrehoboth@gmail.com",
          civility: data.civility,
          lastname: data.lastname,
          total: data.total,
          created: data.created,
        },
        "XfH5RhNQyQgdapFUp"
      )
      .then((response) => {
        console.log("Email sent:", response);
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
  };

  const transfoDate = (info) => {
    const dateObj = new Date(new Date(info));
    let options = {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZoneName: "short",
    };
    let dateFormatee = dateObj.toLocaleString("fr-FR", options);
    return dateFormatee;
  };

  const SendEmail = async () => {
    let newCommande = {
      civility: contact.civilite,
      firstname: contact.prenom,
      lastname: contact.nom,
      address: contact.adresse,
      phone: contact.tel,
      email: contact.email,
      status: "En attente",
      cart: stateCart,
      total: state.totalCommande,
    };

    localStorage.setItem("akfRehobothContact", JSON.stringify(contact));

    try {
      const { data } = await axios.post(
        "https://backend-akf.onrender.com/addCommande/",
        newCommande
      );

      notifications({
        total: `${data.total.toLocaleString("fr-FR")} FCFA`,
        civility: data.civility,
        lastname: data.lastname,
        created: transfoDate(data.created),
      });
    } catch (error) {
      console.log(error);
    }

    // Récupérer la chaîne JSON du localStorage et la convertir en objet
  };

  return !hasSendMail ? (
    <Layout headerName={"Formulaire"}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <h1
            style={{
              fontSize: 26,
              color: "#0D0E78",
            }}
          >
            Contact
          </h1>
        </div>

        <div
          style={{
            padding: 20,
            height: "100%",
            backgroundColor: "white",
            margin: 20,
          }}
        >
          <div style={{ display: "flex", marginBottom: 20 }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginRight: 20,
              }}
            >
              <label for={"Mme"}>{"Madame"}</label>
              <input
                style={{ padding: 0, height: 20 }}
                id="category"
                onChange={(e) => {
                  setContact((prevState) => {
                    return { ...prevState, civilite: e.target.value };
                  });
                }}
                type="checkbox"
                value={"Mme"}
                checked={contact.civilite == "Mme" ? true : false}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label for={"Mr"}>{"Monsieur"}</label>
              <input
                style={{ padding: 0, height: 20 }}
                id="category"
                onChange={(e) => {
                  setContact((prevState) => {
                    return { ...prevState, civilite: e.target.value };
                  });
                }}
                type="checkbox"
                value={"Mr"}
                checked={contact.civilite == "Mr" ? true : false}
              />
            </div>
          </div>

          <h1 style={{}}>Nom</h1>
          <input
            onChange={(e) => {
              setContact((prevState) => {
                return { ...prevState, nom: e.target.value };
              });
            }}
            value={contact.nom}
            style={{
              padding: 20,
              borderRadius: 5,
              border: "none",
              border: "1px solid grey",
              width: "90%",
              marginBottom: 20,
              height: 25,
            }}
          ></input>

          <h1 style={{}}>Prenom</h1>
          <input
            onChange={(e) => {
              setContact((prevState) => {
                return { ...prevState, prenom: e.target.value };
              });
            }}
            value={contact.prenom}
            style={{
              padding: 20,
              borderRadius: 5,
              border: "none",
              border: "1px solid grey",
              width: "90%",
              marginBottom: 20,
              height: 25,
            }}
          ></input>

          <h1 style={{}}>Adresse</h1>

          <textarea
            id="description"
            onChange={(e) => {
              setContact((prevState) => {
                return { ...prevState, adresse: e.target.value };
              });
            }}
            value={contact.adresse}
            rows="9"
            cols="20"
            style={{
              height: 80,
              borderRadius: 5,
              padding: 10,
              border: "1px solid grey",
              width: "90%",
              marginBottom: 10,
            }}
          />

          <h1 style={{}}>Telephone</h1>

          <input
            onChange={(e) => {
              setContact((prevState) => {
                return { ...prevState, tel: e.target.value };
              });
            }}
            value={contact.tel}
            style={{
              padding: 20,
              borderRadius: 5,
              border: "none",
              border: "1px solid grey",
              width: "90%",
              marginBottom: 20,
              height: 25,
            }}
          ></input>

          <h1 style={{}}>Email</h1>

          <input
            onChange={(e) => {
              setContact((prevState) => {
                return { ...prevState, email: e.target.value };
              });
            }}
            value={contact.email}
            style={{
              padding: 20,
              borderRadius: 5,
              border: "none",
              border: "1px solid grey",
              width: "90%",
              marginBottom: 20,
              height: 25,
            }}
          ></input>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button
            style={{
              backgroundColor: "green",
              paddingLeft: 10,
              padding: 10,
              border: "none",
              color: "white",
              borderRadius: 5,
            }}
            onClick={() => {
              dispatch(resetCart());
              setHasSendMail(true);
              SendEmail();
            }}
          >
            Envoyez
          </button>
        </div>
      </div>
    </Layout>
  ) : (
    <Validation
      to="/"
      message1="Votre commande a été validée."
      message2="Nous vous contacterons dans 30 min pour la livraison et le paiement"
    />
  );
}

export default Form;
