import html2canvas from "html2canvas";
import jsPDF from "jspdf";

async function convertToPDF(id, title, setIsConverting = () => {}) {
  setIsConverting("Converting PDF");

  const pdf = new jsPDF("p", "mm", "a4");
  const pdfPageWidth = pdf.internal.pageSize.getWidth();
  const pdfPageHeight = pdf.internal.pageSize.getHeight();
  const padding = 10;

  const contentElement = document.getElementById(id);
  const contentHeight = contentElement.scrollHeight;
  const pageHeightPx = pdfPageHeight * (96 / 25.4); // Convert PDF mm to px at 96 DPI

  let position = 0;

  while (position < contentHeight) {
    const canvas = await html2canvas(contentElement, {
      scrollY: -window.scrollY - position,
      height: pageHeightPx,
      windowHeight: pageHeightPx,
    });

    const imgData = canvas.toDataURL("image/png");
    const imageWidth = pdfPageWidth - padding * 2;
    const imageHeight = (imageWidth * canvas.height) / canvas.width;

    pdf.addImage(imgData, "PNG", padding, padding, imageWidth, imageHeight);

    position += pageHeightPx;
    if (position < contentHeight) {
      pdf.addPage();
    }
  }

  pdf.save(`${title}.pdf`);
  setIsConverting("Download PDF");
}

export default convertToPDF;
