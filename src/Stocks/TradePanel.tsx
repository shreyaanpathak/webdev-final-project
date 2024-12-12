// TradePanel.tsx
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaPlus, FaMinus, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { updatePortfolio } from "./stockReducer";
import { executeTrade, getOptionsChain, executeOptionTrade, ConfirmationModalProps, OptionTrade, OptionsChain } from "./client";
import type { RootState } from "../store";



const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  type,
  symbol,
  quantity,
  price,
  availableCash,
  loading
}: ConfirmationModalProps) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-[#1A1A1A] rounded-2xl p-8 max-w-lg w-full border border-[#10B981]/20">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#FFB800]">
                Confirm {type}
              </h2>
              <button
                onClick={onClose}
                className="text-[#10B981] hover:text-[#0D9668] transition-colors"
              >
                <FaTimes size={24} />
              </button>
            </div>

            <div className="space-y-6">
              <div className="bg-[#0D1F17] rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-[#10B981]/60 text-sm">Symbol</div>
                    <div className="text-white text-lg font-bold">{symbol}</div>
                  </div>
                  <div>
                    <div className="text-[#10B981]/60 text-sm">Quantity</div>
                    <div className="text-white text-lg font-bold">{quantity}</div>
                  </div>
                  <div>
                    <div className="text-[#10B981]/60 text-sm">Price</div>
                    <div className="text-white text-lg font-bold">${price.toFixed(2)}</div>
                  </div>
                  <div>
                    <div className="text-[#10B981]/60 text-sm">Total Value</div>
                    <div className="text-white text-lg font-bold">
                      ${(price * quantity).toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#0D1F17] rounded-lg p-4">
                <div className="text-[#10B981]/60 text-sm">Available Cash</div>
                <div className="text-white text-lg font-bold">
                  ${availableCash.toFixed(2)}
                </div>
                {type === "BUY" && (
                  <div className="text-[#10B981]/60 text-sm mt-2">
                    Remaining after purchase: ${(availableCash - (price * quantity)).toFixed(2)}
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                <button
                  onClick={onClose}
                  className="flex-1 bg-[#1A1A1A] text-[#10B981] border border-[#10B981] py-3 rounded-lg font-medium hover:bg-[#10B981]/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={onConfirm}
                  disabled={loading}
                  className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
                    type === "BUY"
                      ? "bg-[#10B981] hover:bg-[#0D9668] text-white"
                      : "bg-[#EF4444] hover:bg-[#DC2626] text-white"
                  } disabled:opacity-50`}
                >
                  {loading ? "Processing..." : `Confirm ${type}`}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

export const TradePanel = ({ selectedStock, quotes }) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const portfolioCash = useSelector((state: RootState) => state.stocksReducer.cash);
  
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [tradeType, setTradeType] = useState<"BUY" | "SELL" | null>(null);

  const handleTradeClick = (type: "BUY" | "SELL") => {
    setTradeType(type);
    setShowConfirmation(true);
  };

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

  const handleConfirmTrade = async () => {
    if (!tradeType) return;
    await handleStockTrade(tradeType);
    setShowConfirmation(false);
    setTradeType(null);
  };

  return (
    <div className="bg-[#1A1A1A] rounded-xl p-6 border border-[#10B981]/20">
      <h2 className="text-xl font-bold text-[#FFB800] mb-6">Trade</h2>
      
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
            onClick={() => handleTradeClick("BUY")}
            disabled={loading}
            className="flex-1 bg-[#10B981] hover:bg-[#0D9668] text-white py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
          >
            BUY
          </button>
          <button
            onClick={() => handleTradeClick("SELL")}
            disabled={loading}
            className="flex-1 bg-[#EF4444] hover:bg-[#DC2626] text-white py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
          >
            SELL
          </button>
        </div>
        {error && (
          <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-center">
            {error}
          </div>
        )}
      </div>

      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={() => {
          setShowConfirmation(false);
          setTradeType(null);
        }}
        onConfirm={handleConfirmTrade}
        type={tradeType || "BUY"}
        symbol={selectedStock}
        quantity={quantity}
        price={selectedStock ? quotes[selectedStock].price : 0}
        availableCash={portfolioCash}
        loading={loading}
      />
    </div>
  );
};
