import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { setSelectedStock } from "./stockReducer";
import { cardVariants } from "./constants/index";

export const WatchlistPanel = ({ watchlist, quotes }) => {
  const dispatch = useDispatch();

  return (
    <motion.div variants={cardVariants} className="bg-[#1A1A1A] rounded-xl p-6 border border-[#10B981]/20">
      <h2 className="text-xl font-bold text-[#FFB800] mb-4">Watchlist</h2>
      <div className="space-y-4 max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#10B981] scrollbar-track-[#1A1A1A]">
        {watchlist.map((symbol) => {
          const quoteData = quotes[symbol];
          if (!quoteData) return null;

          return (
            <div
              key={symbol}
              onClick={() => dispatch(setSelectedStock(symbol))}
              className="bg-[#1A1A1A] p-4 rounded-lg border border-[#10B981]/20 hover:border-[#FFB800] cursor-pointer transition-all duration-200"
            >
              <div className="flex justify-between items-center">
                <span className="text-[#FFB800] font-bold">{symbol}</span>
                <span className={`text-sm ${quoteData.change >= 0 ? "text-[#10B981]" : "text-[#EF4444]"}`}>
                  {quoteData.change >= 0 ? "+" : ""}{quoteData.percentChange}%
                </span>
              </div>
              <div className="text-xl text-white mt-1">${quoteData.price.toFixed(2)}</div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};
