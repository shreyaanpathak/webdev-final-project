import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaLinkedin,
  FaTwitter,
  FaGithub,
  FaEnvelope,
  FaCalendar,
  FaDownload,
  FaUsers,
} from "react-icons/fa";
import { EditableField } from "./EditableField";
import { Link } from "react-router-dom";

interface ProfileHeaderProps {
  profileData: any;
  onSave?: (fieldName: string, value: any) => void;
  isOwnProfile: boolean;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  profileData,
  onSave,
  isOwnProfile,
}) => {
  const [isHoveringImage, setIsHoveringImage] = useState(false);

  const handleImageChange = async () => {
    if (!isOwnProfile || !onSave) return;
    
    const imageUrl = prompt("Please enter an image URL:");
    if (!imageUrl) return;

    try {
      // Basic URL validation
      new URL(imageUrl);
      await onSave("profile_picture", imageUrl);
    } catch (error) {
      alert("Please enter a valid URL");
      console.error("Failed to update profile picture:", error);
    }
  };

  const fullName = `${profileData?.firstName || ""} ${
    profileData?.lastName || ""
  }`;

  return (
    <div className="lg:w-1/3 flex flex-col items-center gap-6">
      <motion.div
        className="relative group"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
        onHoverStart={() => setIsHoveringImage(true)}
        onHoverEnd={() => setIsHoveringImage(false)}
      >
        <div
          className="absolute -inset-0.5 bg-gradient-to-r from-green-600 to-yellow-500 
                    rounded-full opacity-75 group-hover:opacity-100 blur transition 
                    duration-1000 group-hover:duration-200 animate-tilt mt-20"
        ></div>
        <div
          className="relative w-48 h-48 rounded-full overflow-hidden mt-20 cursor-pointer group"
          onClick={isOwnProfile ? handleImageChange : undefined}
        >
          <img
            src={profileData?.profile_picture || "https://via.placeholder.com/150"}
            className="w-full h-full object-cover transition-opacity group-hover:opacity-75"
            alt={fullName}
          />
          {isOwnProfile && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-white text-sm">Change Picture URL</span>
            </div>
          )}
        </div>
      </motion.div>

      <div className="text-center">
        <motion.h1
          className="text-4xl font-bold bg-gradient-to-r from-green-500 to-yellow-500 
            bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {isOwnProfile ? (
            <>
              <EditableField
                value={profileData?.firstName || ""}
                onSave={onSave}
                fieldName="firstName"
                className="mr-2"
              />
              <EditableField
                value={profileData?.lastName || ""}
                onSave={onSave}
                fieldName="lastName"
              />
            </>
          ) : (
            fullName
          )}
        </motion.h1>
        <motion.p
          className="text-xl text-yellow-500/80 mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {profileData?.role || "Loading..."}
        </motion.p>
      </div>

      <motion.div
        className="flex gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {[
          { icon: <FaLinkedin />, link: "https://www.linkedin.com/in/tilakpatell", color: "text-blue-500" },
          { icon: <FaTwitter />, link: "twittersucks", color: "text-sky-500" },
          { icon: <FaGithub />, link: "https://www.github.com/tilakpatell", color: "text-white" },
          { icon: <FaEnvelope />, link: "mailto:tilakny@gmail.com", color: "text-yellow-500" },
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

      <motion.div
        className="flex flex-wrap gap-4 justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <button
          className="flex items-center px-6 py-3 text-sm font-medium text-white 
                   bg-gradient-to-r from-green-600 to-green-700 
                   hover:from-green-700 hover:to-green-800 
                   rounded-lg shadow-lg transition-all duration-300
                   hover:shadow-green-500/20 hover:scale-105"
        >
          <FaCalendar className="mr-2" />
          Schedule Meeting
        </button>

        <button
          className="flex items-center px-6 py-3 text-sm font-medium
                   bg-transparent border-2 border-yellow-500 text-yellow-500
                   hover:bg-yellow-500 hover:text-black 
                   rounded-lg transition-all duration-300
                   hover:scale-105"
        >
          <FaDownload className="mr-2" />
          Resume
        </button>

        <Link
          to="/Account/Browse"
          className="flex items-center px-6 py-3 text-sm font-medium text-white
                 bg-green-600 hover:bg-green-700 
                 rounded-lg transition-all duration-300
                 hover:scale-105 hover:shadow-lg"
        >
          <FaUsers className="mr-2" />
          Connect With Others
        </Link>
      </motion.div>
    </div>
  );
};
