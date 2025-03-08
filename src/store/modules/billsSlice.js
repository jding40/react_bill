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
    activeRoute: "",
    newBill: {
      type: "pay",
      useFor: "food",
      money: 0.0,
      date: new Date().toISOString().slice(0, 10),
      id: -1,
    },
  },
  reducers: {
    addBill: (state, action) => {
      state.bills.push(action.payload);
      state.newBill = {
        type: state.newBill.type,
        useFor: "",
        money: 0.0,
        date: new Date().toISOString().slice(0, 10),
        id: -1,
      };
    },
    setActiveRoute: (state, action) => {
      state.activeRoute = action.payload;
    },
    setRecordType: (state, action) => {
      state.newBill.type = action.payload;
    },
    setRecordUsage: (state, action) => {
      state.newBill.useFor = action.payload;
    },
    setRecordNumber: (state, action) => {
      state.newBill.money = action.payload;
    },
    setRecordDate: (state, action) => {
      state.newBill.date = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBills.fulfilled, (state, action) => {
      state.bills = action.payload.reduce((acc, cur) => {
        if (acc.find((bill) => bill.id === cur.id)) return acc;
        else {
          acc.push(cur);
          return acc;
        }
      }, state.bills);

      //state.bills = action.payload;
      console.log("Current length of bills is", state.bills.length);
    });
  },
});

export default billSlice.reducer;
export const {
  addBill,
  setActiveRoute,
  setRecordType,
  setRecordUsage,
  setRecordNumber,
  setRecordDate,
} = billSlice.actions;
