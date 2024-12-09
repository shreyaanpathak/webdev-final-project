import { configureStore } from "@reduxjs/toolkit";
import stocksReducer from "./Stocks/stockReducer";

const store = configureStore({
  reducer: {
    stocksReducer,
  },
});

export default store;
