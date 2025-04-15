import { Bar } from "react-chartjs-2";
import React from "react";
import { motion } from "framer-motion";
import { skillsData } from "../../constants/skills";

interface SkillsChartProps {
  isDarkMode?: boolean;
}

const SkillsChart: React.FC<SkillsChartProps> = ({ isDarkMode }) => {
  const data = {
    labels: skillsData.map((skill) => skill.name),
    datasets: [
      {
        label: "Proficiency",
        data: skillsData.map((skill) => skill.proficiency),
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

  return (
    <motion.div
      style={{
        backgroundColor: isDarkMode ? "#1f2937" : "white",
      }}
      className="rounded-xl shadow-2xl p-6 overflow-hidden font-outfit"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      viewport={{ once: true }}
    >
      <div className="h-[400px]">
        <Bar data={data} options={options} />
      </div>
    </motion.div>
  );
};

export default SkillsChart;
