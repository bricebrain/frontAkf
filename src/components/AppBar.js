/* eslint-disable jsx-a11y/alt-text */
import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import logo from "../assets/logoMin.jpg";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/ShoppingBag";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link } from "react-router-dom";
import {
  connexion,
  deconnexion,
  addOneItemFavoris,
  removeOneItemFavoris,
  updateProfil,
  deleteProfil,
} from "../redux/User";

const profile = ["Deconnexion"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function ResponsiveAppBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stateCart = useSelector((state) => state.cart.value);
  const stateUser = useSelector((state) => state.user.value);

  console.log({ stateUser });
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#0D0E78" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {window.location.pathname === "/" ? (
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none", flex: 0.9 },
              }}
            >
              {/* <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {profile.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu> */}
            </Box>
          ) : (
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none", flex: 0.9 },
              }}
            >
              <ArrowBackIosIcon
                color="action"
                style={{ color: "white" }}
                onClick={() => window.history.back()}
              />
            </Box>
          )}
          {/* <Box
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none", flex: 0.9 } }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {profile.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box> */}

          <div
            style={{
              display: "flex",
              flex: 1,
              justifyContent: "center",
              //   border: "1px solid white",
            }}
          >
            <img
              src={logo}
              style={{
                width: 60,
                height: 60,
                borderRadius: 100,
              }}
            />
          </div>

          <Box
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none", flex: 0.9 } }}
          >
            {stateUser && stateUser.id ? (
              <>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <Typography
                    variant="span"
                    noWrap
                    component="a"
                    href="#app-bar-with-responsive-menu"
                    sx={{
                      display: { xs: "flex", md: "none" },

                      fontWeight: 400,

                      color: "inherit",
                      textDecoration: "none",
                    }}
                  >
                    Bonjour {stateUser.firstname}
                  </Typography>
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  {["Déconnexion"].map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Typography
                        textAlign="center"
                        onClick={() => dispatch(deconnexion())}
                      >
                        {page}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              <>
                <Typography
                  variant="span"
                  noWrap
                  component="a"
                  sx={{
                    display: { xs: "flex", md: "none" },

                    fontWeight: 400,

                    color: "inherit",
                    textDecoration: "none",
                  }}
                  onClick={() => {
                    const redirect = window.location.pathname;
                    return navigate("/signin", {
                      state: { key: "connect", redirect: redirect },
                    });
                  }}
                >
                  Connexion
                </Typography>
              </>
            )}
            {/*
             */}
          </Box>

          {/* {stateUser && stateUser.id ? `Bonjour ${stateUser.firstname}` : null} */}
          <Link to="/CheckOut">
            <Badge badgeContent={stateCart.length} color="success">
              <MailIcon color="action" style={{ color: "white" }} />
            </Badge>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {profile.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            {/* <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Lemy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip> */}
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
