/* eslint-disable jsx-a11y/alt-text */
import "../App.css";
import { useSelector, useDispatch } from "react-redux";

import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Favorite from "../components/Favorite";
import { allArticles } from "../api/articles";
import TitlebarImageList from "../components/ImageList";
import TextField from "@mui/material/TextField";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const Products = () => {
  let { state } = useLocation();
  const stateNav = useSelector((state) => state.navigation.value);
  const stateUser = useSelector((state) => state.user.value);

  console.log(stateNav);
  const dispatch = useDispatch();
  const screenFavoris = window.location.pathname === "/Favoris";

  const [products, setProducts] = useState([]);
  const [productsDefault, setProductsDefault] = useState([]);
  useEffect(() => {
    getArticles();
    return () => {};
  }, []);

  const getArticles = async () => {
    let tabFavoris = JSON.parse(localStorage.getItem("akfRehobothFav"));
    try {
      const { data } = await allArticles();

      if (tabFavoris) {
        const productsFiltered = data.filter((item) =>
          stateUser.favoris.includes(item.id)
        );
        setProducts(productsFiltered);
        setProductsDefault(productsFiltered);
      } else {
        setProducts([]);
        setProductsDefault([]);
      }
    } catch (error) {}
  };

  return productsDefault.length > 0 ? (
    <Layout headerName={state?.item?.name?.toUpperCase()}>
      <TextField
        id="filled-search"
        label="Recherche"
        type="search"
        variant="filled"
        sx={{ width: "100%" }}
      />

      <TitlebarImageList products={products} />
    </Layout>
  ) : (
    <Layout headerName="Favoris">
      <div
        style={{
          width: "100%",
          height: "90%",

          padding: 10,
          marginBottom: 10,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ErrorOutlineIcon sx={{ height: 50, width: 50 }} />
        <h1 style={{ fontSize: 20, marginTop: 20 }}>
          {" "}
          Aucun article en favoris
        </h1>
      </div>
    </Layout>
  );
};

export default Products;
