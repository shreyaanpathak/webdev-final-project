import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { FaTimes, FaCrown, FaChartLine, FaRobot } from "react-icons/fa";

interface GoldModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GoldModal = ({ isOpen, onClose }: GoldModalProps) => (
  <AnimatePresence>
    {isOpen && (
      <>
        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100]"
          onClick={onClose}
        />

        {/* Modal Container: using flex to center the content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="fixed inset-0 z-[101] flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="w-[90%] max-w-2xl max-h-[90vh] overflow-y-auto
                       bg-[#0A0A0A] rounded-2xl p-8 border border-yellow-500/20 
                       shadow-2xl shadow-black/50"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-yellow-500/60 hover:text-yellow-500 transition-colors duration-200"
            >
              <FaTimes size={24} />
            </button>
            
            <div className="flex flex-col items-center mb-8">
              <FaCrown className="text-yellow-500 text-5xl mb-4" />
              <h2 className="text-3xl font-bold text-yellow-500 mb-2">Gold Membership</h2>
              <p className="text-green-500/80 text-center">
                Unlock the full potential of your trading journey
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4 bg-black/40 p-6 rounded-xl border border-yellow-500/10">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <FaChartLine /> Advanced Features
                </h3>
                <ul className="space-y-3 text-green-500/80">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></span>
                    Real-time market data
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></span>
                    Advanced technical analysis
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></span>
                    Custom trading strategies
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></span>
                    Portfolio optimization
                  </li>
                </ul>
              </div>
              
              <div className="space-y-4 bg-black/40 p-6 rounded-xl border border-yellow-500/10">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <FaRobot /> AI-Powered Tools
                </h3>
                <ul className="space-y-3 text-green-500/80">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></span>
                    Market prediction insights
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></span>
                    Risk assessment tools
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></span>
                    Automated trading options
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></span>
                    Smart portfolio balancing
                  </li>
                </ul>
              </div>
            </div>

            <div className="text-center p-8 bg-black/60 rounded-xl mb-8 border border-yellow-500/10">
              <div className="text-5xl font-bold text-white mb-2">
                $29.99<span className="text-lg">/month</span>
              </div>
              <p className="text-green-500/80">Cancel anytime • 14-day free trial</p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/Account/Signup" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full btn btn-lg bg-yellow-500 hover:bg-yellow-600 text-black border-0 px-8"
                >
                  Start Free Trial
                </motion.button>
              </Link>
              <button
                onClick={onClose}
                className="w-full sm:w-auto btn btn-lg btn-outline text-green-500 hover:bg-green-500/10"
              >
                Learn More
              </button>
            </div>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);
