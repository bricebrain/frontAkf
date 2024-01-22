import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
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
import Layout from "../components/Layout";
import { Link } from "react-router-dom";

const images = [
  {
    url: "https://img.freepik.com/free-vector/store-staff-check-number-products-that-must-be-delivered-customers-during-day_1150-51079.jpg?w=2000&t=st=1705870242~exp=1705870842~hmac=80ae0029ef191827d70b76781dd718a68b168a60c0804113d9d931e164ef6321",
    title: "Stocks",
    width: "100%",
    color: "#9FD1F5",
    to: "/stock",
  },
  // {
  //   url: "https://www.creativefabrica.com/wp-content/uploads/2022/05/17/Luxury-Gold-and-Black-Background-Design-Graphics-30685945-1-1-580x371.jpg",
  //   title: "Ajouter un article",
  //   width: "30%",
  //   color: "#CEEFF2",
  //   to: "/AddOrEdit",
  // },
  // {
  //   url: "https://img.freepik.com/free-photo/macadamia-body-lotion-skin-cream_1150-42810.jpg?w=2000&t=st=1705180443~exp=1705181043~hmac=ffa133dbe9df6f881b73d36d3e5f10a255285a44e4a1d979fbe29db2b11e02d2",
  //   title: "Modification d'article",
  //   width: "30%",
  //   color: "#9FD1F5",
  //   to: "/Products",
  //   state: { item: { type: "Edition", name: "Edition" } },
  // },

  {
    url: "https://img.freepik.com/free-vector/banking-industry-concept-illustration_114360-13934.jpg?w=2000&t=st=1705870478~exp=1705871078~hmac=bfe416bf94110940db9a424410251e1e35247f853b0a87eb662a2b22b396bff0",
    title: "Analyse",
    width: "30%",
    color: "#CEEFF2",
    to: "/analyse",
  },
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  height: "100%",
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

export default function Admin() {
  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",

          width: "100%",
          height: "100%",
        }}
      >
        {images.map((image) => (
          <ImageButton
            focusRipple
            key={image.title}
            style={{
              display: "flex",
              flexDirection: "column",
              width: image.width,

              height: "50%",
              borderBottom: "1.5px solid white",
            }}
          >
            <ImageSrc
              style={{
                backgroundColor: image.color,
                backgroundImage: `url(${image.url})`,
              }}
            />
            <ImageBackdrop className="MuiImageBackdrop-root" />
            <Link to={image.to} state={image?.state}>
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
    </Layout>
  );
}
