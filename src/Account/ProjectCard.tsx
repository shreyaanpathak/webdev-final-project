// components/ProjectCard.tsx
import { motion } from "framer-motion";

interface ProjectCardProps {
  project: {
    title: string;
    description: string;
    technologies: string[];
  };
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => (
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
