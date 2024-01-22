/* eslint-disable no-unreachable */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import NavShortcut from "./NavShortcut";
import PinDropIcon from "@mui/icons-material/PinDrop";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import ListAltIcon from "@mui/icons-material/ListAlt";

// const enumOnglet={
//   SHOP : ShopFooter,
//   ADMIN : AdminFooter,
//   CLIENT: UserFooter,

// }

function Footer() {
  const stateUser = useSelector((state) => state.user.value);
  const [onglet, setOnglet] = useState({});
  useEffect(() => {
    return () => {};
  }, []);

  const ShopFooter = () => {
    return (
      <>
        {" "}
        <NavShortcut
          title="Acceuil"
          link="/"
          Icon={(isActive) => (
            // <Home
            //   fill={isActive ? "#1976d2" : "grey"}
            //   style={{ width: "80%", height: "50%" }}
            // />
            <HomeIcon sx={{ color: isActive ? "#1976d2" : "grey" }} />
          )}
        />
        <NavShortcut
          link="/Favoris"
          title="Favoris"
          state={{ item: { type: "Favoris", name: "Favoris" } }}
          Icon={(isActive) => (
            <FavoriteIcon sx={{ color: isActive ? "#1976d2" : "grey" }} />
          )}
        />
        <NavShortcut
          link="/CheckOut"
          title="Panier"
          Icon={(isActive) => (
            <ShoppingBagIcon sx={{ color: isActive ? "#1976d2" : "grey" }} />
          )}
        />
        <NavShortcut
          link="/commande"
          title="Commandes"
          Icon={(isActive) => (
            <ListAltIcon sx={{ color: isActive ? "#1976d2" : "grey" }} />
          )}
        />
      </>
    );
  };

  const AdminFooter = () => {
    return (
      <>
        {" "}
        <NavShortcut
          title="Acceuil"
          link="/"
          Icon={(isActive) => (
            // <Home
            //   fill={isActive ? "#1976d2" : "grey"}
            //   style={{ width: "80%", height: "50%" }}
            // />
            <HomeIcon sx={{ color: isActive ? "#1976d2" : "grey" }} />
          )}
        />
        <NavShortcut
          link="/AddOrEdit"
          title="Ajout"
          // state={{ item: { type: "Favoris", name: "Favoris" } }}
          Icon={(isActive) => (
            <AddIcon sx={{ color: isActive ? "#1976d2" : "grey" }} />
          )}
        />
        <NavShortcut
          link="/Products"
          title="Edition"
          state={{ item: { type: "Edition", name: "Edition" } }}
          Icon={(isActive) => (
            <EditIcon sx={{ color: isActive ? "#1976d2" : "grey" }} />
          )}
        />
        <NavShortcut
          link="/commande"
          title="Commandes"
          Icon={(isActive) => (
            <ListAltIcon sx={{ color: isActive ? "#1976d2" : "grey" }} />
          )}
        />
        <NavShortcut
          link="/admin"
          title="Admin"
          Icon={(isActive) => (
            <ManageAccountsIcon sx={{ color: isActive ? "#1976d2" : "grey" }} />
          )}
        />
        {/* <NavShortcut
          link="/admin"
          title="Stock"
          Icon={(isActive) => (
            <ManageAccountsIcon sx={{ color: isActive ? "#1976d2" : "grey" }} />
          )}
        /> */}
      </>
    );
  };

  const ClientFooter = () => {
    return (
      <>
        {" "}
        <NavShortcut
          title="Acceuil"
          link="/"
          Icon={(isActive) => (
            // <Home
            //   fill={isActive ? "#1976d2" : "grey"}
            //   style={{ width: "80%", height: "50%" }}
            // />
            <HomeIcon sx={{ color: isActive ? "#1976d2" : "grey" }} />
          )}
        />
        <NavShortcut
          link="/Favoris"
          title="Favoris"
          state={{ item: { type: "Favoris", name: "Favoris" } }}
          Icon={(isActive) => (
            <FavoriteIcon sx={{ color: isActive ? "#1976d2" : "grey" }} />
          )}
        />
        <NavShortcut
          link="/CheckOut"
          title="Panier"
          Icon={(isActive) => (
            <ShoppingBagIcon sx={{ color: isActive ? "#1976d2" : "grey" }} />
          )}
        />
        <NavShortcut
          link="/Contact"
          title="Contact"
          Icon={(isActive) => (
            <PinDropIcon sx={{ color: isActive ? "#1976d2" : "grey" }} />
          )}
        />
      </>
    );
  };

  const DefaultFooter = () => {
    return (
      <>
        {" "}
        <NavShortcut
          title="Acceuil"
          link="/"
          Icon={(isActive) => (
            // <Home
            //   fill={isActive ? "#1976d2" : "grey"}
            //   style={{ width: "80%", height: "50%" }}
            // />
            <HomeIcon sx={{ color: isActive ? "#1976d2" : "grey" }} />
          )}
        />
        <NavShortcut
          link="/Favoris"
          title="Favoris"
          state={{ item: { type: "Favoris", name: "Favoris" } }}
          Icon={(isActive) => (
            <FavoriteIcon sx={{ color: isActive ? "#1976d2" : "grey" }} />
          )}
        />
        <NavShortcut
          link="/CheckOut"
          title="Panier"
          Icon={(isActive) => (
            <ShoppingBagIcon sx={{ color: isActive ? "#1976d2" : "grey" }} />
          )}
        />
        <NavShortcut
          link="/Contact"
          title="Contact"
          Icon={(isActive) => (
            <PinDropIcon sx={{ color: isActive ? "#1976d2" : "grey" }} />
          )}
        />
      </>
    );
  };

  return (
    <div
      style={{
        width: "100vw",
        height: 70,

        display: "flex",
        flex: "0 0 auto",
        border: "1px solid white",
        // borderRadius: "30px 30px 0px 0px",
        // boxShadow: "#785b5b 0px -2px 5px",

        alignItems: "center",
        backgroundColor: "white", //"rgba(255,255,255,0.4)",
      }}
    >
      {stateUser.type == "ADMIN" && <AdminFooter />}
      {stateUser.type == "CLIENT" && <ClientFooter />}
      {stateUser.type == "SHOP" && <ShopFooter />}
      {stateUser.hasOwnProperty("type") == false && <DefaultFooter />}

      {/* <img src={Person} style={{ width: "50%", height: "50%", color: "red" }} /> */}
      {/* <Favorite fill="grey" style={{ width: "50%", height: "50%" }} /> */}
    </div>
  );
}

export default Footer;
