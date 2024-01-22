/* eslint-disable jsx-a11y/alt-text */
import "../App.css";

import { useLocation } from "react-router-dom";
import { useEffect } from "react";

import Layout from "../components/Layout";
import ListCommand from "../components/ListCommand";

function Details() {
  let { state } = useLocation();

  let cart = state.cart;
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <Layout headerName={"Details commande"} noIconCart>
      <ListCommand products={cart} />
    </Layout>
  );
}

export default Details;
