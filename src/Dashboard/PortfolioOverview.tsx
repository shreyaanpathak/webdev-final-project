import { motion } from "framer-motion";
import { Pie } from "react-chartjs-2";
import { cardVariants } from "./constants";

export const PortfolioOverview = () => {
    const pieData = {
        labels: ['Technology', 'Healthcare', 'Real Estate', 'Bonds', 'Cash'],
        datasets: [{
            data: [35, 25, 15, 15, 10],
            backgroundColor: [
                '#10B981',
                '#FFB800',
                '#EF4444',
                '#6366F1',
                '#8B5CF6'
            ],
            borderWidth: 0,
        }]
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

    return (
        <motion.div
            variants={cardVariants}
            className="bg-[#141414] rounded-xl p-6 border border-[#10B981]/20 shadow-lg shadow-[#10B981]/5 hover:shadow-xl hover:shadow-[#10B981]/10 transition-shadow duration-300"
        >
            <h2 className="text-xl font-bold text-[#FFB800] mb-6">Portfolio Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-[#0D1F17] p-4 rounded-lg">
                    <h3 className="text-[#10B981] mb-4">Total Portfolio Value</h3>
                    <div className="text-4xl font-bold text-white">$247,582.21</div>
                    <div className="text-[#10B981] mt-2">+12.5% ($27,582.21)</div>
                </div>
                <div className="h-[300px]">
                    <Pie data={pieData} options={options} />
                </div>
            </div>
        </motion.div>
    );
};