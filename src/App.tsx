// ChartJS 등록을 위한 import
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";

import About from "./components/About";
import Awards from "./components/Awards";
import DownloadButton from "./components/DownloadButton";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Leadership from "./components/Leadership";
// 컴포넌트 불러오기
import Navbar from "./components/Navbar";
import React from "react";
import Skills from "./components/Skills";
import { ThemeProvider } from "./context/ThemeContext";
import { useTheme } from "./hooks/useTheme";

// ChartJS 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// 앱 내부 컴포넌트 - 테마 컨텍스트를 사용
const AppContent: React.FC = () => {
  const { isDarkMode } = useTheme();

  return (
    <div
      style={{
        backgroundColor: isDarkMode ? "#111827" : "white",
        color: isDarkMode ? "white" : "#1f2937",
        transition: "background-color 0.3s, color 0.3s",
      }}
    >
      <div
        className="min-h-screen scroll-smooth overflow-hidden"
        id="cv-content"
      >
        <Navbar />
        <Header />
        <About />
        <Skills />
        <Leadership />
        <Awards />
        <Footer />
      </div>
      <DownloadButton />
    </div>
  );
};

// 메인 App 컴포넌트
const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
