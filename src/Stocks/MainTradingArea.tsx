// MainTradingArea.tsx
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Chart } from "./Chart";
import { cardVariants } from "./constants/index";
import { TradePanel } from "./TradePanel";
import { updateQuote } from "./stockReducer";
import * as client from "./client";
import { RootState } from "../store";

interface QuoteData {
  symbol: string;
  price: number;
  change: number;
  percentChange: number;
  high: number;
  low: number;
  volume: number;
  latest_trading_day: string;
}

interface MetricCardProps {
  title: string;
  value: string | number | undefined;
}

interface MainTradingAreaProps {
  selectedStock: string | null;
  quotes: Record<string, QuoteData>;
  watchlist: string[];
  loading?: boolean;
}

const MetricCard = ({ title, value }: MetricCardProps) => (
  <div className="bg-[#0D1F17] p-4 rounded-lg border border-[#10B981]/20">
    <div className="text-[#10B981]/60 mb-1">{title}</div>
    <div className="text-white text-lg font-bold mt-1">
      {typeof value === 'number' ? value.toLocaleString() : value || 'N/A'}
    </div>
  </div>
);

export const MainTradingArea = ({ selectedStock, quotes, watchlist, loading: parentLoading }: MainTradingAreaProps) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const selectedQuote = selectedStock ? quotes[selectedStock] as QuoteData : null;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [inWatchlist, setInWatchlist] = useState(false);

  useEffect(() => {
    const fetchQuote = async () => {
      if (!selectedStock) return;
      
      try {
        setLoading(true);
        setError(null);
        const quote = await client.getQuote(selectedStock);
        if (quote) {
          dispatch(updateQuote(quote));
        }
      } catch (err) {
        console.error("Failed to fetch quote:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch quote");
      } finally {
        setLoading(false);
      }
    };

    fetchQuote();
    const interval = setInterval(fetchQuote, 30000);
    return () => clearInterval(interval);
  }, [selectedStock, dispatch]);

  useEffect(() => {
    const checkWatchlist = async () => {
      if (!currentUser?._id || !selectedStock) return;
      
      try {
        const watchlist = await client.getWatchlist(currentUser._id);
        setInWatchlist(watchlist.includes(selectedStock));
      } catch (err) {
        console.error("Failed to check watchlist:", err);
      }
    };

    checkWatchlist();
  }, [currentUser, selectedStock]);

  const handleWatchlistToggle = async () => {
    if (!currentUser?._id || !selectedStock) return;

    try {
      if (inWatchlist) {
        await client.removeFromWatchlist(currentUser._id, selectedStock);
      } else {
        await client.addToWatchlist(currentUser._id, selectedStock);
      }
      setInWatchlist(!inWatchlist);
    } catch (err) {
      console.error("Failed to update watchlist:", err);
    }
  };

  if (!selectedStock || !selectedQuote) {
    return (
      <div className="xl:col-span-3 space-y-8">
        <motion.div variants={cardVariants} className="bg-[#1A1A1A] rounded-xl p-6 border border-[#10B981]/20">
          <div className="text-center text-[#10B981]">Select a stock to view details</div>
        </motion.div>
      </div>
    );
  }

  if (loading || parentLoading) {
    return (
      <div className="xl:col-span-3 space-y-8">
        <motion.div variants={cardVariants} className="bg-[#1A1A1A] rounded-xl p-6 border border-[#10B981]/20 animate-pulse">
          <div className="h-8 bg-[#FFB800]/20 rounded w-32 mb-4"></div>
          <div className="h-12 bg-white/20 rounded w-48 mb-4"></div>
          <div className="grid grid-cols-3 gap-4 mt-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 bg-[#0D1F17] rounded-lg"></div>
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="xl:col-span-3 space-y-8">
      <motion.div 
        variants={cardVariants} 
        className="bg-[#1A1A1A] rounded-xl p-6 border border-[#10B981]/20"
      >
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-[#FFB800]">{selectedQuote.symbol}</h2>
            <p className="text-5xl font-bold mt-3 text-white">
              ${selectedQuote.price?.toFixed(2) ?? 'N/A'}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className={selectedQuote.change >= 0 ? "text-[#10B981]" : "text-[#EF4444]"}>
                {selectedQuote.change >= 0 ? "↑" : "↓"}
                {Math.abs(selectedQuote.change || 0).toFixed(2)} ({(selectedQuote.percentChange || 0).toFixed(2)}%)
              </span>
            </div>
          </div>
          <button
            className={`p-3 rounded-full border ${
              inWatchlist
                ? "bg-[#10B981] border-[#10B981] text-white"
                : "border-[#10B981] text-[#10B981]"
            } hover:bg-[#10B981] hover:text-white transition-all duration-200`}
            onClick={handleWatchlistToggle}
            aria-label={inWatchlist ? "Remove from watchlist" : "Add to watchlist"}
          >
            <FaStar className="text-xl" />
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-6">
          <MetricCard 
            title="24h High" 
            value={selectedQuote.high ? `$${selectedQuote.high.toFixed(2)}` : 'N/A'}
          />
          <MetricCard 
            title="24h Low" 
            value={selectedQuote.low ? `$${selectedQuote.low.toFixed(2)}` : 'N/A'}
          />
          <MetricCard 
            title="Volume" 
            value={selectedQuote.volume}
          />
        </div>
      </motion.div>
      
      <Chart selectedStock={selectedStock} />
      <TradePanel selectedStock={selectedStock} quotes={quotes} />
      
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-500 text-center">
          {error}
        </div>
      )}
    </div>
  );
};
