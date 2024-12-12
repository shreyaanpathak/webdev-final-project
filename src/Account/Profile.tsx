import { motion, AnimatePresence } from "framer-motion";
import {
  FaChartLine,
  FaBriefcase,
  FaUserTie,
  FaFileContract,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
  FaCalendar,
  FaGithub,
  FaCertificate,
  FaDownload,
  FaPhone,
  FaMapMarker,
  FaClock,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as client from "./client";

const MotionStats = ({ children }) => (
  <motion.div
    initial={{ scale: 0.95, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    whileHover={{ scale: 1.05, y: -5 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    {children}
  </motion.div>
);

const ProjectCard = ({ project }) => (
  <motion.div
    className="bg-black/40 rounded-xl p-6 border border-green-500/20 hover:border-yellow-500/50 cursor-pointer"
    whileHover={{ scale: 1.02, y: -5 }}
    transition={{ duration: 0.2 }}
  >
    <h3 className="text-green-500 text-xl mb-2">{project.title}</h3>
    <p className="text-yellow-500/80 mb-4">{project.description}</p>
    <div className="flex gap-2 flex-wrap">
      {project.technologies.map((tech, index) => (
        <span
          key={index}
          className="px-2 py-1 bg-green-900/20 rounded-full text-xs text-green-500"
        >
          {tech}
        </span>
      ))}
    </div>
  </motion.div>
);

const TestimonialCard = ({ testimonial }) => (
  <motion.div
    className="bg-black/40 rounded-xl p-6 border border-green-500/20 hover:border-yellow-500/50 cursor-pointer"
    whileHover={{ scale: 1.02, y: -5 }}
    transition={{ duration: 0.2 }}
  >
    <div className="flex items-center gap-4 mb-4">
      <img
        src={testimonial.image}
        alt={testimonial.name}
        className="w-12 h-12 rounded-full object-cover"
      />
      <div>
        <h3 className="text-green-500">{testimonial.name}</h3>
        <p className="text-yellow-500/80 text-sm">{testimonial.role}</p>
      </div>
    </div>
    <p className="text-yellow-500/80 italic">"{testimonial.content}"</p>
  </motion.div>
);

const ContactSection = ({ info }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <motion.div
      className="bg-black/40 rounded-xl p-6 border border-green-500/20"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <h3 className="text-green-500 text-xl mb-4">Contact Information</h3>
      <div className="space-y-3">
        <p className="flex items-center gap-3 text-yellow-500/80">
          <FaEnvelope /> {info.email}
        </p>
        <p className="flex items-center gap-3 text-yellow-500/80">
          <FaPhone /> {info.phone}
        </p>
        <p className="flex items-center gap-3 text-yellow-500/80">
          <FaMapMarker /> {info.location}
        </p>
        <p className="flex items-center gap-3 text-yellow-500/80">
          <FaClock /> {info.availability}
        </p>
      </div>
    </motion.div>

    <motion.div
      className="bg-black/40 rounded-xl p-6 border border-green-500/20"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <h3 className="text-green-500 text-xl mb-4">Office Location</h3>
      <p className="text-yellow-500/80 mb-4">{info.office}</p>
      <button className="btn bg-gradient-to-r from-green-600 to-green-600 text-white mt-4 hover:scale-105 transition-transform">
        <FaCalendar className="mr-2" /> Directions
      </button>
    </motion.div>
  </div>
);

export default function EnhancedProfile() {
  const [profileData, setProfileData] = useState(null);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const fetchProfile = async () => {
      if (currentUser?._id) {
        try {
          const data = await client.profile(currentUser._id);
          setProfileData(data);
        } catch (error) {
          console.error("Failed to fetch profile:", error);
        }
      }
    };
    fetchProfile();
  }, [currentUser?._id]);

  const fullName = profileData ? `${profileData.firstName} ${profileData.lastName}` : "Loading...";
  const userRole = profileData?.role || "Loading...";

  const overview = {
    summary: `A ${profileData?.membership || ""} member financial advisor with over 15 years of experience in wealth management and strategic financial planning. Specializing in high-net-worth portfolio management and comprehensive retirement strategies. Dedicated to providing personalized financial solutions that align with clients' long-term goals while maintaining a strong focus on risk management and sustainable growth.`,
    expertise: [
      "Portfolio optimization and asset allocation",
      "Retirement planning and wealth preservation",
      "Tax-efficient investment strategies",
      "Estate planning and wealth transfer",
      "Risk management and insurance solutions",
      "Alternative investment opportunities",
    ],
  };

  const projects = [
    {
      title: "Wealth Management Platform",
      description: "Advanced platform for portfolio management and analysis",
      technologies: ["React", "Node.js", "MongoDB"],
    },
    {
      title: "Investment Analytics Dashboard",
      description: "Real-time investment performance tracking system",
      technologies: ["Vue.js", "Python", "AWS"],
    },
  ];

  const stats = [
    {
      icon: <FaChartLine />,
      title: "Portfolio Growth",
      value: "32%",
      desc: "Past Year",
    },
    { icon: <FaBriefcase />, title: "Clients", value: "150+", desc: "Active" },
    { icon: <FaUserTie />, title: "Experience", value: "15", desc: "Years" },
    {
      icon: <FaFileContract />,
      title: "AUM",
      value: "$85M",
      desc: "Total Assets",
    },
  ];

  const certificates = [
    { name: "Certified Financial Planner (CFP)", year: "2020" },
    { name: "Chartered Financial Analyst (CFA)", year: "2018" },
    { name: "Certified Investment Management Analyst (CIMA)", year: "2019" },
  ];

  const testimonials = [
    {
      name: "Michael Thompson",
      role: "CEO, Thompson Enterprises",
      content:
        profileData?.firstName + "'s strategic approach to wealth management has been transformative for our company's financial portfolio. Her insights have consistently led to outstanding results.",
      image:
        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
    },
    {
      name: "Jennifer Roberts",
      role: "Founder, Tech Innovations",
      content:
        "Working with " + profileData?.firstName + " has been incredibly valuable. Her deep understanding of market trends and risk management strategies helped us navigate complex investment decisions.",
      image:
        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
    },
    {
      name: "David Chen",
      role: "Private Client",
      content:
        profileData?.firstName + "'s personalized approach to financial planning has helped me achieve my retirement goals ahead of schedule. Her dedication to her clients is truly exceptional.",
      image:
        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
    },
  ];

  const contactInfo = {
    email: profileData?.email || "Loading...",
    phone: "+1 (555) 123-4567",
    location: "New York City, NY",
    availability: "Monday - Friday: 9:00 AM - 5:00 PM EST",
    schedule: "https://calendly.com/"+profileData?.username,
    office: "123 Wall Street, Suite 500, New York, NY 10005",
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Animated Background Gradient */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <motion.div
          className="absolute w-[200%] h-[200%] bg-gradient-to-r from-[#001f1f] via-black to-[#001f1f] rounded-full blur-3xl"
          animate={{ rotate: 360 }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: "linear",
          }}
        ></motion.div>
      </motion.div>

      {/* Decorative Floating Particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 bg-green-600 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0.2 + Math.random() * 0.8,
            scale: 0.5 + Math.random() * 1.5,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            rotate: 360 * Math.random(),
          }}
          transition={{
            duration: 10 + Math.random() * 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        ></motion.div>
      ))}

      <motion.div
        className="relative z-10 min-h-screen p-4 lg:p-8 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="max-w-7xl w-full mx-auto bg-black/60 backdrop-blur-xl rounded-2xl p-6 lg:p-8 
                     shadow-2xl border border-green-600/20 relative overflow-hidden"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Profile Header */}
          <div className="flex flex-col lg:flex-row gap-8 mb-12">
            <div className="lg:w-1/3 flex flex-col items-center gap-6">
              <motion.div
                className="relative group"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div
                  className="absolute -inset-0.5 bg-gradient-to-r from-green-600 to-yellow-500 
                              rounded-full opacity-75 group-hover:opacity-100 blur transition 
                              duration-1000 group-hover:duration-200 animate-tilt mt-20"
                ></div>
                <div className="relative w-48 h-48 rounded-full overflow-hidden mt-20">
                  <img
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    className="w-full h-full object-cover"
                    alt="Sarah Mitchell"
                  />
                </div>
              </motion.div>

              <div className="text-center">
                <motion.h1
                  className="text-4xl font-bold bg-gradient-to-r from-green-500 to-yellow-500 
                    bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {fullName}
                </motion.h1>
                <motion.p
                  className="text-xl text-yellow-500/80 mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {userRole}
                </motion.p>
              </div>

              {/* Social Links */}
              <motion.div
                className="flex gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {[
                  { icon: <FaLinkedin />, link: "#", color: "text-blue-500" },
                  { icon: <FaTwitter />, link: "#", color: "text-sky-500" },
                  { icon: <FaGithub />, link: "#", color: "text-white" },
                  { icon: <FaEnvelope />, link: "#", color: "text-yellow-500" },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.link}
                    className={`${social.color} text-2xl hover:scale-110 transition-transform`}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                className="flex gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <button
                  className="btn bg-gradient-to-r from-green-600 to-green-700 
                                 hover:from-green-700 hover:to-green-800 text-white border-none 
                                 shadow-lg hover:shadow-green-500/20"
                >
                  <FaCalendar className="mr-2" /> Schedule Meeting
                </button>
                <button
                  className="btn bg-black border-2 border-yellow-500 text-yellow-500 
                                 hover:bg-yellow-500 hover:text-black hover:scale-105 transition-transform"
                >
                  <FaDownload className="mr-2" /> Resume
                </button>
              </motion.div>
            </div>

            {/* Main Content */}
            <div className="lg:w-2/3 space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <MotionStats key={index}>
                    <div
                      className="bg-gradient-to-br from-green-900/20 to-black border 
                                  border-green-500/20 rounded-xl p-4 hover:border-yellow-500/50 
                                  transition-all duration-300"
                    >
                      <div className="text-yellow-500 text-3xl mb-2">{stat.icon}</div>
                      <div className="text-green-500/80 text-sm">{stat.title}</div>
                      <div className="text-yellow-500 text-2xl font-bold mt-1">
                        {stat.value}
                      </div>
                      <div className="text-green-500/60 text-sm">{stat.desc}</div>
                    </div>
                  </MotionStats>
                ))}
              </div>

              {/* Tabs */}
              <div className="flex gap-4 border-b border-green-500/20 pb-2">
                {["overview", "projects", "testimonials", "contact"].map((tab) => (
                  <motion.button
                    key={tab}
                    className={`px-4 py-2 rounded-lg ${activeTab === tab
                        ? "bg-green-600 text-white"
                        : "text-green-500 hover:text-yellow-500"
                      }`}
                    onClick={() => setActiveTab(tab)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </motion.button>
                ))}
              </div>

              {/* Tab Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                  className="min-h-[300px]"
                >
                  {activeTab === "overview" && (
                    <div className="space-y-6">
                      <p className="text-yellow-500/80 leading-relaxed">
                        {overview.summary}
                      </p>

                      <div>
                        <h3 className="text-green-500 text-xl mb-3">
                          Areas of Expertise
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                          {overview.expertise.map((item, index) => (
                            <p
                              key={index}
                              className="text-yellow-500/80 flex items-center gap-2"
                            >
                              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                              {item}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  {activeTab === "testimonials" && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {testimonials.map((testimonial, index) => (
                        <TestimonialCard
                          key={index}
                          testimonial={testimonial}
                        />
                      ))}
                    </div>
                  )}

                  {activeTab === "contact" && <ContactSection info={contactInfo} />}

                  {activeTab === "projects" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {projects.map((project, index) => (
                        <ProjectCard key={index} project={project} />
                      ))}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Certificates Section */}
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
        </motion.div>
      </motion.div>
    </div>
  );
}
