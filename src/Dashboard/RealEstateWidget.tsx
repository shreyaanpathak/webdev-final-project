import { motion } from "framer-motion";
import { Line } from "react-chartjs-2";
import { cardVariants } from "./constants";

export const RealEstateWidget = () => {
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

    const cashFlowData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Gross Income',
                data: [12000, 12100, 12300, 12200, 12400, 12500],
                borderColor: '#10B981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                fill: true
            },
            {
                label: 'Net Income',
                data: [8000, 8200, 8100, 8300, 8400, 8600],
                borderColor: '#FFB800',
                backgroundColor: 'rgba(255, 184, 0, 0.1)',
                fill: true
            },
            {
                label: 'Operating Expenses',
                data: [4000, 3900, 4200, 3900, 4000, 3900],
                borderColor: '#EF4444',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                fill: true
            }
        ]
    };

    const propertyMetrics = [
        { property: "Downtown Condo", roi: 12.5, occupancy: 98, maintenance: 1200 },
        { property: "Suburban House", roi: 8.2, occupancy: 95, maintenance: 800 },
        { property: "Commercial Space", roi: 15.1, occupancy: 100, maintenance: 2200 },
    ];

    const monthlyPerformance = [
        { metric: "Average Monthly NOI", value: "$8,450", trend: "+5.2%" },
        { metric: "Total Units Managed", value: "24", trend: "Same" },
        { metric: "Avg. Lease Duration", value: "2.1 yrs", trend: "+0.3" },
        { metric: "Portfolio Value", value: "$4.2M", trend: "+12.5%" }
    ];

    const topPerformers = [
        { property: "Downtown Condo 3B", return: "+18.2%" },
        { property: "Tech Hub Office 204", return: "+15.7%" },
        { property: "Riverside Apartment 12", return: "+14.3%" }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <motion.div
                variants={cardVariants}
                className="md:col-span-3 bg-[#141414] rounded-xl p-6 border border-[#10B981]/20 shadow-lg shadow-[#10B981]/5 hover:shadow-xl hover:shadow-[#10B981]/10 transition-shadow duration-300"
            >

                <h2 className="text-xl font-bold text-[#FFB800] pb-2 mb-6">Real Estate Portfolio</h2>
                <div className="grid grid-cols-4 gap-4 pb-2 mb-6 ">
                    {monthlyPerformance.map((item, index) => (
                        <div key={index} className="bg-[#0D1F17] p-4 rounded-lg border border-[#10B981]/10 hover:bg-[#0D1F17]/80 hover:border-[#10B981]/30 transition-all duration-300">
                            <div className="text-[#10B981] text-sm mb-1">{item.metric}</div>
                            <div className="text-white font-bold text-lg">{item.value}</div>
                            <div className={`text-sm ${item.trend.includes('+') ? 'text-[#10B981]' : 'text-[#FFB800]'}`}>
                                {item.trend}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="h-[300px] relative mb-6">
                    <h3 className="text-[#10B981] mb-4">Cash Flow Analysis</h3>
                    <Line data={cashFlowData} options={options} />
                </div>

            </motion.div>

            <motion.div
                variants={cardVariants}
                className="bg-[#141414] rounded-xl p-6 border border-[#10B981]/20 shadow-lg shadow-[#10B981]/5 hover:shadow-xl hover:shadow-[#10B981]/10 transition-shadow duration-300"
            >
                <h3 className="text-[#10B981] mb-6">Property Metrics</h3>
                <div className="space-y-4">
                    {propertyMetrics.map((property) => (
                        <div
                            key={property.property}
                            className="bg-[#0D1F17] p-4 rounded-xl border border-[#10B981]/10 hover:border-[#10B981]/30 transition-colors duration-300"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <h4 className="text-[#FFB800] font-bold">{property.property}</h4>
                                <div className="bg-[#10B981]/10 px-2 py-1 rounded-full">
                                    <span className="text-[#10B981] font-bold text-sm">{property.roi}% ROI</span>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div>
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-[#10B981] text-sm">Occupancy</span>
                                        <span className="text-white font-bold text-sm">{property.occupancy}%</span>
                                    </div>
                                    <div className="h-1.5 bg-[#0D1F17] rounded-full overflow-hidden border border-[#10B981]/10">
                                        <div
                                            className="h-full bg-[#10B981]"
                                            style={{ width: `${property.occupancy}%` }}
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-between items-center p-2 bg-[#141414] rounded-lg border border-[#10B981]/10">
                                    <span className="text-[#10B981] text-sm">Monthly Maintenance</span>
                                    <span className="text-white font-bold text-sm">${property.maintenance}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};
