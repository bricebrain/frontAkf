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
import { addCommande } from "../api/commandes";
import { stockArticles } from "../api/articles";

function Stock() {
  let { state } = useLocation();

  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadStock();

    return () => {};
  }, []);

  const loadStock = async () => {
    try {
      const { data } = await stockArticles();
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout headerName={"Panier"}>
      <ListStock products={products} />
    </Layout>
  );
}

export default Stock;
