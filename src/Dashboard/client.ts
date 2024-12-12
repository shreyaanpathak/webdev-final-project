import { api } from "../config";


export interface Recommendation {
  title: string;
  description: string;
}

export interface PortfolioInsights {
  risk_level: "Low" | "Moderate" | "High";
  health_score: number;
  health_rating: string;
  recommendations: Array<{
      title: string;
      description: string;
  }>;
}
export interface RiskMeterProps {
  risk: "Low" | "Moderate" | "High";
}

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

export interface PortfolioPerformance {
  total_value: number;
  total_gain_loss: number;
  total_gain_loss_percentage: number;
  realized_gains: number;
  unrealized_gains: number;
  total_invested: number;
}

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

export interface PortfolioSummary {
  total_value: number;
  total_gain_loss: number;
  total_gain_loss_percentage: number;
  realized_gains: number;
  unrealized_gains: number;
  total_invested: number;
  sector_allocation: SectorAllocation[];
  positions: Position[];
}

export interface PortfolioHistory {
  dates: string[];
  values: number[];
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatResponse {
  response: string;
}

export interface Transaction {
  id: string;
  type: 'BUY' | 'SELL';
  symbol: string;
  amount: number;
  quantity: number;
  date: string;
  price?: number;
  option_type?: 'CALL' | 'PUT';
  strike?: number;
  premium?: number;
  expiration?: string;
}

export interface SectorData {
  sector: string;
  value: number;
  percentage: number;
  color: string;
}

export interface SectorAllocationResponse {
  sector_allocation: SectorData[];
  total_value: number;
}

// Update the function to use the correct return type
export const getSectorAllocation = async (userId: string): Promise<SectorAllocationResponse> => {
  try {
    const response = await api.get<SectorAllocationResponse>(`/stocks/portfolio/${userId}/sector-allocation`);
    return response.data;
  } catch (error) {
    console.error('Failed to get sector allocation:', error);
    return { 
      sector_allocation: [],
      total_value: 0
    };
  }
};

export const getTransactions = async (userId: string): Promise<Transaction[]> => {
  try {
    console.log('Fetching transactions for user:', userId);
    const response = await api.get<Transaction[]>(`/stocks/transactions/${userId}`);
    console.log('Transactions response:', response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch transactions:", error);
    console.error("Error details:", error.response?.data);
    throw error;
  }
};

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

export const getPortfolioHistory = async (userId: string): Promise<PortfolioHistory> => {
  try {
    const response = await api.get<PortfolioHistory>(`/stocks/portfolio/${userId}/history`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch portfolio history:", error);
    throw error;
  }
};


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

export const getPortfolioSummary = async (userId: string): Promise<PortfolioSummary> => {
  try {
    const response = await api.get(`/stocks/portfolio/${userId}/sector-breakdown`);
    return response.data;
  } catch (error) {
    console.error('Failed to get portfolio summary:', error);
    throw error;
  }
};

export const getPortfolioPerformance = async (userId: string): Promise<PortfolioPerformance> => {
  try {
      const response = await api.get(`/stocks/portfolio/${userId}/performance`);
      return response.data;
  } catch (error) {
      console.error('Failed to get portfolio performance:', error);
      return {
          total_value: 0,
          total_gain_loss: 0,
          total_gain_loss_percentage: 0,
          realized_gains: 0,
          unrealized_gains: 0,
          total_invested: 0
      };
  }
};


export const getPortfolioInsights = async (userId: string): Promise<PortfolioInsights> => {
  try {
      const response = await api.get<PortfolioInsights>(`/stocks/insights/${userId}`);
      return response.data;
  } catch (error) {
      console.error("Failed to fetch portfolio insights:", error);
      throw error;
  }
};
