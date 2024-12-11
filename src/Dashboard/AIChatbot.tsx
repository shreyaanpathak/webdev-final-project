// AIChatbot.tsx
import { motion } from "framer-motion";
import { cardVariants } from "./constants";
import { useState } from "react";

export const AIChatbot = () => {
    const [messages, setMessages] = useState([
        { role: 'assistant', content: "Hello! I'm your AI investment assistant. How can I help you today?" }
    ]);
    const [input, setInput] = useState('');

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (!input.trim()) return;

        // Add user message
        setMessages(prev => [...prev, { role: 'user', content: input }]);

        // Simulate AI response
        setTimeout(() => {
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: 'This is a simulated response. In a real implementation, this would be connected to an AI backend.'
            }]);
        }, 1000);

        setInput('');
    };

    return (
        <motion.div
            variants={cardVariants}
            className="bg-[#141414] rounded-xl p-6 border border-[#10B981]/20 shadow-lg shadow-[#10B981]/5 hover:shadow-xl hover:shadow-[#10B981]/10 transition-shadow duration-300"
        >
            <h2 className="text-xl font-bold text-[#FFB800] mb-6">AI Investment Assistant</h2>

            {/* Chat Messages */}
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
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about your portfolio..."
                    className="flex-1 bg-[#0D1F17] border border-[#10B981]/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#10B981]"
                />
                <button
                    type="submit"
                    className="bg-[#10B981] text-white px-4 py-2 rounded-lg hover:bg-[#0D9668] transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </button>
            </form>
        </motion.div>
    );
};