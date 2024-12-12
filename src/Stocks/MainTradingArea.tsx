import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { cardVariants } from "./constants";
import { Chart } from "./Chart";
import { TradePanel } from "./TradePanel";
import { updateQuote } from "./stockReducer";
import * as client from "./client";

const MetricCard = ({ title, value }) => (
  <div className="bg-[#0D1F17] p-4 rounded-lg border border-[#10B981]/20">
    <div className="text-[#10B981]/60 mb-1">{title}</div>
    <div className="text-white text-lg font-bold mt-1">{value}</div>
  </div>
);

export const MainTradingArea = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.accountReducer);
  const { selectedStock, quotes } = useSelector((state) => state.stocksReducer);
  const selectedQuote = selectedStock ? quotes[selectedStock] : null;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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

  if (loading && !selectedQuote) {
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

  if (error) {
    return (
      <div className="xl:col-span-3 space-y-8">
        <motion.div variants={cardVariants} className="bg-[#1A1A1A] rounded-xl p-6 border border-[#10B981]/20">
          <div className="text-red-500 text-center">{error}</div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="xl:col-span-3 space-y-8">
      {selectedQuote && (
        <motion.div variants={cardVariants} className="bg-[#1A1A1A] rounded-xl p-6 border border-[#10B981]/20">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#FFB800]">{selectedQuote.symbol}</h2>
              <p className="text-5xl font-bold mt-3 text-white">
                ${selectedQuote.price.toFixed(2)}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className={selectedQuote.change >= 0 ? "text-[#10B981]" : "text-[#EF4444]"}>
                  {selectedQuote.change >= 0 ? "↑" : "↓"}
                  {Math.abs(selectedQuote.change).toFixed(2)}({selectedQuote.percentChange}%)
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
            >
              <FaStar className="text-xl" />
            </button>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-6">
            <MetricCard title="24h High" value={`$${selectedQuote.high.toFixed(2)}`} />
            <MetricCard title="24h Low" value={`$${selectedQuote.low.toFixed(2)}`} />
            <MetricCard title="Volume" value={selectedQuote.volume.toLocaleString()} />
          </div>
        </motion.div>
      )}
      <Chart selectedStock={selectedStock} />
      <TradePanel selectedStock={selectedStock} quotes={quotes} />
    </div>
  );
};
