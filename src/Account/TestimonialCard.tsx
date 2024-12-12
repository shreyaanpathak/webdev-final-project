// components/TestimonialCard.tsx
import { motion } from "framer-motion";

interface TestimonialCardProps {
  testimonial: {
    name: string;
    role: string;
    content: string;
    image: string;
  };
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => (
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
