import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaPlus, FaMinus } from "react-icons/fa";
import { updatePortfolio } from "./stockReducer";
import { executeTrade } from "./client";
import { motion } from "framer-motion";

export const TradePanel = ({ selectedStock, quotes }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState("stocks");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { currentUser } = useSelector((state) => state.accountReducer);

  const handleTrade = async (type: "BUY" | "SELL") => {
    try {
      setError("");
      setSuccess("");
      setLoading(true);
      
      if (!selectedStock || !currentUser?._id) {
        throw new Error("Please select a stock first");
      }

      if (!quotes[selectedStock]) {
        throw new Error("Quote data not available");
      }

      const tradeData = {
        symbol: selectedStock,
        type,
        quantity,
        price: quotes[selectedStock].price,
      };

      const result = await executeTrade(currentUser._id, tradeData);
      dispatch(updatePortfolio(result));
      setSuccess(`Successfully ${type.toLowerCase()}ed ${quantity} shares of ${selectedStock}`);
      setQuantity(1);
    } catch (err: any) {
      setError(err.response?.data?.detail || err.message || "Failed to execute trade");
    } finally {
      setLoading(false);
    }
  };

  const TabButton = ({ isSelected, onClick, label, disabled = false }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex-1 py-3 rounded-lg font-medium ${
        isSelected
          ? "bg-[#10B981] text-white"
          : "bg-[#1A1A1A] text-[#10B981] border border-[#10B981]"
      } transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {label}
    </button>
  );
  
  const QuantityButton = ({ icon, onClick, disabled = false }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className="bg-[#1A1A1A] border border-[#10B981] text-[#10B981] p-3 rounded-lg hover:bg-[#10B981] hover:text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {icon}
    </button>
  );
  
  const TradeButton = ({ type, onClick, disabled = false }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex-1 ${
        type === "BUY"
          ? "bg-[#10B981] hover:bg-[#0D9668]"
          : "bg-[#EF4444] hover:bg-[#DC2626]"
      } text-white py-3 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {type}
    </button>
  );

  const OptionsPanel = () => (
    <div className="grid grid-cols-2 gap-6 mt-4">
      <div className="bg-[#0D1F17] rounded-lg p-6 border border-[#10B981]/20">
        <h3 className="text-[#10B981] font-bold text-lg mb-4">Calls</h3>
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#10B981]/20">
              <th className="text-[#10B981] text-left py-2 text-sm">Strike</th>
              <th className="text-[#10B981] text-left py-2 text-sm">Premium</th>
              <th className="text-[#10B981] text-left py-2 text-sm">Exp.</th>
            </tr>
          </thead>
          <tbody>
            {[
              { strike: 155.0, premium: 2.35, exp: "Apr 19" },
              { strike: 160.0, premium: 1.85, exp: "Apr 19" },
              { strike: 165.0, premium: 1.45, exp: "Apr 19" },
            ].map((option, i) => (
              <tr key={i} className="hover:bg-[#10B981]/10 cursor-pointer">
                <td className="py-3 text-sm text-[#10B981]">${option.strike.toFixed(2)}</td>
                <td className="py-3 text-sm text-[#10B981]">${option.premium.toFixed(2)}</td>
                <td className="py-3 text-sm text-[#10B981]">{option.exp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-[#221111] rounded-lg p-6 border border-[#EF4444]/20">
        <h3 className="text-[#EF4444] font-bold text-lg mb-4">Puts</h3>
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#EF4444]/20">
              <th className="text-[#EF4444] text-left py-2 text-sm">Strike</th>
              <th className="text-[#EF4444] text-left py-2 text-sm">Premium</th>
              <th className="text-[#EF4444] text-left py-2 text-sm">Exp.</th>
            </tr>
          </thead>
          <tbody>
            {[
              { strike: 145.0, premium: 1.85, exp: "Apr 19" },
              { strike: 140.0, premium: 1.45, exp: "Apr 19" },
              { strike: 135.0, premium: 1.15, exp: "Apr 19" },
            ].map((option, i) => (
              <tr key={i} className="hover:bg-[#EF4444]/10 cursor-pointer">
                <td className="py-3 text-sm text-[#EF4444]">${option.strike.toFixed(2)}</td>
                <td className="py-3 text-sm text-[#EF4444]">${option.premium.toFixed(2)}</td>
                <td className="py-3 text-sm text-[#EF4444]">{option.exp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <motion.div
      layout
      className="bg-[#1A1A1A] rounded-xl p-6 border border-[#10B981]/20"
    >
      <h2 className="text-xl font-bold text-[#FFB800] mb-6">Trade</h2>
      
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500"
        >
          {error}
        </motion.div>
      )}
      
      {success && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-green-500"
        >
          {success}
        </motion.div>
      )}

      <div className="flex gap-4 mb-6">
        <TabButton
          isSelected={selectedTab === "stocks"}
          onClick={() => setSelectedTab("stocks")}
          label="Stocks"
          disabled={loading}
        />
        <TabButton
          isSelected={selectedTab === "options"}
          onClick={() => setSelectedTab("options")}
          label="Options"
          disabled={loading}
        />
      </div>

      {selectedTab === "stocks" ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-[#10B981] mb-2 block">Quantity</label>
              <div className="flex items-center">
                <QuantityButton
                  icon={<FaMinus />}
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={loading}
                />
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                  disabled={loading}
                  className="w-full bg-[#1A1A1A] border-y border-[#10B981] text-[#10B981] px-4 py-2 text-center focus:outline-none disabled:opacity-50"
                />
                <QuantityButton
                  icon={<FaPlus />}
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={loading}
                />
              </div>
            </div>
            <div>
              <label className="text-[#10B981] mb-2 block">Total Value</label>
              <input
                type="text"
                disabled
                value={`$${(selectedStock && quotes[selectedStock] 
                  ? quotes[selectedStock].price * quantity 
                  : 0).toFixed(2)}`}
                className="w-full bg-[#1A1A1A] border border-[#10B981] text-[#10B981] px-4 py-2 rounded-lg disabled:opacity-50"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <TradeButton 
              type="BUY" 
              onClick={() => handleTrade("BUY")}
              disabled={loading || !selectedStock} 
            />
            <TradeButton 
              type="SELL" 
              onClick={() => handleTrade("SELL")}
              disabled={loading || !selectedStock} 
            />
          </div>
        </div>
      ) : (
        <OptionsPanel />
      )}

      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mt-4 text-[#10B981]"
        >
          Processing trade...
        </motion.div>
      )}
    </motion.div>
  );
};
