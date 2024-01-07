/* eslint-disable jsx-a11y/alt-text */
import "../App.css";
import Menu from "../assets/menu.svg";
import Search from "../assets/search.svg";
import Cart from "../assets/shopping_bag.svg";
import Person from "../assets/person.svg";
import Favorite from "../assets/favorite.svg";
import Location from "../assets/location.svg";
import Layout from "../components/Layout";
import Categories from "../components/Categories";
import SliderVertical from "../components/SliderVertical";
import Title from "../components/Title";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function EditList() {
  let { state } = useLocation();
  const [products, setProducts] = useState([]);

  const Item = ({ data }) => {
    return (
      <div
        // className="slider-item"
        style={{
          height: 200,
          width: "40%",
          margin: 10,
          padding: 10,

          borderRadius: 25,
          backgroundColor: "white",
        }}
      >
        <Link to="/Edit" state={{ data }}>
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
        </div>
      </div>
    );
  };

  useEffect(() => {
    getArticles();
    return () => {};
  }, []);

  const getArticles = async () => {
    try {
      const { data } = await axios.get("http://127.0.0.1:8000/articles/");

      setProducts(data);
    } catch (error) {}
  };

  return (
    <Layout headerName={"Articles modifiable"}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h2>{state?.item?.name?.toUpperCase()}</h2>
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
          {products && products.map((item) => <Item data={item} />)}
        </ul>
      </SliderVertical>
    </Layout>
  );
}

export default EditList;
