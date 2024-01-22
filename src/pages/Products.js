/* eslint-disable jsx-a11y/alt-text */
import "../App.css";

import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import Layout from "../components/Layout";
import { allArticles } from "../api/articles";
import TitlebarImageList from "../components/ImageList";
import TextField from "@mui/material/TextField";

const Products = () => {
  let { state } = useLocation();

  const [products, setProducts] = useState([]);
  const [productsDefault, setProductsDefault] = useState([]);
  useEffect(() => {
    getArticles();
    return () => {};
  }, []);

  const getArticles = async () => {
    let productsFiltered;
    try {
      const { data } = await allArticles();
      if (state.item.type == "Edition") {
        productsFiltered = data;
      } else {
        productsFiltered = data.filter(
          (item) => item.category === state.item.type
        );
      }

      setProducts(productsFiltered);
      setProductsDefault(productsFiltered);
    } catch (error) {}
  };

  // let tabphrase = phrase.split(" ");
  // let regex = new RegExp("\\b" + motRecherche + "\\b");
  const handleFilter = (e) => {
    let motRecherche = e.target.value.toLowerCase().trim();

    let filtered = productsDefault.filter((item) => {
      let brandMatch = item.brand.toLowerCase().trim().includes(motRecherche);
      let descriptionMatch = item.description
        .toLowerCase()
        .trim()
        .includes(motRecherche);

      return brandMatch || descriptionMatch;
    });

    setProducts(filtered);
  };

  return (
    <Layout headerName={state?.item?.name?.toUpperCase()}>
      <TextField
        id="filled-search"
        label="Recherche"
        type="search"
        variant="filled"
        sx={{ width: "100%" }}
        onChange={handleFilter}
      />

      <TitlebarImageList products={products} type={state.item.type} />
    </Layout>
  );
};

export default Products;
