import { NavLink } from "react-router-dom";

import React from "react";

const NavShortcut = ({ Icon, title, link }) => {
  const path = window.location.pathname;
  const isActive = path == link;

  return (
    <NavLink
      to={link}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "50%",
        height: "100%",
        textDecoration: "none",
      }}
      className={({ isActive, isPending }) =>
        isPending ? "pending" : isActive ? "active" : ""
      }
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
      >
        {Icon(isActive)}
        <span
          style={{
            fontSize: isActive ? 22 : 18,
            width: "50%",
            height: "30%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: isActive ? "green" : "grey",
          }}
        >
          {title}
        </span>
      </div>
    </NavLink>
  );
};

NavShortcut.propTypes = {};

export default NavShortcut;
