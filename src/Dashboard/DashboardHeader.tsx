import { motion } from "framer-motion";

// DashboardHeader.tsx
export const DashboardHeader = () => {
    return (
      <div className="bg-[#0A0A0A] border-b border-[#10B981]/10 sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-[1920px] mx-auto p-6 flex items-center justify-between">
          <motion.h1 
            className="text-4xl font-bold"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-white/90">Personal</span>{" "}
            <span className="text-[#10B981] font-extrabold">Investment</span>{" "}
            <span className="text-white/90">Dashboard</span>
          </motion.h1>
  
          <div className="flex gap-6">
            <motion.div 
              className="px-8 py-3 bg-[#141414] rounded-xl border border-[#10B981]/20 shadow-lg shadow-[#10B981]/5"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-[#10B981] text-sm font-medium">Last Updated</div>
              <div className="text-[#FFB800] text-base font-bold">
                March 15, 2024 9:30 AM
              </div>
            </motion.div>
  
            <motion.div 
              className="px-8 py-3 bg-[#141414] rounded-xl border border-[#10B981]/20 shadow-lg shadow-[#10B981]/5"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-[#10B981] text-sm font-medium">Total Balance</div>
              <div className="text-[#FFB800] text-base font-bold">
                $247,582.21
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  };