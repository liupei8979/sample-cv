import React from "react";
import { generatePDF } from "../../utils/pdfGenerator";
import { motion } from "framer-motion";
import { useTheme } from "../../hooks/useTheme";

const DownloadButton: React.FC = () => {
  const { isDarkMode } = useTheme();

  const handleDownload = async () => {
    await generatePDF(isDarkMode);
  };

  return (
    <motion.div
      id="download-section"
      className="fixed bottom-8 right-8 z-40"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.5, duration: 0.4 }}
    >
      <button
        onClick={handleDownload}
        className={`${
          isDarkMode
            ? "bg-gradient-to-r from-indigo-600 to-purple-600"
            : "bg-gradient-to-r from-indigo-500 to-purple-500"
        } text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 flex items-center space-x-2`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <span>Download CV</span>
      </button>
    </motion.div>
  );
};

export default DownloadButton;
