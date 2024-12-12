import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedStock } from "./stockReducer";
import { cardVariants } from "./constants/index";
import { getWatchlist, addToWatchlist, removeFromWatchlist } from "./client";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";

export const WatchlistPanel = ({ quotes }) => {
  const dispatch = useDispatch();
  const [userWatchlist, setUserWatchlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newSymbol, setNewSymbol] = useState("");
  const { currentUser } = useSelector((state) => state.accountReducer);

  const fetchWatchlist = async () => {
    try {
      setLoading(true);
      if (currentUser?._id) {
        const data = await getWatchlist(currentUser._id);
        setUserWatchlist(data || []);
      }
    } catch (error) {
      console.error("Failed to fetch watchlist:", error);
      setUserWatchlist([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToWatchlist = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (currentUser?._id && newSymbol) {
        await addToWatchlist(currentUser._id, newSymbol.toUpperCase());
        await fetchWatchlist();
        setNewSymbol(""); 
      }
    } catch (error) {
      console.error("Failed to add to watchlist:", error);
    }
  };

  const handleRemoveFromWatchlist = async (symbol: string) => {
    try {
      if (currentUser?._id) {
        await removeFromWatchlist(currentUser._id, symbol);
        await fetchWatchlist();
      }
    } catch (error) {
      console.error("Failed to remove from watchlist:", error);
    }
  };

  useEffect(() => {
    fetchWatchlist();
  }, [currentUser]);

  if (loading) {
    return (
      <motion.div
        variants={cardVariants}
        className="bg-[#1A1A1A] rounded-xl p-6 border border-[#10B981]/20"
      >
        <div className="text-white text-center">Loading watchlist...</div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={cardVariants}
      className="bg-[#1A1A1A] rounded-xl p-6 border border-[#10B981]/20"
    >
      <h2 className="text-xl font-bold text-[#FFB800] mb-4">Watchlist</h2>
      
      {/* Add stock form */}
      <form onSubmit={handleAddToWatchlist} className="mb-4 flex gap-2">
        <input
          type="text"
          value={newSymbol}
          onChange={(e) => setNewSymbol(e.target.value)}
          placeholder="Enter stock symbol"
          className="flex-1 bg-[#0D1F17] border border-[#10B981]/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#10B981]"
        />
        <button
          type="submit"
          disabled={!newSymbol}
          className="bg-[#10B981] text-white p-2 rounded-lg hover:bg-[#0D9668] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FaPlus />
        </button>
      </form>

      <div className="space-y-4 max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#10B981] scrollbar-track-[#1A1A1A]">
        {userWatchlist.length > 0 ? (
          userWatchlist.map((symbol) => {
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
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFromWatchlist(symbol);
                    }}
                    className="text-red-500 hover:text-red-400"
                  >
                    Remove
                  </button>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xl text-white">
                    ${quoteData.price.toFixed(2)}
                  </span>
                  <span
                    className={`text-sm ${
                      quoteData.change >= 0 ? "text-[#10B981]" : "text-[#EF4444]"
                    }`}
                  >
                    {quoteData.change >= 0 ? "+" : ""}
                    {quoteData.percentChange}%
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-white text-center">No watchlist items found.</div>
        )}
      </div>
    </motion.div>
  );
};
