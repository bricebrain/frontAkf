import { configureStore } from "@reduxjs/toolkit";
import cartRducer from "../Cart/index";
import navRducer from "../Navigation/index";
import userRducer from "../User/index";

export default configureStore({
  reducer: {
    cart: cartRducer,
    navigation: navRducer,
    user: userRducer,
  },
});
