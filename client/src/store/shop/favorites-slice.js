import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const toggleFavorite = createAsyncThunk(
  "favorites/toggle",
  async ({ userId, productId }) => {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/shop/favorites/toggle`,
      { userId, productId },
      { withCredentials: true }
    );
    return res.data.data;
  }
);

export const fetchFavorites = createAsyncThunk(
  "favorites/fetch",
  async (userId) => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/shop/favorites/${userId}`,
      { withCredentials: true }
    );
    return res.data.data;
  }
);

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    list: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        state.list = action.payload;
      });
  },
});

export default favoritesSlice.reducer;
