import { NavLink } from "react-router-dom";

import React from "react";

const NavShortcut = ({ Icon, title, link, state }) => {
  const path = window.location.pathname;
  const isActive = path == link;

  return (
    <NavLink
      to={link}
      state={state}
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
            fontSize: isActive ? "0.875rem" : "0.875rem",
            width: "50%",
            height: "30%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: isActive ? "#1976d2" : "grey",
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
