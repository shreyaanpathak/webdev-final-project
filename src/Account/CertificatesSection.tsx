import { motion } from "framer-motion";
import { FaCertificate } from "react-icons/fa";

const certificates = [
  { name: "Certified Financial Planner (CFP)", year: "2020" },
  { name: "Chartered Financial Analyst (CFA)", year: "2018" },
  { name: "Certified Investment Management Analyst (CIMA)", year: "2019" },
];

export const CertificatesSection = () => (
  <motion.div
    className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
  >
    {certificates.map((cert, index) => (
      <motion.div
        key={index}
        className="bg-green-900/10 border border-green-500/20 rounded-lg p-4
                  hover:border-yellow-500/50 transition-all duration-300 cursor-pointer"
        whileHover={{ scale: 1.02, y: -5 }}
      >
        <FaCertificate className="text-yellow-500 text-2xl mb-2" />
        <h3 className="text-green-500 font-semibold">{cert.name}</h3>
        <p className="text-yellow-500/80 text-sm">{cert.year}</p>
      </motion.div>
    ))}
  </motion.div>
);
