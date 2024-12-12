import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaPlus, FaMinus } from "react-icons/fa";
import { updatePortfolio } from "./stockReducer";
import { executeTrade, getOptionsChain, executeOptionTrade } from "./client";
import type { RootState } from "../store";

interface OptionTrade {
  strike: number;
  premium: number;
  expiration: string;
  type: "CALL" | "PUT";
  trade_type: "BUY" | "SELL";
  quantity: number;
}

interface OptionsChain {
  calls: OptionTrade[];
  puts: OptionTrade[];
}

export const TradePanel = ({ selectedStock, quotes }) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState("stocks");
  const [selectedOption, setSelectedOption] = useState<OptionTrade | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [optionsChain, setOptionsChain] = useState<OptionsChain>({ calls: [], puts: [] });
  const [loadingOptions, setLoadingOptions] = useState(false);

  useEffect(() => {
    const fetchOptions = async () => {
      if (!selectedStock) return;
      
      try {
        setLoadingOptions(true);
        setError(null);
        const data = await getOptionsChain(selectedStock);
        
        if (data.error) {
          setError(data.error);
          setOptionsChain({ calls: [], puts: [] });
        } else {
          setOptionsChain(data);
        }
      } catch (err) {
        const errorMessage = err.response?.data?.detail || err.message || "Failed to fetch options";
        console.error("Failed to fetch options:", errorMessage);
        setError(errorMessage);
        setOptionsChain({ calls: [], puts: [] });
      } finally {
        setLoadingOptions(false);
      }
    };
  
    if (selectedTab === "options") {
      fetchOptions();
    }
  }, [selectedStock, selectedTab]);

  const handleStockTrade = async (type: "BUY" | "SELL") => {
    if (!selectedStock || !currentUser?._id) return;

    try {
      setLoading(true);
      setError(null);
      
      const result = await executeTrade(currentUser._id, {
        symbol: selectedStock,
        type,
        quantity,
        price: quotes[selectedStock].price,
      });
      
      dispatch(updatePortfolio(result));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to execute trade");
      console.error("Trade failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleOptionTrade = async (type: "BUY" | "SELL") => {
    if (!selectedStock || !selectedOption || !currentUser?._id) return;

    try {
      setLoading(true);
      setError(null);
      
      const result = await executeOptionTrade(
        currentUser._id,
        selectedStock,
        selectedOption.type,
        selectedOption.strike,
        selectedOption.premium,
        selectedOption.expiration,
        type,
        quantity
      );
      
      dispatch(updatePortfolio(result));
      setSelectedOption(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to execute option trade");
      console.error("Option trade failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOption = (option: OptionTrade) => {
    setSelectedOption(option);
    setError(null);
  };

  const OptionsPanel = () => (
    <div className="space-y-6">
      {loadingOptions ? (
        <div className="text-center text-[#10B981] p-8">Loading options chain...</div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-6">
            {/* Calls Panel */}
            <div className="bg-[#0D1F17] rounded-lg p-6 border border-[#10B981]/20">
              <h3 className="text-[#10B981] font-bold text-lg mb-4">Calls</h3>
              <div className="max-h-[400px] overflow-y-auto">
                <table className="w-full">
                  <thead className="sticky top-0 bg-[#0D1F17]">
                    <tr className="border-b border-[#10B981]/20">
                      <th className="text-[#10B981] text-left py-2 text-sm">Strike</th>
                      <th className="text-[#10B981] text-left py-2 text-sm">Premium</th>
                      <th className="text-[#10B981] text-left py-2 text-sm">Exp.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {optionsChain.calls.map((option, i) => (
                      <tr
                        key={i}
                        onClick={() => handleSelectOption({
                          ...option,
                          type: "CALL",
                          trade_type: "BUY",
                          quantity: quantity
                        })}
                        className={`hover:bg-[#10B981]/10 cursor-pointer ${
                          selectedOption?.strike === option.strike && 
                          selectedOption?.type === "CALL" &&
                          selectedOption?.expiration === option.expiration
                            ? 'bg-[#10B981]/20'
                            : ''
                        }`}
                      >
                        <td className="py-3 text-sm text-[#10B981]">
                          ${option.strike.toFixed(2)}
                        </td>
                        <td className="py-3 text-sm text-[#10B981]">
                          ${option.premium.toFixed(2)}
                        </td>
                        <td className="py-3 text-sm text-[#10B981]">
                          {option.expiration}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Puts Panel */}
            <div className="bg-[#221111] rounded-lg p-6 border border-[#EF4444]/20">
              <h3 className="text-[#EF4444] font-bold text-lg mb-4">Puts</h3>
              <div className="max-h-[400px] overflow-y-auto">
                <table className="w-full">
                  <thead className="sticky top-0 bg-[#221111]">
                    <tr className="border-b border-[#EF4444]/20">
                      <th className="text-[#EF4444] text-left py-2 text-sm">Strike</th>
                      <th className="text-[#EF4444] text-left py-2 text-sm">Premium</th>
                      <th className="text-[#EF4444] text-left py-2 text-sm">Exp.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {optionsChain.puts.map((option, i) => (
                      <tr
                        key={i}
                        onClick={() => handleSelectOption({
                          ...option,
                          type: "PUT",
                          trade_type: "BUY",
                          quantity: quantity
                        })}
                        className={`hover:bg-[#EF4444]/10 cursor-pointer ${
                          selectedOption?.strike === option.strike && 
                          selectedOption?.type === "PUT" &&
                          selectedOption?.expiration === option.expiration
                            ? 'bg-[#EF4444]/20'
                            : ''
                        }`}
                      >
                        <td className="py-3 text-sm text-[#EF4444]">
                          ${option.strike.toFixed(2)}
                        </td>
                        <td className="py-3 text-sm text-[#EF4444]">
                          ${option.premium.toFixed(2)}
                        </td>
                        <td className="py-3 text-sm text-[#EF4444]">
                          {option.expiration}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {selectedOption && (
            <div className="mt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-[#0D1F17] p-4 rounded-lg">
                  <span className="text-[#10B981]">Selected Contract</span>
                  <span className="text-white">
                    {selectedOption.type} ${selectedOption.strike} {selectedOption.expiration}
                  </span>
                </div>
                
                <div className="flex gap-4">
                  <button
                    onClick={() => handleOptionTrade("BUY")}
                    disabled={loading}
                    className="flex-1 bg-[#10B981] hover:bg-[#0D9668] text-white py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
                  >
                    {loading ? "Processing..." : `Buy ${quantity} Contract${quantity > 1 ? 's' : ''}`}
                  </button>
                  <button
                    onClick={() => handleOptionTrade("SELL")}
                    disabled={loading}
                    className="flex-1 bg-[#EF4444] hover:bg-[#DC2626] text-white py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
                  >
                    {loading ? "Processing..." : `Sell ${quantity} Contract${quantity > 1 ? 's' : ''}`}
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-center">
          {error}
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-[#1A1A1A] rounded-xl p-6 border border-[#10B981]/20">
      <h2 className="text-xl font-bold text-[#FFB800] mb-6">Trade</h2>
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setSelectedTab("stocks")}
          className={`flex-1 py-3 rounded-lg font-medium ${
            selectedTab === "stocks"
              ? "bg-[#10B981] text-white"
              : "bg-[#1A1A1A] text-[#10B981] border border-[#10B981]"
          } transition-all duration-200`}
        >
          Stocks
        </button>
        <button
          onClick={() => setSelectedTab("options")}
          className={`flex-1 py-3 rounded-lg font-medium ${
            selectedTab === "options"
              ? "bg-[#10B981] text-white"
              : "bg-[#1A1A1A] text-[#10B981] border border-[#10B981]"
          } transition-all duration-200`}
        >
          Options
        </button>
      </div>

      {selectedTab === "stocks" ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-[#10B981] mb-2 block">Quantity</label>
              <div className="flex items-center">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="bg-[#1A1A1A] border border-[#10B981] text-[#10B981] p-3 rounded-lg hover:bg-[#10B981] hover:text-white transition-all duration-200"
                >
                  <FaMinus />
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                  className="w-full bg-[#1A1A1A] border-y border-[#10B981] text-[#10B981] px-4 py-2 text-center focus:outline-none"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="bg-[#1A1A1A] border border-[#10B981] text-[#10B981] p-3 rounded-lg hover:bg-[#10B981] hover:text-white transition-all duration-200"
                >
                  <FaPlus />
                </button>
              </div>
            </div>
            <div>
              <label className="text-[#10B981] mb-2 block">Total Value</label>
              <input
                type="text"
                disabled
                value={`$${(
                  selectedStock ? quotes[selectedStock].price * quantity : 0
                ).toFixed(2)}`}
                className="w-full bg-[#1A1A1A] border border-[#10B981] text-[#10B981] px-4 py-2 rounded-lg"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => handleStockTrade("BUY")}
              disabled={loading}
              className="flex-1 bg-[#10B981] hover:bg-[#0D9668] text-white py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
            >
              {loading ? "Processing..." : "BUY"}
            </button>
            <button
              onClick={() => handleStockTrade("SELL")}
              disabled={loading}
              className="flex-1 bg-[#EF4444] hover:bg-[#DC2626] text-white py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
            >
              {loading ? "Processing..." : "SELL"}
            </button>
          </div>
          {error && (
            <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-center">
              {error}
            </div>
          )}
        </div>
      ) : (
        <OptionsPanel />
      )}
    </div>
  );
};
