import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedStock: null as string | null,
  quotes: {} as Record<string, { 
    symbol: string; 
    price: number; 
    change: number; 
    percentChange: number;
    high: number;
    low: number;
    volume: number;
    latest_trading_day: string;
  }>,
  portfolio: {} as Record<string, number>,
  cash: 25000,
  transactions: [],
  watchlist: [] as string[]
};

const stocksSlice = createSlice({
  name: "stocks",
  initialState,
  reducers: {
    setSelectedStock: (state, action) => {
      state.selectedStock = action.payload;
    },
    updateQuote: (state, { payload }) => {
      state.quotes[payload.symbol] = payload;
    },
    updatePortfolio: (state, { payload }) => {
      state.portfolio = payload.positions;
      state.cash = payload.cash;
    },
    addToWatchlist: (state, { payload: symbol }) => {
      if (!state.watchlist.includes(symbol)) {
        state.watchlist.push(symbol);
      }
    },
    removeFromWatchlist: (state, { payload: symbol }) => {
      state.watchlist = state.watchlist.filter(s => s !== symbol);
    }
  }
});

export const {
  setSelectedStock,
  updateQuote,
  updatePortfolio,
  addToWatchlist,
  removeFromWatchlist
} = stocksSlice.actions;

export default stocksSlice.reducer;
