import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
import { Link, Navigate } from "react-router-dom";
import p0 from "../assets/a-store-th-magic-wiyk.jpeg";
import p1 from "../assets/black-woma-magic-mlsm.jpeg";
import p2 from "../assets/black-woma-magic-zdjx.jpeg";
import p3 from "../assets/a-smiling--magic-exwa.jpeg";
import p4 from "../assets/a-smiling--magic-hfbh.jpeg";
import p5 from "../assets/a-store-th-magic-vwfv.jpeg";

import p6 from "../assets/black-woma-magic-dtay.jpeg";
// import p6 from "../assets/black-woma-magic-gcgc.jpeg";
import p7 from "../assets/black-woma-magic-tbnq.jpeg";
import p8 from "../assets/black-woma-magic-yhco.jpeg";
import p9 from "../assets/a-smiling--magic-exwa.jpeg";

// "BAG"
// "CLOTHING"
// "CARE"
// "BEAUTY_AND_ACCESORIES"

const images = [
  // {
  //   url: "https://www.globalbrandsmagazine.com/wp-content/uploads/2023/02/Bag.jpg",
  //   title: "Sacs",
  //   width: "100%",
  //   value: "BAG",
  // },
  // {
  //   url: "https://media.istockphoto.com/id/1321448269/fr/photo/collection-de-v%C3%AAtements-f%C3%A9minins-%C3%A0-la-mode-sur-rack-%C3%A0-lint%C3%A9rieur-gros-plan-et-espace-pour-le.jpg?s=2048x2048&w=is&k=20&c=BU6A9bxS9NwUhBkyo3BeOfiPe0UWytet1Ew2sVbFvIM=",
  //   title: "Prêt à porter",
  //   width: "30%",
  //   value: "CLOTHING",
  // },
  {
    url: "https://img.freepik.com/free-photo/macadamia-body-lotion-skin-cream_1150-42810.jpg?w=2000&t=st=1705180443~exp=1705181043~hmac=ffa133dbe9df6f881b73d36d3e5f10a255285a44e4a1d979fbe29db2b11e02d2",
    title: "Soins de corps",
    width: "30%",
    value: "CARE",
    borderRight: "1px solid white",
  },
  {
    url: "https://img.freepik.com/psd-gratuit/rendu-3d-banniere-beaute_23-2150159867.jpg?w=2000&t=st=1705179833~exp=1705180433~hmac=bc04d8e5fd55c478a21115c33cc3b71f944e858b81058e6aa51b24f47d10eac2",
    title: "Maquillage & Accessoires",
    width: "30%",
    value: "BEAUTY_AND_ACCESORIES",
  },
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  height: 200,
  [theme.breakpoints.down("sm")]: {
    width: "100% !important", // Overrides inline-style
    height: 100,
  },
  "&:hover, &.Mui-focusVisible": {
    zIndex: 1,
    "& .MuiImageBackdrop-root": {
      opacity: 0.15,
    },
    "& .MuiImageMarked-root": {
      opacity: 0,
    },
    "& .MuiTypography-root": {
      border: "4px solid currentColor",
    },
  },
}));

const ImageSrc = styled("span")({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: "cover",
  backgroundPosition: "center 40%",
});

const Image = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create("opacity"),
}));

const ImageMarked = styled("span")(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: "absolute",
  bottom: -2,
  left: "calc(50% - 9px)",
  transition: theme.transitions.create("opacity"),
}));

export default function Cat() {
  return (
    <Box
      sx={{ display: "flex", flexWrap: "wrap", minWidth: 300, width: "100%" }}
    >
      {images.map((image) => (
        <ImageButton
          focusRipple
          key={image.title}
          style={{
            width: image.width,
            display: "flex",
            flexDirection: "column",
            borderRight: image.borderRight,
            borderBottom: "1px solid white",
            flex: 1,
            height: 200,
          }}
        >
          <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
          <ImageBackdrop className="MuiImageBackdrop-root" />
          <Link
            to="/Products"
            state={{ item: { type: image.value, name: image.value } }}
          >
            <Image>
              <Typography
                component="span"
                variant="subtitle1"
                color="inherit"
                sx={{
                  position: "relative",
                  p: 4,
                  pt: 2,
                  pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                }}
              >
                {image.title}
                <ImageMarked className="MuiImageMarked-root" />
              </Typography>
            </Image>
          </Link>
        </ImageButton>
      ))}
    </Box>
  );
}
