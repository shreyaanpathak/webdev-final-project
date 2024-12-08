import { motion } from "framer-motion";
import { FaNewspaper } from "react-icons/fa";
import { mockNews, cardVariants } from "./constants/index";

export const NewsPanel = () => {
  return (
    <motion.div variants={cardVariants} className="bg-[#1A1A1A] rounded-xl p-6 border border-[#10B981]/20">
      <h2 className="text-xl font-bold text-[#FFB800] flex items-center gap-2 mb-6">
        <FaNewspaper />
        Market News
      </h2>
      <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#10B981] scrollbar-track-transparent">
        {mockNews.map((news) => (
          <motion.div
            key={news.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="border-b border-[#10B981]/20 pb-6 last:border-0"
          >
            <h3 className="font-bold text-[#10B981] hover:text-[#0D9668] cursor-pointer">
              {news.title}
            </h3>
            <p className="text-[#10B981]/70 text-sm mt-2">{news.summary}</p>
            <div className="flex justify-between text-xs text-[#10B981]/50 mt-2">
              <span>{news.source}</span>
              <span>{news.time}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
