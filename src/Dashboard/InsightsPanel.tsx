import { motion } from "framer-motion";
import { cardVariants } from "./constants";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getPortfolioInsights, RiskMeterProps, PortfolioInsights } from "./client";

const RiskMeter = ({ risk }: RiskMeterProps) => {
  const levels = ["Low", "Moderate", "High"] as const;
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
  const [insights, setInsights] = useState<PortfolioInsights | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);

  useEffect(() => {
      const fetchInsights = async () => {
          if (!currentUser?._id) return;
          
          try {
              setLoading(true);
              const data = await getPortfolioInsights(currentUser._id);
              setInsights(data);
              setError(null);
          } catch (err) {
              console.error("Failed to fetch insights:", err);
              setError(err instanceof Error ? err.message : "An error occurred");
          } finally {
              setLoading(false);
          }
      };

      fetchInsights();
      const interval = setInterval(fetchInsights, 300000);
      return () => clearInterval(interval);
  }, [currentUser]);

  if (loading) {
      return (
          <motion.div variants={cardVariants} className="bg-[#141414] rounded-xl p-6 border border-[#10B981]/20">
              <div className="animate-pulse space-y-4">
                  <div className="h-6 bg-[#10B981]/20 rounded w-48"></div>
                  <div className="h-24 bg-[#0D1F17] rounded"></div>
                  <div className="h-24 bg-[#0D1F17] rounded"></div>
                  <div className="space-y-2">
                      {[1, 2, 3].map((i) => (
                          <div key={i} className="h-16 bg-[#0D1F17] rounded"></div>
                      ))}
                  </div>
              </div>
          </motion.div>
      );
  }

  if (error) {
      return (
          <motion.div variants={cardVariants} className="bg-[#141414] rounded-xl p-6 border border-red-500/20">
              <div className="text-red-500 text-center">{error}</div>
          </motion.div>
      );
  }

  return (
      <motion.div
          variants={cardVariants}
          className="bg-[#141414] rounded-xl p-6 border border-[#10B981]/20 shadow-lg shadow-[#10B981]/5 hover:shadow-xl hover:shadow-[#10B981]/10 transition-shadow duration-300"
      >
          <h2 className="text-xl font-bold text-[#FFB800] mb-6">Investment Insights</h2>
          <div className="mb-6">
              <h3 className="text-[#10B981] font-bold mb-2">Risk Assessment</h3>
              <RiskMeter risk={insights?.risk_level || "Low"} />
          </div>
          <div className="mb-6">
              <h3 className="text-[#10B981] font-bold mb-2">Financial Health Score</h3>
              <div className="flex items-center gap-4">
                  <div className="text-4xl font-bold text-white">
                      {insights?.health_score || 0}
                  </div>
                  <div className="text-[#10B981]">
                      {insights?.health_rating || "N/A"}
                  </div>
              </div>
          </div>
          <div>
              <h3 className="text-[#10B981] font-bold mb-4">Recommendations</h3>
              <div className="space-y-4">
                  {insights?.recommendations?.map((item, index) => (
                      <div 
                          key={index} 
                          className="bg-[#0D1F17] p-4 rounded-lg hover:bg-[#0D1F17]/80 hover:border-[#10B981]/30 transition-all duration-300 border border-[#10B981]/10"
                      >
                          <h4 className="text-[#FFB800] font-bold mb-1">
                              {item.title}
                          </h4>
                          <p className="text-[#10B981] text-sm">
                              {item.description}
                          </p>
                      </div>
                  ))}
              </div>
          </div>
      </motion.div>
  );
};
