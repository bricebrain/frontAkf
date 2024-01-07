/* eslint-disable jsx-a11y/alt-text */
import "../App.css";
import SliderVertical from "../components/SliderVertical";

import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import Layout from "../components/Layout";
import Favorite from "../components/Favorite";

const Products = () => {
  let { state } = useLocation();

  console.log({ state });
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
    try {
      const { data } = await axios.get("http://127.0.0.1:8000/articles/");

      const productsFiltered = data.filter(
        (item) => item.category === state.item.type
      );
      setProducts(productsFiltered);
      setProductsDefault(productsFiltered);
    } catch (error) {}
  };

  return (
    <Layout headerName={state?.item?.name?.toUpperCase()}>
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
  );
};

export default Products;
