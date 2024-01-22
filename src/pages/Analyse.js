/* eslint-disable jsx-a11y/alt-text */
import "../App.css";
import { useSelector, useDispatch } from "react-redux";
import SliderVertical from "../components/SliderVertical";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { ReactComponent as EmptyCart } from "../assets/emptyCart.svg";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBackIcon from "@mui/icons-material/NavigateBefore";
import CircularProgress from "@mui/material/CircularProgress";
import emailjs from "emailjs-com";

import { green } from "@mui/material/colors";

import {
  incrementQuantity,
  decrementQuantity,
  removeItem,
  resetCart,
} from "../redux/Cart";
import Layout from "../components/Layout";
import ListStock from "../components/ListStock";
import StepperUI from "../components/Stepper";
import SignInComponent from "../components/signInComponent";
import PreviewComponent from "../components/previewComponent";
import Validation from "../components/Validation";
import { addCommande, analyse } from "../api/commandes";
import { allArticles, stockArticles } from "../api/articles";
import ListTopVentes from "../components/ListSTopVentes";

function Analyse() {
  let { state } = useLocation();

  const dispatch = useDispatch();

  const [analyseVente, setAnalyseVente] = useState({});
  const [listId, setIstId] = useState([]);
  const [topVentes, setTopVentes] = useState({});
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadStock();

    return () => {};
  }, []);

  const loadStock = async () => {
    try {
      const { data } = await analyse();
      const response = await allArticles();

      let objKeys = Object.keys(data[0]);
      let objValue = data[0];
      console.log(objKeys);
      console.log(objValue);

      let productFiltered = response.data
        .filter((item) => objKeys.includes(`${item.id}`))
        .map((item) => {
          item["nombre_vendu"] = objValue[`${item.id}`];

          return item;
        });

      const sorted = productFiltered.sort(
        (a, b) => b.nombre_vendu - a.nombre_vendu
      );

      setProducts(sorted);
      setAnalyseVente(data[1]);
    } catch (error) {
      console.log(error);
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
    <Layout headerName={"Panier"}>
      <Container height={50}>
        <Block height={50}>
          Ventes Total :{" "}
          {analyseVente.montant_total &&
            analyseVente.montant_total.toLocaleString("fr-FR")}{" "}
          FCFA
        </Block>
      </Container>
      <Container>
        <Block type="Sacs" value={analyseVente["BAG"]} />
        <Block type="Prêt à porter" value={analyseVente["CLOTHING"]} />
      </Container>

      <Container>
        <Block type="Soins du corps" value={analyseVente["CARE"]} />
        <Block
          type="Maquillage & accessoires"
          value={analyseVente["BEAUTY_AND_ACCESORIES"]}
        />
      </Container>
      <Container height={50}>
        <Block height={50}>TOP VENTES</Block>
      </Container>
      <ListTopVentes products={products} />
    </Layout>
  );
}

export default Analyse;
