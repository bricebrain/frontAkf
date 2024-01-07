import React from "react";
import Layout from "../components/Layout";
import { NavLink } from "react-router-dom";

const Admin = () => {
  return (
    <Layout headerName={"Administration"}>
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          padding: 20,
        }}
      >
        <NavLink
          to={"/history"}
          style={{
            width: "100%",
            height: "25%",
            textDecoration: "none",
          }}
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          <div
            style={{
              padding: 20,
              margin: 20,
              border: "1px solid white",
              borderRadius: 25,
              backgroundColor: "white",
              height: "100%",
              display: "flex",

              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Validation livraison/paiement
          </div>
        </NavLink>

        <NavLink
          to={"/Ajouter"}
          style={{
            width: "100%",
            height: "25%",
            textDecoration: "none",
          }}
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          <div
            style={{
              padding: 20,
              margin: 20,
              border: "1px solid white",
              borderRadius: 25,
              backgroundColor: "white",
              height: "100%",
              display: "flex",

              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Ajoutez Articles
          </div>
        </NavLink>

        <NavLink
          to={"/EditList"}
          style={{
            width: "100%",
            height: "25%",
            textDecoration: "none",
          }}
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          <div
            style={{
              padding: 20,
              margin: 20,
              border: "1px solid white",
              borderRadius: 25,
              backgroundColor: "white",
              height: "100%",
              display: "flex",

              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Modifiez Articles
          </div>
        </NavLink>
      </div>
    </Layout>
  );
};

export default Admin;
