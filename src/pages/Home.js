/* eslint-disable jsx-a11y/alt-text */
import "../App.css";
import Menu from "../assets/menu.svg";
import Layout from "../components/Layout";
import Categories from "../components/Categories";
import Slider from "../components/Slider";
import Title from "../components/Title";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Favorite from "../components/Favorite";

function Home() {
  const [products, setProducts] = useState([]);
  const [contact, setContact] = useState(null);

  useEffect(() => {
    let objetRecupere = JSON.parse(localStorage.getItem("akfRehoboth"));
    if (objetRecupere) {
      setContact(objetRecupere);
    }
    getArticles();
    return () => {};
  }, []);

  const getArticles = async () => {
    try {
      const { data } = await axios.get(
        "https://backend-akf.onrender.com/articles/"
      );
      console.log(data);

      const productsFiltered = data.filter(
        (item) => item.isBestseller === true
      );
      setProducts(productsFiltered);
    } catch (error) {}
  };

  // const Item = (props) => {
  //   return (
  //     <div
  //       style={{
  //         height: 300,
  //         width: 300,
  //         margin: 10,
  //         padding: 10,

  //         borderRadius: 25,
  //         backgroundColor: "white",
  //         display: "flex",
  //         justifyContent: "center",
  //       }}
  //       onClick={props.onClick}
  //     >
  //       {props.children}
  //     </div>
  //   );
  // };

  const Item = ({ data }) => {
    return (
      <div
        style={{
          height: 300,
          width: 200,
          margin: 10,
          padding: 10,

          borderRadius: 25,
          backgroundColor: "white",

          // flexDirection: "column",
          // alignItems: "center",
        }}
      >
        <Link to="/Article" state={{ data }}>
          <div
            style={{
              height: "60%",
              width: "100%",
              objectFit: "contain",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              style={{
                objectFit: "contain",
                display: "flex",
              }}
              src={data?.picture && data?.picture[0]}
            ></img>
          </div>
        </Link>

        <div
          style={{
            display: "flex",
            justifyContent: "center",

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
          <Favorite id={data.id} />
        </div>
      </div>
    );
  };

  const handleClick = () => {};

  return (
    <Layout isHome={true}>
      <div style={{ marginTop: 30 }}></div>
      <Title
        header={true}
        height={100}
        name={contact ? `Akwaba ${contact.prenom}` : null}
        subname={
          "Chic et charme à chaque pas : Découvrez votre style chez nous ! Sacs, vêtements, beauté : L'exclusivité féminine, notre spécialité."
        }
      />

      <Title height={50} name={"Categories"} marginBottom={5} />
      <Categories />

      <Title height={50} name={"Meilleurs ventes"} marginBottom={0} />
      <Slider>
        <ul className="slider-list">
          {products.map((item) => (
            <Item onClick={handleClick} data={item} />
            //   <img
            //     src={item.picture[0]}
            //     alt={`Blob ${1}`}
            //     height={"80%"}
            //     width={"80%"}
            //     style={{ borderRadius: 10, objectFit: "contain" }}
            //   />
            // </Item>
          ))}
        </ul>
      </Slider>
    </Layout>
  );
}

export default Home;
