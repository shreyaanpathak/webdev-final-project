import { configureStore } from "@reduxjs/toolkit";
import stocksReducer from "./Stocks/stockReducer";
import accountReducer from "./Account/reducer";

const store = configureStore({
  reducer: {
    stocksReducer,
    accountReducer
  },
});

export default store;
