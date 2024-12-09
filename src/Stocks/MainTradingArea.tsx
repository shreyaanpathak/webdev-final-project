// src/Stock/components/MainTradingArea.tsx
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { cardVariants } from "./constants/index";
import { Chart } from "./Chart";
import { TradePanel } from "./TradePanel";
import { addToWatchlist, removeFromWatchlist } from "./stockReducer";

const MetricCard = ({ title, value }) => (
  <div className="bg-[#0D1F17] p-4 rounded-lg border border-[#10B981]/20">
    <div className="text-[#10B981]/60 mb-1">{title}</div>
    <div className="text-white text-lg font-bold mt-1">{value}</div>
  </div>
);

export const MainTradingArea = ({ selectedStock, quotes, watchlist }) => {
  const dispatch = useDispatch();
  const selectedQuote = selectedStock ? quotes[selectedStock] : null;

  return (
    <div className="xl:col-span-3 space-y-8">
      {selectedQuote && (
        <motion.div variants={cardVariants} className="bg-[#1A1A1A] rounded-xl p-6 border border-[#10B981]/20">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#FFB800]">{selectedQuote.symbol}</h2>
              <p className="text-5xl font-bold mt-3 text-white">${selectedQuote.price.toFixed(2)}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className={selectedQuote.change >= 0 ? "text-[#10B981]" : "text-[#EF4444]"}>
                  {selectedQuote.change >= 0 ? "↑" : "↓"}
                  {Math.abs(selectedQuote.change).toFixed(2)}({selectedQuote.percentChange}%)
                </span>
              </div>
            </div>
            <button
              className={`p-3 rounded-full border ${
                watchlist.includes(selectedQuote.symbol)
                  ? "bg-[#10B981] border-[#10B981] text-white"
                  : "border-[#10B981] text-[#10B981]"
              } hover:bg-[#10B981] hover:text-white transition-all duration-200`}
              onClick={() =>
                watchlist.includes(selectedQuote.symbol)
                  ? dispatch(removeFromWatchlist(selectedQuote.symbol))
                  : dispatch(addToWatchlist(selectedQuote.symbol))
              }
            >
              <FaStar className="text-xl" />
            </button>
          </div>
          {/* Performance Metrics */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <MetricCard title="24h High" value="$168.42" />
            <MetricCard title="24h Low" value="$162.15" />
            <MetricCard title="Volume" value="1.2M" />
          </div>
        </motion.div>
      )}
      <Chart selectedStock={selectedStock} />
      <TradePanel selectedStock={selectedStock} quotes={quotes} />
    </div>
  );
};
