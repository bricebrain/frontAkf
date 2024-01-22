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

export default function ListCommand({ products, type }) {
  console.log({ secret: products[0] });
  const stateCart = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();

  return (
    <Content height={"70%"}>
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
              <CardActions>
                <div>Quantité</div>
                <Button
                  size="small"
                  onClick={() => {
                    if (item.quantity === 1) {
                      dispatch(removeItem(item));
                    } else {
                      dispatch(decrementQuantity(item));
                    }
                  }}
                >
                  <RemoveCircleOutlineIcon />
                </Button>

                <Typography gutterBottom variant="h6" component="div">
                  {item.quantity}
                </Typography>
                <Button
                  size="small"
                  onClick={() => dispatch(incrementQuantity(item))}
                >
                  <AddCircleOutlineIcon />
                </Button>
              </CardActions>
              <Typography variant="body2" color="text.secondary">
                {(item.price * item.quantity).toLocaleString("fr-FR")} FCFA
              </Typography>
            </CardContent>
            {/* <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions> */}
          </Card>
        ))}

        {/* <Link
            to={type === "Edition" ? "/AddOrEdit" : "/Article"}
            state={{ data: item }}
          > */}
        {/* <img
              srcSet={`${item.picture[0]}?w=248&fit=crop&auto=format&dpr=2 2x`}
              src={item?.picture[0]}
              alt={item.brand}
              loading="lazy"
              style={{
                height: 200,
                width: 200,
                objectFit: "contain",
              }}
            /> */}
        {/* </Link> */}
        {/* <ItemBar item={item} /> */}
      </ImageList>
    </Content>
  );
}
