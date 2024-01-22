import { createSlice } from "@reduxjs/toolkit";

export const navigationSlice = createSlice({
  name: "navigation",
  initialState: {
    value: "home",
  },
  reducers: {
    navigate: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { navigate } = navigationSlice.actions;

export default navigationSlice.reducer;
