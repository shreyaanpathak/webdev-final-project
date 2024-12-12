import { motion } from "framer-motion";
import { cardVariants } from "./constants";
import { useEffect, useState } from "react";
import { Transaction, getTransactions } from "./client";
import { useSelector } from "react-redux";

export const TransactionsPanel = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const { currentUser } = useSelector((state: any) => ({
        ...state.stocksReducer,
        currentUser: state.accountReducer.currentUser
    }));

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                if (currentUser?._id) {
                    setError(null);
                    const data = await getTransactions(currentUser._id);
                    setTransactions(data);
                }
            } catch (error: any) {
                console.error("Failed to fetch transactions:", error);
                setError(error.message || "Failed to load transactions");
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, [currentUser?._id]);

    const formatTradeDetails = (transaction: Transaction) => {
        if (transaction.option_type) {
            return `${transaction.option_type} ${transaction.strike} ${transaction.expiration} @ $${transaction.premium}`;
        }
        return `${transaction.quantity} shares @ $${transaction.price?.toFixed(2) || 'N/A'}`;
    };

    return (
        <motion.div
            variants={cardVariants}
            className="bg-[#141414] rounded-xl p-6 border border-[#10B981]/20 shadow-lg shadow-[#10B981]/5 hover:shadow-xl hover:shadow-[#10B981]/10 transition-shadow duration-300"
        >
            <h2 className="text-xl font-bold text-[#FFB800] mb-6">Recent Transactions</h2>
            {loading ? (
                <div className="text-white">Loading transactions...</div>
            ) : error ? (
                <div className="text-red-500">Error: {error}</div>
            ) : !transactions.length ? (
                <div className="text-white">No transactions found</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-[#10B981]/20">
                                <th className="text-left py-4 text-[#10B981]">Type</th>
                                <th className="text-left py-4 text-[#10B981]">Symbol</th>
                                <th className="text-left py-4 text-[#10B981]">Amount</th>
                                <th className="text-left py-4 text-[#10B981]">Details</th>
                                <th className="text-left py-4 text-[#10B981]">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((transaction) => (
                                <tr key={transaction.id} className="border-b border-[#10B981]/20 hover:bg-[#0D1F17]/80 transition-all duration-300">
                                    <td className="py-4">
                                        <span className={`px-3 py-1 rounded-full text-sm ${
                                            transaction.type === "BUY"
                                                ? "bg-[#10B981]/20 text-[#10B981]"
                                                : "bg-[#EF4444]/20 text-[#EF4444]"
                                        }`}>
                                            {transaction.type}
                                        </span>
                                    </td>
                                    <td className="py-4 text-[#FFB800]">{transaction.symbol}</td>
                                    <td className="py-4 text-white">${transaction.amount.toLocaleString()}</td>
                                    <td className="py-4 text-white">
                                        {formatTradeDetails(transaction)}
                                    </td>
                                    <td className="py-4 text-[#10B981]">{transaction.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </motion.div>
    );
};
