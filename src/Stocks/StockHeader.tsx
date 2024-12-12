import { FaSearch } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import { setSelectedStock, updateQuote } from "./stockReducer";
import { useState, useEffect, useRef } from "react";
import * as client from "./client";

export const StockHeader = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchContainerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      setLoading(true);
      const quote = await client.getQuote(searchQuery.trim().toUpperCase());
      if (quote) {
        dispatch(setSelectedStock(quote.symbol));
        dispatch(updateQuote(quote));
        setSearchQuery("");
        setShowSearchResults(false);
      }
    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const SearchBar = () => (
    <div className="search-container" ref={searchContainerRef}>
      <div className="relative">
        <input
          type="text"
          placeholder="Search stocks by symbol..."
          className="w-full px-4 py-3 bg-[#1A1A1A] rounded-lg text-[#FFB800] border border-[#10B981]/20 focus:border-[#FFB800] focus:outline-none"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setShowSearchResults(true);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSearch();
            }
            if (e.key === "Escape") {
              setShowSearchResults(false);
            }
          }}
          onFocus={() => {
            if (searchQuery) setShowSearchResults(true);
          }}
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#10B981] hover:bg-[#0D9668] text-white p-2 rounded-lg transition-colors duration-200 disabled:opacity-50"
        >
          <FaSearch />
        </button>
      </div>
      {loading && (
        <div className="absolute mt-2 text-[#10B981] text-sm">
          Searching...
        </div>
      )}
    </div>
  );

  const MarketInfo = () => (
    <div className="flex justify-end gap-4">
      <MarketStatus />
      <SPIndex />
      <TradingVolume />
    </div>
  );

  const MarketStatus = () => (
    <div className="px-10 py-2 bg-[#1A1A1A] rounded-lg border border-[#10B981]/20">
      <div className="text-[#10B981] text-sm">Market Status</div>
      <div className="text-[#FFB800] text-sm font-bold flex items-center gap-1">
        <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
        Open
      </div>
    </div>
  );

  const SPIndex = () => (
    <div className="px-10 py-2 bg-[#1A1A1A] rounded-lg border border-[#10B981]/20">
      <div className="text-[#10B981] text-sm">S&P 500</div>
      <div className="text-[#FFB800] text-sm font-bold">
        4,783.45 <span className="text-[#10B981]">+1.2%</span>
      </div>
    </div>
  );

  const TradingVolume = () => (
    <div className="px-10 py-2 bg-[#1A1A1A] rounded-lg border border-[#10B981]/20">
      <div className="text-[#10B981] text-sm">Trading Volume</div>
      <div className="text-[#FFB800] text-sm font-bold">2.5M</div>
    </div>
  );

  return (
    <div className="bg-[#111111] border-b border-[#10B981]/20">
      <div className="max-w-[1920px] mx-auto p-6 grid grid-cols-3 items-center">
        <SearchBar />
        <h1 className="text-4xl font-bold text-center">
          <span>Stock</span> 
          <span className="text-green-600"> Portfolio</span> 
          <span> Dashboard </span>
        </h1>
        <MarketInfo />
      </div>
    </div>
  );
};
