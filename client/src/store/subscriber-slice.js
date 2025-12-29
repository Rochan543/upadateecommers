import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "@/config/apiConfig";


/* ================= ADD SUBSCRIBER ================= */

export const addSubscriber = createAsyncThunk(
  "subscriber/add",
  async (email) => {
    const res = await axios.post(
      `${API_URL}/api/admin/subscribers/add`,
      { email }
    );
    return res.data.data; // return saved subscriber
  }
);

/* ================= FETCH SUBSCRIBERS ================= */

export const fetchSubscribers = createAsyncThunk(
  "subscriber/fetchAll",
  async () => {
    const res = await axios.get(
      `${API_URL}/api/admin/subscribers/list`
    );
    return res.data.data;
  }
);

/* ================= SLICE ================= */

const subscriberSlice = createSlice({
  name: "subscriber",
  initialState: {
    list: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubscribers.fulfilled, (state, action) => {
        state.list = action.payload;
      })

      // ✅ ADDED (small but important)
      .addCase(addSubscriber.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
      });
  },
});

export default subscriberSlice.reducer;
