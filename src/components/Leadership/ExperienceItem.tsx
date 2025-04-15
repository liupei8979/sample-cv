import { ExperienceItemProps } from "../../types";
import React from "react";
import { itemVariants } from "../../utils/animations";
import { motion } from "framer-motion";

const ExperienceItem: React.FC<ExperienceItemProps> = ({
  year,
  description,
  isDarkMode,
  index = 0,
  capability = 50, // 기본값 설정
}) => {
  // 짝수 인덱스는 왼쪽, 홀수 인덱스는 오른쪽에 배치
  const isEven = index % 2 === 0;

  // 역량 점수에 따른 반원 크기 계산 (40-100px 범위의 값으로 변환)
  const semicircleSize = Math.max(40, Math.min(100, capability));

  // 아크 길이 계산 (반원 크기에 비례)
  const arcLength = Math.min(100, Math.max(20, capability * 0.7));

  return (
    <motion.div
      className="relative flex w-full items-center my-16"
      variants={itemVariants}
      transition={{ duration: 0.6 }}
    >
      {/* 왼쪽 컨텐츠 (짝수 인덱스) */}
      {isEven && (
        <motion.div
          className="w-1/2 pr-10 text-right"
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="inline-block p-6 rounded-xl shadow-lg rounded-tr-none"
            style={{
              backgroundColor: isDarkMode
                ? "rgba(31, 41, 55, 0.95)"
                : "rgba(255, 255, 255, 0.95)",
              boxShadow: isDarkMode
                ? `0 10px 25px rgba(0, 0, 0, 0.2), 0 0 ${
                    capability / 10
                  }px rgba(99, 102, 241, 0.${Math.floor(capability / 20)})`
                : `0 10px 25px rgba(99, 102, 241, 0.15), 0 0 ${
                    capability / 10
                  }px rgba(99, 102, 241, 0.${Math.floor(capability / 30)})`,
              borderTop: `${Math.min(
                5,
                Math.max(2, Math.floor(capability / 20))
              )}px solid ${
                isDarkMode
                  ? `rgba(${67 + capability / 10}, ${56 + capability / 10}, ${
                      202 + capability / 10
                    }, 0.9)`
                  : `rgba(${99 + capability / 10}, ${102 + capability / 10}, ${
                      241 - capability / 10
                    }, 0.9)`
              }`,
            }}
            whileHover={{
              y: -5,
              boxShadow: isDarkMode
                ? `0 15px 30px rgba(0, 0, 0, 0.3), 0 0 ${
                    capability / 5
                  }px rgba(99, 102, 241, 0.${Math.floor(capability / 15)})`
                : `0 15px 30px rgba(99, 102, 241, 0.25), 0 0 ${
                    capability / 5
                  }px rgba(99, 102, 241, 0.${Math.floor(capability / 20)})`,
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-end mb-3">
              <span
                className={`text-xl font-semibold font-outfit`}
                style={{
                  color: isDarkMode
                    ? `hsl(${230 + capability / 5}, ${70 + capability / 5}%, ${
                        70 + capability / 10
                      }%)`
                    : `hsl(${230 + capability / 5}, ${70 + capability / 10}%, ${
                        45 - capability / 10
                      }%)`,
                }}
              >
                {year}
              </span>

              {/* 역량 점수가 높은 항목 표시 */}
              {capability >= 85 && (
                <span
                  className="ml-3 px-2 py-1 rounded-full text-xs font-bold"
                  style={{
                    backgroundColor: isDarkMode
                      ? "rgba(79, 70, 229, 0.2)"
                      : "rgba(99, 102, 241, 0.1)",
                    color: isDarkMode ? "#818cf8" : "#4f46e5",
                  }}
                >
                  Expert
                </span>
              )}
            </div>

            <p
              className="text-xl font-outfit"
              style={{ color: isDarkMode ? "#e5e7eb" : "#1f2937" }}
            >
              {description}
            </p>
          </motion.div>
        </motion.div>
      )}

      {/* 중앙 역량 반원 */}
      <div className="absolute left-1/2 transform -translate-x-1/2 z-10 flex justify-center items-center">
        <motion.div
          className="relative"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 15,
            delay: 0.2,
          }}
        >
          {/* 역량에 따른 반원 크기 */}
          <motion.div
            className={`absolute top-0 ${
              isEven ? "-right-1" : "-left-1"
            } flex items-center justify-center`}
            style={{
              width: `${semicircleSize}px`,
              height: `${semicircleSize}px`,
              borderRadius: "50%",
              background: `conic-gradient(
                from ${isEven ? "270deg" : "90deg"}, 
                ${
                  isDarkMode
                    ? `rgba(${99 - capability / 20}, ${102}, ${
                        241 + capability / 10
                      }, 0.9) ${arcLength}%, transparent ${arcLength}%`
                    : `rgba(${99 - capability / 20}, ${102}, ${
                        241 + capability / 5
                      }, 0.9) ${arcLength}%, transparent ${arcLength}%`
                }
              )`,
              clipPath: isEven
                ? "polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 0, 50% 50%)"
                : "polygon(0 0, 100% 0, 100% 100%, 0 100%, 100% 50%, 50% 50%)",
              transition: "all 0.5s ease",
              transform: isEven ? "rotate(0deg)" : "rotate(180deg)",
              boxShadow: `0 0 ${
                capability / 5
              }px rgba(99, 102, 241, 0.${Math.floor(capability / 20)})`,
            }}
            whileHover={{
              scale: 1.1,
              boxShadow: `0 0 ${
                capability / 3
              }px rgba(99, 102, 241, 0.${Math.floor(capability / 15)})`,
            }}
          >
            {/* 역량 점수 표시 */}
            <div
              className="absolute flex items-center justify-center"
              style={{
                width: `${semicircleSize * 0.5}px`,
                height: `${semicircleSize * 0.5}px`,
                borderRadius: "50%",
                background: isDarkMode
                  ? "rgba(31, 41, 55, 0.95)"
                  : "rgba(255, 255, 255, 0.95)",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                left: isEven ? "25%" : "25%",
                top: "25%",
              }}
            >
              <span
                className="font-bold font-outfit"
                style={{
                  color: isDarkMode ? "#a5b4fc" : "#4f46e5",
                  fontSize: `${semicircleSize * 0.18}px`,
                }}
              >
                {capability}
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* 오른쪽 컨텐츠 (홀수 인덱스) */}
      {!isEven && (
        <motion.div
          className="w-1/2 ml-auto pl-10 text-left"
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="inline-block p-6 rounded-xl shadow-lg rounded-tl-none"
            style={{
              backgroundColor: isDarkMode
                ? "rgba(31, 41, 55, 0.95)"
                : "rgba(255, 255, 255, 0.95)",
              boxShadow: isDarkMode
                ? `0 10px 25px rgba(0, 0, 0, 0.2), 0 0 ${
                    capability / 10
                  }px rgba(99, 102, 241, 0.${Math.floor(capability / 20)})`
                : `0 10px 25px rgba(99, 102, 241, 0.15), 0 0 ${
                    capability / 10
                  }px rgba(99, 102, 241, 0.${Math.floor(capability / 30)})`,
              borderTop: `${Math.min(
                5,
                Math.max(2, Math.floor(capability / 20))
              )}px solid ${
                isDarkMode
                  ? `rgba(${67 + capability / 10}, ${56 + capability / 10}, ${
                      202 + capability / 10
                    }, 0.9)`
                  : `rgba(${99 + capability / 10}, ${102 + capability / 10}, ${
                      241 - capability / 10
                    }, 0.9)`
              }`,
            }}
            whileHover={{
              y: -5,
              boxShadow: isDarkMode
                ? `0 15px 30px rgba(0, 0, 0, 0.3), 0 0 ${
                    capability / 5
                  }px rgba(99, 102, 241, 0.${Math.floor(capability / 15)})`
                : `0 15px 30px rgba(99, 102, 241, 0.25), 0 0 ${
                    capability / 5
                  }px rgba(99, 102, 241, 0.${Math.floor(capability / 20)})`,
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center mb-3">
              <span
                className={`text-xl font-semibold font-outfit`}
                style={{
                  color: isDarkMode
                    ? `hsl(${230 + capability / 5}, ${70 + capability / 5}%, ${
                        70 + capability / 10
                      }%)`
                    : `hsl(${230 + capability / 5}, ${70 + capability / 10}%, ${
                        45 - capability / 10
                      }%)`,
                }}
              >
                {year}
              </span>

              {/* 역량 점수가 높은 항목 표시 */}
              {capability >= 85 && (
                <span
                  className="ml-3 px-2 py-1 rounded-full text-xs font-bold"
                  style={{
                    backgroundColor: isDarkMode
                      ? "rgba(79, 70, 229, 0.2)"
                      : "rgba(99, 102, 241, 0.1)",
                    color: isDarkMode ? "#818cf8" : "#4f46e5",
                  }}
                >
                  Expert
                </span>
              )}
            </div>

            <p
              className="text-xl font-outfit"
              style={{ color: isDarkMode ? "#e5e7eb" : "#1f2937" }}
            >
              {description}
            </p>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ExperienceItem;
