import { createSlice } from "@reduxjs/toolkit";

interface StockPosition {
  symbol: string;
  quantity: number;
  current_price: number;
  current_value: number;
}

interface OptionPosition {
  symbol: string;
  option_type: "CALL" | "PUT";
  strike: number;
  expiration: string;
  quantity: number;
}

interface PortfolioState {
  selectedStock: string | null;
  quotes: Record<string, { 
    symbol: string; 
    price: number; 
    change: number; 
    percentChange: number;
    high: number;
    low: number;
    volume: number;
    latest_trading_day: string;
  }>;
  positions: StockPosition[];
  options: OptionPosition[];
  cash: number;
  transactions: any[];
  watchlist: string[];
  total_value: number;
}

const initialState: PortfolioState = {
  selectedStock: null,
  quotes: {},
  positions: [],
  options: [],
  cash: 25000,
  transactions: [],
  watchlist: [],
  total_value: 25000
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
      state.positions = payload.positions || [];
      state.options = payload.options || [];
      state.cash = payload.cash;
      state.total_value = payload.total_value;
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
