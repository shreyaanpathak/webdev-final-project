import { motion } from "framer-motion";
import { FaEnvelope, FaPhone, FaMapMarker, FaClock, FaCalendar } from "react-icons/fa";
import { EditableField } from "./EditableField";
import {ContactSectionProps} from "./client"


export const ContactSection: React.FC<ContactSectionProps> = ({ info, onSave }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <motion.div
      className="bg-black/40 rounded-xl p-6 border border-green-500/20"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <h3 className="text-green-500 text-xl mb-4">Contact Information</h3>
      <div className="space-y-3">
        <p className="flex items-center gap-3 text-yellow-500/80">
          <FaEnvelope /> 
          <EditableField 
            value={info.email} 
            onSave={onSave} 
            fieldName="email" 
          />
        </p>
        <p className="flex items-center gap-3 text-yellow-500/80">
          <FaPhone /> 
          <EditableField 
            value={info.phone} 
            onSave={onSave} 
            fieldName="phone" 
          />
        </p>
        <p className="flex items-center gap-3 text-yellow-500/80">
          <FaMapMarker /> 
          <EditableField 
            value={info.location} 
            onSave={onSave} 
            fieldName="location" 
          />
        </p>
        <p className="flex items-center gap-3 text-yellow-500/80">
          <FaClock /> 
          <EditableField 
            value={info.availability} 
            onSave={onSave} 
            fieldName="availability" 
          />
        </p>
      </div>
    </motion.div>

    <motion.div
      className="bg-black/40 rounded-xl p-6 border border-green-500/20"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <h3 className="text-green-500 text-xl mb-4">Office Location</h3>
      <p className="text-yellow-500/80 mb-4">
        <EditableField 
          value={info.office} 
          onSave={onSave} 
          fieldName="office" 
        />
      </p>
      <button className="btn bg-gradient-to-r from-green-600 to-green-600 text-white mt-4 hover:scale-105 transition-transform">
        <FaCalendar className="mr-2" /> Directions
      </button>
    </motion.div>
  </div>
);
