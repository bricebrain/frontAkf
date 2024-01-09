/* eslint-disable jsx-a11y/alt-text */
import "../App.css";
import SliderVertical from "../components/SliderVertical";
import { ReactComponent as Error } from "../assets/error.svg";

import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import Layout from "../components/Layout";
import Favorite from "../components/Favorite";
import { allArticles } from "../api/articles";

const Products = () => {
  let { state } = useLocation();
  const screenFavoris = window.location.pathname === "/Favoris";

  const [products, setProducts] = useState([]);
  const [productsDefault, setProductsDefault] = useState([]);
  useEffect(() => {
    getArticles();
    return () => {};
  }, []);

  const Item = ({ data }) => {
    return (
      <div
        style={{
          height: 200,
          width: "40%",
          margin: 10,
          padding: 10,

          borderRadius: 25,
          backgroundColor: "white",
        }}
      >
        <Link to="/Article" state={{ data }}>
          <img
            style={{
              width: "100%",
              height: "60%",
              objectFit: "contain",
            }}
            src={data?.picture && data?.picture[0]}
          ></img>
        </Link>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",

            flexDirection: "column",
            borderTop: "1px solid lightgrey",
            padding: 0,
            margin: 0,
            height: "40%",
          }}
        >
          <span
            style={{
              padding: 0,
              margin: 0,
            }}
          >
            {data?.brand}
          </span>

          <span
            style={{
              padding: 0,
              margin: 0,
              fontSize: 12,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {data?.description}
          </span>
          <span
            style={{
              padding: 0,
              margin: 0,
              textAlign: "right",
              color: "orange",
            }}
          >
            {data?.price.toLocaleString("fr-FR")} FCFA
          </span>
          <Favorite id={data?.id} />
        </div>
      </div>
    );
  };

  const getArticles = async () => {
    let tabFavoris = JSON.parse(localStorage.getItem("akfRehobothFav"));
    try {
      const { data } = await allArticles();

      if (tabFavoris) {
        const productsFiltered = data.filter((item) =>
          tabFavoris.includes(item.id)
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
    <Layout
      headerName={screenFavoris ? "Favoris" : state?.item?.name?.toUpperCase()}
    >
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
            const productsFiltre = productsDefault.filter((item) => {
              if (
                item.brand
                  .toLowerCase()
                  .includes(e.target.value.toLowerCase()) ||
                item.description
                  .toLowerCase()
                  .includes(e.target.value.toLowerCase())
              ) {
                return item;
              }
            });

            setProducts(productsFiltre);
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

      <SliderVertical>
        <ul className="sliderVertical-list">
          {products && products.map((item) => <Item data={item} />)}
        </ul>
      </SliderVertical>
    </Layout>
  ) : (
    <Layout headerName="Favoris">
      <div
        style={{
          width: "100%",
          height: "100%",

          padding: 10,
          marginBottom: 10,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Error style={{ height: 50, width: 50 }} />
        <h1 style={{ fontSize: 20, marginTop: 20 }}>
          {" "}
          Aucun article en favoris
        </h1>
      </div>
    </Layout>
  );
};

export default Products;
