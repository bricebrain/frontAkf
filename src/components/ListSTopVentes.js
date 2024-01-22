import * as React from "react";
import ImageList from "@mui/material/ImageList";
import { useSelector, useDispatch } from "react-redux";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ItemBar from "./ItemBar";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Content from "./Content";
import {
  incrementQuantity,
  decrementQuantity,
  removeItem,
} from "../redux/Cart";

export default function ListTopVentes({ products, type }) {
  console.log({ secret: products[0] });
  const stateCart = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();

  return (
    <Content height={"60%"}>
      <ImageList
        sx={{ width: "100%", gridTemplateColumns: "auto" }}
        style={{
          gridTemplateColumns: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {products.map((item) => (
          <Card sx={{ width: "100%", display: "flex", padding: 1 }}>
            <CardMedia
              sx={{
                height: 150,
                backgroundSize: "contain",
                flex: 0.5,
              }}
              image={item?.picture[0]}
              title={item.brand}
              style={{ objectFit: "contain" }}
            />
            <CardContent
              sx={{
                flex: 1,
              }}
            >
              <div style={{ width: "100%" }}>
                <Typography gutterBottom variant="h5" component="div">
                  {item.brand}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </div>
              <CardActions sx={{}}>
                <div
                  style={{
                    // display: "flex",
                    // alignItems: "center",
                    // justifyContent: "space-between",
                    height: 50,
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      height: 30,
                      width: "90%",

                      padding: 20,
                      marginBottom: 5,
                    }}
                  >
                    <div style={{}}>Nombre vendu(s)</div>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      sx={{ color: item.nombre_vendu >= 10 ? "green" : "blue" }}
                    >
                      {item.nombre_vendu}
                    </Typography>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      height: 20,
                      width: "90%",

                      padding: 20,
                    }}
                  >
                    <div style={{}}>Total vendu(s) en FCFA</div>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      sx={{ color: "orange" }}
                    >
                      {(item.nombre_vendu * item.price).toLocaleString("fr-FR")}
                    </Typography>
                  </div>
                </div>
              </CardActions>
            </CardContent>
          </Card>
        ))}
      </ImageList>
    </Content>
  );
}
