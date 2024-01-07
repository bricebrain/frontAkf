/* eslint-disable no-unreachable */
import React from "react";
import { NavLink } from "react-router-dom";
// import Person from "../assets/person.svg";
import { ReactComponent as Favorite } from "../assets/favorite.svg";
import { ReactComponent as Location } from "../assets/location.svg";
import { ReactComponent as Cart } from "../assets/shopping_bag.svg";
import { ReactComponent as Person } from "../assets/person.svg";
import { ReactComponent as Home } from "../assets/home.svg";
import NavShortcut from "./NavShortcut";

function Footer() {
  return (
    <div
      style={{
        width: "100vw",
        height: 70,

        display: "flex",

        border: "1px solid white",
        // borderRadius: "30px 30px 0px 0px",
        boxShadow: "#785b5b 0px -2px 5px",

        alignItems: "center",
        backgroundColor: "rgba(255,255,255,0.4)",
      }}
    >
      <NavShortcut
        title="Acceuil"
        link="/"
        Icon={(isActive) => (
          <Home
            fill={isActive ? "green" : "grey"}
            style={{ width: "80%", height: "50%" }}
          />
        )}
      />

      <NavShortcut
        link="/Favoris"
        title="Favoris"
        Icon={(isActive) => (
          <Favorite
            fill={isActive ? "green" : "grey"}
            style={{ width: "80%", height: "50%" }}
          />
        )}
      />

      <NavShortcut
        link="/CheckOut"
        title="Panier"
        Icon={(isActive) => (
          <Cart
            fill={isActive ? "green" : "grey"}
            style={{ width: "80%", height: "50%" }}
          />
        )}
      />

      <NavShortcut
        link="/Contact"
        title="Contact"
        Icon={(isActive) => (
          <Location
            fill={isActive ? "green" : "grey"}
            style={{ width: "80%", height: "50%" }}
          />
        )}
      />

      <NavShortcut
        link="/admin"
        title="Admin"
        Icon={(isActive) => (
          <Person
            fill={isActive ? "green" : "grey"}
            style={{ width: "80%", height: "50%" }}
          />
        )}
      />

      {/* <img src={Person} style={{ width: "50%", height: "50%", color: "red" }} /> */}
      {/* <Favorite fill="grey" style={{ width: "50%", height: "50%" }} /> */}
    </div>
  );
}

export default Footer;
