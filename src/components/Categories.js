import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Dress } from "../assets/dress.svg";
import { ReactComponent as Cosmetics } from "../assets/cosmetics.svg";

import { ReactComponent as Handbag } from "../assets/handbag.svg";

function Categories() {
  return (
    <div
      style={{
        borderRadius: 10,

        width: "100vw",

        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 10,

        display: "flex",
        justifyContent: "space-between",
      }}
    >
      {[
        {
          name: "Sacs",
          type: "Sac",
          icon: () => <Handbag style={{ height: 30, width: 30 }} />,
        },
        {
          name: "Robes",
          type: "Robe",
          icon: () => <Dress style={{ height: 30, width: 30 }} />,
        },
        {
          name: "Beauté",
          type: "Beaute",
          icon: () => <Cosmetics style={{ height: 30, width: 30 }} />,
        },
      ].map((item) => (
        <Link
          to="/Products"
          state={{ item: { type: item.type, name: item.name } }}
          style={{ textDecoration: "none" }}
        >
          <div
            style={{
              borderRadius: 50,
              backgroundColor: "#EEEDFF",
              padding: 20,
              width: 120,
              height: 120,
              color: "#686691",
              marginBottom: 10,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {item.icon()}

            {item.name}
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Categories;
