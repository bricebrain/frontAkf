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
import { useNavigate } from "react-router-dom";
import {
  connexion,
  deconnexion,
  addOneItemFavoris,
  removeOneItemFavoris,
  updateProfil,
  deleteProfil,
} from "../redux/User";
import SignUpComponent from "./signUpComponent";

const Space = ({ height }) => {
  return <div style={{ height: height ?? 9 }} />;
};
const resultDefault = {
  errorIdentifiant: false,
  detailsErrorIdentifiant: null,
  errorPassword: false,
  detailsErrorPassword: null,
};

export default function SignInComponent({ redirectValue }) {
  const navigate = useNavigate();
  let { state } = useLocation();
  const stateUser = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  const [info, setInfo] = useState({
    email: null,
    password: null,
  });
  const [result, setResult] = useState(resultDefault);
  const [useSignUp, setUseSignUp] = useState(false);

  useEffect(() => {
    return () => {};
  }, []);

  const isValidate = (data) => {
    if (
      data.email &&
      data.email.length > 0 &&
      data.password &&
      data.password.length > 0
    ) {
      return true;
    }

    return false;
  };

  const submit = async () => {
    try {
      const { data } = await tryToConnect(info);
      dispatch(connexion(data));

      if (redirectValue) {
        return navigate("/");
      }
    } catch (error) {
      let typeError = error.response?.data?.detail;
      if (typeError == "Client not found") {
        setResult({
          detailsErrorIdentifiant: "cet identifiant n'existe pas",
          errorIdentifiant: true,
        });
      }

      if (typeError == "password invalid") {
        setResult({
          detailsErrorPassword: "mot de passe incorrect",
          errorPassword: true,
        });
      }
    }
  };

  return useSignUp ? (
    <SignUpComponent />
  ) : (
    <>
      <div>
        <Typography
          component="div"
          variant="h4"
          color="grey"
          sx={{
            position: "relative",
            p: 4,
            pt: 2,
            pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
          }}
        >
          Se connecter
        </Typography>
      </div>

      <Space height={20} />
      <div
        style={{
          display: "flex",
          height: "50%",
          width: "100%",

          flexDirection: "column",

          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TextField
          error={result.errorIdentifiant}
          helperText={result.detailsErrorIdentifiant}
          id="outlined-number"
          label="Email"
          required
          value={info.price}
          defaultValue={info.price}
          onChange={(e) => {
            if (result.errorIdentifiant) {
              setResult(resultDefault);
            }
            setInfo((prevState) => {
              return { ...prevState, email: e.target.value };
            });
          }}
          style={{
            width: "80%",
            marginBottom: 40,
          }}
        />
        <Space height={20} />
        <TextField
          error={result.errorPassword}
          helperText={result.detailsErrorPassword}
          required
          id="outlined-number"
          label="Mot de passe"
          type="password"
          value={info.price}
          defaultValue={info.price}
          onChange={(e) => {
            if (result.errorPassword) {
              setResult(resultDefault);
            }
            setInfo((prevState) => {
              return { ...prevState, password: e.target.value };
            });
          }}
          style={{
            width: "80%",
            marginBottom: 40,
          }}
        />
      </div>

      <Stack direction="row" spacing={2} justifyContent={"center"}>
        {state && state.data && (
          <Button variant="outlined" color="error">
            Supprimer
          </Button>
        )}

        <Button
          disabled={!isValidate(info)}
          variant="contained"
          color="success"
          onClick={() => submit()}
        >
          Connecter
        </Button>
      </Stack>
      <Space height={20} />
      <Divider component="ul" />
      <Space height={20} />

      <Stack direction="row" spacing={2} justifyContent={"center"}>
        <Button
          variant="text"
          onClick={() => {
            setUseSignUp(true);
          }}
        >
          creer un compte
        </Button>
      </Stack>
    </>
  );
}
