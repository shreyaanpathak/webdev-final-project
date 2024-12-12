import { FaSearch } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import { setSelectedStock, updateQuote } from "./stockReducer";
import { useState, useEffect, useCallback } from "react";
import * as client from "./client";

interface SearchResult {
  symbol: string;
  name: string;
  type: string;
}

const TradingVolume = ({ tradingVolume }: { tradingVolume: number | null }) => {
  const volumeDisplay = tradingVolume ? `${(tradingVolume / 1e6).toFixed(2)}M` : "N/A";

  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="bg-[#1A1A1A] rounded-lg border border-[#10B981]/20 px-3 md:px-6 lg:px-12 py-2 flex flex-col justify-center flex-shrink-0 transition-all duration-300"
    >
      <div className="text-[#10B981] text-[10px] md:text-[11px] lg:text-xs whitespace-nowrap transition-all duration-300">Trading Volume</div>
      <div className="text-[#FFB800] text-[11px] md:text-[12px] lg:text-sm font-bold transition-all duration-300">{volumeDisplay}</div>
    </motion.div>
  );
};

const SPIndex = ({
  spIndex,
}: {
  spIndex: { value: number; changePercent: number } | null;
}) => {
  const value = spIndex?.value ?? 4783.45;
  const changePercent = spIndex?.changePercent ?? 1.2;
  const changeColor = changePercent >= 0 ? "#10B981" : "#EF4444";

  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="bg-[#1A1A1A] rounded-lg border border-[#10B981]/20 px-3 md:px-6 lg:px-12 py-2 flex flex-col justify-center flex-shrink-0 transition-all duration-300"
    >
      <div className="text-[#10B981] text-[10px] md:text-[11px] lg:text-xs transition-all duration-300">S&P 500</div>
      <div className="text-[#FFB800] text-[11px] md:text-[12px] lg:text-sm font-bold whitespace-nowrap transition-all duration-300">
        {value.toLocaleString()}{" "}
        <span style={{ color: changeColor }}>
          {changePercent > 0 ? `+${changePercent.toFixed(2)}%` : `${changePercent.toFixed(2)}%`}
        </span>
      </div>
    </motion.div>
  );
};

const MarketStatus = ({ marketStatus }: { marketStatus: string }) => (
  <motion.div 
    whileHover={{ scale: 1.02 }}
    className="bg-[#1A1A1A] rounded-lg border border-[#10B981]/20 px-3 md:px-6 lg:px-12 py-2 flex flex-col justify-center flex-shrink-0 transition-all duration-300"
  >
    <div className="text-[#10B981] text-[10px] md:text-[11px] lg:text-xs transition-all duration-300">Market Status</div>
    <div className="text-[#FFB800] text-[11px] md:text-[12px] lg:text-sm font-bold flex items-center gap-1 whitespace-nowrap transition-all duration-300">
      <span
        className={`w-1.5 h-1.5 md:w-1.75 md:h-1.75 lg:w-2 lg:h-2 rounded-full transition-all duration-300 ${
          marketStatus === "Open" ? "bg-[#10B981]" : "bg-[#EF4444]"
        }`}
      ></span>
      {marketStatus}
    </div>
  </motion.div>
);

export const StockHeader = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [marketStatus, setMarketStatus] = useState("Loading...");
  const [spIndex, setSPIndex] = useState<{ value: number; changePercent: number } | null>(null);
  const [tradingVolume, setTradingVolume] = useState<number | null>(null);

  useEffect(() => {
    const fetchMarketOverview = async () => {
      try {
        const overview = await client.getMarketOverview();
        setMarketStatus(overview.market_open ? "Open" : "Closed");
        setSPIndex(overview.sp500);
        setTradingVolume(overview.tradingVolume);
      } catch (error) {
        console.error("Failed to fetch market overview:", error);
        setMarketStatus("Unknown");
      }
    };

    fetchMarketOverview();
    const interval = setInterval(fetchMarketOverview, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.search-container')) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = useCallback(async () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      setLoading(true);
      const { results } = await client.searchStocks(searchQuery.trim().toUpperCase());
      setSearchResults(results || []);
      setShowSearchResults(true);
    } catch (err) {
      console.error("Search failed:", err);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim()) {
        handleSearch();
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, handleSearch]);

  const handleSelectResult = async (symbol: string) => {
    try {
      setLoading(true);
      const quote = await client.getQuote(symbol);
      if (quote) {
        dispatch(setSelectedStock(symbol));
        dispatch(updateQuote(quote));
        setSearchQuery("");
        setShowSearchResults(false);
      }
    } catch (err) {
      console.error("Selection failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#111111] border-b border-[#10B981]/20 sticky top-0 z-50"
    >
      <div className="max-w-[1920px] mx-auto p-4 sm:p-6 flex flex-col lg:grid lg:grid-cols-3 gap-6 lg:gap-4 items-center">
        {/* Search Section */}
        <div className="search-container relative w-full lg:w-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search stocks by symbol..."
              className="w-full px-4 py-2 sm:py-3 bg-[#1A1A1A] rounded-lg text-[#FFB800] border border-[#10B981]/20 focus:border-[#FFB800] focus:outline-none text-sm sm:text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  setShowSearchResults(false);
                }
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSearch()}
              disabled={loading}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#10B981] hover:bg-[#0D9668] text-white p-1.5 sm:p-2 rounded-lg transition-colors duration-200 disabled:opacity-50"
            >
              <FaSearch className="text-sm sm:text-base" />
            </motion.button>
          </div>

          <AnimatePresence>
            {showSearchResults && (
              <motion.ul
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="absolute mt-2 w-full bg-[#1A1A1A] border border-[#10B981]/20 rounded-lg shadow-lg z-50 max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#10B981] scrollbar-track-transparent"
              >
                {loading ? (
                  <li className="px-4 py-2 text-[#10B981] text-sm">Searching...</li>
                ) : searchResults.length > 0 ? (
                  searchResults.map((result) => (
                    <motion.li
                      key={result.symbol}
                      whileHover={{ backgroundColor: "rgba(16, 185, 129, 0.1)" }}
                      className="px-4 py-2 cursor-pointer border-b border-[#10B981]/10 last:border-none"
                      onClick={() => handleSelectResult(result.symbol)}
                    >
                      <div className="text-[#FFB800] font-bold text-sm">{result.symbol}</div>
                      <div className="text-[#10B981] text-xs">{result.name}</div>
                    </motion.li>
                  ))
                ) : (
                  searchQuery.trim() && (
                    <li className="px-4 py-2 text-[#10B981] text-sm">No results found</li>
                  )
                )}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        {/* Title Section */}
        <motion.h1 
          className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span className="text-white">Stock</span>
          <span className="text-[#10B981]"> Portfolio</span>
          <span className="text-white"> Dashboard</span>
        </motion.h1>

        {/* Market Info Section */}
        <div className="flex flex-wrap justify-center lg:justify-end items-center gap-2 sm:gap-4 w-full lg:w-auto">
          <MarketStatus marketStatus={marketStatus} />
          <SPIndex spIndex={spIndex} />
          <TradingVolume tradingVolume={tradingVolume} />
        </div>
      </div>
    </motion.div>
  );
};
