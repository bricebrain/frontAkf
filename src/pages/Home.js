/* eslint-disable jsx-a11y/alt-text */
import "../App.css";
import Layout from "../components/Layout";
import Slider from "../components/Slider";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Favorite from "../components/Favorite";
import { allArticles } from "../api/articles";

import List from "../components/List";
import Cat from "../components/Cat";
import Cat2 from "../components/Cat2";
import { updateFavoris } from "../redux/User";
import TitlebarImageList from "../components/ImageList";

function Home() {
  const [products, setProducts] = useState([]);
  const stateUser = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  console.log({ stateUser });
  useEffect(() => {
    getFavorite();
    getArticles();
    return () => {};
  }, []);

  const getArticles = async () => {
    try {
      const { data } = await allArticles();

      const productsFiltered = data.filter(
        (item) => item.isBestseller === true
      );
      setProducts(productsFiltered);
    } catch (error) {}
  };

  const getFavorite = async () => {
    let tabFavoris = JSON.parse(localStorage.getItem("akfRehobothFav"));
    if (tabFavoris && tabFavoris.length > 0) {
      dispatch(updateFavoris(tabFavoris));
    }
  };

  const Block = ({ children, height, type, value }) => {
    return (
      <div
        style={{
          width: "100%",
          height: height ?? 100,
          border: "1px solid white",
          backgroundColor: "grey",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 20,
          fontWeight: "bold",
        }}
      >
        {children}
        {type && (
          <>
            {" "}
            <div
              style={{
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              {type}{" "}
            </div>
            <div
              style={{
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              Vendu(s): {value}
            </div>
          </>
        )}
      </div>
    );
  };

  const Container = ({ children, height }) => {
    return (
      <div
        style={{
          width: "100%",
          height: height ?? 100,
          display: "flex",
          flex: 1,
        }}
      >
        {children}
      </div>
    );
  };

  return (
    <Layout isHome={true}>
      <Container height={50}>
        <Block height={50}>CATEGORIES</Block>
      </Container>
      <Cat />
      <Cat2 />

      <Container height={50}>
        <Block height={50}>SUGGESTIONS</Block>
      </Container>
      {/* <Slider>
        <ul className="slider-list">
          {products.map((item) => (
            <List item={item} />
          ))}
        </ul>
      </Slider> */}
      <TitlebarImageList products={products} />
    </Layout>
  );
}

export default Home;
