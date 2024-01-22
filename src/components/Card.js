import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function MediaCard({ item, cancel }) {
  return (
    <Card
      sx={{
        width: 150,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: 2,
      }}
    >
      <CardMedia
        sx={{ height: 70, width: 70, backgroundSize: "contain" }}
        image={item.preview ?? item}
        title={item.path}
        // src={generateBlobUrl(item.preview)}
      />

      <CardActions>
        <Button size="small" onClick={() => cancel()}>
          supprimer
        </Button>
      </CardActions>
    </Card>
  );
}
