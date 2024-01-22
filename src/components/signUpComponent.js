import { useState, useEffect } from "react";
import FormControl, { useFormControl } from "@mui/material/FormControl";
import { Link, useLocation, useNavigate } from "react-router-dom";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Dropzone from "react-dropzone";
import Layout from "../components/Layout";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { createAccount } from "../api/user";
import { useSelector, useDispatch } from "react-redux";

import {
  connexion,
  deconnexion,
  addOneItemFavoris,
  removeOneItemFavoris,
  updateProfil,
  deleteProfil,
} from "../redux/User";

// error={result.errorIdentifiant}
// helperText={result.detailsErrorIdentifiant}

const Space = ({ height }) => {
  return <div style={{ height: height ?? 9 }} />;
};

export default function SignUpComponent({}) {
  let { state } = useLocation();
  const navigate = useNavigate();
  const stateUser = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  const [end, setEnd] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [user, setUser] = useState({
    lastname: "",
    firstname: "",
    address: "",
    phone: "",
    email: "",
    status: "ACTIVE",
    favoris: [],
    password: "",
    type: "CLIENT",
    gender: "",
    passwordVerif: "",
  });

  useEffect(() => {
    return () => {};
  }, []);

  const isValidate = (data) => {
    console.log(data);
    // lastname: "",
    // firstname: "",
    // address: "",
    // phone: "",
    // email: "",
    // status: "ACTIVE",
    // favoris: [],
    // password: "",
    // type: "CLIENT",
    // gender: "",
    // passwordVerif: "",
    if (
      data.gender.length > 0 &&
      data.lastname.length > 1 &&
      data.firstname.length > 1 &&
      data.address.length > 1 &&
      data.phone.length > 1 &&
      data.email.length > 1 &&
      data.password.length > 0 &&
      data.passwordVerif.length > 0 &&
      data.passwordVerif == data.password
    ) {
      return true;
    }
    return false;
  };

  const submit = async () => {
    let request = { ...user };
    delete request["passwordVerif"];
    try {
      const { data } = await createAccount(request);
      dispatch(connexion(data));
      return navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
            fontSize: 20,
          }}
        >
          Création de compte
        </Typography>
      </div>

      <form noValidate autoComplete="off">
        <FormControl sx={{ width: "100%", padding: 1 }}>
          <FormLabel id="demo-row-radio-buttons-group-label">
            Civilité
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel
              value="Mme"
              control={<Radio />}
              label="Mme"
              onChange={(e) => {
                setUser((prevState) => {
                  return { ...prevState, gender: e.target.value };
                });
              }}
            />
            <FormControlLabel
              value="Mr"
              control={<Radio />}
              label="Mr"
              onChange={(e) => {
                setUser((prevState) => {
                  return { ...prevState, gender: e.target.value };
                });
              }}
            />
            <FormControlLabel
              value="."
              control={<Radio />}
              label="Autre"
              onChange={(e) => {
                setUser((prevState) => {
                  return { ...prevState, gender: e.target.value };
                });
              }}
            />
          </RadioGroup>

          <Space height={20} />
          <TextField
            required
            id="outlined-required"
            label="Nom"
            defaultValue={user.lastname}
            value={user.lastname}
            onChange={(e) => {
              setUser((prevState) => {
                return { ...prevState, lastname: e.target.value };
              });
            }}
          />

          <Space height={20} />

          <TextField
            required
            id="outlined-required"
            label="Prenom"
            defaultValue={user.firstname}
            value={user.firstname}
            onChange={(e) => {
              setUser((prevState) => {
                return { ...prevState, firstname: e.target.value };
              });
            }}
            // value={info.brand}
          />

          <Space height={20} />
          <TextField
            multiline
            minRows={2}
            required
            id="outlined-required"
            label="Adresse"
            defaultValue={user.address}
            value={user.address}
            onChange={(e) => {
              setUser((prevState) => {
                return { ...prevState, address: e.target.value };
              });
            }}
            // value={info.brand}
          />

          <Space height={20} />

          <TextField
            id="outlined-select-currency"
            required
            label="Télephone"
            defaultValue={user.phone}
            value={user.phone}
            onChange={(e) => {
              setUser((prevState) => {
                return { ...prevState, phone: e.target.value };
              });
            }}
          />

          <Space height={20} />

          <TextField
            id="outlined-number"
            label="Email"
            required
            value={user.email}
            defaultValue={user.email}
            onChange={(e) => {
              setUser((prevState) => {
                return { ...prevState, email: e.target.value };
              });
            }}
          />
          <Space height={20} />
          <TextField
            required
            id="outlined-number"
            label="Mot de passe"
            type="password"
            InputLabelProps={{
              shrink: true,
            }}
            value={user.price}
            defaultValue={user.password}
            onChange={(e) => {
              setUser((prevState) => {
                return { ...prevState, password: e.target.value };
              });
            }}
          />
          <Space height={20} />
          <TextField
            required
            id="outlined-number"
            label="Confirmer mot de passe"
            type="password"
            InputLabelProps={{
              shrink: true,
            }}
            value={user.passwordVerif}
            defaultValue={user.passwordVerif}
            onChange={(e) => {
              setUser((prevState) => {
                return { ...prevState, passwordVerif: e.target.value };
              });
            }}
          />
          <Space height={20} />
          <Stack
            direction="row"
            spacing={2}
            justifyContent={"center"}
            paddingTop={1}
          >
            {state && state.data && (
              <Button variant="outlined" color="error">
                Supprimer
              </Button>
            )}

            <Button
              disabled={!isValidate(user)}
              variant="contained"
              color="success"
              onClick={() => submit()}
            >
              Sauvegarder
            </Button>
          </Stack>
        </FormControl>
      </form>
    </>
  );
}
