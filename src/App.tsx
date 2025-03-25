import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import React, { useEffect, useState } from "react";

import { Bar } from "react-chartjs-2";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { motion } from "framer-motion";

// ChartJS 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// 모션 Variants 업데이트
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// Navbar 컴포넌트 업데이트
const Navbar: React.FC<{ isDarkMode: boolean; toggleTheme: () => void }> = ({
  isDarkMode,
  toggleTheme,
}) => {
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
        <div className="font-bold text-3xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
          KM
        </div>
        <div className="flex items-center space-x-8">
          {["about", "skills", "experience", "awards"].map((section) => (
            <a
              key={section}
              href={`#${section}`}
              style={{ color: isDarkMode ? "#d1d5db" : "#374151" }}
              className="hover:text-indigo-600 transition font-medium relative group"
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

// 헤더 컴포넌트 업데이트
const Header: React.FC = () => {
  return (
    <header className="pt-32 pb-20 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.1] bg-[length:20px_20px]"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-indigo-800/30"></div>

      <motion.div className="relative z-10 max-w-4xl mx-auto px-6">
        <motion.div
          className="relative mx-auto mb-8 w-40 h-40 rounded-full overflow-hidden border-4 border-white/50 shadow-xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <img
            src="/assets/images/profile.png"
            alt="Kim Mintae"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/30 to-transparent"></div>
        </motion.div>

        <motion.h1
          className="text-7xl font-extrabold tracking-tight mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          KIM MINTAE
        </motion.h1>
        <motion.div
          className="h-1 w-20 bg-white rounded-full mx-auto mb-6"
          initial={{ width: 0 }}
          animate={{ width: "5rem" }}
          transition={{ duration: 1, delay: 0.5 }}
        ></motion.div>
        <motion.p
          className="text-3xl font-medium"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Web Frontend Developer
        </motion.p>
        <motion.p
          className="mt-2 text-xl"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          1999.02.13
        </motion.p>
        <motion.div
          className="mt-8 space-y-2 text-xl"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, delay: 1 }}
        >
          <p>010-8545-2924</p>
          <p>khsr98@ajou.ac.kr</p>
          <div className="flex justify-center space-x-4 mt-6">
            <a
              href="https://github.com/liupei8979"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 transition rounded-full"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/oxsla/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 transition rounded-full"
            >
              LinkedIn
            </a>
          </div>
        </motion.div>
      </motion.div>
    </header>
  );
};

// About 섹션 업데이트
const About: React.FC<{ isDarkMode?: boolean }> = ({ isDarkMode }) => {
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
      <h2 className="text-5xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
        About Me
      </h2>
      <div className="flex flex-col md:flex-row gap-12 items-center">
        <motion.div
          className="md:w-1/2"
          variants={fadeInUp}
          transition={{ delay: 0.2 }}
        >
          <p
            className="text-xl leading-relaxed"
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
            className="text-2xl font-semibold mb-4"
            style={{ color: isDarkMode ? "#a5b4fc" : "#4338ca" }}
          >
            Languages
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span
                className="font-medium"
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

// Skills 섹션 업데이트
const Skills: React.FC<{ isDarkMode?: boolean }> = ({ isDarkMode }) => {
  // 첫 번째 줄과 두 번째 줄로 스킬을 분리
  const firstLineSkills = [
    "React",
    "Svelte",
    "Javascript",
    "Typescript",
    "Zustand",
  ];
  const secondLineSkills = ["React-Query", "Chart.js", "D3.js"];

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

const SkillsChart: React.FC<{ isDarkMode?: boolean }> = ({ isDarkMode }) => {
  const data = {
    labels: [
      "React",
      "Svelte",
      "Javascript",
      "Typescript",
      "Zustand",
      "React-Query",
      "Chart.js",
      "D3.js",
    ],
    datasets: [
      {
        label: "Proficiency",
        data: [90, 80, 95, 85, 75, 70, 65, 60],
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

// 리더십 & 경험 섹션 업데이트
interface ExperienceProps {
  year: string;
  description: string;
}

const ExperienceItem: React.FC<ExperienceProps & { isDarkMode?: boolean }> = ({
  year,
  description,
  isDarkMode,
}) => {
  return (
    <motion.div
      className="relative pl-10 mb-10"
      variants={itemVariants}
      transition={{ duration: 0.6 }}
    >
      <div className="absolute left-0 top-0 w-6 h-6 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
      <div
        className="border-l-4 pl-6 py-2"
        style={{
          borderLeftColor: isDarkMode ? "#4338ca" : "#c7d2fe",
        }}
      >
        <p
          className="text-xl font-semibold"
          style={{ color: isDarkMode ? "#818cf8" : "#4338ca" }}
        >
          {year}
        </p>
        <p
          className="mt-2 text-2xl"
          style={{ color: isDarkMode ? "#e5e7eb" : "#1f2937" }}
        >
          {description}
        </p>
      </div>
    </motion.div>
  );
};

const Leadership: React.FC<{ isDarkMode?: boolean }> = ({ isDarkMode }) => {
  const experiences = [
    { year: "2025", description: "'Bigglz' Web Frontend Developer" },
    { year: "2024", description: "'9oormthonUNIV' Web Development Team" },
    { year: "2024", description: "'Blockchain at Yonsei' Dapp Developer Team" },
    {
      year: "2024",
      description: "'Cosmostation' Web Frontend Developer Intern",
    },
    { year: "2022", description: "'Memory Plant' Social Media Intern" },
    { year: "2022", description: "Leader of Volunteering club 'PTPI'" },
  ];

  return (
    <motion.section
      id="experience"
      className="py-24 px-8 max-w-[1400px] mx-auto"
      style={{
        color: isDarkMode ? "white" : "inherit",
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeInUp}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-5xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
        Leadership & Experiences
      </h2>
      <motion.div
        className="space-y-8 max-w-3xl mx-auto"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {experiences.map((exp, index) => (
          <ExperienceItem
            key={index}
            year={exp.year}
            description={exp.description}
            isDarkMode={isDarkMode}
          />
        ))}
      </motion.div>
    </motion.section>
  );
};

// Awards 섹션 업데이트
const Awards: React.FC<{ isDarkMode?: boolean }> = ({ isDarkMode }) => {
  const awards = [
    { year: "2024", description: "Kakao x goorm Hackathon 1st Prize" },
    { year: "2024", description: "Eth Seoul - Astar Foundation: 2nd Prize" },
    { year: "2024", description: "Eth Seoul - BuidlGuidl.eth: 1st Prize" },
    { year: "2024", description: "Eth Seoul - Top 7 Finalist Prize" },
  ];
  const totalPrize = "Total Prize: $12000";

  return (
    <motion.section
      id="awards"
      className="py-24 px-8 rounded-3xl shadow-2xl"
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

// 푸터 컴포넌트 수정 - isDarkMode 활용
const Footer: React.FC<{ isDarkMode?: boolean }> = ({ isDarkMode }) => {
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

// 다운로드 버튼 컴포넌트 개선 - isDarkMode 활용
const DownloadButton: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  const handleDownload = async () => {
    const contentElement = document.getElementById("cv-content");
    if (!contentElement) return;

    // 로딩 상태 표시 - 다크모드에 따라 스타일 변경
    const loadingToast = document.createElement("div");
    loadingToast.className = `fixed top-4 right-4 ${
      isDarkMode ? "bg-indigo-700" : "bg-indigo-600"
    } text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-pulse`;
    loadingToast.textContent = "Generating PDF...";
    document.body.appendChild(loadingToast);

    try {
      // 다운로드 버튼 일시적으로 숨기기
      const downloadBtn = document.getElementById("download-section");
      if (downloadBtn) downloadBtn.style.display = "none";

      // 간단한 방법 - 직접 HTML을 캡처하여 단일 PDF로 변환
      const cvContent = document.getElementById("cv-content");
      if (!cvContent) return;

      // 현재 테마 상태 저장
      const htmlElement = document.documentElement;
      const wasInDarkMode = htmlElement.classList.contains("dark");

      // PDF를 위해 임시로 라이트 모드로 전환 (PDF 내용을 더 잘 보이게 하기 위해)
      if (wasInDarkMode) {
        htmlElement.classList.remove("dark");
      }

      // 현재 스타일 정보 저장
      const originalStyles = {
        width: cvContent.style.width,
        maxWidth: cvContent.style.maxWidth,
        height: document.body.style.height,
        overflow: document.body.style.overflow,
      };

      // 보이는 부분만 캡처하도록 body 스타일 조정
      document.body.style.overflow = "visible";
      document.body.style.height = "auto";

      // 전체 내용을 한 번에 캡처하기 좋게 너비 조정
      cvContent.style.width = "1000px";
      cvContent.style.maxWidth = "1000px";

      // 렌더링 안정화 대기
      await new Promise((resolve) => setTimeout(resolve, 500));

      // PDF 생성
      const canvas = await html2canvas(cvContent, {
        scale: 1.5,
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: "#ffffff",
      });

      // 이미지 데이터로 변환
      const imgData = canvas.toDataURL("image/png", 1.0);

      // 적절한 PDF 크기 계산
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // 이미지 너비를 PDF 너비에 맞추고 비율 유지
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // PDF에 추가
      let heightLeft = imgHeight;
      let position = 0;
      let page = 1;

      // 첫 페이지
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      // 필요한 만큼 추가 페이지 생성
      while (heightLeft > 0) {
        position = -pdfHeight * page;
        page++;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      // PDF 다운로드
      pdf.save("KimMintae_CV.pdf");

      // 원래 스타일 복원
      cvContent.style.width = originalStyles.width;
      cvContent.style.maxWidth = originalStyles.maxWidth;
      document.body.style.height = originalStyles.height;
      document.body.style.overflow = originalStyles.overflow;

      // 원래 테마 상태로 복원
      if (wasInDarkMode) {
        htmlElement.classList.add("dark");
      }
    } catch (error) {
      console.error("PDF 생성 중 오류 발생:", error);
      alert(
        "PDF 생성 중 오류가 발생했습니다: " +
          (error instanceof Error ? error.message : String(error))
      );
    } finally {
      // 다운로드 버튼 다시 표시
      const downloadBtn = document.getElementById("download-section");
      if (downloadBtn) downloadBtn.style.display = "block";

      // 로딩 토스트 제거
      document.body.removeChild(loadingToast);
    }
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

// 메인 App 컴포넌트 업데이트
const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize theme - 항상 라이트 모드로 시작하도록 수정
  useEffect(() => {
    // 기존 테마 설정 무시하고 항상 라이트 모드로 시작
    setIsDarkMode(false);

    // HTML 요소에서 dark 클래스 제거
    document.documentElement.classList.remove("dark");

    // 로컬 스토리지에 라이트 모드로 저장
    localStorage.theme = "light";
  }, []);

  // Toggle theme function은 그대로 유지
  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);

    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
      console.log("Switched to DARK mode");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
      console.log("Switched to LIGHT mode");
    }
  };

  return (
    <div
      style={{
        backgroundColor: isDarkMode ? "#111827" : "white",
        color: isDarkMode ? "white" : "#1f2937",
        transition: "background-color 0.3s, color 0.3s",
      }}
    >
      <div className="min-h-screen scroll-smooth" id="cv-content">
        <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        <Header />
        <About isDarkMode={isDarkMode} />
        <Skills isDarkMode={isDarkMode} />
        <Leadership isDarkMode={isDarkMode} />
        <Awards isDarkMode={isDarkMode} />
        <Footer isDarkMode={isDarkMode} />
      </div>
      <DownloadButton isDarkMode={isDarkMode} />
    </div>
  );
};

export default App;
