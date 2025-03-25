import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";

import { Bar } from "react-chartjs-2";
import React from "react";
import { animate } from "framer-motion";
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

// Framer Motion의 animate 함수를 사용한 스크롤 핸들러
const handleNavClick = (
  e: React.MouseEvent<HTMLAnchorElement>,
  targetId: string
) => {
  e.preventDefault();

  // setTimeout을 추가하여 이벤트 루프의 다음 틱에서 실행
  setTimeout(() => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      // 네비게이션 높이(예: 80px)를 감안하여 스크롤 위치 계산
      const navHeight = 80;
      const targetPosition =
        targetElement.getBoundingClientRect().top + window.scrollY - navHeight;

      animate(window.scrollY, targetPosition, {
        duration: 1,
        ease: [0.32, 0.72, 0, 1], // easeOutCubic
        onUpdate: (value) => window.scrollTo(0, value),
      });
    }
  }, 10);
};

// Navbar 컴포넌트 업데이트
const Navbar: React.FC = () => (
  <nav className="fixed top-0 left-0 right-0 z-50">
    <div className="max-w-[1400px] mx-auto px-8 py-5 flex justify-between items-center bg-white/90 backdrop-blur-xl shadow-lg rounded-b-2xl">
      <div className="font-bold text-3xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
        KM
      </div>
      <div className="space-x-8">
        {["about", "skills", "experience", "awards"].map((section) => (
          <a
            key={section}
            href={`#${section}`}
            onClick={(e) => handleNavClick(e, section)}
            className="text-gray-700 hover:text-indigo-600 transition font-medium relative group"
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
          </a>
        ))}
      </div>
    </div>
  </nav>
);

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
const About: React.FC = () => {
  return (
    <motion.section
      id="about"
      className="py-24 px-8 max-w-[1400px] mx-auto"
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
          <p className="text-gray-700 text-xl leading-relaxed">
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
          className="md:w-1/2 bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-2xl shadow-xl"
          variants={fadeInUp}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-2xl font-semibold mb-4 text-indigo-700">
            Languages
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-800">Korean</span>
              <div className="w-2/3 bg-gray-200 rounded-full h-2">
                <div className="bg-indigo-600 h-2 rounded-full w-full"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-800">Japanese</span>
              <div className="w-2/3 bg-gray-200 rounded-full h-2">
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
const Skills: React.FC = () => {
  const skills = [
    "React",
    "Svelte",
    "Javascript",
    "Typescript",
    "Zustand",
    "React-Query",
    "Chart.js",
    "D3.js",
  ];

  return (
    <motion.section
      id="skills"
      className="py-24 px-8 bg-gradient-to-br from-gray-50 to-indigo-50 max-w-[1400px] mx-auto rounded-3xl shadow-2xl"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeInUp}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-5xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
        Skills
      </h2>
      <motion.div
        className="flex flex-wrap justify-center gap-5 mb-16"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {skills.map((skill, index) => (
          <motion.div
            key={skill}
            className="bg-white px-8 py-4 rounded-xl shadow-lg text-xl font-medium text-gray-800 cursor-pointer hover:scale-105 transform transition border border-indigo-100"
            variants={itemVariants}
            transition={{ duration: 0.5, delay: index * 0.07 }}
            whileHover={{
              backgroundColor: "#EEF2FF",
              boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.2)",
            }}
          >
            {skill}
          </motion.div>
        ))}
      </motion.div>
      <SkillsChart />
    </motion.section>
  );
};

const SkillsChart: React.FC = () => {
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
        backgroundColor: [
          "rgba(99, 102, 241, 0.8)", // indigo
          "rgba(139, 92, 246, 0.8)", // purple
          "rgba(168, 85, 247, 0.8)", // fuchsia
          "rgba(217, 70, 239, 0.8)", // pink
          "rgba(99, 102, 241, 0.8)", // indigo
          "rgba(139, 92, 246, 0.8)", // purple
          "rgba(168, 85, 247, 0.8)", // fuchsia
          "rgba(217, 70, 239, 0.8)", // pink
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
          color: "rgba(243, 244, 246, 1)",
          drawBorder: false,
        },
        ticks: {
          font: {
            family: "'Inter', sans-serif",
            size: 12,
          },
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
      className="bg-white rounded-xl shadow-2xl p-6 overflow-hidden"
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

const ExperienceItem: React.FC<ExperienceProps> = ({ year, description }) => {
  return (
    <motion.div
      className="relative pl-10 mb-10"
      variants={itemVariants}
      transition={{ duration: 0.6 }}
    >
      <div className="absolute left-0 top-0 w-6 h-6 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
      <div className="border-l-4 border-indigo-200 pl-6 py-2">
        <p className="text-xl font-semibold text-indigo-700">{year}</p>
        <p className="mt-2 text-2xl text-gray-800">{description}</p>
      </div>
    </motion.div>
  );
};

const Leadership: React.FC = () => {
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
          />
        ))}
      </motion.div>
    </motion.section>
  );
};

// Awards 섹션 업데이트
const Awards: React.FC = () => {
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
      className="py-24 px-8 bg-gradient-to-br from-gray-50 to-purple-50 max-w-[1400px] mx-auto rounded-3xl shadow-2xl"
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
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition"
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <div className="text-lg font-semibold text-indigo-600 mb-2">
              {award.year}
            </div>
            <div className="text-xl font-bold text-gray-800">
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

// 푸터 업데이트
const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-indigo-900 text-white py-12 text-center">
      <div className="max-w-4xl mx-auto px-8">
        <div className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-300">
          KM
        </div>
        <div className="flex justify-center space-x-6 mb-8">
          <a href="#" className="text-gray-300 hover:text-white transition">
            GitHub
          </a>
          <a href="#" className="text-gray-300 hover:text-white transition">
            LinkedIn
          </a>
          <a href="#" className="text-gray-300 hover:text-white transition">
            Email
          </a>
        </div>
        <div className="text-gray-400">
          © {new Date().getFullYear()} KIM MINTAE. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

// 다운로드 버튼 컴포넌트 개선
const DownloadButton: React.FC = () => {
  const handleDownload = async () => {
    const contentElement = document.getElementById("cv-content");
    if (!contentElement) return;

    // 로딩 상태 표시
    const loadingToast = document.createElement("div");
    loadingToast.className =
      "fixed top-4 right-4 bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-pulse";
    loadingToast.textContent = "Generating PDF...";
    document.body.appendChild(loadingToast);

    try {
      // 다운로드 버튼 일시적으로 숨기기
      const downloadBtn = document.getElementById("download-section");
      if (downloadBtn) downloadBtn.style.display = "none";

      // PDF 생성 시작
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      // 섹션별로 PDF 페이지 추가
      const sections = contentElement.querySelectorAll(
        "section, header, footer"
      );

      for (let i = 0; i < sections.length; i++) {
        const section = sections[i] as HTMLElement;

        // 첫 페이지가 아니면 새 페이지 추가
        if (i > 0) {
          pdf.addPage();
        }

        // 현재 섹션을 캔버스로 변환
        const canvas = await html2canvas(section, {
          scale: 1.5,
          useCORS: true,
          allowTaint: true,
          backgroundColor: null, // 투명 배경
          logging: false,
        });

        // 캔버스를 이미지로 변환
        const imgData = canvas.toDataURL("image/png");

        // PDF 페이지 크기
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        // 이미지 크기 계산 (페이지 너비에 맞춤)
        const imgWidth = pageWidth - 10; // 여백 5mm씩
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        // 이미지를 페이지 중앙에 배치
        const x = 5; // 왼쪽 여백 5mm
        const y = 5; // 상단 여백 5mm

        // 이미지 삽입
        pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);
      }

      // PDF 저장
      pdf.save("KimMintae_CV.pdf");
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
        className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 flex items-center space-x-2"
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
  // 스크롤 복원 비활성화
  React.useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    // 페이지 로드 시 맨 위로 스크롤
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white scroll-smooth">
      <div id="cv-content">
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

export default App;
