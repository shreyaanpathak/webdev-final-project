// AdvancedAnalytics.tsx
import { motion } from "framer-motion";
import { Scatter, Line, Bar } from "react-chartjs-2";
import { cardVariants } from "./constants";

export const AdvancedAnalytics = () => {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    color: '#10B981',
                    font: { family: 'Inter, system-ui, sans-serif', size: 12 }
                }
            }
        },
        scales: {
            y: {
                grid: { color: "rgba(16, 185, 129, 0.05)" },
                ticks: { color: "#10B981" }
            },
            x: {
                grid: { display: false },
                ticks: { color: "#10B981" }
            }
        }
    };

    const riskReturnData = {
        datasets: [{
            label: 'Asset Risk/Return Profile',
            data: [
                { x: 12, y: 15, r: 15 }, // Tech stocks
                { x: 8, y: 10, r: 12 },  // Blue chips
                { x: 5, y: 6, r: 10 },   // Bonds
                { x: 15, y: 18, r: 8 },  // Crypto
                { x: 7, y: 9, r: 14 },   // Real Estate
            ],
            backgroundColor: [
                '#10B981',
                '#FFB800',
                '#6366F1',
                '#EF4444',
                '#8B5CF6'
            ]
        }]
    };

    const diversificationData = {
        labels: ['Tech', 'Finance', 'Real Estate', 'Energy', 'Healthcare', 'Bonds', 'Cash'],
        datasets: [{
            label: 'Current Allocation',
            data: [30, 20, 15, 10, 10, 10, 5],
            backgroundColor: '#10B981',
        },
        {
            label: 'Recommended Allocation',
            data: [25, 20, 15, 15, 10, 12, 3],
            backgroundColor: '#FFB800',
        }]
    };

    // Key metrics for the portfolio
    const metrics = [
        {
            name: "Sharpe Ratio",
            value: "1.8",
            status: "good",
            description: "Risk-adjusted return is above market average"
        },
        {
            name: "Beta",
            value: "1.2",
            status: "warning",
            description: "Portfolio is more volatile than the market"
        },
        {
            name: "Alpha",
            value: "2.5%",
            status: "good",
            description: "Outperforming the benchmark"
        },
        {
            name: "Max Drawdown",
            value: "-15%",
            status: "warning",
            description: "Consider hedging strategies"
        }
    ];

    return (
        <motion.div
            variants={cardVariants}
            className="bg-[#141414] rounded-xl p-6 pb-[63px] border border-[#10B981]/20 shadow-lg shadow-[#10B981]/5 hover:shadow-xl hover:shadow-[#10B981]/10 transition-shadow duration-300"
        >
            <h2 className="text-xl font-bold text-[#FFB800] mb-6">Advanced Portfolio Analytics</h2>

            {/* Metrics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                {metrics.map((metric) => (
                    <div key={metric.name} className="bg-[#0D1F17] p-4 rounded-lg hover:bg-[#0D1F17]/80 hover:border-[#10B981]/30 transition-all duration-300 border border-[#10B981]/10">
                        <div className="flex justify-between items-center mb-2">
                            <h4 className="text-[#10B981]">{metric.name}</h4>
                            <span className={`font-bold ${metric.status === 'good' ? 'text-[#10B981]' : 'text-[#FFB800]'
                                }`}>{metric.value}</span>
                        </div>
                        <p className="text-sm text-white/70">{metric.description}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-[275px] relative">
                    <h3 className="text-[#10B981] mb-4">Risk/Return Analysis</h3>
                    <Scatter
                        data={riskReturnData}
                        options={{
                            ...options,
                            scales: {
                                y: {
                                    title: {
                                        display: true,
                                        text: 'Expected Return (%)',
                                        color: '#10B981'
                                    },
                                    ...options.scales.y
                                },
                                x: {
                                    title: {
                                        display: true,
                                        text: 'Risk (Volatility %)',
                                        color: '#10B981'
                                    },
                                    ...options.scales.x
                                }
                            }
                        }}
                    />
                </div>
                <div className="h-[275px] relative">
                    <h3 className="text-[#10B981] mb-4">Portfolio Diversification</h3>
                    <Bar data={diversificationData} options={options} />
                </div>
            </div>
        </motion.div>
    );
};