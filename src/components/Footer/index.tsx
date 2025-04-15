import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../hooks/useTheme";

const Footer: React.FC = () => {
  const { isDarkMode } = useTheme();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`${
        isDarkMode
          ? "bg-gradient-to-r from-gray-900 to-indigo-900"
          : "bg-gradient-to-r from-gray-700 to-indigo-700"
      } text-white py-16 text-center transition-colors duration-300 rounded-t-3xl`}
    >
      <div className="max-w-4xl mx-auto px-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-300"
        >
          KM
        </motion.div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center space-x-8 mb-10"
        >
          <a
            href="#"
            className={`${
              isDarkMode ? "text-gray-300" : "text-gray-200"
            } hover:text-white transition-all hover:scale-110 text-lg`}
          >
            GitHub
          </a>
          <a
            href="#"
            className={`${
              isDarkMode ? "text-gray-300" : "text-gray-200"
            } hover:text-white transition-all hover:scale-110 text-lg`}
          >
            LinkedIn
          </a>
          <a
            href="#"
            className={`${
              isDarkMode ? "text-gray-300" : "text-gray-200"
            } hover:text-white transition-all hover:scale-110 text-lg`}
          >
            Email
          </a>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className={`${isDarkMode ? "text-gray-400" : "text-gray-300"}`}
        >
          © {new Date().getFullYear()} KIM MINTAE. All rights reserved.
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
