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

  if (imageHeight <= pdfPageHeight) {
    // If content fits within a single page
    pdf.addImage(
      imgData,
      "PNG",
      padding,
      padding,
      padding,
      imageWidth,
      imageHeight
    );
  } else {
    // If content spans multiple pages
    let remainingHeight = imageHeight;

    while (remainingHeight > 0) {
      const pageHeight =
        remainingHeight > pdfPageHeight ? pdfPageHeight : remainingHeight;
      pdf.addImage(
        imgData,
        "PNG",
        padding,
        padding,
        imageWidth,
        pageHeight,
        "",
        "FAST"
      );
      remainingHeight -= pageHeight;

      if (remainingHeight > 0) {
        pdf.addPage();
        position = 0;
      }
    }
  }

  pdf.save(`${title}.pdf`);
  setIsConverting("Download PDF");
}

export default convertToPDF;
