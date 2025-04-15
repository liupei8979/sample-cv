import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const generatePDF = async (isDarkMode: boolean) => {
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
