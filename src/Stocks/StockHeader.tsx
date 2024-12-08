import { FaSearch } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { popularStocks } from "./constants/index";
import { useDispatch } from "react-redux";
import { setSelectedStock } from "./stockReducer";

export const StockHeader = ({
  searchQuery,
  setSearchQuery,
  showSearchResults,
  setShowSearchResults,
}) => {
  const dispatch = useDispatch();

  const handleSearch = () => {
    const matchingStock = popularStocks.find(
      (stock) =>
        stock.symbol.toLowerCase() === searchQuery.toLowerCase() ||
        stock.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (matchingStock) {
      dispatch(setSelectedStock(matchingStock.symbol));
      setSearchQuery("");
      setShowSearchResults(false);
    }
  };

  return (
    <div className="bg-[#111111] border-b border-[#10B981]/20">
      <div className="max-w-[1920px] mx-auto p-6 grid grid-cols-3 items-center">
        <div className="search-container">
          <div className="relative">
            <input
              type="text"
              placeholder="Search stocks..."
              className="w-full px-4 py-3 bg-[#1A1A1A] rounded-lg text-[#FFB800] border border-[#10B981]/20 focus:border-[#FFB800] focus:outline-none"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchResults(true);
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
            />
            <button
              onClick={handleSearch}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#10B981] hover:bg-[#0D9668] text-white p-2 rounded-lg transition-colors duration-200"
            >
              <FaSearch />
            </button>
          </div>
          <AnimatePresence>
            {showSearchResults && searchQuery && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute z-20 w-full mt-2 bg-[#1A1A1A] rounded-lg shadow-xl border border-[#10B981]/20"
              >
                {popularStocks
                  .filter(
                    (stock) =>
                      stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      stock.name.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((stock) => (
                    <div
                      key={stock.symbol}
                      className="p-3 hover:bg-[#10B981]/10 cursor-pointer border-b border-[#10B981]/10 last:border-0"
                      onClick={() => {
                        dispatch(setSelectedStock(stock.symbol));
                        setSearchQuery("");
                        setShowSearchResults(false);
                      }}
                    >
                      <div className="font-bold text-[#FFB800]">{stock.symbol}</div>
                      <div className="text-sm text-[#10B981]">{stock.name}</div>
                    </div>
                  ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <h1 className="text-4xl font-bold text-center">
          <span>Stock</span> <span className="text-green-600">Portfolio</span> <span> Dashboard </span>
        </h1>
        <div className="flex justify-end gap-4">
          <div className="px-10 py-2 bg-[#1A1A1A] rounded-lg border border-[#10B981]/20">
            <div className="text-[#10B981] text-sm">Market Status</div>
            <div className="text-[#FFB800] text-sm font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
              Open
            </div>
          </div>
          <div className="px-10 py-2 bg-[#1A1A1A] rounded-lg border border-[#10B981]/20">
            <div className="text-[#10B981] text-sm">S&P 500</div>
            <div className="text-[#FFB800] text-sm font-bold">
              4,783.45 <span className="text-[#10B981]">+1.2%</span>
            </div>
          </div>
          <div className="px-10 py-2 bg-[#1A1A1A] rounded-lg border border-[#10B981]/20">
            <div className="text-[#10B981] text-sm">Trading Volume</div>
            <div className="text-[#FFB800] text-sm font-bold">2.5M</div>
          </div>
        </div>
      </div>
    </div>
  );
};
