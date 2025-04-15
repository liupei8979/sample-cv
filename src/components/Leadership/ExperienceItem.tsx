import { ExperienceItemProps } from "../../types";
import React from "react";
import { itemVariants } from "../../utils/animations";
import { motion } from "framer-motion";

const ExperienceItem: React.FC<ExperienceItemProps> = ({
  year,
  description,
  isDarkMode,
}) => {
  return (
    <motion.div
      className="relative pl-10 mb-10"
      variants={itemVariants}
      transition={{ duration: 0.6 }}
    >
      <div className="absolute left-0 top-0 w-6 h-6 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
      <div
        className="border-l-4 pl-6 py-2"
        style={{
          borderLeftColor: isDarkMode ? "#4338ca" : "#c7d2fe",
        }}
      >
        <p
          className="text-xl font-semibold font-outfit"
          style={{ color: isDarkMode ? "#818cf8" : "#4338ca" }}
        >
          {year}
        </p>
        <p
          className="mt-2 text-2xl font-outfit"
          style={{ color: isDarkMode ? "#e5e7eb" : "#1f2937" }}
        >
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export default ExperienceItem;
