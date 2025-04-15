import React, { useEffect } from "react";

import { useTheme } from "../../hooks/useTheme";

const Navbar: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  // Add this for debugging
  useEffect(() => {
    console.log("Current theme mode:", isDarkMode ? "DARK" : "LIGHT");
  }, [isDarkMode]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div
        className="max-w-[1400px] mx-auto px-8 py-5 flex justify-between items-center backdrop-blur-xl shadow-lg rounded-b-2xl transition-colors duration-300"
        style={{
          backgroundColor: isDarkMode
            ? "rgba(17, 24, 39, 0.9)"
            : "rgba(255, 255, 255, 0.9)",
        }}
      >
        <div className="font-bold text-3xl font-outfit bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
          KM
        </div>
        <div className="flex items-center space-x-8">
          {["about", "skills", "experience", "awards"].map((section) => (
            <a
              key={section}
              href={`#${section}`}
              style={{ color: isDarkMode ? "#d1d5db" : "#374151" }}
              className="hover:text-indigo-600 transition font-medium font-outfit relative group"
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}

          {/* 현대적인 토글 버튼 - 하이라이트와 테두리 제거 */}
          <button
            onClick={toggleTheme}
            className="relative inline-flex items-center h-7 rounded-full w-14 transition-colors duration-300 select-none outline-none focus:outline-none"
            style={{
              backgroundColor: isDarkMode
                ? "rgba(79, 70, 229, 0.8)"
                : "rgba(209, 213, 219, 0.8)",
              WebkitTapHighlightColor: "transparent",
              userSelect: "none",
              outline: "none",
              boxShadow: "none",
              border: "none",
            }}
            onFocus={(e) => e.target.blur()} // 클릭 시 즉시 포커스 해제
            aria-label="Toggle dark mode"
          >
            <span className="sr-only">Toggle dark mode</span>
            <span
              className="pointer-events-none absolute left-0 inline-flex items-center justify-center h-7 w-7 rounded-full shadow transform transition-transform duration-300 ease-in-out"
              style={{
                transform: isDarkMode ? "translateX(100%)" : "translateX(0)",
                backgroundColor: isDarkMode ? "#111827" : "white",
              }}
            >
              {/* 아이콘 */}
              {isDarkMode ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-yellow-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-yellow-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              )}
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
