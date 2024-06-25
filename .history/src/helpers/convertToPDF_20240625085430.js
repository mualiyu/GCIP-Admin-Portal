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

  let position = 0;
  let remainingHeight = canvas.height;

  while (remainingHeight > 0) {
    if (remainingHeight < pdfPageHeight) {
      pdf.addImage(
        imgData,
        "PNG",
        padding,
        position,
        imageWidth,
        remainingHeight
      );
    } else {
      const pageCanvas = document.createElement("canvas");
      pageCanvas.width = canvas.width;
      pageCanvas.height = pdfPageHeight * (canvas.width / pdfPageWidth);
      const pageContext = pageCanvas.getContext("2d");
      pageContext.drawImage(
        canvas,
        0,
        position,
        canvas.width,
        pageCanvas.height,
        0,
        0,
        canvas.width,
        pageCanvas.height
      );
      const pageImgData = pageCanvas.toDataURL("image/png");
      pdf.addImage(
        pageImgData,
        "PNG",
        padding,
        padding,
        imageWidth,
        pdfPageHeight
      );
    }

    position += pdfPageHeight;
    remainingHeight -= pdfPageHeight;

    if (remainingHeight > 0) {
      pdf.addPage();
    }
  }

  pdf.save(`${title}.pdf`);
  setIsConverting("Download PDF");
}

export default convertToPDF;
