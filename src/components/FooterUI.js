import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FolderIcon from "@mui/icons-material/Folder";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { navigate } from "../redux/Navigation";
import { Link } from "react-router-dom";

export default function FooterUI() {
  const [value, setValue] = React.useState("home");

  const handleChange = (event, newValue) => {
    // window.location.href = "/Favoris";
    setValue(newValue);
  };

  return (
    <BottomNavigation
      sx={{ width: "100%" }}
      value={value}
      onChange={handleChange}
    >
      <BottomNavigationAction
        label="home"
        value="home"
        icon={<RestoreIcon />}
      />

      <BottomNavigationAction
        label="Favorites"
        value="favorites"
        icon={<FavoriteIcon />}
      />
      <BottomNavigationAction
        label="Nearby"
        value="nearby"
        icon={<LocationOnIcon />}
      />
      {/* <BottomNavigationAction
        label="Folder"
        value="folder"
        icon={<FolderIcon />}
      /> */}
    </BottomNavigation>
  );
}
