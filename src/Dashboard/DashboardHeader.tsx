import { motion } from "framer-motion";
import { FaClock, FaDollarSign } from "react-icons/fa";
import { useSelector } from "react-redux";
import type { RootState } from "../store";


// DashboardHeader.tsx
export const DashboardHeader = () => {
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);

  return (
    <motion.div 
      className="bg-gradient-to-r from-[#0A0A0A] to-[#141414] border-b border-[#10B981]/20"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-[1920px] mx-auto p-8 flex flex-col items-center">
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2">
            <span className="text-white/90">Personal</span>{" "}
            <span className="text-transparent bg-clip-text bg-[#FFB800] font-extrabold">Investment</span>{" "}
            <span className="text-white/90">Dashboard</span>
          </h1>
          <motion.div 
            className="h-1 w-24 bg-[#FFB800] mx-auto rounded-full"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          />
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-3xl">
          <motion.div 
            className="flex items-center px-6 py-4 bg-[#1C1C1C] rounded-2xl border border-[#10B981]/30 shadow-lg shadow-[#10B981]/10 flex-1"
            whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(16, 185, 129, 0.2)" }}
            transition={{ duration: 0.2 }}
          >
            <FaClock className="text-[#10B981] text-2xl mr-4" />
            <div>
              <div className="text-[#10B981] text-sm font-medium">Last Updated</div>
              <div className="text-white text-lg font-bold mt-1">
                March 15, 2024 9:30 AM
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="flex items-center px-6 py-4 bg-[#1C1C1C] rounded-2xl border border-[#10B981]/30 shadow-lg shadow-[#10B981]/10 flex-1"
            whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(16, 185, 129, 0.2)" }}
            transition={{ duration: 0.2 }}
          >
            <FaDollarSign className="text-[#10B981] text-2xl mr-4" />
            <div>
              <div className="text-[#10B981] text-sm font-medium">Total Cash Balance</div>
              <div className="text-white text-lg font-bold mt-1">
                {`$${Math.floor(currentUser.cash)}`}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
