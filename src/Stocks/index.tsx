import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { StockHeader } from "./StockHeader";
import { QuickTradeGrid } from "./QuickTradeGrid";
import { MainTradingArea } from "./MainTradingArea";
import { RightColumn } from "./RightColumn";

export default function Stock() {
  const { selectedStock, quotes, portfolio, cash, watchlist } = 
    useSelector((state: any) => state.stocksReducer);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target?.closest(".search-container")) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-[#111111] flex flex-col">
      <StockHeader 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        showSearchResults={showSearchResults}
        setShowSearchResults={setShowSearchResults}
      />
      
      <div className="flex-1">
        <div className="max-w-[1920px] mx-auto p-6">
          <QuickTradeGrid quotes={quotes} />
          
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            <MainTradingArea 
              selectedStock={selectedStock}
              quotes={quotes}
              watchlist={watchlist}
            />
            <RightColumn 
              portfolio={portfolio}
              cash={cash}
              watchlist={watchlist}
              quotes={quotes}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
