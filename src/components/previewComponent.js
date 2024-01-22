import { useState, useEffect } from "react";
import FormControl, { useFormControl } from "@mui/material/FormControl";
import { Link, useLocation } from "react-router-dom";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Dropzone from "react-dropzone";
import Layout from "./Layout";
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

const Space = ({ height }) => {
  return <div style={{ height: height ?? 9 }} />;
};

export default function PreviewComponent({ userData }) {
  let { state } = useLocation();
  const stateUser = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  const [end, setEnd] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [user, setUser] = useState({
    lastname: "",
    firstname: 0,
    address: false,
    phone: "",
    email: "",
    status: "ACTIVE",
    favoris: [],
    type: "CLIENT",
    gender: "",
  });

  useEffect(() => {
    setUser(userData);
    return () => {};
  }, []);

  const isValidate = (data) => {
    // console.log({ data });
    // if (
    //   data.brand.length > 0 &&
    //   data.price > 1 &&
    //   data.category.length > 0 &&
    //   data.description.length > 0 &&
    //   selectedFiles.length > 0
    // ) {
    //   return true;
    // }
    // return false;
  };

  const submit = async () => {
    let request = { ...user };
    delete request["passwordVerif"];
    try {
      const { data } = await createAccount(request);
      dispatch(connexion(data));
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
          Informations personnelles
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
            value={user.gender}
            defaultValue={user.gender}
            onChange={(e) =>
              setUser((prevState) => {
                return { ...prevState, gender: e.target.value };
              })
            }
          >
            <FormControlLabel
              disabled
              value="Mme"
              control={<Radio />}
              label="Mme"
            />
            <FormControlLabel
              disabled
              value="Mr"
              control={<Radio />}
              label="Mr"
            />
          </RadioGroup>

          <Space height={20} />
          <TextField
            disabled
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
            disabled
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
            disabled
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
            disabled
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
            disabled
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
          {/* <Stack
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
              //   disabled={!isValidate(user)}
              variant="contained"
              color="success"
              onClick={() => submit()}
            >
              Sauvegarder
            </Button>
          </Stack> */}
        </FormControl>
      </form>
    </>
  );
}
