import React, { useState } from "react";
import { awards, totalPrize } from "../../constants/awards";
import {
  fadeInUp,
  itemVariants,
  staggerContainer,
} from "../../utils/animations";

import { motion } from "framer-motion";
import { useTheme } from "../../hooks/useTheme";

const Awards: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // 3D 카드 효과를 위한 초기 CSS (transformStyle 제거)
  const initialStyles = {
    backgroundColor: isDarkMode
      ? "rgba(31, 41, 55, 0.9)"
      : "rgba(255, 255, 255, 0.9)",
    boxShadow: isDarkMode
      ? "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.15)"
      : "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.05)",
    transition:
      "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
  };

  // 추가 카드 데이터
  const additionalAwards = [
    { year: "2023", description: "Development Excellence Award" },
    { year: "2022", description: "Best UI/UX Design Competition" },
  ];

  // 모든 어워드 결합
  const allAwards = [...awards, ...additionalAwards];

  return (
    <motion.section
      id="awards"
      className="py-24 px-8 rounded-3xl"
      style={{
        background: isDarkMode
          ? "radial-gradient(circle at 50% 50%, #1a1c37, #111827)"
          : "radial-gradient(circle at 50% 50%, #F9FAFB, #F3F4F6)",
        maxWidth: "1400px",
        margin: "0 auto",
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
              ? "linear-gradient(135deg, #c084fc, #818cf8)"
              : "linear-gradient(135deg, #6366f1, #a855f7)",
          }}
          initial={{ y: -30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Awards
        </motion.h2>

        <motion.div
          className="h-1 w-24 mx-auto mt-6 rounded-full"
          style={{
            background: isDarkMode
              ? "linear-gradient(90deg, #c084fc, #818cf8)"
              : "linear-gradient(90deg, #6366f1, #a855f7)",
          }}
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: "6rem", opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        />
      </motion.div>

      {/* 현대적인 격자 레이아웃 */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {allAwards.map((award, index) => {
          // 각 카드마다 고유한 그라데이션 색상 생성
          const startHue = 230 + ((index * 20) % 120); // 230부터 시작하여 변화
          const endHue = (startHue + 40) % 360;

          const gradientStart = `hsl(${startHue}, ${
            isDarkMode ? "70%" : "80%"
          }, ${isDarkMode ? "70%" : "60%"})`;
          const gradientEnd = `hsl(${endHue}, ${isDarkMode ? "70%" : "80%"}, ${
            isDarkMode ? "60%" : "50%"
          })`;

          const isHovered = hoveredIndex === index;
          const isAdditional = index >= awards.length;

          return (
            <motion.div
              key={index}
              className="relative rounded-2xl overflow-hidden p-1 h-72"
              style={{
                background: `linear-gradient(135deg, ${gradientStart}20, ${gradientEnd}20)`,
                perspective: "1000px",
              }}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              {/* 배경 효과 */}
              <motion.div
                className="absolute inset-0 rounded-2xl opacity-30"
                style={{
                  background: `linear-gradient(135deg, ${gradientStart}, ${gradientEnd})`,
                  filter: "blur(10px)",
                  transform: "translateZ(-10px)",
                }}
                animate={{
                  opacity: isHovered ? 0.5 : 0.3,
                }}
              />

              {/* 메인 컨텐츠 - transformStyle을 클래스로 적용 */}
              <motion.div
                className="relative h-full rounded-xl p-6 flex flex-col justify-between overflow-hidden backdrop-blur-sm preserve-3d"
                style={{
                  ...initialStyles,
                  transform: isHovered ? "translateZ(20px)" : "translateZ(0)",
                  boxShadow: isHovered
                    ? isDarkMode
                      ? `0 25px 50px -12px ${gradientStart}50, 0 0 30px ${gradientEnd}30`
                      : `0 25px 50px -12px ${gradientStart}40, 0 0 20px ${gradientEnd}20`
                    : initialStyles.boxShadow,
                }}
              >
                {/* 상단 배지 */}
                <div className="absolute top-3 right-3">
                  <motion.div
                    className="flex items-center justify-center w-10 h-10 rounded-full"
                    style={{
                      background: `linear-gradient(135deg, ${gradientStart}, ${gradientEnd})`,
                    }}
                    initial={{ rotate: -90, opacity: 0 }}
                    whileInView={{ rotate: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ rotate: 15, scale: 1.1 }}
                  >
                    <span className="text-white font-bold">#{index + 1}</span>
                  </motion.div>
                </div>

                {/* 연도 표시 */}
                <div
                  className="text-sm font-medium tracking-wider mb-4"
                  style={{
                    color: isDarkMode ? `${gradientStart}` : `${gradientEnd}`,
                  }}
                >
                  {award.year}
                  {isAdditional && (
                    <span
                      className="ml-2 inline-block px-2 py-0.5 text-xs rounded-full bg-opacity-20"
                      style={{
                        backgroundColor: isDarkMode ? "#c084fc30" : "#6366f130",
                        color: isDarkMode ? "#c084fc" : "#6366f1",
                      }}
                    >
                      Expected
                    </span>
                  )}
                </div>

                {/* 수상 내용 */}
                <div className="flex-1 relative">
                  <motion.h3
                    className="text-2xl font-bold mb-2"
                    style={{
                      color: isDarkMode ? "#e5e7eb" : "#1f2937",
                      textShadow: isHovered
                        ? isDarkMode
                          ? `0 0 15px ${gradientStart}30`
                          : `0 0 15px ${gradientEnd}30`
                        : "none",
                    }}
                    animate={{
                      y: isHovered ? -5 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {award.description.split(" ").slice(0, 2).join(" ")}
                  </motion.h3>

                  <motion.p
                    className="text-base"
                    style={{
                      color: isDarkMode ? "#9ca3af" : "#4b5563",
                    }}
                    animate={{
                      y: isHovered ? -2 : 0,
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    {award.description.split(" ").slice(2).join(" ")}
                  </motion.p>
                </div>

                {/* 하단 장식 */}
                <motion.div
                  className="w-16 h-1 rounded-full mt-4"
                  style={{
                    background: `linear-gradient(90deg, ${gradientStart}, ${gradientEnd})`,
                  }}
                  animate={{
                    width: isHovered ? "5rem" : "4rem",
                  }}
                />
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* 총 상금 컨테이너 */}
      <motion.div
        className="mt-20 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <motion.div
          className="inline-block py-6 px-12 relative overflow-hidden rounded-lg"
          style={{
            background: isDarkMode
              ? "rgba(31, 41, 55, 0.7)"
              : "rgba(255, 255, 255, 0.7)",
            backdropFilter: "blur(10px)",
            border: isDarkMode
              ? "1px solid rgba(255, 255, 255, 0.1)"
              : "1px solid rgba(0, 0, 0, 0.1)",
          }}
          whileHover={{
            scale: 1.03,
            transition: { duration: 0.3 },
          }}
        >
          {/* 배경 효과 */}
          <motion.div
            className="absolute inset-0 opacity-20"
            style={{
              background: isDarkMode
                ? "radial-gradient(circle at 50% 0%, #818cf8, transparent 70%)"
                : "radial-gradient(circle at 50% 0%, #6366f1, transparent 70%)",
              filter: "blur(20px)",
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />

          {/* 트로피 아이콘 */}
          <div className="flex items-center justify-center mb-3">
            <motion.div
              className="w-10 h-10 text-transparent"
              initial={{ y: -10, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                style={{
                  stroke: isDarkMode
                    ? "linear-gradient(135deg, #c084fc, #818cf8)"
                    : "linear-gradient(135deg, #6366f1, #a855f7)",
                }}
                strokeWidth="2"
                className="w-full h-full"
              >
                <path
                  d="M12 15c2.21 0 4-1.79 4-4V4.5H8V11c0 2.21 1.79 4 4 4z"
                  stroke={isDarkMode ? "#a5b4fc" : "#4f46e5"}
                />
                <path
                  d="M17.5 4.5c.5 0 3.5.5 3.5 3.5s-2 3.5-3 3.5"
                  stroke={isDarkMode ? "#a5b4fc" : "#4f46e5"}
                />
                <path
                  d="M6.5 4.5C6 4.5 3 5 3 8s2 3.5 3 3.5"
                  stroke={isDarkMode ? "#a5b4fc" : "#4f46e5"}
                />
                <path
                  d="M8.5 14.5L8 18l4 2 4-2-.5-3.5"
                  stroke={isDarkMode ? "#a5b4fc" : "#4f46e5"}
                />
              </svg>
            </motion.div>
          </div>

          {/* 총 상금 텍스트 */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              {totalPrize}
            </span>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Awards;
