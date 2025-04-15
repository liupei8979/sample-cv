import React from "react";
import { useTheme } from "../../hooks/useTheme";

const Footer: React.FC = () => {
  const { isDarkMode } = useTheme();

  return (
    <footer
      className={`${
        isDarkMode
          ? "bg-gradient-to-r from-gray-900 to-indigo-900"
          : "bg-gradient-to-r from-gray-700 to-indigo-700"
      } text-white py-12 text-center transition-colors duration-300`}
    >
      <div className="max-w-4xl mx-auto px-8">
        <div className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-300">
          KM
        </div>
        <div className="flex justify-center space-x-6 mb-8">
          <a
            href="#"
            className={`${
              isDarkMode ? "text-gray-300" : "text-gray-200"
            } hover:text-white transition`}
          >
            GitHub
          </a>
          <a
            href="#"
            className={`${
              isDarkMode ? "text-gray-300" : "text-gray-200"
            } hover:text-white transition`}
          >
            LinkedIn
          </a>
          <a
            href="#"
            className={`${
              isDarkMode ? "text-gray-300" : "text-gray-200"
            } hover:text-white transition`}
          >
            Email
          </a>
        </div>
        <div className={`${isDarkMode ? "text-gray-400" : "text-gray-300"}`}>
          © {new Date().getFullYear()} KIM MINTAE. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
