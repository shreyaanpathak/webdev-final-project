import { useDispatch} from "react-redux";
import { updateQuote } from "./stockReducer";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getQuote } from "./client";

export const QuickTradeGrid = ({ quotes }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Add error state

  const DEFAULT_SYMBOLS = ["AAPL", "MSFT", "GOOGL", "AMZN"];

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        setLoading(true);
        setError(null); // Reset error state
        await Promise.all(
          DEFAULT_SYMBOLS.map(async (symbol) => {
            if (!quotes[symbol]) {
              const quote = await getQuote(symbol);
              if (quote) {
                dispatch(updateQuote(quote));
              }
            }
          })
        );
      } catch (err) {
        console.error("Failed to fetch quotes:", err);
        setError(err); // Set error state
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();
  }, [dispatch]);

  if (loading) {
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
        {error.message || "Failed to load quotes"}
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
            change={quote.percentChange}
          />
        ) : null;
      })}
    </div>
  );
};

const QuickTradeCard = ({ symbol, price, change }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.02 }}
    className={`bg-[#1A1A1A] p-4 rounded-lg border cursor-pointer transition-all duration-200 
                ${change >= 0 
                  ? "border-[#10B981] hover:border-[#10B981]" 
                  : "border-[#FFB800]/20 hover:border-[#10B981]"}`}
  >
    <div className="flex justify-between items-center">
      <span className="text-[#FFB800] font-bold">{symbol}</span>
      <span 
        className={`text-sm ${
          change >= 0 ? "text-[#10B981]" : "text-[#EF4444]"
        }`}
      >
        {change >= 0 ? "+" : ""}{change}%
      </span>
    </div>
    <div className="text-xl text-white mt-1">
      ${typeof price === 'number' ? price.toFixed(2) : '0.00'}
    </div>
  </motion.div>
);
