import { awards, totalPrize } from "../../constants/awards";
import {
  fadeInUp,
  itemVariants,
  staggerContainer,
} from "../../utils/animations";

import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../hooks/useTheme";

const Awards: React.FC = () => {
  const { isDarkMode } = useTheme();

  return (
    <motion.section
      id="awards"
      className="py-24 px-8 rounded-3xl shadow-2xl mb-24"
      style={{
        background: isDarkMode
          ? "linear-gradient(to bottom right, #111827, #312E81)"
          : "linear-gradient(to bottom right, #F9FAFB, #F5F3FF)",
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
        Awards
      </h2>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {awards.map((award, index) => (
          <motion.div
            key={index}
            style={{
              backgroundColor: isDarkMode ? "#1f2937" : "white",
            }}
            className="p-6 rounded-xl shadow-lg hover:shadow-xl transition"
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <div
              className="text-lg font-semibold mb-2"
              style={{ color: isDarkMode ? "#a5b4fc" : "#4f46e5" }}
            >
              {award.year}
            </div>
            <div
              className="text-xl font-bold"
              style={{ color: isDarkMode ? "#e5e7eb" : "#1f2937" }}
            >
              {award.description}
            </div>
          </motion.div>
        ))}
      </motion.div>
      <motion.div
        className="mt-16 text-3xl font-bold text-center"
        variants={fadeInUp}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
          {totalPrize}
        </span>
      </motion.div>
    </motion.section>
  );
};

export default Awards;
