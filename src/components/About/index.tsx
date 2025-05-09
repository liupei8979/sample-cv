import React from "react";
import { fadeInUp } from "../../utils/animations";
import { motion } from "framer-motion";
import { useTheme } from "../../hooks/useTheme";

const About: React.FC = () => {
  const { isDarkMode } = useTheme();

  return (
    <motion.section
      id="about"
      className="py-24 px-8 max-w-[1400px] mx-auto transition-colors duration-300"
      style={{
        color: isDarkMode ? "white" : "inherit",
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeInUp}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="text-center mb-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.h2
          className="text-5xl font-bold bg-clip-text text-transparent"
          style={{
            backgroundImage: isDarkMode
              ? "linear-gradient(135deg, #93c5fd, #6366f1)"
              : "linear-gradient(135deg, #3b82f6, #4f46e5)",
          }}
          initial={{ y: -30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          ABOUT ME
        </motion.h2>

        <motion.div
          className="h-1 w-24 mx-auto mt-6 rounded-full"
          style={{
            background: isDarkMode
              ? "linear-gradient(90deg, #93c5fd, #6366f1)"
              : "linear-gradient(90deg, #3b82f6, #4f46e5)",
          }}
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: "6rem", opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        />
      </motion.div>

      <div className="flex flex-col md:flex-row gap-12 items-center">
        <motion.div
          className="md:w-1/2"
          variants={fadeInUp}
          transition={{ delay: 0.2 }}
        >
          <p
            className="text-xl leading-relaxed font-outfit text-justify"
            style={{ color: isDarkMode ? "#d1d5db" : "#4b5563" }}
          >
            I am committed to growing as a front-end developer who maximizes
            user experience. To create exceptional products, I immerse myself in
            understanding user perspectives, carefully exploring the best
            solutions and communicating proactively. I adapt flexibly to changes
            and enjoy embracing new challenges. Currently, I am pursuing my
            studies at Ajou University while working as a web front-end
            developer at Bigglz.
          </p>
        </motion.div>
        <motion.div
          className="md:w-1/2 p-8 rounded-2xl shadow-xl"
          style={{
            background: isDarkMode
              ? "linear-gradient(to bottom right, rgba(67, 56, 202, 0.3), rgba(126, 34, 206, 0.3))"
              : "linear-gradient(to bottom right, rgba(238, 242, 255, 1), rgba(245, 243, 255, 1))",
          }}
          variants={fadeInUp}
          transition={{ delay: 0.4 }}
        >
          <h3
            className="text-2xl font-semibold font-outfit mb-4"
            style={{ color: isDarkMode ? "#a5b4fc" : "#4338ca" }}
          >
            Languages
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span
                className="font-medium font-outfit"
                style={{ color: isDarkMode ? "#e5e7eb" : "#1f2937" }}
              >
                Korean
              </span>
              <div
                className="w-2/3 rounded-full h-2"
                style={{ backgroundColor: isDarkMode ? "#374151" : "#e5e7eb" }}
              >
                <div className="bg-indigo-600 h-2 rounded-full w-full"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span
                className="font-medium"
                style={{ color: isDarkMode ? "#e5e7eb" : "#1f2937" }}
              >
                Japanese
              </span>
              <div
                className="w-2/3 rounded-full h-2"
                style={{ backgroundColor: isDarkMode ? "#374151" : "#e5e7eb" }}
              >
                <div className="bg-indigo-600 h-2 rounded-full w-4/5"></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default About;
