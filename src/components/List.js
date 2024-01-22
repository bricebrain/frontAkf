import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";

import InfoIcon from "@mui/icons-material/Info";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ItemBar from "./ItemBar";
import { Link } from "react-router-dom";

export default function List({ item }) {
  return (
    <ImageListItem
      key={item.picture[0]}
      style={{ margin: 5, border: "0.5px solid lightgrey", borderRadius: 5 }}
    >
      <Link to="/Article" state={{ data: item }}>
        <img
          srcSet={`${item.picture[0]}?w=248&fit=crop&auto=format&dpr=2 2x`}
          src={item.picture[0].replace("http://", "https://")}
          alt={item.brand}
          loading="lazy"
          style={{
            height: 300,
            width: 250,
            objectFit: "contain",
          }}
        />
      </Link>
      {/* <ImageListItemBar
        sx={{ height: 40, width: 250 }}
        title={
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>{item.brand}</div>
            <div>{item.price} FCFA</div>
          </div>
        }
        subtitle={item.description}
        actionIcon={
          <IconButton
            sx={{ color: "rgba(255, 255, 255, 0.54)" }}
            aria-label={`info about ${item.brand}`}
          >
            <FavoriteIcon />
          </IconButton>
        }
      /> */}

      <ItemBar item={item} xl />
    </ImageListItem>
  );
}
