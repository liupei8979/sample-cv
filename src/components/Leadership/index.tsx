import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

import { experiences } from "../../constants/experiences";
import { fadeInUp } from "../../utils/animations";
import { useTheme } from "../../hooks/useTheme";

// CategoryColor 타입 정의
type CategoryColorType = {
  color: string;
  textColor: string;
};

// CategoryColors 타입 정의
type CategoryColorsType = {
  [key: string]: CategoryColorType;
};

const Leadership: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [sortOption, setSortOption] = useState<string>("byYear");
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

  // 경험을 정렬 (정렬 옵션에 따라)
  const getSortedExperiences = () => {
    const sortedExps = [...experiences];

    if (sortOption === "byYear") {
      // 가장 최근 것이 맨 위
      return sortedExps.sort((a, b) => parseInt(b.year) - parseInt(a.year));
    } else if (sortOption === "byYearAsc") {
      // 가장 오래된 것이 맨 위
      return sortedExps.sort((a, b) => parseInt(a.year) - parseInt(b.year));
    } else if (sortOption === "byCapability") {
      // 역량 점수가 높은 순
      return sortedExps.sort((a, b) => b.capability - a.capability);
    } else if (sortOption === "byCategory") {
      // 카테고리별 정렬
      return sortedExps.sort((a, b) => a.category.localeCompare(b.category));
    }

    return sortedExps;
  };

  // 정렬된 경험 가져오기
  const sortedExperiences = getSortedExperiences();

  // 카테고리별 파스텔 색상 (왼쪽부터 오른쪽 순서)
  const categoryColors: CategoryColorsType = {
    DESIGN: { color: isDarkMode ? "#a5b4fc" : "#818cf8", textColor: "#4f46e5" },
    PROGRAMMING: {
      color: isDarkMode ? "#93c5fd" : "#60a5fa",
      textColor: "#2563eb",
    },
    "MOBILE SYSTEMS": {
      color: isDarkMode ? "#c4b5fd" : "#a78bfa",
      textColor: "#7c3aed",
    },
    "APPLICATION DEVELOPMENT": {
      color: isDarkMode ? "#ddd6fe" : "#c084fc",
      textColor: "#9333ea",
    },
    "SAAS SYSTEMS": {
      color: isDarkMode ? "#fbcfe8" : "#f472b6",
      textColor: "#db2777",
    },
    "DATABASE STRUCTURE": {
      color: isDarkMode ? "#fecdd3" : "#fb7185",
      textColor: "#e11d48",
    },
  };

  // 중앙 선 색상
  const lineColor = isDarkMode ? "#93c5fd" : "#3b82f6";

  // 현재 선택된 정렬 옵션의 텍스트 설정
  const getSortText = () => {
    switch (sortOption) {
      case "byYearAsc":
        return "Oldest First";
      case "byCapability":
        return "By Skill";
      case "byCategory":
        return "By Category";
      default:
        return "Latest First";
    }
  };

  // 경험 항목에 대한 애니메이션 변형
  const experienceVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  return (
    <motion.section
      id="experience"
      className="py-24 px-8 max-w-[1400px] mx-auto"
      style={{
        color: isDarkMode ? "white" : "#1f2937",
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={fadeInUp}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="text-center mb-20 relative"
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
          EXPERIENCE
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

        {/* 모던한 커스텀 드롭다운 */}
        <div className="absolute top-0 right-0 z-20" ref={dropdownRef}>
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
              width: "130px",
            }}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span>{getSortText()}</span>
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={{ rotate: isDropdownOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </motion.svg>
          </button>

          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                className="absolute right-0 mt-1 w-40 rounded-lg overflow-hidden shadow-xl z-50"
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                transition={{ duration: 0.3 }}
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
                {[
                  { id: "byYear", text: "Latest First" },
                  { id: "byYearAsc", text: "Oldest First" },
                  { id: "byCapability", text: "By Skill" },
                  { id: "byCategory", text: "By Category" },
                ].map((option) => (
                  <motion.div
                    key={option.id}
                    className="px-4 py-3 cursor-pointer transition-all text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      backgroundColor:
                        sortOption === option.id
                          ? isDarkMode
                            ? "rgba(55, 65, 81, 0.5)"
                            : "rgba(243, 244, 246, 0.5)"
                          : "transparent",
                      color: isDarkMode
                        ? sortOption === option.id
                          ? "#ffffff"
                          : "#d1d5db"
                        : sortOption === option.id
                        ? "#111827"
                        : "#4b5563",
                    }}
                    onClick={() => handleSortOptionSelect(option.id)}
                    whileHover={{
                      backgroundColor: isDarkMode
                        ? "rgba(55, 65, 81, 0.8)"
                        : "rgba(243, 244, 246, 0.8)",
                      x: 5,
                      transition: { duration: 0.1 },
                    }}
                  >
                    {option.text}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* 이미지에 있는 타임라인 스타일 */}
      <div className="relative max-w-4xl mx-auto">
        {/* 중앙 세로선 */}
        <div
          className="absolute left-1/2 top-0 bottom-0 w-1 transform -translate-x-1/2"
          style={{
            background: lineColor,
            zIndex: 1,
          }}
        ></div>

        {/* 경험 아이템들 - 애니메이션 추가 */}
        <AnimatePresence mode="wait">
          <motion.div
            key={sortOption}
            className="relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {sortedExperiences.map((exp, index) => {
              const isLeft = index % 2 === 0;

              // 카테고리 색상 가져오기 (기본값 설정)
              const categoryColor = categoryColors[exp.category] || {
                color: isDarkMode ? "#c7d2fe" : "#6366f1",
                textColor: "#4f46e5",
              };

              // 역량 점수에 기반한 원의 크기
              const circleSize = Math.max(
                120,
                Math.min(180, exp.capability * 1.8)
              );

              // 포지션과 기술 스택 추출
              const position = exp.position || "";
              const tech = exp.tech || "";
              const company = exp.company || "";

              // 이전 아이템과 연결 (두 번째 아이템부터)
              const isNotFirst = index > 0;
              const isNotLast = index < sortedExperiences.length - 1;

              return (
                <motion.div
                  key={`${exp.company}-${exp.year}`}
                  custom={index}
                  variants={experienceVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className={`${
                    index > 0 ? "mt-[-20px]" : ""
                  } mb-0 relative flex items-center`}
                >
                  {/* 메인 아이템 */}
                  <div className="w-full mb-20 relative flex items-center">
                    {/* 중앙 원 - 축에 배치 */}
                    <div
                      className="absolute left-1/2 transform -translate-x-1/2 rounded-full z-10 flex items-center justify-center overflow-hidden"
                      style={{
                        width: `${circleSize}px`,
                        height: `${circleSize}px`,
                      }}
                    >
                      {/* 반원 */}
                      <motion.div
                        className="absolute w-full h-full"
                        style={{
                          background: categoryColor.color,
                          opacity: 0.4,
                          clipPath: isLeft
                            ? "polygon(0 0, 50% 0, 50% 100%, 0 100%)"
                            : "polygon(50% 0, 100% 0, 100% 100%, 50% 100%)",
                        }}
                        whileHover={{
                          opacity: 0.6,
                          transition: { duration: 0.3 },
                        }}
                      ></motion.div>

                      {/* 이전 원과 연결 (위쪽) */}
                      {isNotFirst && (
                        <div
                          className="absolute top-[-20px] left-1/2 transform -translate-x-1/2"
                          style={{
                            width: `${circleSize}px`,
                            height: "20px",
                            background: categoryColor.color,
                            opacity: 0.4,
                            clipPath: isLeft
                              ? "polygon(0 0, 50% 0, 50% 100%, 0 100%)"
                              : "polygon(50% 0, 100% 0, 100% 100%, 50% 100%)",
                            zIndex: 5,
                          }}
                        ></div>
                      )}

                      {/* 다음 원과 연결 (아래쪽) */}
                      {isNotLast && (
                        <div
                          className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2"
                          style={{
                            width: `${circleSize}px`,
                            height: "20px",
                            background: categoryColor.color,
                            opacity: 0.4,
                            clipPath: isLeft
                              ? "polygon(0 0, 50% 0, 50% 100%, 0 100%)"
                              : "polygon(50% 0, 100% 0, 100% 100%, 50% 100%)",
                            zIndex: 5,
                          }}
                        ></div>
                      )}

                      {/* 중앙 포인트 마커 */}
                      <motion.div
                        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full z-20 flex items-center justify-center"
                        style={{
                          background: lineColor,
                          boxShadow: `0 0 0 4px ${
                            isDarkMode ? "#1e3a8a" : "white"
                          }`,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 10,
                        }}
                      >
                        <motion.div
                          className="w-3 h-3 rounded-full"
                          style={{
                            background: isDarkMode ? "white" : "#1e3a8a",
                          }}
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.7, 1, 0.7],
                          }}
                          transition={{
                            repeat: Infinity,
                            duration: 2,
                            ease: "easeInOut",
                          }}
                        ></motion.div>
                      </motion.div>
                    </div>

                    {/* 카테고리 레이블 - 반원 위에 표시 */}
                    <motion.div
                      className={`absolute z-30 mt-[-50px] ${
                        isLeft ? "left-0" : "right-0"
                      } px-4 py-2 rounded-md text-xs font-bold`}
                      style={{
                        backgroundColor: isDarkMode
                          ? "rgba(17, 24, 39, 0.8)"
                          : "rgba(255, 255, 255, 0.9)",
                        color: categoryColor.textColor,
                        top: "10px",
                        transform: isLeft
                          ? `translateX(${circleSize / 4}px)`
                          : `translateX(-${circleSize / 4}px)`,
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                      }}
                      whileHover={{
                        y: -5,
                        boxShadow: "0 8px 15px rgba(0, 0, 0, 0.15)",
                      }}
                    >
                      {exp.category}
                    </motion.div>

                    {/* 왼쪽 콘텐츠 */}
                    {isLeft && (
                      <motion.div
                        className="w-1/2 pr-40 text-right"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                      >
                        <motion.div
                          className="inline-block"
                          whileHover={{ x: -5, transition: { duration: 0.2 } }}
                        >
                          <div
                            className="text-sm font-medium mb-1"
                            style={{
                              color: isDarkMode ? "#d1d5db" : "#6b7280",
                            }}
                          >
                            {exp.year}
                          </div>
                          <div
                            className="text-xl font-bold mb-1"
                            style={{ color: categoryColor.textColor }}
                          >
                            {company}
                          </div>
                          <div className="text-lg font-medium mb-1">
                            {position}
                          </div>
                          <div className="text-sm mb-2 opacity-75">{tech}</div>
                          <motion.div
                            className="inline-block mt-1 px-3 py-1 rounded-full text-xs font-medium"
                            style={{
                              backgroundColor: isDarkMode
                                ? `${categoryColor.color}30`
                                : `${categoryColor.color}30`,
                              color: categoryColor.textColor,
                            }}
                            whileHover={{
                              scale: 1.1,
                              backgroundColor: isDarkMode
                                ? `${categoryColor.color}50`
                                : `${categoryColor.color}50`,
                            }}
                          >
                            Skill: {exp.capability}%
                          </motion.div>
                        </motion.div>
                      </motion.div>
                    )}

                    {/* 오른쪽 콘텐츠 */}
                    {!isLeft && (
                      <motion.div
                        className="w-1/2 ml-auto pl-40 text-left"
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                      >
                        <motion.div
                          className="inline-block"
                          whileHover={{ x: 5, transition: { duration: 0.2 } }}
                        >
                          <div
                            className="text-sm font-medium mb-1"
                            style={{
                              color: isDarkMode ? "#d1d5db" : "#6b7280",
                            }}
                          >
                            {exp.year}
                          </div>
                          <div
                            className="text-xl font-bold mb-1"
                            style={{ color: categoryColor.textColor }}
                          >
                            {company}
                          </div>
                          <div className="text-lg font-medium mb-1">
                            {position}
                          </div>
                          <div className="text-sm mb-2 opacity-75">{tech}</div>
                          <motion.div
                            className="inline-block mt-1 px-3 py-1 rounded-full text-xs font-medium"
                            style={{
                              backgroundColor: isDarkMode
                                ? `${categoryColor.color}30`
                                : `${categoryColor.color}30`,
                              color: categoryColor.textColor,
                            }}
                            whileHover={{
                              scale: 1.1,
                              backgroundColor: isDarkMode
                                ? `${categoryColor.color}50`
                                : `${categoryColor.color}50`,
                            }}
                          >
                            Skill: {exp.capability}%
                          </motion.div>
                        </motion.div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* 시작과 끝 마커 */}
        <motion.div
          className="absolute left-1/2 top-0 transform -translate-x-1/2 -mt-2 w-4 h-4 rounded-full z-40 ml-[-8px]"
          style={{
            background: lineColor,
            boxShadow: `0 0 8px ${lineColor}`,
          }}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.5, boxShadow: `0 0 15px ${lineColor}` }}
        ></motion.div>
        <motion.div
          className="absolute left-1/2 bottom-0 transform -translate-x-1/2 -mb-2 w-4 h-4 rounded-full z-40 ml-[-8px]"
          style={{
            background: lineColor,
            boxShadow: `0 0 8px ${lineColor}`,
          }}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ delay: 0.8 }}
          whileHover={{ scale: 1.5, boxShadow: `0 0 15px ${lineColor}` }}
        ></motion.div>
      </div>
    </motion.section>
  );
};

export default Leadership;
