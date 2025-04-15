import { fadeInUp, staggerContainer } from "../../utils/animations";

import ExperienceItem from "./ExperienceItem";
import React from "react";
import { experiences } from "../../constants/experiences";
import { motion } from "framer-motion";
import { useTheme } from "../../hooks/useTheme";

const Leadership: React.FC = () => {
  const { isDarkMode } = useTheme();

  return (
    <motion.section
      id="experience"
      className="py-24 px-8 max-w-[1400px] mx-auto"
      style={{
        color: isDarkMode ? "white" : "inherit",
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeInUp}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-5xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
        Leadership & Experiences
      </h2>
      <motion.div
        className="space-y-8 max-w-3xl mx-auto"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {experiences.map((exp, index) => (
          <ExperienceItem
            key={index}
            year={exp.year}
            description={exp.description}
            isDarkMode={isDarkMode}
          />
        ))}
      </motion.div>
    </motion.section>
  );
};

export default Leadership;
