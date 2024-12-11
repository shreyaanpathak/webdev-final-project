import { motion } from "framer-motion";
import { cardVariants } from "./constants";

export const TransactionsPanel = () => {
    const transactions = [
        { id: 1, type: "BUY", symbol: "AAPL", amount: 5000, price: 150.23, gain: 250.45, date: "2024-03-15" },
        { id: 2, type: "SELL", symbol: "GOOGL", amount: 2800, price: 2789.45, gain: -150.30, date: "2024-03-14" },
        { id: 3, type: "BUY", symbol: "TSLA", amount: 3500, price: 875.34, gain: 175.20, date: "2024-03-13" },
    ];

    return (
        <motion.div
            variants={cardVariants}
            className="bg-[#141414] rounded-xl p-6 border border-[#10B981]/20 shadow-lg shadow-[#10B981]/5 hover:shadow-xl hover:shadow-[#10B981]/10 transition-shadow duration-300"
        >
            <h2 className="text-xl font-bold text-[#FFB800] mb-6">Recent Transactions</h2>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-[#10B981]/20">
                            <th className="text-left py-4 text-[#10B981]">Type</th>
                            <th className="text-left py-4 text-[#10B981]">Symbol</th>
                            <th className="text-left py-4 text-[#10B981]">Amount</th>
                            <th className="text-left py-4 text-[#10B981]">Price</th>
                            <th className="text-left py-4 text-[#10B981]">Gain/Loss</th>
                            <th className="text-left py-4 text-[#10B981]">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction) => (
                            <tr key={transaction.id} className="border-b border-[#10B981]/20 hover:bg-[#0D1F17]/80 transition-all duration-300">
                                <td className="py-4">
                                    <span className={`px-3 py-1 rounded-full text-sm ${transaction.type === "BUY"
                                            ? "bg-[#10B981]/20 text-[#10B981]"
                                            : "bg-[#EF4444]/20 text-[#EF4444]"
                                        }`}>
                                        {transaction.type}
                                    </span>
                                </td>
                                <td className="py-4 text-[#FFB800]">{transaction.symbol}</td>
                                <td className="py-4 text-white">${transaction.amount.toLocaleString()}</td>
                                <td className="py-4 text-white">${transaction.price}</td>
                                <td className={`py-4 ${transaction.gain >= 0 ? "text-[#10B981]" : "text-[#EF4444]"}`}>
                                    {transaction.gain >= 0 ? "+" : ""}{transaction.gain}
                                </td>
                                <td className="py-4 text-[#10B981]">{transaction.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
};