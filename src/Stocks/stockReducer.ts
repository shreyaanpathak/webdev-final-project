import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedStock: null as string | null,
  quotes: {
    'AAPL': { symbol: 'AAPL', price: 150.23, change: 2.5, percentChange: 1.67 },
    'GOOGL': { symbol: 'GOOGL', price: 2789.45, change: -15.2, percentChange: -0.54 },
    'TSLA': { symbol: 'TSLA', price: 875.34, change: 23.1, percentChange: 2.71 },
  } as Record<string, { symbol: string; price: number; change: number; percentChange: number }>,
  portfolio: {
    'AAPL': 10,
    'GOOGL': 5,
  } as Record<string, number>,
  cash: 25000,
  transactions: [
    {
      id: '1',
      symbol: 'AAPL',
      type: 'BUY' as 'BUY' | 'SELL',
      quantity: 10,
      price: 150.23,
      total: 1502.30,
      date: '2024-03-15',
    },
  ] as Array<{
    id: string;
    symbol: string;
    type: 'BUY' | 'SELL';
    quantity: number;
    price: number;
    total: number;
    date: string;
  }>,
  watchlist: ['AAPL', 'GOOGL', 'TSLA', 'MSFT'] as string[],
};

const stocksSlice = createSlice({
  name: "stocks",
  initialState,
  reducers: {
    setSelectedStock: (state, action) => {
      state.selectedStock = action.payload;
    },

    addTransaction: (state, { payload: trade }) => {
      const newTransaction = {
        id: new Date().getTime().toString(),
        symbol: trade.symbol,
        type: trade.type,
        quantity: trade.quantity,
        price: trade.price,
        total: trade.price * trade.quantity,
        date: new Date().toISOString().split('T')[0],
      };
      state.transactions.push(newTransaction);

      if (trade.type === 'BUY') {
        state.cash -= newTransaction.total;
        state.portfolio[trade.symbol] = (state.portfolio[trade.symbol] || 0) + trade.quantity;
      } else {
        state.cash += newTransaction.total;
        if (state.portfolio[trade.symbol]) {
          state.portfolio[trade.symbol] -= trade.quantity;
          if (state.portfolio[trade.symbol] === 0) {
            delete state.portfolio[trade.symbol];
          }
        }
      }
    },

    updateQuote: (state, { payload: quote }) => {
      state.quotes[quote.symbol] = quote;
    },

    addToWatchlist: (state, { payload: symbol }) => {
      if (!state.watchlist.includes(symbol)) {
        state.watchlist.push(symbol);
      }
    },

    removeFromWatchlist: (state, { payload: symbol }) => {
      state.watchlist = state.watchlist.filter(s => s !== symbol);
    },

    setCash: (state, { payload: amount }) => {
      state.cash = amount;
    },
  },
});

export const {
  setSelectedStock,
  addTransaction,
  updateQuote,
  addToWatchlist,
  removeFromWatchlist,
  setCash
} = stocksSlice.actions;

export default stocksSlice.reducer;
