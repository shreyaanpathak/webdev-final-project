import { motion } from "framer-motion";
import {useEffect, useState } from "react";

export default function FloatingParticles() {
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {[...Array(35)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-green-500/20 rounded-full"
          initial={{ 
            x: Math.random() * dimensions.width,
            y: -20 
          }}
          animate={{
            x: Math.random() * dimensions.width,
            y: dimensions.height + 20,
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop"
          }}
        />
      ))}
    </div>
  );
}
