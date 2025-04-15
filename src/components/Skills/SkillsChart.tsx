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
        position: "top" as const,
        labels: {
          font: {
            family: "'Inter', sans-serif",
            size: 14,
            weight: 500,
          },
          color: isDarkMode ? "#FFFFFF" : undefined,
          padding: 20,
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(17, 24, 39, 0.8)",
        titleFont: {
          family: "'Inter', sans-serif",
          size: 14,
          weight: 600,
        },
        bodyFont: {
          family: "'Inter', sans-serif",
          size: 13,
        },
        padding: 12,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: function (context: any) {
            return `${context.dataset.label}: ${context.parsed.y}%`;
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
            family: "'Inter', sans-serif",
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
            family: "'Inter', sans-serif",
            size: 12,
          },
          color: isDarkMode ? "rgba(209, 213, 219, 1)" : undefined,
          padding: 10,
        },
      },
    },
    layout: {
      padding: {
        top: 20,
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
      className="rounded-xl shadow-2xl p-6 overflow-hidden"
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
