import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    value: [],
  },
  reducers: {
    addItem: (state, action) => {
      let newiItem = { ...action.payload, quantity: 1 };
      state.value = [...state.value, newiItem];
    },

    removeItem: (state, action) => {
      const newState = state.value.filter(
        (item) => item.id !== action.payload.id
      );
      state.value = newState;
    },
    incrementQuantity: (state, action) => {
      let newState = state.value.map((item) => {
        if (item.id === action.payload.id) {
          item.quantity = item.quantity + 1;
        }
        return item;
      });
      state.value = newState;
    },
    decrementQuantity: (state, action) => {
      let newState = state.value.map((item) => {
        if (item.id === action.payload.id) {
          item.quantity = item.quantity - 1;
        }
        return item;
      });
      state.value = newState;
    },
    resetCart: (state) => {
      state.value = [];
    },
  },
});

export const {
  incrementQuantity,
  decrementQuantity,
  removeItem,
  addItem,
  resetCart,
} = cartSlice.actions;

export default cartSlice.reducer;
