import { motion } from "framer-motion";
import { Line } from "react-chartjs-2";
import { cardVariants } from "./constants";

export const GoalTracking = () => {
    const projectionData = {
        labels: ['2024', '2025', '2026', '2027', '2028'],
        datasets: [{
            label: 'Projected Growth',
            data: [250000, 300000, 360000, 432000, 518400],
            borderColor: '#10B981',
            tension: 0.4,
        }],
    };

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'right',
            labels: {
              color: '#10B981',
              usePointStyle: true,
              padding: 20,
              font: {
                family: 'Inter, system-ui, sans-serif',
                size: 12
              }
            }
          }
        },
        scales: {
          y: {
            grid: { 
              color: "rgba(16, 185, 129, 0.05)",
              drawBorder: false
            },
            ticks: { 
              color: "#10B981",
              font: {
                family: 'Inter, system-ui, sans-serif',
                size: 12
              }
            }
          },
          x: {
            grid: { display: false },
            ticks: { 
              color: "#10B981",
              font: {
                family: 'Inter, system-ui, sans-serif',
                size: 12
              }
            }
          }
        }
      };

    const goals = [
        { name: "Retirement Fund", current: 250000, target: 500000, percentage: 50 },
        { name: "Emergency Fund", current: 15000, target: 20000, percentage: 75 },
        { name: "House Down Payment", current: 40000, target: 100000, percentage: 40 },
    ];

    return (
        <motion.div
            variants={cardVariants}
            className="bg-[#141414] rounded-xl p-6 border border-[#10B981]/20 shadow-lg shadow-[#10B981]/5 hover:shadow-xl hover:shadow-[#10B981]/10 transition-shadow duration-300"
        >
            <h2 className="text-xl font-bold text-[#FFB800] mb-6">Goal Tracking</h2>

            {/* Progress Bars */}
            <div className="space-y-6 mb-8">
                {goals.map((goal) => (
                    <div key={goal.name}>
                        <div className="flex justify-between mb-2">
                            <span className="text-[#10B981]">{goal.name}</span>
                            <span className="text-white">
                                ${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}
                            </span>
                        </div>
                        <div className="h-2 bg-[#0D1F17] rounded-full overflow-hidden">
                            <div
                                className="h-full bg-[#10B981] transition-all duration-500"
                                style={{ width: `${goal.percentage}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Retirement Projection */}
            <div>
                <h3 className="text-[#10B981] font-bold mb-1">Retirement Fund Projection</h3>
                <div className="h-[200px]">
                    <Line data={projectionData} options={options} />
                </div>
            </div>
        </motion.div>
    );
};