import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const getBills = createAsyncThunk(
  "bills/getBills",
  async (url, ThunkAPI) => {
    try {
      const res = await fetch(url);
      return res.json();
    } catch (error) {
      return ThunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const billSlice = createSlice({
  name: "bills",
  initialState: {
    bills: [],
  },
  reducers: {
    addBill: (state, action) => {
      state.bills.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBills.fulfilled, (state, action) => {
      state.bills = action.payload;
    });
  },
});

export default billSlice.reducer;
export const { addBill } = billSlice.actions;
