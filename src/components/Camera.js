import React from "react";
import Fab from "@mui/material/Fab";
import FavoriteIcon from "@mui/icons-material/Camera";

const Camera = () => {
  return (
    <div>
      <div
        style={{
          borderBottom: "1px solid grey",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 10,
        }}
      >
        <div style={{ color: "grey" }}>Ajouter photos</div>
        <Fab color="primary" aria-label="add">
          <FavoriteIcon />
        </Fab>
      </div>
    </div>
  );
};

export default Camera;
