import { useDispatch, useSelector } from "react-redux";
import { updateQuote, setSelectedStock } from "./stockReducer";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getQuote } from "./client";
import type { RootState } from "../store"; 

interface QuoteData {
  price: number;
  percentChange: number;
}

interface QuickTradeCardProps {
  symbol: string;
  price: number;
  percentChange: number;
  isSelected: boolean;
  onSelect: () => void;
}

interface QuickTradeGridProps {
  quotes: Record<string, QuoteData>;
  loading?: boolean;
}

const DEFAULT_SYMBOLS = ["AAPL", "MSFT", "GOOGL", "AMZN"];

export const QuickTradeGrid = ({ quotes, loading: parentLoading }: QuickTradeGridProps) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const selectedStock = useSelector((state: RootState) => state.stocksReducer.selectedStock);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        setLoading(true);
        setError(null);
        await Promise.all(
          DEFAULT_SYMBOLS.map(async (symbol) => {
            if (!quotes[symbol]) {
              const quote = await getQuote(symbol);
              if (quote) {
                // Ensure that quote has { price, percentChange }
                dispatch(updateQuote({ symbol, price: quote.price, percentChange: quote.percentChange }));
              }
            }
          })
        );
      } catch (err) {
        console.error("Failed to fetch quotes:", err);
        setError(err instanceof Error ? err : new Error("Failed to fetch quotes"));
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();

    // Set up polling interval
    const interval = setInterval(fetchQuotes, 30000); // Poll every 30 seconds

    return () => clearInterval(interval);
  }, [dispatch, quotes]);

  const handleSelectStock = (symbol: string) => {
    dispatch(setSelectedStock(symbol));
  };

  if (loading || parentLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[...Array(4)].map((_, index) => (
          <div 
            key={index}
            className="bg-[#1A1A1A] p-4 rounded-lg border border-[#FFB800]/20 animate-pulse"
          >
            <div className="h-6 bg-[#FFB800]/20 rounded w-20 mb-2"></div>
            <div className="h-8 bg-white/20 rounded w-24"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center mb-8">
        {error.message}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {DEFAULT_SYMBOLS.map((symbol) => {
        const quote = quotes[symbol];
        return quote ? (
          <QuickTradeCard
            key={symbol}
            symbol={symbol}
            price={quote.price}
            percentChange={quote.percentChange}
            isSelected={selectedStock === symbol}
            onSelect={() => handleSelectStock(symbol)}
          />
        ) : null;
      })}
    </div>
  );
};

const QuickTradeCard = ({ 
  symbol, 
  price, 
  percentChange,
  isSelected,
  onSelect 
}: QuickTradeCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.02 }}
    onClick={onSelect}
    className={`bg-[#1A1A1A] p-4 rounded-lg border cursor-pointer transition-all duration-200 
                ${isSelected 
                  ? "border-[#FFB800] shadow-lg shadow-[#FFB800]/10" 
                  : "border-[#10B981]/20 hover:border-[#10B981] hover:shadow-lg hover:shadow-[#10B981]/10"}`}
  >
    <div className="flex justify-between items-center">
      <span className="text-[#FFB800] font-bold">{symbol}</span>
      <span 
        className={`text-sm ${
          percentChange >= 0 ? "text-[#10B981]" : "text-[#EF4444]"
        }`}
      >
        {percentChange >= 0 ? "+" : ""}{percentChange.toFixed(2)}%
      </span>
    </div>
    <div className="text-xl text-white mt-1">
      ${typeof price === 'number' ? price.toFixed(2) : '0.00'}
    </div>
  </motion.div>
);
