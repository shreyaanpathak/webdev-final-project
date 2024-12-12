import { FaSearch } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import { setSelectedStock, updateQuote } from "./stockReducer";
import { useState, useEffect, useCallback } from "react";
import * as client from "./client";
import { useNavigate } from "react-router";

interface SearchResult {
  symbol: string;
  name: string;
  type: string;
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const InfoBox = ({ title, value, color }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="bg-gradient-to-br from-[#1A1A1A] to-[#252525] rounded-lg border border-[#10B981]/20 px-3 py-2 flex flex-col justify-center shadow-lg transition-all duration-300 min-w-[120px]"
  >
    <div className={`text-${color} text-xs font-medium mb-1`}>{title}</div>
    <div className="text-white text-sm font-bold">{value}</div>
  </motion.div>
);

const TradingVolume = ({ tradingVolume }) => (
  <InfoBox
    title="Trading Volume"
    value={tradingVolume ? `${(tradingVolume / 1e6).toFixed(2)}M` : "N/A"}
    color="[#10B981]"
  />
);

const SPIndex = ({ spIndex }) => {
  const value = spIndex?.value ?? 4783.45;
  const changePercent = spIndex?.changePercent ?? 1.2;
  const changeColor = changePercent >= 0 ? "#10B981" : "#EF4444";

  return (
    <InfoBox
      title="S&P 500"
      value={
        <>
          {value.toLocaleString()}{" "}
          <span style={{ color: changeColor }}>
            {changePercent > 0
              ? `+${changePercent.toFixed(2)}%`
              : `${changePercent.toFixed(2)}%`}
          </span>
        </>
      }
      color="[#FFB800]"
    />
  );
};

const MarketStatus = ({ marketStatus }) => (
  <InfoBox
    title="Market Status"
    value={
      <div className="flex items-center gap-2">
        <span
          className={`w-2 h-2 rounded-full ${
            marketStatus === "Open" ? "bg-[#10B981]" : "bg-[#EF4444]"
          }`}
        />
        {marketStatus}
      </div>
    }
    color="[#FFB800]"
  />
);

export const StockHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [marketStatus, setMarketStatus] = useState("Loading...");
  const [spIndex, setSPIndex] = useState<{
    value: number;
    changePercent: number;
  } | null>(null);
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
      if (!target.closest(".search-container")) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = useCallback(async () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      setLoading(true);
      const { results } = await client.searchStocks(
        searchQuery.trim().toUpperCase()
      );
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
        navigate(`/Stocks/${symbol}`);
      }
    } catch (err) {
      console.error("Selection failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={fadeInUp}
      className="bg-gradient-to-r from-[#111111] to-[#1A1A1A] border-b border-[#10B981]/20 shadow-lg"
    >
      <div className="max-w-[1920px] mx-auto p-4 md:p-6 flex flex-col lg:flex-row gap-4 md:gap-6 items-center justify-between">
        {/* Search Section */}
        <div className="search-container relative w-full lg:w-[30%]">
          <div className="relative">
            <input
              type="text"
              placeholder="Search stocks by symbol..."
              className="w-full px-4 py-2.5 bg-[#252525] rounded-lg text-[#FFB800] border border-[#10B981]/20 focus:border-[#FFB800] focus:outline-none text-sm transition-all duration-300 hover:bg-[#2A2A2A] pr-12"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Escape") setShowSearchResults(false);
                if (e.key === "Enter") handleSearch();
              }}
            />
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleSearch}
              disabled={loading}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#10B981] hover:bg-[#0D9668] text-white p-2 rounded-lg transition-colors duration-300 disabled:opacity-50"
            >
              <FaSearch className="text-base" />
            </motion.button>
          </div>

          <AnimatePresence>
            {showSearchResults && (
              <motion.ul
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute mt-2 w-full bg-[#252525] border border-[#10B981]/20 rounded-lg shadow-xl z-50 max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#10B981] scrollbar-track-[#1A1A1A]"
              >
                {loading ? (
                  <li className="px-4 py-2 text-[#10B981] text-sm">
                    Searching...
                  </li>
                ) : searchResults.length > 0 ? (
                  searchResults.map((result) => (
                    <motion.li
                      key={result.symbol}
                      whileHover={{
                        backgroundColor: "rgba(16, 185, 129, 0.1)",
                      }}
                      className="px-4 py-2 cursor-pointer border-b border-[#10B981]/10 last:border-none transition-all duration-300"
                      onClick={() => handleSelectResult(result.symbol)}
                    >
                      <div className="text-[#FFB800] font-bold text-sm">
                        {result.symbol}
                      </div>
                      <div className="text-[#10B981] text-xs">
                        {result.name}
                      </div>
                    </motion.li>
                  ))
                ) : (
                  searchQuery.trim() && (
                    <li className="px-4 py-2 text-[#10B981] text-sm">
                      No results found
                    </li>
                  )
                )}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        {/* Title Section */}
        <div className="lg:w-[40%] flex flex-col items-center justify-center">
          <motion.h1
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-center"
            variants={fadeInUp}
          >
            <span className="text-white">Stock </span>
            <span className="text-[#10B981]">Portfolio</span>
            <span className="text-white"> Dashboard</span>
          </motion.h1>

          <div className="relative w-full flex justify-center mt-3">
            <motion.div
              className="h-1 w-24 bg-[#FFB800] rounded-full absolute"
              initial={{ width: 0, x: "-50%", left: "50%" }}
              animate={{ width: 96 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            />
          </div>
        </div>

        {/* Market Info Section */}
        <div className="flex flex-wrap justify-center lg:justify-end items-center gap-3 w-full lg:w-[30%]">
          <MarketStatus marketStatus={marketStatus} />
          <SPIndex spIndex={spIndex} />
          <TradingVolume tradingVolume={tradingVolume} />
        </div>
      </div>
    </motion.div>
  );
};
