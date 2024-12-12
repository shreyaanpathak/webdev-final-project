import { motion } from "framer-motion";
import { cardVariants } from "./constants";
import { useState } from "react";
import { api } from "../config";
import { useSelector } from "react-redux";
import { ChatResponse, Message } from "./client";


export const AIChatbot = () => {
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: "Hello! I'm your AI investment assistant. How can I help you today?" }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const { currentUser } = useSelector((state: any) => state.accountReducer);

    const sendMessage = async (message: string) => {
        try {
            const response = await api.post<ChatResponse>('/chat/chat', {
                message,
                chat_history: messages
            });
            return response.data.response;
        } catch (error) {
            console.error('Error sending message:', error);
            throw error;
        }
    };

    const analyzeStock = async (symbol: string, stockData: any) => {
        try {
            const response = await api.post('/chat/analyze/stock', {
                symbol,
                ...stockData
            });
            return response.data.analysis;
        } catch (error) {
            console.error('Error analyzing stock:', error);
            throw error;
        }
    };

    const analyzePortfolio = async () => {
        if (!currentUser?._id) return;
        
        try {
            const response = await api.post('/chat/analyze/portfolio', {
                holdings: currentUser.portfolio,
                total_value: currentUser.total_value,
                cash_position: currentUser.cash,
                risk_profile: "moderate"
            });
            return response.data.analysis;
        } catch (error) {
            console.error('Error analyzing portfolio:', error);
            throw error;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = input.trim();
        setInput('');
        setLoading(true);

        // Add user message immediately
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);

        try {
            let response;

            // Check message content to determine which API to call
            if (userMessage.toLowerCase().includes('analyze stock')) {
                const stockSymbol = userMessage.split(' ').pop()?.toUpperCase() || '';
                response = await analyzeStock(stockSymbol, {
                    price: 0, // You would need to get actual stock data
                    change: 0,
                    percentChange: 0,
                    timeframe: "daily"
                });
            } else if (userMessage.toLowerCase().includes('analyze portfolio')) {
                response = await analyzePortfolio();
            } else {
                response = await sendMessage(userMessage);
            }

            // Add AI response
            setMessages(prev => [...prev, { role: 'assistant', content: response }]);
        } catch (error) {
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: 'Sorry, I encountered an error processing your request. Please try again.'
            }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            variants={cardVariants}
            className="bg-[#141414] rounded-xl p-6 border border-[#10B981]/20 shadow-lg shadow-[#10B981]/5 hover:shadow-xl hover:shadow-[#10B981]/10 transition-shadow duration-300"
        >
            <h2 className="text-xl font-bold text-[#FFB800] mb-6">AI Investment Assistant</h2>

            <div className="space-y-4 h-[400px] overflow-y-auto">
                {messages.map((message, index) => (
                    <div key={index} className={`chat ${message.role === 'user' ? 'chat-end' : 'chat-start'}`}>
                        <div className={`chat-bubble ${message.role === 'user'
                            ? 'bg-[#10B981] text-white hover:bg-[#0D9668]'
                            : 'bg-[#0D1F17] text-[#10B981] hover:bg-[#0D1F17]/80'
                            } transition-all duration-300`}>
                            {message.content}
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="chat chat-start">
                        <div className="chat-bubble bg-[#0D1F17] text-[#10B981]">
                            Thinking...
                        </div>
                    </div>
                )}
            </div>

            <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about your portfolio..."
                    className="flex-1 bg-[#0D1F17] border border-[#10B981]/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#10B981]"
                    disabled={loading}
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-[#10B981] text-white px-4 py-2 rounded-lg hover:bg-[#0D9668] transition-colors disabled:opacity-50"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </button>
            </form>
        </motion.div>
    );
};
