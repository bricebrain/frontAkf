import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";

import InfoIcon from "@mui/icons-material/Info";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ItemBar from "./ItemBar";
import { Link } from "react-router-dom";

export default function TitlebarImageList({ products, type }) {
  return (
    <ImageList sx={{ width: "100%" }}>
      <ImageListItem key="Subheader" cols={2}>
        {/* <ListSubheader component="div">December</ListSubheader> */}
      </ImageListItem>
      {products.map((item) => (
        <ImageListItem
          key={item.picture[0]}
          style={{ border: "0.5px solid lightgrey" }}
        >
          <Link
            to={type === "Edition" ? "/AddOrEdit" : "/Article"}
            state={{ data: item }}
          >
            <img
              srcSet={`${item.picture[0]}?w=248&fit=crop&auto=format&dpr=2 2x`}
              src={item?.picture[0]}
              alt={item.brand}
              loading="lazy"
              style={{
                height: 200,
                width: 200,
                objectFit: "contain",
              }}
            />
          </Link>

          <ItemBar item={item} />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
