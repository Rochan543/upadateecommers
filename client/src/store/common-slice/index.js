import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  featureImageList: [],
};

/* ===================== GET FEATURE IMAGES ===================== */

export const getFeatureImages = createAsyncThunk(
  "/order/getFeatureImages",
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/common/feature/get`,
    );

    return response.data;
  }
);

/* ===================== ADD FEATURE IMAGE ===================== */

export const addFeatureImage = createAsyncThunk(
  "/order/addFeatureImage",
  async (image) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/common/feature/add`,
      { image }
    );

    return response.data;
  }
);

/* ===================== DELETE FEATURE IMAGE ===================== */

export const deleteFeatureImage = createAsyncThunk(
  "/order/deleteFeatureImage",
  async (imageId) => {
    await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/common/feature/delete/${imageId}`,
    );

    // ✅ RETURN IMAGE ID (IMPORTANT FIX)
    return imageId;
  }
);

/* ===================== SLICE ===================== */

const commonSlice = createSlice({
  name: "commonSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      /* ---------- GET IMAGES ---------- */
      .addCase(getFeatureImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeatureImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.featureImageList = action.payload.data;
      })
      .addCase(getFeatureImages.rejected, (state) => {
        state.isLoading = false;
        state.featureImageList = [];
      })

      /* ---------- DELETE IMAGE (FIXED) ---------- */
      .addCase(deleteFeatureImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteFeatureImage.fulfilled, (state, action) => {
        state.isLoading = false;

        // ✅ REMOVE IMAGE FROM STATE USING ID
        state.featureImageList = state.featureImageList.filter(
          (img) => img._id !== action.payload
        );
      })
      .addCase(deleteFeatureImage.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default commonSlice.reducer;
