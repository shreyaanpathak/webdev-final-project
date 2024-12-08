import { motion } from "framer-motion";
import { FaChartLine, FaBriefcase, FaUserTie, FaFileContract } from "react-icons/fa";

export default function Profile() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      className="min-h-screen bg-base-200 p-4 lg:p-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div 
        className="max-w-5xl mx-auto bg-base-100 rounded-xl p-6 lg:p-8 shadow-2xl"
        variants={itemVariants}
      >
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column */}
          <div className="lg:w-1/3 flex flex-col items-center gap-6">
            <motion.div
              className="avatar"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="ring-primary ring-offset-base-100 w-40 rounded-full ring ring-offset-4 shadow-xl">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </motion.div>
            
            <div className="text-center">
              <h1 className="text-3xl font-bold text-primary">Sarah Mitchell</h1>
              <p className="text-xl text-base-content/80">Senior Financial Advisor</p>
            </div>

            <div className="flex gap-4">
              <button className="btn btn-primary">Schedule Meeting</button>
              <button className="btn btn-outline">Message</button>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:w-2/3 space-y-8">
            {/* Key Statistics */}
            <motion.div 
              className="grid grid-cols-2 lg:grid-cols-4 gap-4"
              variants={itemVariants}
            >
              <div className="stat bg-base-200 rounded-box p-4">
                <div className="stat-figure text-primary">
                  <FaChartLine size={24} />
                </div>
                <div className="stat-title">Portfolio Growth</div>
                <div className="stat-value text-primary">32%</div>
                <div className="stat-desc">Past Year</div>
              </div>
              <div className="stat bg-base-200 rounded-box p-4">
                <div className="stat-figure text-primary">
                  <FaBriefcase size={24} />
                </div>
                <div className="stat-title">Clients</div>
                <div className="stat-value text-primary">142</div>
                <div className="stat-desc">Active</div>
              </div>
              <div className="stat bg-base-200 rounded-box p-4">
                <div className="stat-figure text-primary">
                  <FaUserTie size={24} />
                </div>
                <div className="stat-title">Experience</div>
                <div className="stat-value text-primary">15</div>
                <div className="stat-desc">Years</div>
              </div>
              <div className="stat bg-base-200 rounded-box p-4">
                <div className="stat-figure text-primary">
                  <FaFileContract size={24} />
                </div>
                <div className="stat-title">AUM</div>
                <div className="stat-value text-primary">$85M</div>
                <div className="stat-desc">Total Assets</div>
              </div>
            </motion.div>

            {/* Expertise & Certifications */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h2 className="text-2xl font-semibold">Expertise</h2>
              <div className="flex flex-wrap gap-2">
                {['Wealth Management', 'Retirement Planning', 'Estate Planning', 'Tax Strategy', 'Risk Management', 'Investment Analysis'].map((skill) => (
                  <span key={skill} className="badge badge-primary badge-lg">{skill}</span>
                ))}
              </div>
            </motion.div>

            {/* Professional Summary */}
            <motion.div variants={itemVariants} className="prose max-w-none">
              <h2 className="text-2xl font-semibold mb-4">Professional Summary</h2>
              <p className="text-base-content/80">
                Certified Financial Planner™ with 15+ years of experience in comprehensive wealth management
                and financial planning. Specialized in developing tailored investment strategies for high-net-worth
                individuals and business owners. Consistent track record of exceeding client portfolio performance
                benchmarks while maintaining strong risk management practices.
              </p>
            </motion.div>

            {/* Credentials */}
            <motion.div variants={itemVariants} className="space-y-2">
              <h2 className="text-2xl font-semibold">Credentials</h2>
              <ul className="list-none space-y-2">
                <li className="flex items-center gap-2">
                  <span className="badge badge-primary">CFP®</span>
                  <span>Certified Financial Planner™</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="badge badge-primary">CFA</span>
                  <span>Chartered Financial Analyst</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="badge badge-primary">MBA</span>
                  <span>Master of Business Administration - Finance</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
