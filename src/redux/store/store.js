import { configureStore } from "@reduxjs/toolkit";
import cartRducer from "../Cart/index";

export default configureStore({
  reducer: {
    cart: cartRducer,
  },
});
