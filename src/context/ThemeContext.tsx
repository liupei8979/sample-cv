import React, { ReactNode, createContext, useEffect, useState } from "react";

import { ThemeContextType } from "../types";

// 기본값으로 컨텍스트 생성
export const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
  toggleTheme: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // 초기 테마 설정
  useEffect(() => {
    // 기존 테마 설정 무시하고 항상 라이트 모드로 시작
    setIsDarkMode(true);

    // HTML 요소에서 dark 클래스 제거
    document.documentElement.classList.remove("dark");

    // 로컬 스토리지에 라이트 모드로 저장
    localStorage.theme = "light";
  }, []);

  // 테마 토글 함수
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
    <ThemeContext.Provider
      value={{
        isDarkMode,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
