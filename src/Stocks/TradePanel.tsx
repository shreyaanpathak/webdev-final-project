import { useState } from "react";
import { useDispatch } from "react-redux";
import { FaPlus, FaMinus } from "react-icons/fa";
import { addTransaction } from "./stockReducer";

export const TradePanel = ({ selectedStock, quotes }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState("stocks");

  const handleTrade = (type: "BUY" | "SELL") => {
    if (selectedStock) {
      dispatch(
        addTransaction({
          symbol: selectedStock,
          type,
          quantity,
          price: quotes[selectedStock].price,
        })
      );
    }
  };

  const TabButton = ({ isSelected, onClick, label }) => (
    <button
      onClick={onClick}
      className={`flex-1 py-3 rounded-lg font-medium ${
        isSelected
          ? "bg-[#10B981] text-white"
          : "bg-[#1A1A1A] text-[#10B981] border border-[#10B981]"
      } transition-all duration-200`}
    >
      {label}
    </button>
  );
  
  const QuantityButton = ({ icon, onClick }) => (
    <button
      onClick={onClick}
      className="bg-[#1A1A1A] border border-[#10B981] text-[#10B981] p-3 rounded-lg hover:bg-[#10B981] hover:text-white transition-all duration-200"
    >
      {icon}
    </button>
  );
  
  const TradeButton = ({ type, onClick }) => (
    <button
      onClick={onClick}
      className={`flex-1 ${
        type === "BUY"
          ? "bg-[#10B981] hover:bg-[#0D9668]"
          : "bg-[#EF4444] hover:bg-[#DC2626]"
      } text-white py-3 rounded-lg font-medium transition-all duration-200`}
    >
      {type}
    </button>
  );
  
  // Also add the OptionsPanel component that was referenced
  // In TradePanel.tsx

const OptionsPanel = () => (
  <div className="grid grid-cols-2 gap-6 mt-4">
    {/* Calls Panel */}
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

    {/* Puts Panel */}
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
    <div className="bg-[#1A1A1A] rounded-xl p-6 border border-[#10B981]/20">
      <h2 className="text-xl font-bold text-[#FFB800] mb-6">Trade</h2>
      <div className="flex gap-4 mb-6">
        <TabButton
          isSelected={selectedTab === "stocks"}
          onClick={() => setSelectedTab("stocks")}
          label="Stocks"
        />
        <TabButton
          isSelected={selectedTab === "options"}
          onClick={() => setSelectedTab("options")}
          label="Options"
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
                />
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                  className="w-full bg-[#1A1A1A] border-y border-[#10B981] text-[#10B981] px-4 py-2 text-center focus:outline-none"
                />
                <QuantityButton
                  icon={<FaPlus />}
                  onClick={() => setQuantity(quantity + 1)}
                />
              </div>
            </div>
            <div>
              <label className="text-[#10B981] mb-2 block">Total Value</label>
              <input
                type="text"
                disabled
                value={`$${(selectedStock ? quotes[selectedStock].price * quantity : 0).toFixed(2)}`}
                className="w-full bg-[#1A1A1A] border border-[#10B981] text-[#10B981] px-4 py-2 rounded-lg"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <TradeButton type="BUY" onClick={() => handleTrade("BUY")} />
            <TradeButton type="SELL" onClick={() => handleTrade("SELL")} />
          </div>
        </div>
      ) : (
        <OptionsPanel />
      )}
    </div>
  );
};
