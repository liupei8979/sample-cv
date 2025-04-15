import React, { ReactNode, createContext, useEffect, useState } from "react";

import { ThemeContextType } from "../types";

// 기본값으로 컨텍스트 생성
export const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: true,
  toggleTheme: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  // 초기 테마 설정
  useEffect(() => {
    // 기존 테마 설정 무시하고 항상 다크 모드로 시작
    setIsDarkMode(true);

    // HTML 요소에 dark 클래스 추가
    document.documentElement.classList.add("dark");

    // 로컬 스토리지에 다크 모드로 저장
    localStorage.theme = "dark";
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
