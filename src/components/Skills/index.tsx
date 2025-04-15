import {
  fadeInUp,
  itemVariants,
  staggerContainer,
} from "../../utils/animations";
import { firstLineSkills, secondLineSkills } from "../../constants/skills";

import React from "react";
import SkillsChart from "./SkillsChart";
import { motion } from "framer-motion";
import { useTheme } from "../../hooks/useTheme";

const Skills: React.FC = () => {
  const { isDarkMode } = useTheme();

  return (
    <motion.section
      id="skills"
      className="py-24 px-8 rounded-3xl shadow-2xl"
      style={{
        background: isDarkMode
          ? "linear-gradient(to bottom right, #111827, #1E3A8A)"
          : "linear-gradient(to bottom right, #F9FAFB, #EEF2FF)",
        maxWidth: "1400px",
        margin: "0 auto",
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeInUp}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-5xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
        Skills
      </h2>
      <div className="max-w-4xl mx-auto mb-16">
        {/* 첫 번째 줄 - 왼쪽 정렬 */}
        <motion.div
          className="flex flex-wrap justify-start gap-5 mb-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {firstLineSkills.map((skill, index) => (
            <motion.div
              key={skill}
              style={{
                backgroundColor: isDarkMode ? "#1f2937" : "white",
                color: isDarkMode ? "#e5e7eb" : "#1f2937",
                borderColor: isDarkMode ? "#4338ca" : "#e0e7ff",
              }}
              className="px-8 py-4 rounded-xl shadow-lg text-xl font-medium cursor-pointer hover:scale-105 transform transition border"
              variants={itemVariants}
              transition={{ duration: 0.5, delay: index * 0.07 }}
              whileHover={{
                backgroundColor: isDarkMode ? "#374151" : "#EEF2FF",
                boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.2)",
              }}
            >
              {skill}
            </motion.div>
          ))}
        </motion.div>

        {/* 두 번째 줄 - 오른쪽 정렬 */}
        <motion.div
          className="flex flex-wrap justify-end gap-5"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {secondLineSkills.map((skill, index) => (
            <motion.div
              key={skill}
              style={{
                backgroundColor: isDarkMode ? "#1f2937" : "white",
                color: isDarkMode ? "#e5e7eb" : "#1f2937",
                borderColor: isDarkMode ? "#4338ca" : "#e0e7ff",
              }}
              className="px-8 py-4 rounded-xl shadow-lg text-xl font-medium cursor-pointer hover:scale-105 transform transition border"
              variants={itemVariants}
              transition={{ duration: 0.5, delay: index * 0.07 + 0.35 }}
              whileHover={{
                backgroundColor: isDarkMode ? "#374151" : "#EEF2FF",
                boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.2)",
              }}
            >
              {skill}
            </motion.div>
          ))}
        </motion.div>
      </div>
      <SkillsChart isDarkMode={isDarkMode} />
    </motion.section>
  );
};

export default Skills;
