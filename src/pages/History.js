/* eslint-disable jsx-a11y/alt-text */
import "../App.css";

import Layout from "../components/Layout";
import Categories from "../components/Categories";
import SliderVertical from "../components/SliderVertical";
import Title from "../components/Title";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function History() {
  let { state } = useLocation();
  const [commandes, setCommandes] = useState([]);
  const [commandesDefault, setCommandesDefault] = useState([]);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    getCommandes();
    return () => {};
  }, []);

  const getCommandes = async () => {
    try {
      const { data } = await axios.get("http://127.0.0.1:8000/commandes/");

      setCommandesDefault(data);
      setCommandes(data);
      let total = 0;
      data
        .filter((item) => item.status === "Payée")
        .map((item) => {
          total += item.total;
        });
      setTotal(total);
    } catch (error) {
      console.log(error);
    }
  };

  const updateCommande = async (id, status) => {
    try {
      await axios.put(
        `http://127.0.0.1:8000/updateCommande/${id}?status=${status}`
      );
    } catch (error) {
      console.log(error);
    } finally {
      getCommandes();
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

  const Item = ({ data }) => {
    return (
      <div
        // className="slider-item"
        style={{
          display: "flex",
          height: 300,
          width: "100%",
          margin: 10,
          padding: 10,
          border: "1px solid lightgrey",
          borderRadius: 25,
          backgroundColor: "white",
          justifyContent: "center",
        }}
      >
        <Link to="/Article" state={{ data }}>
          <div
            style={{
              width: "100%",
            }}
          ></div>
        </Link>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1>
            {data.civility} {data.lastname} {data.firstname}
          </h1>
          <h1>{data.address} </h1>
          <h1>{data.phone} </h1>
          <h1>{data.email} </h1>
          <h3 style={{ fontSize: 12, color: "grey", padding: 5 }}>
            {" "}
            Créé : {transfoDate(data.created)}{" "}
          </h3>
          {/* {
    "id": 1,
    "civility": "Mr",
    "firstname": "test",
    "lastname": "brain",
    "address": "2 rue du soleil",
    "phone": "01233333",
    "email": "brain@test.fr",
    "status": "En attente",
   
} */}
          <div>
            <div
              style={{
                display: "flex",
                flexDirection: "center",
                justifyContent: "center",
              }}
            >
              <h1>Status : {data.status}</h1>
            </div>

            <h3 style={{ fontSize: 12, color: "grey", padding: 5 }}>
              Dernière modification : {transfoDate(data.updated)}
            </h3>
          </div>
          <Link
            to="/Details"
            state={{ data }}
            style={{ textDecoration: "none" }}
          >
            <button
              style={{
                marginRight: 20,
                marginBottom: 20,
                // paddingLeft: 10,
                // paddingRight: 10,
                // paddingBottom: 5,
                padding: 10,
                backgroundColor: "grey",
                color: "white",
                border: "none",
                display: "flex",
                alignItems: "center",
                borderRadius: 5,
              }}
            >
              {" "}
              Details
            </button>
          </Link>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {data.status == "En attente" && (
              <button
                onClick={() => updateCommande(data.id, "Annulée")}
                style={{
                  marginRight: 20,
                  // paddingLeft: 10,
                  // paddingRight: 10,
                  // paddingBottom: 5,
                  padding: 10,
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  borderRadius: 5,
                }}
              >
                {" "}
                Annuler
              </button>
            )}

            {data.status == "En attente" && (
              <button
                onClick={() => updateCommande(data.id, "En livraison")}
                style={{
                  marginRight: 20,
                  // paddingLeft: 10,
                  // paddingRight: 10,
                  // paddingBottom: 5,
                  padding: 10,
                  backgroundColor: "orange",
                  color: "white",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  borderRadius: 5,
                }}
              >
                {" "}
                En livraison
              </button>
            )}

            {data.status == "En attente" ||
              (data.status == "En livraison" && (
                <button
                  onClick={() => updateCommande(data.id, "Payée")}
                  style={{
                    marginRight: 20,
                    // paddingLeft: 10,
                    // paddingRight: 10,
                    // paddingBottom: 5,
                    padding: 10,
                    backgroundColor: "green",
                    color: "white",
                    border: "none",
                    display: "flex",
                    alignItems: "center",
                    borderRadius: 5,
                  }}
                >
                  {" "}
                  Payer
                </button>
              ))}
            {/* <span>{data?.name}</span>
          <span>{data?.price}</span>
          <span>{data?.description}</span> */}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Layout withoutFooter={true} headerName="Gestion">
      {/* <Title
        height={100}
        name={"Rehoboth Akf"}
        subname={
          "Chic et charme à chaque pas : Découvrez votre style chez nous ! Sacs, vêtements, beauté : L'exclusivité féminine, notre spécialité."
        }
      /> */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h2> Total paiement</h2>
        <h4
          style={{
            color: "green",
            fontSize: 20,
          }}
        >
          {" "}
          {total.toLocaleString("fr-FR")} FCFA
        </h4>
      </div>

      <div
        style={{
          width: "100%",
          height: 40,

          padding: 10,
          marginBottom: 10,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <input
          onChange={(e) => {
            const commandesFiltre = commandesDefault.filter((item) => {
              if (
                item.lastname
                  .toLowerCase()
                  .includes(e.target.value.toLowerCase()) ||
                item.firstname
                  .toLowerCase()
                  .includes(e.target.value.toLowerCase()) ||
                item.phone.toLowerCase().includes(e.target.value.toLowerCase())
              ) {
                return item;
              }
            });

            setCommandes(commandesFiltre);
          }}
          placeholder="recherche..."
          style={{
            width: "90%",
            height: 40,
            borderRadius: 10,
            border: "1px solid lightgray",
            padding: 20,
          }}
        />
      </div>

      {/* <Title height={50} name={"Categories"} />
      <Categories /> */}

      {/* <Title height={50} name={"Bestsellers"} /> */}
      <SliderVertical>
        <ul className="sliderVertical-list">
          {commandes && commandes.map((item) => <Item data={item} />)}
        </ul>
      </SliderVertical>
    </Layout>
  );
}

export default History;
