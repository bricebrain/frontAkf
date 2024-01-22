/* eslint-disable jsx-a11y/alt-text */
import "../App.css";
import ResponsiveAppBar from "./AppBar";

import Content from "./Content";
import Footer from "./Footer";
import FooterUI from "./FooterUI";
// import Menu from "../assets/menu.svg";
// import Search from "../assets/search.svg";
// import Cart from "../assets/shopping_bag.svg";
// import Person from "../assets/person.svg";
// import Favorite from "../assets/favorite.svg";
// import Location from "../assets/location.svg";
import Header from "./Header";

const Layout = ({
  children,
  withoutHeader,
  withoutFooter,
  headerName,
  isHome,
  noIconCart,
}) => {
  console.log(withoutHeader, withoutFooter);
  return (
    <div className="layout">
      {/* {withoutHeader ? null : (
        <Header
          headerName={headerName}
          isHome={isHome}
          noIconCart={noIconCart}
        />
      )} */}
      <ResponsiveAppBar />
      <Content>{children}</Content>
      {withoutFooter ? null : <Footer />}
      {/* <FooterUI /> */}
    </div>
  );
};

export default Layout;
