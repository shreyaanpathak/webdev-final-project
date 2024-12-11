import { motion } from "framer-motion";
import { cardVariants } from "./constants";

const RiskMeter = ({ risk }) => {
    const levels = ["Low", "Moderate", "High"];
    const colors = ["#10B981", "#FFB800", "#EF4444"];
    const currentIndex = levels.indexOf(risk);

    return (
        <div className="mt-4">
            <div className="flex justify-between mb-2">
                {levels.map((level, idx) => (
                    <span
                        key={level}
                        className={`text-sm ${idx === currentIndex ? `text-${colors[idx]}` : 'text-[#10B981]/50'}`}
                    >
                        {level}
                    </span>
                ))}
            </div>
            <div className="h-2 bg-[#0D1F17] rounded-full overflow-hidden">
                <div
                    className="h-full transition-all duration-500"
                    style={{
                        width: `${((currentIndex + 1) / levels.length) * 100}%`,
                        backgroundColor: colors[currentIndex],
                    }}
                />
            </div>
        </div>
    );
};

export const InsightsPanel = () => {
    return (
        <motion.div
            variants={cardVariants}
            className="bg-[#141414] rounded-xl p-6 border border-[#10B981]/20 shadow-lg shadow-[#10B981]/5 hover:shadow-xl hover:shadow-[#10B981]/10 transition-shadow duration-300"
        >
            <h2 className="text-xl font-bold text-[#FFB800] mb-6">Investment Insights</h2>

            {/* Risk Assessment */}
            <div className="mb-6">
                <h3 className="text-[#10B981] font-bold mb-2">Risk Assessment</h3>
                <RiskMeter risk="Moderate" />
            </div>

            {/* Financial Health Score */}
            <div className="mb-6">
                <h3 className="text-[#10B981] font-bold mb-2">Financial Health Score</h3>
                <div className="flex items-center gap-4">
                    <div className="text-4xl font-bold text-white">85</div>
                    <div className="text-[#10B981]">Good</div>
                </div>
            </div>

            {/* Recommendations */}
            <div>
                <h3 className="text-[#10B981] font-bold mb-4">Recommendations</h3>
                <div className="space-y-4">
                    {[
                        { title: "Rebalance Technology", description: "Consider reducing tech exposure by 5%" },
                        { title: "Increase Bonds", description: "Add 3% to bond allocation for stability" },
                        { title: "New Opportunity", description: "Healthcare sector showing strong growth potential" }
                    ].map((item, index) => (
                        <div key={index} className="bg-[#0D1F17] p-4 rounded-lg hover:bg-[#0D1F17]/80 hover:border-[#10B981]/30 transition-all duration-300 border border-[#10B981]/10">
                            <h4 className="text-[#FFB800] font-bold mb-1">{item.title}</h4>
                            <p className="text-[#10B981] text-sm">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};