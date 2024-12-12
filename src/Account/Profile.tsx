import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import * as client from "./client";
import { ProfileHeader } from "./ProfileHeader";
import { StatsGrid } from "./StatsGrid";
import { ProjectCard } from "./ProjectCard";
import { TestimonialCard } from "./TestimonialCard";
import { ContactSection } from "./ContactSection";
import { CertificatesSection } from "./CertificatesSection";

export default function EnhancedProfile() {
  const { userId } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [activeTab, setActiveTab] = useState("overview");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError(null);
        const targetUserId = userId || currentUser?._id;
        if (targetUserId) {
          const data = await client.profile(targetUserId);
          setProfileData(data);
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        setError(error.message || "Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId, currentUser?._id]);

  const handleSaveField = async (fieldName: string, value: any) => {
    if (!currentUser?._id) return;
    
    try {
      setSaving(true);
      if (fieldName === "profile_picture") {
        // Validate URL
        try {
          new URL(value);
        } catch {
          throw new Error("Invalid URL provided");
        }
        await client.updateProfilePicture(currentUser._id, value);
      } else {
        const updatedData = { [fieldName]: value };
        await client.updateProfile(currentUser._id, updatedData);
      }
      
      const updatedProfile = await client.profile(currentUser._id);
      setProfileData(updatedProfile);
    } catch (error) {
      console.error("Failed to update field:", error);
      alert(error.message || "Failed to update field");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] p-8 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center space-y-6"
        >
          <div className="w-16 h-16 border-4 border-[#10B981]/20 border-t-[#10B981] rounded-full animate-spin mx-auto" />
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-[#10B981]">Loading Profile</h3>
            <div className="text-sm text-[#10B981]/60">
              Loading {currentUser?.username}'s Profile
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  if (error || !profileData) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-red-500">
          {error || "Unable to load profile"}
        </div>
      </div>
    );
  }

  const isOwnProfile = currentUser?._id === profileData._id;

  const overview = {
    summary: `A ${profileData?.membership || ""} member financial advisor with over 15 years of experience in wealth management and strategic financial planning. Specializing in high-net-worth portfolio management and comprehensive retirement strategies.`,
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

  const testimonials = [
    {
      name: "Michael Thompson",
      role: "CEO, Thompson Enterprises",
      content: `${profileData?.firstName}'s strategic approach to wealth management has been transformative for our company's financial portfolio.`,
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Jennifer Roberts",
      role: "Founder, Tech Innovations",
      content: `Working with ${profileData?.firstName} has been incredibly valuable.`,
      image: "https://via.placeholder.com/150",
    },
    {
      name: "David Chen",
      role: "Private Client",
      content: `${profileData?.firstName}'s personalized approach to financial planning has been exceptional.`,
      image: "https://via.placeholder.com/150",
    },
  ];

  const contactInfo = {
    email: profileData?.email || "Loading...",
    phone: profileData?.phone || "+1 (555) 123-4567",
    location: profileData?.location || "New York City, NY",
    availability: profileData?.availability || "Monday - Friday: 9:00 AM - 5:00 PM EST",
    office: profileData?.office || "123 Wall Street, Suite 500, New York, NY 10005",
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Background Animation */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <motion.div
          className="absolute w-[200%] h-[200%] bg-gradient-to-r from-[#001f1f] via-black to-[#001f1f] rounded-full blur-3xl"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>

      {/* Floating Particles */}
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
        />
      ))}

      {/* Main Content */}
      <motion.div
        className="relative z-10 min-h-screen p-4 lg:p-8 flex items-center justify-center pt-20"
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
          <div className="flex flex-col lg:flex-row gap-8 mb-12">
            <ProfileHeader 
              profileData={profileData} 
              onSave={isOwnProfile ? handleSaveField : undefined}
              isOwnProfile={isOwnProfile}
            />

            <div className="lg:w-2/3 space-y-8">
              <StatsGrid />

              <div className="flex gap-4 border-b border-green-500/20 pb-2">
                {["overview", "projects", "testimonials", "contact"].map((tab) => (
                  <motion.button
                    key={tab}
                    className={`px-4 py-2 rounded-lg ${
                      activeTab === tab
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
                              <span className="w-2 h-2 bg-green-500 rounded-full" />
                              {item}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "projects" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {projects.map((project, index) => (
                        <ProjectCard key={index} project={project} />
                      ))}
                    </div>
                  )}

                  {activeTab === "testimonials" && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {testimonials.map((testimonial, index) => (
                        <TestimonialCard key={index} testimonial={testimonial} />
                      ))}
                    </div>
                  )}

                  {activeTab === "contact" && (
                    <ContactSection 
                      info={contactInfo} 
                      onSave={isOwnProfile ? handleSaveField : undefined}
                      isOwnProfile={isOwnProfile}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <CertificatesSection />
          
          {isOwnProfile && (
            <div className="text-xs text-yellow-500/50 text-center mt-4">
              Double click any field to edit
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
