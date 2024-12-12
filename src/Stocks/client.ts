import { api } from "../config";

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

export interface OptionTrade {
  strike: number;
  premium: number;
  expiration: string;
  type: "CALL" | "PUT";
  trade_type: "BUY" | "SELL";
  quantity: number;
}

export interface OptionsChain {
  calls: OptionTrade[];
  puts: OptionTrade[];
}

export interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  type: "BUY" | "SELL";
  symbol: string;
  quantity: number;
  price: number;
  availableCash: number;
  loading: boolean;
}

export interface TradeData {
  symbol: string;
  type: "BUY" | "SELL";
  quantity: number;
  price: number;
}

export interface HistoricalData {
  labels: string[];
  prices: number[];
  symbol?: string;
  timeframe?: string;
}

export interface SearchResult {
  symbol: string;
  name: string;
  type: string;
}

export interface SearchResponse {
  results: SearchResult[];
  count: number;
}


export interface OptionTradeResponse {
  cash: number;
  positions: Array<{
    symbol: string;
    quantity: number;
    current_price: number;
    current_value: number;
  }>;
  options: Array<{
    symbol: string;
    option_type: string;
    strike: number;
    expiration: string;
    quantity: number;
  }>;
  total_value: number;
}


export const executeOptionTrade = async (
  userId: string,
  symbol: string,
  option_type: "CALL" | "PUT",
  strike: number,
  premium: number,
  expiration: string,
  trade_type: "BUY" | "SELL",
  quantity: number
) => {
  try {
    console.log("Executing option trade with data:", {
      user_id: userId,
      symbol,
      option_type,
      strike,
      premium,
      expiration,
      trade_type,
      quantity
    });

    const response = await api.post(`/stocks/options/trade`, {
      user_id: userId,
      symbol,
      option_type,
      strike,
      premium,
      expiration,
      trade_type,
      quantity
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Trade error response:", {
        data: error.response.data,
        status: error.response.status,
        headers: error.response.headers
      });
      throw new Error(error.response.data.detail || "Failed to execute trade");
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received:", error.request);
      throw new Error("No response received from server");
    } else {
      // Something happened in setting up the request
      console.error("Error setting up request:", error.message);
      throw error;
    }
  }
};

export const getOptionsChain = async (symbol: string) => {
  try {
    const response = await api.get(`/stocks/options/${symbol}`);
    console.log("Options chain response:", response.data); // Debug log
    return response.data;
  } catch (error) {
    console.error("Options chain error details:", {
      error,
      response: error.response?.data,
      status: error.response?.status
    });
    throw error;
  }
};

// Fetch a quote for a symbol
export const getQuote = async (symbol: string): Promise<QuoteData> => {
  try {
    const response = await api.get<QuoteData>(`/stocks/quote/${symbol}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch quote for ${symbol}:`, error);
    throw error;
  }
};

// Execute a trade for a user
export const executeTrade = async (userId: string, tradeData: TradeData) => {
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

// Get the user's portfolio
export const getPortfolio = async (userId: string) => {
  try {
    const response = await api.get(`/stocks/portfolio/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch portfolio:", error);
    throw error;
  }
};

// Get performance metrics for a user over a given timeframe
export const getPerformanceMetrics = async (userId: string, timeframe = "1M") => {
  try {
    const response = await api.get(`/stocks/performance/${userId}`, { params: { timeframe } });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch performance metrics:", error);
    throw error;
  }
};

// Watchlist functions
export const getWatchlist = async (userId: string): Promise<string[]> => {
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

// Market overview
export const getMarketOverview = async () => {
  try {
    const response = await api.get(`/stocks/market/overview`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch market overview:", error);
    throw error;
  }
};

// Historical prices
export const getHistoricalPrices = async (symbol: string, timeframe: string): Promise<HistoricalData> => {
  try {
    const response = await api.get<HistoricalData>(`/stocks/historical/${symbol}`, {
      params: { timeframe }
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch historical prices for ${symbol}:`, error);
    throw error;
  }
};

export const searchStocks = async (query: string): Promise<SearchResponse> => {
  try {
    const response = await api.get<SearchResponse>(`/stocks/search`, {
      params: { query }
    });
    return response.data;
  } catch (error) {
    console.error("Search failed:", error);
    return { results: [], count: 0 };
  }
};

export const getChatAnalysis = async (prompt: string): Promise<string> => {
  try {
    console.log('Sending chat analysis request:', prompt.substring(0, 100) + '...');
    
    const response = await api.post('/chat/chat', {
      message: prompt,
      chat_history: []
    });
    
    console.log('Received response:', response);
    
    if (response.data && response.data.response) {
      return response.data.response;
    }
    
    throw new Error('Invalid response format from chat API');
  } catch (error) {
    console.error('Failed to get AI analysis:', error);
    console.error('Error details:', error.response?.data || error.message);
    throw new Error(error.response?.data?.detail || error.message || 'Failed to generate analysis');
  }
};

export const getStockAnalysis = async (symbol: string, price: number, change: number, percentChange: number, metrics?: Record<string, number>, timeframe?: string) => {
  try {
    const response = await api.post('/chat/analyze/stock', {
      symbol,
      price,
      change,
      percentChange,
      metrics,
      timeframe
    });
    return response.data.analysis;
  } catch (error) {
    console.error('Failed to get stock analysis:', error);
    throw error;
  }
};

export const getMarketAnalysis = async (indices: Record<string, number>, trends: string[], timeframe?: string) => {
  try {
    const response = await api.post('/chat/analyze/market', {
      indices,
      trends,
      timeframe
    });
    return response.data.analysis;
  } catch (error) {
    console.error('Failed to get market analysis:', error);
    throw error;
  }
};

export const getPortfolioAnalysis = async (holdings: Array<{symbol: string, value: number}>, totalValue: number, cashPosition: number, riskProfile?: string) => {
  try {
    const response = await api.post('/chat/analyze/portfolio', {
      holdings,
      total_value: totalValue,
      cash_position: cashPosition,
      risk_profile: riskProfile
    });
    return response.data.analysis;
  } catch (error) {
    console.error('Failed to get portfolio analysis:', error);
    throw error;
  }
};

export const getOptionsAnalysis = async (symbol: string, currentPrice: number, calls: any[], puts: any[]) => {
  try {
    const response = await api.post('/chat/analyze/options', {
      symbol,
      current_price: currentPrice,
      calls,
      puts
    });
    return response.data.analysis;
  } catch (error) {
    console.error('Failed to get options analysis:', error);
    throw error;
  }
};

export const getTradingSuggestion = async (symbol: string, currentPrice: number, indicators: Record<string, number>, timeframe?: string) => {
  try {
    const response = await api.post('/chat/trading/suggestion', {
      symbol,
      current_price: currentPrice,
      indicators,
      timeframe
    });
    return response.data.suggestion;
  } catch (error) {
    console.error('Failed to get trading suggestion:', error);
    throw error;
  }
};
