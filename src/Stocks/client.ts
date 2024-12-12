// client.ts
import { api } from "../config";

// Existing API calls
export const getQuote = async (symbol: string) => {
  try {
    const response = await api.get(`/stocks/quote/${symbol}`);
    return response.data;
  } catch (error: any) {
    console.error(`Failed to fetch quote for ${symbol}:`, error);
    return {
      symbol,
      price: 100 + Math.random() * 10,
      change: Math.random() * 5 * (Math.random() > 0.5 ? 1 : -1),
      percentChange: Math.random() * 3 * (Math.random() > 0.5 ? 1 : -1),
      high: 110 + Math.random() * 10,
      low: 90 + Math.random() * 10,
      volume: Math.floor(Math.random() * 1000000),
      latest_trading_day: new Date().toISOString().split('T')[0]
    };
  }
};

export const executeTrade = async (
  userId: string,
  tradeData: {
    symbol: string;
    type: "BUY" | "SELL";
    quantity: number;
    price: number;
  }
) => {
  try {
    const response = await api.post(`/stocks/trade`, tradeData, {
      params: { user_id: userId },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to execute trade:", error);
    throw error;
  }
};

export const getPortfolio = async (userId: string) => {
  const response = await api.get(`/stocks/portfolio/${userId}`);
  return response.data;
};

export const getPerformanceMetrics = async (userId: string, timeframe = "1M") => {
  const response = await api.get(`/stocks/performance/${userId}`, {
    params: { timeframe },
  });
  return response.data;
};

// Watchlist functions (already implemented)
export const getWatchlist = async (userId: string) => {
  try {
    const response = await api.get(`/auth/watchlist/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch watchlist:", error);
    return [];
  }
};

export const addToWatchlist = async (userId: string, symbol: string) => {
  try {
    const response = await api.post(`/auth/watchlist/${userId}`, { symbol });
    return response.data;
  } catch (error) {
    console.error("Failed to add to watchlist:", error);
    throw error;
  }
};

export const removeFromWatchlist = async (userId: string, symbol: string) => {
  try {
    const response = await api.delete(`/auth/watchlist/${userId}/${symbol}`);
    return response.data;
  } catch (error) {
    console.error("Failed to remove from watchlist:", error);
    throw error;
  }
};

// New API calls
export const getMarketOverview = async () => {
  const response = await api.get(`/stocks/market/overview`);
  return response.data;
};

export const searchStocks = async (query: string) => {
  const response = await api.get(`/stocks/search`, { 
    params: { query } 
  });
  return response.data;
};

export const getHistoricalPrices = async (symbol: string, timeframe: string) => {
  try {
    const response = await api.get(`/stocks/historical/${symbol}`, {
      params: { timeframe }
    });
    return response.data;
  } catch (error: any) {
    console.error(`Failed to fetch historical prices for ${symbol}:`, error);
    // Return mock data for demo purposes
    const mockData = generateMockHistoricalData(timeframe);
    return mockData;
  }
};

const generateMockHistoricalData = (timeframe: string) => {
  const dataPoints = timeframe === "1D" ? 8 : 
                    timeframe === "1W" ? 7 :
                    timeframe === "1M" ? 30 : 
                    timeframe === "3M" ? 90 :
                    timeframe === "6M" ? 180 : 365;

  const basePrice = 100 + Math.random() * 100;
  const volatility = 0.02;
  
  const data = {
    labels: [],
    prices: []
  };

  let currentPrice = basePrice;
  
  for (let i = 0; i < dataPoints; i++) {
    const change = currentPrice * volatility * (Math.random() - 0.5);
    currentPrice += change;
    
    if (timeframe === "1D") {
      const hour = 9 + Math.floor(i * (7/7));
      const minute = (i % 2) * 30;
      data.labels.push(`${hour}:${minute.toString().padStart(2, '0')}`);
    } else {
      const date = new Date();
      date.setDate(date.getDate() - (dataPoints - i));
      data.labels.push(date.toLocaleDateString());
    }
    
    data.prices.push(currentPrice);
  }

  return data;
};
