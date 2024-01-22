import * as React from "react";
import { useLocation } from "react-router-dom";

import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";

import Layout from "../components/Layout";
import Slider from "../components/Slider";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/RemoveShoppingCart";
import SendIcon from "@mui/icons-material/AddShoppingCart";
import { removeItem, addItem } from "../redux/Cart";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  connexion,
  deconnexion,
  addOneItemFavoris,
  removeOneItemFavoris,
  updateProfil,
  deleteProfil,
  updateFavoris,
} from "../redux/User";
import { updateClientFav } from "../api/user";

export default function Article() {
  let { state } = useLocation();
  const [isFavorite, setIsFavorite] = useState(false);
  const stateUser = useSelector((state) => state.user.value);

  const stateCart = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();
  const [isAlreadyInCart, setIsAlreadyInCart] = useState(false);

  useEffect(() => {
    let findItem = stateCart.find((item) => item.id === state.data.id);
    if (findItem) {
      setIsAlreadyInCart(true);
    } else {
      setIsAlreadyInCart(false);
    }

    let isFav = false;
    if (stateUser.favoris) {
      isFav = stateUser.favoris.includes(state.data.id);
    }

    setIsFavorite(isFav);

    return () => {};
  }, []);

  useEffect(() => {
    console.log({ stateCart });
    let findItem = stateCart.find((item) => item.id === state.data.id);
    if (findItem) {
      setIsAlreadyInCart(true);
    } else {
      setIsAlreadyInCart(false);
    }

    return () => {};
  }, [stateCart]);

  const handleFavorite = async () => {
    setIsFavorite((prevState) => {
      if (!prevState == true) {
        dispatch(addOneItemFavoris(state.data.id));
        console.log(stateUser.favoris);
      }
      if (!prevState == false) {
        dispatch(removeOneItemFavoris(state.data.id));
        console.log(stateUser.favoris);
      }
      return !prevState;
    });

    if (stateUser.id) {
      let tabFavoris = JSON.parse(localStorage.getItem("akfRehobothFav"));
      await updateClientFav(stateUser.id, tabFavoris);
    }
  };

  return (
    <Layout>
      <Card sx={{ width: "100%" }}>
        <CardHeader
          // avatar={
          //   <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
          //     R
          //   </Avatar>
          // }
          action={
            <IconButton aria-label="settings" onClick={() => handleFavorite()}>
              <FavoriteIcon sx={{ color: isFavorite ? "red" : "grey" }} />
            </IconButton>
          }
          title={state.data.brand}
          subheader={state.data.description}
        />
        {state.data.picture.lenght > 1 ? (
          <CardMedia
            component="img"
            height={"20%"}
            image={state.data.picture[0]}
            alt="Paella dish"
            style={{ objectFit: "contain" }}
          />
        ) : (
          <Slider>
            <ul className="slider-list">
              {state.data.picture.map((item, index) => (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    borderTop: "1px solid lightgrey",
                    borderBottom: "1px solid lightgrey",
                    width: "100vw",
                  }}
                >
                  <Chip label={`${index + 1}/${state.data.picture.length}`} />
                  <CardMedia
                    title="ggg"
                    component="img"
                    height={400}
                    width={"100%"}
                    image={item}
                    alt="Paella dish"
                    style={{
                      objectFit: "contain",
                      margin: 20,
                      width: 350,

                      padding: 10,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  />
                </div>
              ))}
            </ul>
          </Slider>
        )}

        {/* <Slider>
          <CardMedia
            component="img"
            height={400}
            image={state.data.picture[0]}
            alt="Paella dish"
            style={{ objectFit: "contain" }}
          />
        </Slider> */}

        <CardContent sx={{ display: "flex", justifyContent: "center" }}>
          <Typography
            variant="body2"
            color="orange"
            fontSize={"1.3rem"}
            fontWeight={"bold"}
          >
            {state.data.price.toLocaleString("fr-FR")} FCFA
          </Typography>
        </CardContent>
        <CardActions
          sx={{ display: "flex", justifyContent: "center" }}
          disableSpacing
        >
          {isAlreadyInCart ? (
            <Button
              variant="outlined"
              startIcon={<DeleteIcon />}
              onClick={() => dispatch(removeItem(state.data))}
            >
              Retirez du panier
            </Button>
          ) : (
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              onClick={() => dispatch(addItem(state.data))}
            >
              Ajoutez au panier
            </Button>
          )}
        </CardActions>
      </Card>
    </Layout>
  );
}

// const ItemBar = ({ item, xl }) => {
//   const [isFavorite, setIsFavorite] = useState(false);

//   const stateUser = useSelector((state) => state.user.value);
//   console.log(stateUser);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     // const favoristab = getFavorite();
//     // console.log({ favoristab });
//     let isFav = false;
//     if (stateUser.favoris) {
//       isFav = stateUser.favoris.includes(item.id);
//     }

//     setIsFavorite(isFav);

//     return () => {};
//   }, []);

//   const handleFavorite = async () => {
//     setIsFavorite((prevState) => {
//       if (!prevState == true) {
//         dispatch(addOneItemFavoris(item.id));
//         console.log(stateUser.favoris);
//       }
//       if (!prevState == false) {
//         dispatch(removeOneItemFavoris(item.id));
//         console.log(stateUser.favoris);
//       }
//       return !prevState;
//     });

//     if (stateUser.id) {
//       let tabFavoris = JSON.parse(localStorage.getItem("akfRehobothFav"));
//       await updateClientFav(stateUser.id, tabFavoris);
//     }
//   };
