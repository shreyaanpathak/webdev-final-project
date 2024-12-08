import { motion } from "framer-motion";
import { cardVariants } from "./constants/index";
import { WatchlistPanel } from "./WatchlistPanel";
import { NewsPanel } from "./NewsPanel";

export const RightColumn = ({ portfolio, cash, watchlist, quotes }) => {

  const PortfolioCard = ({ title, value }) => (
    <div className="bg-[#0D1F17] rounded-lg p-4">
      <div className="text-[#10B981]/60 mb-1">{title}</div>
      <div className="text-[#10B981] text-2xl font-bold">${value}</div>
    </div>
  );

  return (
    <div className="space-y-8">
      <motion.div variants={cardVariants} className="bg-[#1A1A1A] rounded-xl p-6 border border-[#10B981]/20">
        <h2 className="text-xl font-bold text-[#FFB800] mb-6">Portfolio Summary</h2>
        <div className="space-y-4">
          <PortfolioCard title="Available Cash" value={cash.toFixed(2)} />
          <PortfolioCard
            title="Portfolio Value"
            value={Object.entries(portfolio)
              .reduce((total, [symbol, quantity]) => total + quantity * quotes[symbol].price, 0)
              .toFixed(2)}
          />
        </div>
      </motion.div>
      <WatchlistPanel watchlist={watchlist} quotes={quotes} />
      <NewsPanel />
    </div>
  );
};
