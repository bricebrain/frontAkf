/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { ReactComponent as Menu } from "../assets/menu.svg";
import { ReactComponent as Back } from "../assets/arrow_back.svg";
import { ReactComponent as Cart } from "../assets/shopping_bag.svg";
import { useSelector, useDispatch } from "react-redux";

import logo from "../assets/logoMin.jpg";
import { Link } from "react-router-dom";

const Header = ({ headerName, isHome, noIconCart }) => {
  const stateCart = useSelector((state) => state.cart.value);
  return (
    <>
      <div
        style={{
          width: "100vw",
          height: 50,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#0D0E78",
          marginBottom: 10,
          borderBottom: "3px solid white",
        }}
      >
        <div
          style={{
            width: "30%",
            height: 50,
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",

            margin: 0,
          }}
        >
          <Back
            fill={isHome ? "#0D0E78" : "white"}
            style={{ width: "50%", height: "50%" }}
            onClick={() => (isHome ? {} : window.history.back())}
          />
        </div>

        <div
          style={{
            // width: 60,
            height: 40,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            color: "white",
            borderRadius: 25,
          }}
        >
          {headerName ? (
            headerName
          ) : (
            <img
              src={logo}
              style={{
                width: "120%",
                height: "190%",
                borderRadius: 100,
                marginTop: 30,
              }}
            />
          )}
        </div>

        <div
          style={{
            width: "30%",
            height: 50,
          }}
        >
          {noIconCart ? (
            <div
              style={{
                width: "100%",
                height: 50,
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                textDecoration: "none",
              }}
            ></div>
          ) : (
            <Link
              to={"/CheckOut"}
              style={{
                width: "100%",
                height: 50,
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                textDecoration: "none",
              }}
            >
              {stateCart.length > 0 && (
                <div
                  style={{
                    position: "relative",
                    left: 50,
                    top: -10,
                    width: 20,
                    height: 20,
                    borderRadius: 50,
                    backgroundColor: "red",
                    opacity: 0.9,
                    textAlign: "center",
                    color: "white",
                  }}
                >
                  {stateCart.length}
                </div>
              )}
              <Cart fill="white" style={{ width: "50%", height: "50%" }} />
            </Link>
          )}

          {/* <Search fill="white" style={{ width: "50%", height: "50%" }} /> */}
        </div>
      </div>

      {/* title */}
      {/* <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginLeft: 0,
          paddingLeft: 10,
          marginBottom: 10,
        }}
      >
        <span style={{ marginLeft: 0, paddingLeft: 10, fontWeight: "bold" }}>
          Etre unique{" "}
        </span>
        <span style={{ marginLeft: 0, paddingLeft: 10 }}>
          Avec votre style{" "}
        </span>
      </div> */}
    </>
  );
};

export default Header;
