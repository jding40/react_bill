import { configureStore } from "@reduxjs/toolkit";
import billSlice from "./modules/billsSlice";

const store = configureStore({
  reducer: {
    bills: billSlice,
  },
});

export default store;
