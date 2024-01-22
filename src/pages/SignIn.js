import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Layout from "../components/Layout";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";

import Divider from "@mui/material/Divider";
import { tryToConnect } from "../api/user";
import { useSelector, useDispatch } from "react-redux";

import {
  connexion,
  deconnexion,
  addOneItemFavoris,
  removeOneItemFavoris,
  updateProfil,
  deleteProfil,
} from "../redux/User";
import SignInComponent from "../components/signInComponent";

export default function SignIn() {
  let { state } = useLocation();

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <Layout>
      <SignInComponent redirectValue={state} />
    </Layout>
  );
}
