import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { ReactComponent as Dress } from "../assets/dress.svg";
import { ReactComponent as Cosmetics } from "../assets/cosmetics.svg";

import { ReactComponent as Handbag } from "../assets/handbag.svg";

import pp from "../assets/black-woma-magic-mlsm.jpeg";
import ppp from "../assets/black-woma-magic-zdjx.jpeg";
import p1 from "../assets/a-smiling--magic-exwa.jpeg";
import p2 from "../assets/a-smiling--magic-hfbh.jpeg";
import p3 from "../assets/a-store-th-magic-vwfv.jpeg";
import p4 from "../assets/a-store-th-magic-wiyk.jpeg";
import p5 from "../assets/black-woma-magic-dtay.jpeg";
// import p6 from "../assets/black-woma-magic-gcgc.jpeg";
import p7 from "../assets/black-woma-magic-tbnq.jpeg";
import p from "../assets/black-woma-magic-yhco.jpeg";
import { Link } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

// "BAG"
// "CLOTHING"
// "CARE"
// "BEAUTY_AND_ACCESORIES"
export default function CategoriesUI() {
  return [{ label: "Sac", value: "BAG" }, "Robe", "Beaute", "Accessoires"].map(
    (item) => (
      <Link
        to={"/Products"}
        state={{ item: { type: item, name: item } }}
        style={{ textDecoration: "none" }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
          sx={{
            border: "1px solid white",
            height: 60,
          }}
        >
          <div
            style={{
              //   backgroundColor: "#EEEDFF",
              background:
                "linear-gradient(90deg, rgba(34,25,201,1) 0%, rgba(107,107,226,1) 0%, rgba(251,251,251,1) 92%)",
              padding: 20,

              width: "98%",
              height: "100%",
              color: "#686691",
              fontWeight: "bold",
              marginBottom: 10,
              display: "flex",
              flex: 1,
              color: "white",
              fontSize: 25,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {item}
          </div>
        </Stack>
      </Link>
    )
  );
}
