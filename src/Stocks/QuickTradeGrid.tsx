import { useDispatch } from "react-redux";
import { setSelectedStock } from "./stockReducer";

export const QuickTradeGrid = ({ quotes }) => {
  const dispatch = useDispatch();

  const QuickTradeCard = ({ symbol, price, change }) => (
    <div
      onClick={() => dispatch(setSelectedStock(symbol))}
      className="bg-[#1A1A1A] p-4 rounded-lg border border-[#FFB800]/20 hover:border-[#10B981] cursor-pointer transition-all duration-200"
    >
      <div className="flex justify-between items-center">
        <span className="text-[#FFB800] font-bold">{symbol}</span>
        <span className={`text-sm ${change >= 0 ? "text-[#10B981]" : "text-[#EF4444]"}`}>
          {change >= 0 ? "+" : ""}{change}%
        </span>
      </div>
      <div className="text-xl text-white mt-1">${price}</div>
    </div>
  );

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {Object.entries(quotes).map(([symbol, quote]) => (
        <QuickTradeCard
          key={symbol}
          symbol={symbol}
          price={quote.price}
          change={quote.percentChange}
        />
      ))}
    </div>
  );
};
