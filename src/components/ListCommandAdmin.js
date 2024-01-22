import { useEffect, useState } from "react";
import ImageList from "@mui/material/ImageList";
import { useSelector, useDispatch } from "react-redux";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import CancelIcon from "@mui/icons-material/Cancel";
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
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import Content from "./Content";
import {
  incrementQuantity,
  decrementQuantity,
  removeItem,
} from "../redux/Cart";
import { allCommande, updateTheCommande } from "../api/commandes";

export default function ListCommandAdmin({ products, type }) {
  const [commandes, setCommandes] = useState([]);
  const stateUser = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  useEffect(() => {
    getCommande();
    return () => {};
  }, []);

  const getCommande = async () => {
    try {
      const { data } = await allCommande();
      setCommandes(data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateCommande = async (id, status) => {
    try {
      await updateTheCommande(id, status);
    } catch (error) {
      console.log(error);
    } finally {
      getCommande();
    }
  };

  const transfoDate = (info) => {
    const dateObj = new Date(new Date(info));
    let options = {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZoneName: "short",
    };
    let dateFormatee = dateObj.toLocaleString("fr-FR", options);
    return dateFormatee;
  };

  return (
    <Content height={"100%"}>
      <ImageList
        sx={{ width: "100%", gridTemplateColumns: "auto" }}
        style={{
          gridTemplateColumns: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {commandes.map((item) => (
          <Card sx={{ width: "100%", display: "flex", padding: 1 }}>
            <CardContent
              sx={{
                border: "0.5px solid lightgrey",
                flex: 1,
              }}
            >
              <div style={{ width: "100%" }}>
                <Typography gutterBottom variant="body2" component="div">
                  {item?.client?.gender} {item?.client?.lastname}{" "}
                  {item?.client?.firstname}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.client.address}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.client.email}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.client.phone}
                </Typography>
              </div>

              <Typography variant="body2" color="text.secondary">
                {/* {(item.price * item.quantity).toLocaleString("fr-FR")} FCFA */}
              </Typography>
            </CardContent>

            <CardContent
              sx={{
                flex: 1,
              }}
            >
              <div style={{ width: "50vw" }}>
                <Typography gutterBottom variant="body2" component="div">
                  Total commande : {item.total.toLocaleString("fr-FR")} FCFA
                </Typography>
                <Typography gutterBottom variant="body2" component="div">
                  Status : {item.status}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: 12 }}
                >
                  Créée : {transfoDate(item.created)}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: 12 }}
                >
                  modifiée : {transfoDate(item.updated)}
                </Typography>
              </div>
              <CardActions
                sx={{
                  display: "flex",
                  flex: 1,
                  padding: 0,
                  margin: 0,
                  width: "100%",
                  justifyContent: "center",
                  // flexWrap: "nowrap",
                }}
              >
                <Link to="/Details" state={item}>
                  <Button
                    size="small"
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      fontSize: 12,
                    }}
                  >
                    <VisibilityIcon />
                    Details
                  </Button>
                </Link>

                {stateUser.type == "ADMIN" && item.status != "PAYE" && (
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button
                      size="small"
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        fontSize: 12,
                      }}
                      onClick={() => updateCommande(item.id, "ANNULER")}
                    >
                      <CancelIcon />
                      Annuler
                    </Button>
                  </div>
                )}
              </CardActions>

              {/* -------- */}

              <CardActions
                sx={{
                  display: "flex",
                  flex: 1,
                  padding: 0,
                  margin: 0,
                  width: "100%",
                  justifyContent: "center",
                  // flexWrap: "nowrap",
                }}
              >
                {item.status == "EN ATTENTE" && (
                  <Button
                    size="small"
                    sx={{ display: "flex", flexDirection: "column" }}
                    onClick={() => updateCommande(item.id, "EN PREPARATION")}
                  >
                    <HourglassTopIcon />
                    Preparation
                  </Button>
                )}

                {(item.status == "EN ATTENTE" ||
                  item.status == "EN PREPARATION") && (
                  <Button
                    size="small"
                    sx={{ display: "flex", flexDirection: "column" }}
                    onClick={() => updateCommande(item.id, "EN LIVRAISON")}
                  >
                    <LocalShippingIcon />
                    Livraison
                  </Button>
                )}

                {(item.status == "EN ATTENTE" ||
                  item.status == "EN PREPARATION" ||
                  item.status == "EN LIVRAISON") && (
                  <Button
                    size="small"
                    sx={{ display: "flex", flexDirection: "column" }}
                    onClick={() => updateCommande(item.id, "PAYE")}
                  >
                    <PointOfSaleIcon />
                    Payé
                  </Button>
                )}
              </CardActions>
            </CardContent>
          </Card>
        ))}
      </ImageList>
    </Content>
  );
}
