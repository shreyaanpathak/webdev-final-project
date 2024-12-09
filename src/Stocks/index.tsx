import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaChartLine, FaRobot, FaBell, FaLock } from "react-icons/fa";
import { StockHeader } from "./StockHeader";
import { QuickTradeGrid } from "./QuickTradeGrid";
import { MainTradingArea } from "./MainTradingArea";
import { RightColumn } from "./RightColumn";
import { Chart } from "./Chart";
import { GoldModal } from "./GoldModal";

export default function Stock() {
  const { selectedStock, quotes, portfolio, cash, watchlist } = 
    useSelector((state: any) => state.stocksReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showGoldModal, setShowGoldModal] = useState(false);

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

  // Limited view for non-authenticated users
  if (!currentUser) {
    return (
      <>
        <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-5xl w-full bg-[#111111] rounded-2xl p-8 border border-green-500/10 shadow-2xl"
          >
            <div className="text-center mb-12">
              <motion.h1 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-5xl font-bold text-yellow-500 mb-4"
              >
                Elevate Your Trading
              </motion.h1>
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-green-500/80 text-xl"
              >
                Experience the power of advanced trading tools and real-time market data
              </motion.p>
            </div>

            {/* Preview Chart with Blur Overlay */}
            <div className="mb-12 relative rounded-xl overflow-hidden">
              <Chart selectedStock="AAPL" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="bg-black/60 p-4 rounded-lg backdrop-blur-sm border border-yellow-500/20"
                >
                  <FaLock className="text-yellow-500 text-4xl mb-2 mx-auto" />
                  <p className="text-green-500">Unlock full chart features</p>
                </motion.div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-black/40 p-6 rounded-xl border border-green-500/10"
              >
                <h3 className="text-xl font-bold text-yellow-500 mb-4">Free Preview</h3>
                <ul className="space-y-3 text-green-500/80">
                  <li className="flex items-center gap-2">
                    <FaChartLine className="text-yellow-500/60" />
                    Limited market data
                  </li>
                  <li className="flex items-center gap-2">
                    <FaBell className="text-yellow-500/60" />
                    Basic stock alerts
                  </li>
                  <li className="flex items-center gap-2">
                    <FaRobot className="text-yellow-500/60" />
                    Simple analytics
                  </li>
                </ul>
              </motion.div>
              
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-black/40 p-6 rounded-xl border border-yellow-500/20"
              >
                <h3 className="text-xl font-bold text-yellow-500 mb-4">Gold Features</h3>
                <ul className="space-y-3 text-green-500/80">
                  <li className="flex items-center gap-2">
                    <FaChartLine className="text-yellow-500" />
                    Real-time advanced trading
                  </li>
                  <li className="flex items-center gap-2">
                    <FaBell className="text-yellow-500" />
                    Custom alert system
                  </li>
                  <li className="flex items-center gap-2">
                    <FaRobot className="text-yellow-500" />
                    AI-powered insights
                  </li>
                </ul>
              </motion.div>
            </div>

            <div className="flex justify-center gap-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowGoldModal(true)}
                className="btn btn-lg bg-yellow-500 hover:bg-yellow-600 text-black border-0 px-8"
              >
                Upgrade to Gold
              </motion.button>
              <Link to="/Account/Signin">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-lg btn-outline text-green-500 hover:bg-green-500 hover:text-black px-8"
                >
                  Sign In
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
        <GoldModal isOpen={showGoldModal} onClose={() => setShowGoldModal(false)} />
      </>
    );
  }

  // Full view for authenticated users
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
