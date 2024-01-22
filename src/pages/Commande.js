/* eslint-disable jsx-a11y/alt-text */
import "../App.css";
import { useEffect } from "react";

import Layout from "../components/Layout";
import MapContainer from "../components/Map";
import ListCommandAdmin from "../components/ListCommandAdmin";

function Commande() {
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <Layout>
      <ListCommandAdmin />
    </Layout>
  );
}

export default Commande;
