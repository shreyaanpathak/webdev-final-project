// constants/index.ts
export const COLORS = {
  primary: "#FFB800",
  primaryHover: "#E6A500",
  background: "#0A0A0A",  // Darker background
  cardBg: "#141414",     // Slightly darker card background
  success: "#10B981",
  danger: "#EF4444",
  border: "rgba(16, 185, 129, 0.2)", // Changed to green border
  green: "#10B981",
  greenDark: "#064E3B",
  greenLight: "#34D399",
  greenBg: "rgba(16, 185, 129, 0.05)",
};

export const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};