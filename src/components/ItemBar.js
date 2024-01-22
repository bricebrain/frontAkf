import { useEffect, useState } from "react";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import { useSelector, useDispatch } from "react-redux";
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

const ItemBar = ({ item, xl }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const stateUser = useSelector((state) => state.user.value);
  console.log(stateUser);
  const dispatch = useDispatch();

  useEffect(() => {
    // const favoristab = getFavorite();
    // console.log({ favoristab });
    let isFav = false;
    if (stateUser.favoris) {
      isFav = stateUser.favoris.includes(item.id);
    }

    setIsFavorite(isFav);

    return () => {};
  }, []);

  const handleFavorite = async () => {
    setIsFavorite((prevState) => {
      if (!prevState == true) {
        dispatch(addOneItemFavoris(item.id));
        console.log(stateUser.favoris);
      }
      if (!prevState == false) {
        dispatch(removeOneItemFavoris(item.id));
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
    <ImageListItemBar
      sx={xl ? { height: 40, width: 250 } : {}}
      title={
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div style={xl ? {} : { fontSize: 12 }}>{item.brand}</div>

          <div style={xl ? {} : { fontSize: 12 }}>
            {item.price.toLocaleString("fr-FR")} FCFA
          </div>
        </div>
      }
      subtitle={item.description}
      actionIcon={
        <IconButton
          sx={{ color: isFavorite ? "red" : "rgba(255, 255, 255, 0.54)" }} //
          aria-label={`info about ${item.brand}`}
          onClick={() => handleFavorite()}
        >
          <FavoriteIcon />
        </IconButton>
      }
    />
  );
};

export default ItemBar;
