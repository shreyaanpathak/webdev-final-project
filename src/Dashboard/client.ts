import { api } from "../config";

// Interfaces
export interface Position {
  symbol: string;
  quantity: number;
  current_price: number;
  current_value: number;
  change: number;
  percentChange: number;
}

export interface PortfolioData {
  cash: number;
  positions: Position[];
  total_value: number;
  initial_investment?: number;
}

export interface SectorData {
  sector: string;
  value: number;
  percentage: number;
  color: string;
}

export interface PortfolioSummary {
  total_value: number;
  total_gain_loss: number;
  total_gain_loss_percentage: number;
  sector_allocation: SectorData[];
  positions: Position[];
}

export interface PortfolioHistory {
  dates: string[];
  values: number[];
}

// API Functions
export const getPortfolio = async (userId: string): Promise<PortfolioData> => {
  try {
    const response = await api.get<PortfolioData>(`/stocks/portfolio/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch portfolio:", error);
    throw error;
  }
};

export const getPortfolioSummary = async (userId: string): Promise<PortfolioSummary> => {
  try {
    const response = await api.get<PortfolioSummary>(`/stocks/portfolio/${userId}/summary`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch portfolio summary:", error);
    throw error;
  }
};

export const getPortfolioHistory = async (userId: string): Promise<PortfolioHistory> => {
  try {
    const response = await api.get<PortfolioHistory>(`/stocks/portfolio/${userId}/history`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch portfolio history:", error);
    throw error;
  }
};

export const getSectorAllocation = async (userId: string): Promise<SectorData[]> => {
  try {
    const response = await api.get<SectorData[]>(`/stocks/portfolio/${userId}/sectors`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch sector allocation:", error);
    throw error;
  }
};

// Quote data interface and functions
export interface QuoteData {
  symbol: string;
  price: number;
  change: number;
  percentChange: number;
  high: number;
  low: number;
  volume?: number;
  latest_trading_day?: string;
  name?: string;
  currency?: string;
  marketCap?: number;
}

export const getQuote = async (symbol: string): Promise<QuoteData> => {
  try {
    const response = await api.get<QuoteData>(`/stocks/quote/${symbol}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch quote for ${symbol}:`, error);
    throw error;
  }
};

// Export other existing functions
export const executeTrade = async (userId: string, tradeData: any) => {
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

export const getMarketOverview = async () => {
  try {
    const response = await api.get(`/stocks/market/overview`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch market overview:", error);
    throw error;
  }
};

export const getHistoricalPrices = async (symbol: string, timeframe: string) => {
  try {
    const response = await api.get(`/stocks/historical/${symbol}`, {
      params: { timeframe }
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch historical prices for ${symbol}:`, error);
    throw error;
  }
};

export const sendChatMessage = async (message, chatHistory = []) => {
  const response = await api.post("/chat/chat", {
    message,
    chat_history: chatHistory
  });
  return response.data;
};

export const getPerformanceMetrics = async (userId: string, timeframe = "1M") => {
  try {
      const response = await api.get(`/stocks/performance/${userId}`, {
          params: { timeframe }
      });
      return response.data;
  } catch (error) {
      console.error("Failed to fetch performance metrics:", error);
      throw error;
  }
};

export const getGoals = async (userId: string) => {
  try {
    const response = await api.get(`/auth/goals/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch goals:", error);
    throw error;
  }
};

export const updateGoals = async (userId: string, goals: any) => {
  try {
    const response = await api.post(`/auth/goals/${userId}`, { goals });
    return response.data;
  } catch (error) {
    console.error("Failed to update goals:", error);
    throw error;
  }
};
