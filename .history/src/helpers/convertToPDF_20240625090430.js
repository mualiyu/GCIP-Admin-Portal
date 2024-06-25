import html2canvas from "html2canvas";
import jsPDF from "jspdf";

async function convertToPDF(id, title, setIsConverting = () => {}) {
  setIsConverting("Converting PDF");

  const pdf = new jsPDF("p", "mm", "a4");
  const pdfPageWidth = pdf.internal.pageSize.getWidth();
  const pdfPageHeight = pdf.internal.pageSize.getHeight();
  const padding = 10;

  const contentElement = document.getElementById(id);
  const canvas = await html2canvas(contentElement, {
    scrollY: -window.scrollY,
  });

  const imgData = canvas.toDataURL("image/png");
  const imageWidth = pdfPageWidth - padding * 2;
  const imageHeight = (imageWidth * canvas.height) / canvas.width;

  let remainingHeight = imageHeight;
  let position = 0;

  while (remainingHeight > 0) {
    const pageHeight =
      remainingHeight > pdfPageHeight ? pdfPageHeight : remainingHeight;
    const pageCanvas = document.createElement("canvas");
    pageCanvas.width = canvas.width;
    pageCanvas.height = (pageHeight * canvas.width) / imageWidth;
    const pageContext = pageCanvas.getContext("2d");
    pageContext.drawImage(
      canvas,
      0,
      position,
      canvas.width,
      pageCanvas.height,
      0,
      0,
      pageCanvas.width,
      pageCanvas.height
    );
    const pageImgData = pageCanvas.toDataURL("image/png");
    pdf.addImage(
      pageImgData,
      "PNG",
      padding,
      padding,
      imageWidth,
      pageHeight,
      "",
      "FAST"
    );
    position += pageCanvas.height;
    remainingHeight -= pageHeight;

    if (remainingHeight > 0) {
      pdf.addPage();
    }
  }

  pdf.save(`${title}.pdf`);
  setIsConverting("Download PDF");
}

export default convertToPDF;
