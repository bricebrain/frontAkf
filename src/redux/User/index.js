import { createSlice } from "@reduxjs/toolkit";
import { updateClientFav } from "../../api/user";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    value: {},
  },
  reducers: {
    connexion: (state, action) => {
      state.value = action.payload;
    },

    deconnexion: (state, action) => {
      state.value = {};
    },

    addOneItemFavoris: (state, action) => {
      let newState = { ...state.value };

      if (newState.favoris) {
        if (!newState.favoris.includes(action.payload)) {
          newState.favoris.push(action.payload);
        }
      } else {
        newState["favoris"] = [action.payload];
      }
      localStorage.setItem(
        "akfRehobothFav",
        JSON.stringify(newState["favoris"])
      );

      state.value = newState;
    },

    removeOneItemFavoris: (state, action) => {
      let newState = { ...state.value };
      const favorisWithoutItemSelected = newState.favoris.filter(
        (itemId) => itemId !== action.payload
      );
      newState["favoris"] = favorisWithoutItemSelected;
      localStorage.setItem(
        "akfRehobothFav",
        JSON.stringify(newState["favoris"])
      );

      state.value = newState;
    },
    updateProfil: (state, action) => {
      state.value = action.payload;
    },
    updateFavoris: (state, action) => {
      let newState = state.value;
      state.value = { ...newState, favoris: action.payload };
    },
    deleteProfil: (state) => {
      state.value = {};
    },
  },
});

export const {
  connexion,
  deconnexion,
  addOneItemFavoris,
  removeOneItemFavoris,
  updateProfil,
  deleteProfil,
  updateFavoris,
} = userSlice.actions;

export default userSlice.reducer;
