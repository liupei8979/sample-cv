import React, { useEffect, useRef, useState } from "react";

import { Bar } from "react-chartjs-2";
import { motion } from "framer-motion";
import { skillsData } from "../../constants/skills";

interface SkillsChartProps {
  isDarkMode?: boolean;
}

const SkillsChart: React.FC<SkillsChartProps> = ({ isDarkMode }) => {
  const [sortOption, setSortOption] = useState<string>("default");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 외부 클릭으로 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 정렬 옵션 선택 핸들러
  const handleSortOptionSelect = (option: string) => {
    setSortOption(option);
    setIsDropdownOpen(false);
  };

  // 정렬된 스킬 데이터 계산
  const getSortedData = () => {
    let sortedSkills = [...skillsData];

    if (sortOption === "asc") {
      sortedSkills.sort((a, b) => a.proficiency - b.proficiency);
    } else if (sortOption === "desc") {
      sortedSkills.sort((a, b) => b.proficiency - a.proficiency);
    }
    // default는 원래 순서 유지

    return {
      labels: sortedSkills.map((skill) => skill.name),
      datasets: [
        {
          label: "Proficiency",
          data: sortedSkills.map((skill) => skill.proficiency),
          backgroundColor: isDarkMode
            ? [
                "rgba(129, 140, 248, 0.8)", // brighter indigo for dark mode
                "rgba(167, 139, 250, 0.8)", // brighter purple
                "rgba(192, 132, 252, 0.8)", // brighter fuchsia
                "rgba(232, 121, 249, 0.8)", // brighter pink
                "rgba(129, 140, 248, 0.8)",
                "rgba(167, 139, 250, 0.8)",
                "rgba(192, 132, 252, 0.8)",
                "rgba(232, 121, 249, 0.8)",
              ]
            : [
                "rgba(99, 102, 241, 0.8)", // original indigo
                "rgba(139, 92, 246, 0.8)", // original purple
                "rgba(168, 85, 247, 0.8)", // original fuchsia
                "rgba(217, 70, 239, 0.8)", // original pink
                "rgba(99, 102, 241, 0.8)",
                "rgba(139, 92, 246, 0.8)",
                "rgba(168, 85, 247, 0.8)",
                "rgba(217, 70, 239, 0.8)",
              ],
          borderColor: [
            "rgba(99, 102, 241, 1)",
            "rgba(139, 92, 246, 1)",
            "rgba(168, 85, 247, 1)",
            "rgba(217, 70, 239, 1)",
            "rgba(99, 102, 241, 1)",
            "rgba(139, 92, 246, 1)",
            "rgba(168, 85, 247, 1)",
            "rgba(217, 70, 239, 1)",
          ],
          borderWidth: 1,
          borderRadius: 8,
          hoverBackgroundColor: [
            "rgba(99, 102, 241, 0.9)",
            "rgba(139, 92, 246, 0.9)",
            "rgba(168, 85, 247, 0.9)",
            "rgba(217, 70, 239, 0.9)",
            "rgba(99, 102, 241, 0.9)",
            "rgba(139, 92, 246, 0.9)",
            "rgba(168, 85, 247, 0.9)",
            "rgba(217, 70, 239, 0.9)",
          ],
        },
      ],
    };
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        enabled: true,
        backgroundColor: isDarkMode
          ? "rgba(30, 41, 59, 0.95)" // darker for dark mode
          : "rgba(255, 255, 255, 0.95)", // white for light mode
        titleColor: isDarkMode ? "#fff" : "#111827",
        bodyColor: isDarkMode ? "rgba(209, 213, 219, 1)" : "#4B5563",
        titleFont: {
          family: "'Outfit', sans-serif",
          size: 14,
          weight: 600,
        },
        bodyFont: {
          family: "'Outfit', sans-serif",
          size: 13,
          weight: 400,
        },
        padding: 16,
        cornerRadius: 12,
        displayColors: false,
        borderColor: isDarkMode
          ? "rgba(75, 85, 99, 0.3)"
          : "rgba(229, 231, 235, 1)",
        borderWidth: 1,
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
        caretSize: 8,
        textAlign: "center" as const,
        callbacks: {
          title: function (tooltipItems: any) {
            return tooltipItems[0].label;
          },
          label: function (context: any) {
            // 더 모던한 형태로 출력
            return `${context.parsed.y}%`;
          },
          labelTextColor: function () {
            return isDarkMode ? "#E5E7EB" : "#4B5563";
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: isDarkMode ? "rgba(75, 85, 99, 1)" : "rgba(243, 244, 246, 1)",
          drawBorder: false,
        },
        ticks: {
          font: {
            family: "'Outfit', sans-serif",
            size: 12,
          },
          color: isDarkMode ? "rgba(209, 213, 219, 1)" : undefined,
          padding: 10,
          callback: function (tickValue: number | string) {
            return tickValue + "%";
          },
        },
      },
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          font: {
            family: "'Outfit', sans-serif",
            size: 12,
          },
          color: isDarkMode ? "rgba(209, 213, 219, 1)" : undefined,
          padding: 10,
        },
      },
    },
    layout: {
      padding: {
        top: 10,
        right: 20,
        bottom: 20,
        left: 20,
      },
    },
    animation: {
      duration: 2000,
      easing: "easeOutQuart" as const,
    },
  };

  // 현재 선택된 정렬 옵션의 텍스트 설정
  const getSortText = () => {
    switch (sortOption) {
      case "asc":
        return "Lowest First";
      case "desc":
        return "Highest First";
      default:
        return "Default Order";
    }
  };

  return (
    <motion.div
      style={{
        backgroundColor: isDarkMode ? "#1f2937" : "white",
      }}
      className="rounded-xl shadow-2xl p-6 overflow-hidden font-outfit relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      viewport={{ once: true }}
    >
      {/* 모던한 커스텀 드롭다운 */}
      <div className="absolute top-6 right-6 z-20" ref={dropdownRef}>
        <button
          className="flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-medium transition-all"
          style={{
            backgroundColor: isDarkMode
              ? "rgba(55, 65, 81, 0.8)"
              : "rgba(243, 244, 246, 0.8)",
            color: isDarkMode ? "#e5e7eb" : "#1f2937",
            backdropFilter: "blur(8px)",
            border: isDarkMode
              ? "1px solid rgba(75, 85, 99, 0.5)"
              : "1px solid rgba(209, 213, 219, 0.5)",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            width: "150px",
          }}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <span>{getSortText()}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`transition-transform duration-200 ${
              isDropdownOpen ? "transform rotate-180" : ""
            }`}
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>

        {isDropdownOpen && (
          <motion.div
            className="absolute right-0 mt-1 w-40 rounded-lg overflow-hidden shadow-xl z-50"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              backgroundColor: isDarkMode
                ? "rgba(31, 41, 55, 0.95)"
                : "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(8px)",
              border: isDarkMode
                ? "1px solid rgba(75, 85, 99, 0.5)"
                : "1px solid rgba(229, 231, 235, 0.5)",
            }}
          >
            {["default", "asc", "desc"].map((option) => (
              <div
                key={option}
                className="px-4 py-3 cursor-pointer transition-colors text-sm"
                style={{
                  backgroundColor:
                    sortOption === option
                      ? isDarkMode
                        ? "rgba(55, 65, 81, 0.5)"
                        : "rgba(243, 244, 246, 0.5)"
                      : "transparent",
                  color: isDarkMode
                    ? sortOption === option
                      ? "#ffffff"
                      : "#d1d5db"
                    : sortOption === option
                    ? "#111827"
                    : "#4b5563",
                }}
                onClick={() => handleSortOptionSelect(option)}
              >
                {option === "default" && "Default Order"}
                {option === "asc" && "Lowest First"}
                {option === "desc" && "Highest First"}
              </div>
            ))}
          </motion.div>
        )}
      </div>

      <div className="h-[400px]">
        <Bar data={getSortedData()} options={options} />
      </div>
    </motion.div>
  );
};

export default SkillsChart;
