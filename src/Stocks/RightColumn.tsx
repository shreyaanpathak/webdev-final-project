import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { cardVariants } from "./constants/index";
import { WatchlistPanel } from "./WatchlistPanel";
import { NewsPanel } from "./NewsPanel";
import * as client from "./client";

export const RightColumn = () => {
  const [portfolioData, setPortfolioData] = useState({
    cash: 0,
    positions: [],
    total_value: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);  // Added error state
  const { currentUser } = useSelector((state) => state.accountReducer);
  const { quotes } = useSelector((state) => state.stocksReducer);

  const PortfolioCard = ({ title, value }) => (
    <div className="bg-[#0D1F17] rounded-lg p-4">
      <div className="text-[#10B981]/60 mb-1">{title}</div>
      <div className="text-[#10B981] text-2xl font-bold">${value}</div>
    </div>
  );

  useEffect(() => {
    const fetchPortfolioData = async () => {
      if (!currentUser?._id) return;
      
      try {
        setLoading(true);
        const data = await client.getPortfolio(currentUser._id);
        setPortfolioData(data);
        setError(null);  // Clear any existing errors
      } catch (err) {
        console.error("Failed to fetch portfolio:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioData();
  }, [currentUser]);

  if (loading) {
    return (
      <div className="space-y-8">
        <motion.div variants={cardVariants} className="bg-[#1A1A1A] rounded-xl p-6 border border-[#10B981]/20">
          <div className="animate-pulse">
            <div className="h-6 w-48 bg-[#10B981]/20 rounded mb-6"></div>
            <div className="space-y-4">
              <div className="h-24 bg-[#0D1F17] rounded-lg"></div>
              <div className="h-24 bg-[#0D1F17] rounded-lg"></div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-8">
        <motion.div variants={cardVariants} className="bg-[#1A1A1A] rounded-xl p-6 border border-[#10B981]/20">
          <div className="text-red-500 text-center">{error}</div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <motion.div variants={cardVariants} className="bg-[#1A1A1A] rounded-xl p-6 border border-[#10B981]/20">
        <h2 className="text-xl font-bold text-[#FFB800] mb-6">Portfolio Summary</h2>
        <div className="space-y-4">
          <PortfolioCard 
            title="Available Cash" 
            value={portfolioData.cash.toFixed(2)} 
          />
          <PortfolioCard
            title="Portfolio Value"
            value={portfolioData.total_value.toFixed(2)}
          />
        </div>
      </motion.div>
      <WatchlistPanel quotes={quotes} />
      <NewsPanel />
    </div>
  );
};
