/* eslint-disable jsx-a11y/alt-text */
import "../App.css";
import { useSelector, useDispatch } from "react-redux";
import SliderVertical from "../components/SliderVertical";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { ReactComponent as EmptyCart } from "../assets/emptyCart.svg";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBackIcon from "@mui/icons-material/NavigateBefore";
import CircularProgress from "@mui/material/CircularProgress";
import emailjs from "emailjs-com";

import { green } from "@mui/material/colors";

import {
  incrementQuantity,
  decrementQuantity,
  removeItem,
  resetCart,
} from "../redux/Cart";
import Layout from "../components/Layout";
import ListCommand from "../components/ListCommand";
import StepperUI from "../components/Stepper";
import SignInComponent from "../components/signInComponent";
import PreviewComponent from "../components/previewComponent";
import Validation from "../components/Validation";
import { addCommande } from "../api/commandes";

function CheckOut() {
  let { state } = useLocation();
  const stateCart = useSelector((state) => state.cart.value);
  const stateUser = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const [totalCommande, setTotalCommande] = useState(0);
  const [step, setStep] = useState(0);

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

  const Gestion = ({ stateCart, stateUser }) => {
    if (step === 0) {
      return <ListCommand products={stateCart} />;
    }
    if (step == 1) {
      if (stateUser && stateUser.id) {
        return <PreviewComponent userData={stateUser} />;
      } else {
        return <SignInComponent hide />;
      }
    }
    if (step == 2) {
      command();

      notifications();
      setStep((prev) => prev + 1);

      return (
        <div
          style={{
            height: "70%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress
            size={68}
            sx={{
              color: green[500],
            }}
          />
        </div>
      );
    }
    if (step == 3) {
      return (
        <Validation
          func={() => dispatch(resetCart())}
          height="70%"
          to="/"
          message1={"Commande validée"}
          message2={
            "Nous vous cacteroons  dans moins de 30 min pour le paiement et la livraison"
          }
        />
      );
    }
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

  const command = async () => {
    try {
      let request = {
        clientId: stateUser.id,
        status: "EN ATTENTE",
        cart: stateCart,
        total: totalCommande,
      };
      await addCommande(request);
    } catch (error) {}
  };

  const ManageBtn = () => {
    if (step == 0) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h1> TOTAL COMMANDE</h1>
            <h1> {totalCommande.toLocaleString("fr-FR")} FCFA</h1>
          </div>

          <Button
            variant="contained"
            onClick={() => setStep((prevState) => prevState + 1)}
            endIcon={<NavigateNextIcon />}
          >
            Suivant
          </Button>
        </div>
      );
    }
    if (step == 1) {
      if (stateUser && stateUser.id) {
        return (
          <>
            <Button
              variant="contained"
              onClick={() => setStep((prevState) => prevState - 1)}
              startIcon={<NavigateBackIcon />}
            >
              Retour
            </Button>
            <div style={{ width: 20 }}> </div>

            <Button
              variant="contained"
              onClick={() => setStep((prevState) => prevState + 1)}
              endIcon={<NavigateNextIcon />}
            >
              Suivant
            </Button>
          </>
        );
      }

      return (
        <Button
          variant="contained"
          onClick={() => setStep((prevState) => prevState - 1)}
          startIcon={<NavigateBackIcon />}
        >
          Retour
        </Button>
      );
    }
  };

  const notifications = () => {
    const event = Date.now();
    // const e = new Date(event);
    emailjs
      .send(
        "service_ylvxaws",
        "template_tu19im9", // Utilisez l'ID du modèle que vous avez créé sur EmailJS
        {
          to_email: "akfrehoboth@gmail.com",
          civility: stateUser.gender,
          lastname: `${stateUser.lastname} ${stateUser.firstname}`,
          total: `${totalCommande} FCFA`,
          created: transfoDate(event),
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

  return stateCart && stateCart.length > 0 ? (
    <Layout headerName={"Panier"}>
      <StepperUI step={step} />

      {/* <ListCommand products={stateCart} /> */}
      <Gestion stateCart={stateCart} stateUser={stateUser} />

      <div style={{ display: "flex", justifyContent: "center" }}>
        {/* <Link to="/signin"> */}
        <ManageBtn />

        {/* </Link> */}
      </div>
    </Layout>
  ) : (
    <Layout>
      <div
        style={{
          width: "100%",
          height: "80%",

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
